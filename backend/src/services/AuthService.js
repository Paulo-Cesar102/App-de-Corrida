const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/AuthRepository');

const SECRET_KEY = process.env.JWT_SECRET || 'chave-secreta-padrao-temporaria';

class AuthService {
  async register({ name, email, phone, password, pixKey }) {
    if (!name || !password || (!email && !phone)) {
      throw new Error('Nome, senha e (email ou telefone) são obrigatórios.');
    }

    if (email) {
      const existingEmail = await authRepository.findByEmail(email);
      if (existingEmail) throw new Error('E-mail já cadastrado.');
    }
    
    if (phone) {
      const existingPhone = await authRepository.findByPhone(phone);
      if (existingPhone) throw new Error('Telefone já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userPixKey = pixKey || email || phone;

    const newUser = await authRepository.createUser({
      name,
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      pixKey: userPixKey,
      balance: 0.0,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(identifier, password) {
    if (!identifier || !password) {
      throw new Error('Identificador (email/telefone) e senha são obrigatórios.');
    }

    const user = await authRepository.findByIdentifier(identifier);
    if (!user) throw new Error('Usuário não encontrado.');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Senha incorreta.');

    const token = jwt.sign(
      { userId: user.id, email: user.email, phone: user.phone },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
}

module.exports = new AuthService();
