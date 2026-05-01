import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#00FF00',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#1A1A1A',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: {
    color: '#00FF00',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#262626',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#262626',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444',
  },
  button: {
    backgroundColor: '#00FF00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    color: '#BBB',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
  },
  tournamentCard: {
    backgroundColor: '#262626',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tournamentName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalizeBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  finalizeBtnText: {
    color: '#00FF00',
    fontSize: 12,
    fontWeight: 'bold',
  }
});
