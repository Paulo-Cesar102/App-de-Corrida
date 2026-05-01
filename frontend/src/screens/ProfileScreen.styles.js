import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  headerTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  
  balanceCard: { 
    backgroundColor: '#1E1E1E', 
    padding: 25, 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: '#2C2C2C', 
    marginBottom: 25,
    shadowColor: '#00E676',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5
  },
  balanceLabel: { color: '#888', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 8 },
  balanceValue: { color: '#FFF', fontSize: 42, fontWeight: '900' },
  actionRow: { flexDirection: 'row', marginTop: 20, gap: 12 },
  btnAction: { 
    flex: 1, 
    backgroundColor: '#00E676', 
    flexDirection: 'row', 
    padding: 14, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 8 
  },
  btnActionText: { color: '#000', fontWeight: '800', fontSize: 13 },
  btnActionSecondary: {
    backgroundColor: '#1A1A1A',
    borderColor: '#00E676',
    borderWidth: 1
  },

  sectionTitle: { color: '#555', fontSize: 12, fontWeight: '900', marginBottom: 15, letterSpacing: 2, marginTop: 10 },
  
  // Estilos para as Configurações
  settingsCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    padding: 5,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#2C2C2C'
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 15
  },
  settingIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingTextContent: { flex: 1 },
  settingTitle: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  settingDesc: { color: '#666', fontSize: 10, marginTop: 2 },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toggleActive: { borderColor: '#00E676', backgroundColor: 'rgba(0, 230, 118, 0.1)' },

  historyList: { flex: 1 },
  transCard: { 
    flexDirection: 'row', 
    backgroundColor: '#1A1A1A', 
    padding: 15, 
    borderRadius: 18, 
    marginBottom: 10, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626'
  },
  transIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  transInfo: { flex: 1, marginLeft: 15 },
  transType: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  transDate: { color: '#555', fontSize: 11, marginTop: 2 },
  transAmountContainer: { alignItems: 'flex-end' },
  transAmount: { fontSize: 15, fontWeight: '800' },
  transStatus: { fontSize: 9, fontWeight: '900', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  
  loadingContainer: { marginTop: 40, alignItems: 'center' },
  emptyText: { color: '#444', textAlign: 'center', marginTop: 40, fontSize: 12, fontWeight: '500' }
});
