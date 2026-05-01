import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './RegisterScreen.styles';
import { authApi } from '../api/authService';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pixType, setPixType] = useState('EMAIL'); // 'EMAIL' ou 'PHONE'
  const [pixKey, setPixKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !pixKey) {
      return Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
    }
    
    if (!email.includes('@gmail.com')) {
      return Alert.alert('E-mail Inválido', 'Por favor, use um endereço @gmail.com.');
    }

    const payload = { 
      name, 
      email, 
      password, 
      pixKey: pixKey
    };

    setLoading(true);
    try {
      const response = await authApi.register(payload);
      if (response.data) {
        Alert.alert('Sucesso!', 'Sua conta foi criada com sucesso.', [
          { text: 'Ir para Login', onPress: () => navigation.navigate('Login') }
        ]);
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || 'Não foi possível conectar ao servidor. Verifique sua internet.';
      Alert.alert('Erro de Conexão', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoGym}>GYM</Text>
            <Text style={styles.logoPro}>PRO</Text>
            <Text style={styles.logoSeparator}>-</Text>
            <Text style={styles.logoCorridas}>CORRIDAS</Text>
          </Text>
        </View>
        <Text style={styles.subtitle}>Junte-se à elite dos corredores</Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOME</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#00FF00" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Como quer ser chamado?" 
                placeholderTextColor="#444" 
                value={name} 
                onChangeText={setName} 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-MAIL GMAIL</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#00FF00" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="seu.email@gmail.com" 
                placeholderTextColor="#444" 
                value={email} 
                onChangeText={setEmail} 
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>SENHA</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#00FF00" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Mínimo 6 caracteres" 
                placeholderTextColor="#444" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CHAVE PIX PARA RESGATE</Text>
            <View style={styles.pixTypeContainer}>
              <TouchableOpacity 
                style={[styles.pixTypeButton, pixType === 'EMAIL' && styles.pixTypeButtonActive]}
                onPress={() => setPixType('EMAIL')}
              >
                <Text style={[styles.pixTypeText, pixType === 'EMAIL' && styles.pixTypeTextActive]}>E-MAIL</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pixTypeButton, pixType === 'PHONE' && styles.pixTypeButtonActive]}
                onPress={() => setPixType('PHONE')}
              >
                <Text style={[styles.pixTypeText, pixType === 'PHONE' && styles.pixTypeTextActive]}>CELULAR</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons 
                name={pixType === 'EMAIL' ? 'at-outline' : 'call-outline'} 
                size={20} 
                color="#00FF00" 
                style={styles.inputIcon} 
              />
              <TextInput 
                style={styles.input} 
                placeholder={pixType === 'EMAIL' ? "exemplo@email.com" : "(00) 00000-0000"} 
                placeholderTextColor="#444" 
                value={pixKey} 
                onChangeText={setPixKey}
                keyboardType={pixType === 'PHONE' ? 'phone-pad' : 'email-address'}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.registerButtonText}>CRIAR CONTA AGORA</Text>
                <Ionicons name="chevron-forward" size={20} color="#000" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginContainer}>
            <Text style={styles.loginLink}>Já faz parte do clube? <Text style={styles.loginLinkHighlight}>Entrar</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
