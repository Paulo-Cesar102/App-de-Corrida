const runService = require('../services/RunService');

/**
 * RunController
 * 
 * Camada de Controller: Responsável por receber as requisições HTTP (req)
 * e devolver as respostas (res).
 * Ele não deve conter regras de negócio complexas nem acessar o banco diretamente.
 * Sua função é extrair dados da requisição, chamar o Service adequado, e formatar a resposta.
 */
class RunController {
  /**
   * Endpoint para criar uma corrida.
   */
  async createRun(req, res) {
    try {
      const { userId, distance, duration, route, tournamentId } = req.body;
      
      const newRun = await runService.saveRun({ userId, distance, duration, route, tournamentId });
      
      return res.status(201).json({ success: true, data: newRun });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  /**
   * Endpoint para listar as corridas de um usuário.
   */
  async getRuns(req, res) {
    try {
      const { userId } = req.params;
      
      // Converte para inteiro, pois os params da URL são strings
      const runs = await runService.getUserRuns(parseInt(userId, 10));
      
      return res.status(200).json({ success: true, data: runs });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}

module.exports = new RunController();
