import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './AdminScreen.styles';
import { adminApi } from '../api/adminService';
import { tournamentApi } from '../api/tournamentService';

export default function AdminScreen() {
  const [stats, setStats] = useState({ totalUsers: 0, totalParticipants: 0, adminProfit: 0 });
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Form states
  const [announcementMsg, setAnnouncementMsg] = useState('');
  const [tName, setTName] = useState('');
  const [tFee, setTFee] = useState('');
  const [tPrizeType, setTPrizeType] = useState('PERCENTAGE'); // FIXED or PERCENTAGE
  const [tPrizeValue, setTPrizeValue] = useState('');
  const [tLimit, setTLimit] = useState('');
  const [tStartHour, setTStartHour] = useState('0');
  const [tEndHour, setTEndHour] = useState('23');

  const fetchData = async () => {
    try {
      const [statsRes, tournamentsRes] = await Promise.all([
        adminApi.getStats(),
        tournamentApi.listTournaments()
      ]);
      setStats(statsRes.data);
      setTournaments(tournamentsRes.data.filter(t => t.status !== 'COMPLETED'));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao carregar dados do admin.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleCreateAnnouncement = async () => {
    if (!announcementMsg) return;
    try {
      await adminApi.createAnnouncement(announcementMsg);
      Alert.alert('Sucesso', 'Aviso publicado!');
      setAnnouncementMsg('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao publicar aviso.');
    }
  };

  const handleCreateTournament = async () => {
    if (!tName || !tFee) return Alert.alert('Erro', 'Nome e Taxa são obrigatórios.');
    try {
      const payload = {
        name: String(tName),
        description: 'Novo Torneio',
        entryFee: parseFloat(tFee),
        prizeType: String(tPrizeType),
        fixedPrizeValue: tPrizeType === 'FIXED' ? parseFloat(tPrizeValue) : null,
        maxParticipants: tLimit ? parseInt(tLimit) : null,
        startHour: parseInt(tStartHour),
        endHour: parseInt(tEndHour),
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };
      await adminApi.createTournament(payload);
      Alert.alert('Sucesso', 'Torneio criado!');
      setTName(''); setTFee(''); setTPrizeValue(''); setTLimit('');
      fetchData();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao criar torneio.');
    }
  };

  const handleFinalize = (id, name) => {
    Alert.alert(
      'Finalizar Torneio',
      `Deseja encerrar "${name}" e pagar os vencedores?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Finalizar e Pagar', onPress: async () => {
            try {
              await adminApi.finalizeTournament(id);
              Alert.alert('Sucesso', 'Torneio finalizado e prêmios pagos!');
              fetchData();
            } catch (error) {
              Alert.alert('Erro', error.response?.data?.error || 'Falha ao finalizar.');
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#00FF00" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          colors={['#00FF00']} 
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{"PAINEL ADM"}</Text>
        <Ionicons name="shield-checkmark" size={28} color="#00FF00" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{"ESTATÍSTICAS GERAIS"}</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{"USUÁRIOS"}</Text>
            <Text style={styles.statValue}>{String(stats.totalUsers || 0)}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{"PARTICIPANTES"}</Text>
            <Text style={styles.statValue}>{String(stats.totalParticipants || 0)}</Text>
          </View>
          <View style={[styles.statCard, { width: '100%', marginTop: 10 }]}>
            <Text style={styles.statLabel}>{"MEU LUCRO ACUMULADO"}</Text>
            <Text style={[styles.statValue, { color: '#00FF00', fontSize: 24 }]}>
              {"R$ " + Number(stats.adminProfit || 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{"LANÇAR NOVO AVISO"}</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Mensagem do aviso..." 
          placeholderTextColor="#666"
          value={announcementMsg}
          onChangeText={setAnnouncementMsg}
          multiline={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateAnnouncement}>
          <Text style={styles.buttonText}>{"PUBLICAR NA HOME"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{"CRIAR TORNEIO"}</Text>
        
        <Text style={styles.label}>{"Nome do Torneio"}</Text>
        <TextInput style={styles.input} value={tName} onChangeText={setTName} placeholder="Ex: Maratona de Maio" placeholderTextColor="#666" />
        
        <View style={styles.statsRow}>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>{"Taxa (R$)"}</Text>
            <TextInput style={styles.input} value={tFee} onChangeText={setTFee} keyboardType="decimal-pad" placeholder="10.00" placeholderTextColor="#666" />
          </View>
          <View style={{ width: '48%' }}>
            <Text style={styles.label}>{"Limite de Vagas"}</Text>
            <TextInput style={styles.input} value={tLimit} onChangeText={setTLimit} keyboardType="number-pad" placeholder="Sem limite" placeholderTextColor="#666" />
          </View>
        </View>

        <Text style={styles.label}>{"Tipo de Premiação"}</Text>
        <View style={styles.statsRow}>
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: tPrizeType === 'PERCENTAGE' ? '#00FF00' : '#262626' }]} 
            onPress={() => setTPrizeType('PERCENTAGE')}
          >
            <Text style={[styles.statLabel, { color: tPrizeType === 'PERCENTAGE' ? '#000' : '#999' }]}>{"70% POOL"}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.statCard, { backgroundColor: tPrizeType === 'FIXED' ? '#00FF00' : '#262626' }]} 
            onPress={() => setTPrizeType('FIXED')}
          >
            <Text style={[styles.statLabel, { color: tPrizeType === 'FIXED' ? '#000' : '#999' }]}>{"VALOR FIXO"}</Text>
          </TouchableOpacity>
        </View>

        {tPrizeType === 'FIXED' ? (
          <View>
            <Text style={styles.label}>{"Valor do Prêmio (R$)"}</Text>
            <TextInput style={styles.input} value={tPrizeValue} onChangeText={setTPrizeValue} keyboardType="decimal-pad" placeholder="100.00" placeholderTextColor="#666" />
          </View>
        ) : null}

        <Text style={styles.label}>{"Horário Permitido (0-23h)"}</Text>
        <View style={styles.statsRow}>
          <TextInput style={[styles.input, { width: '48%' }]} value={tStartHour} onChangeText={setTStartHour} keyboardType="number-pad" placeholder="Início" />
          <TextInput style={[styles.input, { width: '48%' }]} value={tEndHour} onChangeText={setTEndHour} keyboardType="number-pad" placeholder="Fim" />
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#FFF' }]} onPress={handleCreateTournament}>
          <Text style={styles.buttonText}>{"CRIAR TORNEIO"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{"ENCERRAR E PAGAR"}</Text>
        {tournaments.length === 0 ? (
          <Text style={{ color: '#666', textAlign: 'center' }}>{"Nenhum torneio ativo."}</Text>
        ) : (
          tournaments.map(t => (
            <View key={String(t.id)} style={styles.tournamentCard}>
              <View>
                <Text style={styles.tournamentName}>{String(t.name)}</Text>
                <Text style={{ color: '#666', fontSize: 12 }}>{String(t.participants?.length || 0) + " participantes"}</Text>
              </View>
              <TouchableOpacity style={styles.finalizeBtn} onPress={() => handleFinalize(t.id, t.name)}>
                <Text style={styles.finalizeBtnText}>{"PAGAR"}</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
      
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}
