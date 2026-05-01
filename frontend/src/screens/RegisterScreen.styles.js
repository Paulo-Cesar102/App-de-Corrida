import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  scrollContainer: { 
    flexGrow: 1, 
    paddingHorizontal: 30, 
    paddingBottom: 40,
    justifyContent: 'center' 
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 10
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoGym: {
    color: '#00E676',
  },
  logoPro: {
    color: '#FFF',
  },
  logoSeparator: {
    color: '#444',
  },
  logoCorridas: {
    color: '#00E676',
    fontSize: 32,
  },
  subtitle: {
    color: '#888',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 35,
    fontWeight: '600'
  },
  form: {
    width: '100%'
  },
  inputGroup: { 
    marginBottom: 18 
  },
  label: { 
    color: '#FFF', 
    fontSize: 11, 
    fontWeight: '700', 
    marginBottom: 8, 
    marginLeft: 4
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.8
  },
  input: { 
    flex: 1,
    color: '#FFF', 
    fontSize: 15
  },
  pixTypeContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8
  },
  pixTypeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    alignItems: 'center',
    backgroundColor: '#1A1A1A'
  },
  pixTypeButtonActive: {
    borderColor: '#00E676',
    backgroundColor: 'rgba(0, 230, 118, 0.05)'
  },
  pixTypeText: {
    color: '#666',
    fontSize: 10,
    fontWeight: 'bold'
  },
  pixTypeTextActive: {
    color: '#00E676'
  },
  registerButton: { 
    backgroundColor: '#00E676', 
    height: 60,
    borderRadius: 18, 
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 15,
    shadowColor: '#00E676',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  registerButtonText: { 
    color: '#000', 
    fontWeight: '800', 
    fontSize: 15
  },
  loginContainer: {
    marginTop: 25,
    alignItems: 'center'
  },
  loginLink: { 
    color: '#999', 
    fontSize: 13
  },
  loginLinkHighlight: { 
    color: '#00E676', 
    fontWeight: 'bold' 
  }
});
