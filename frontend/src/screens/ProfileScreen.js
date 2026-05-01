import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProfileScreen.styles';
import { userApi } from '../api/userService';
import { transactionApi } from '../api/transactionService';

export default function ProfileScreen() {
  const [balance, setBalance] = useState(0.0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Estado do Modo Anônimo (Fantasmas)
  const [isAnonymous, setIsAnonymous] = useState(false);

  const userId = 1;

  const fetchData = async () => {
    try {
      const userRes = await userApi.getUserStats(userId);
      if (userRes.data && userRes.data.success) {
        setBalance(userRes.data.data.balance);
      }
      
      const transRes = await transactionApi.getHistory(userId);
      if (transRes.data) {
        setTransactions(transRes.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeposit = () => {
    Alert.prompt('Depósito Via PIX', 'Digite o valor:', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Gerar PIX', onPress: async (value) => {
          const amount = parseFloat(value);
          if (isNaN(amount) || amount <= 0) return Alert.alert('Valor inválido');
          try {
            await transactionApi.deposit(userId, amount);
            fetchData();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível processar o depósito.');
          }
        } 
      }
    ], 'plain-text', '', 'numeric');
  };

  const handleWithdrawal = () => {
    Alert.prompt('Solicitar Saque PIX', `Digite o valor (Saldo: R$ ${balance.toFixed(2)}):`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Solicitar', onPress: async (value) => {
          const amount = parseFloat(value);
          if (isNaN(amount) || amount <= 0 || amount > balance) return Alert.alert('Saldo insuficiente');
          try {
            const res = await transactionApi.withdraw(userId, amount);
            if (res.data) {
              fetchData();
              Alert.alert('Pendente', 'Enviado para o ADM.');
            }
          } catch (error) {
            Alert.alert('Erro', error.response?.data?.error || 'Erro ao processar saque.');
          }
        } 
      }
    ], 'plain-text', '', 'numeric');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CONFIGURAÇÕES</Text>
        <TouchableOpacity onPress={() => { setIsRefreshing(true); fetchData(); }}>
          <Ionicons name="refresh-circle" size={32} color="#00E676" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Card de Saldo/Carteira */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>SALDO DISPONÍVEL</Text>
          <Text style={styles.balanceValue}>R$ {balance.toFixed(2)}</Text>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.btnAction} onPress={handleDeposit}>
              <Ionicons name="add-circle" size={20} color="#000" />
              <Text style={styles.btnActionText}>DEPOSITAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnAction, styles.btnActionSecondary]} onPress={handleWithdrawal}>
              <Ionicons name="arrow-up-circle" size={20} color="#00E676" />
              <Text style={[styles.btnActionText, { color: '#00E676' }]}>SACAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção de Preferências */}
        <Text style={styles.sectionTitle}>PREFERÊNCIAS</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity 
            style={styles.settingItem} 
            activeOpacity={0.7}
            onPress={() => setIsAnonymous(!isAnonymous)}
          >
            <View style={[styles.settingIconCircle, isAnonymous && { backgroundColor: 'rgba(0, 230, 118, 0.1)' }]}>
              <Ionicons name={isAnonymous ? "eye-off" : "eye"} size={22} color={isAnonymous ? "#00E676" : "#888"} />
            </View>
            <View style={styles.settingTextContent}>
              <Text style={styles.settingTitle}>PERFIL FANTASMA</Text>
              <Text style={styles.settingDesc}>Suas corridas não aparecem nos rankings públicos.</Text>
            </View>
            <View style={[styles.toggleCircle, isAnonymous && styles.toggleActive]}>
              {isAnonymous && <Ionicons name="checkmark" size={16} color="#00E676" />}
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
            <View style={styles.settingIconCircle}>
              <Ionicons name="notifications-outline" size={22} color="#888" />
            </View>
            <View style={styles.settingTextContent}>
              <Text style={styles.settingTitle}>NOTIFICAÇÕES DE ÁUDIO</Text>
              <Text style={styles.settingDesc}>Avisar sobre líderes de rota (Ghost Mode).</Text>
            </View>
            <View style={styles.toggleCircle}>
               <Ionicons name="checkmark" size={16} color="#00E676" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Histórico de Transações */}
        <Text style={styles.sectionTitle}>ÚLTIMAS TRANSAÇÕES</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#00E676" />
          </View>
        ) : (
          <View style={styles.historyList}>
            {transactions.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma transação encontrada.</Text>
            ) : (
              transactions.map((t) => (
                <View key={t.id} style={styles.transCard}>
                  <View style={styles.transIcon}>
                    <Ionicons 
                      name={t.type === 'DEPOSIT' || t.type === 'PRIZE' ? 'arrow-down' : 'arrow-up'} 
                      size={20} 
                      color={t.type === 'DEPOSIT' || t.type === 'PRIZE' ? '#00E676' : '#FF3D00'} 
                    />
                  </View>
                  <View style={styles.transInfo}>
                    <Text style={styles.transType}>
                      {t.type === 'DEPOSIT' && 'Depósito PIX'}
                      {t.type === 'WITHDRAWAL' && 'Saque Solicitado'}
                      {t.type === 'ENTRY_FEE' && 'Inscrição Torneio'}
                      {t.type === 'PRIZE' && 'Prêmio Recebido'}
                    </Text>
                    <Text style={styles.transDate}>{new Date(t.createdAt).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.transAmountContainer}>
                    <Text style={[styles.transAmount, { color: t.type === 'DEPOSIT' || t.type === 'PRIZE' ? '#00E676' : '#FF3D00' }]}>
                      {t.type === 'DEPOSIT' || t.type === 'PRIZE' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                    </Text>
                    <Text style={[styles.transStatus, { color: t.status === 'PENDING' ? '#FFD60A' : '#555' }]}>{t.status}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
