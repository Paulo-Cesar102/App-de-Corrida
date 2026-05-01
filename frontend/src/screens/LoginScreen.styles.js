import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' // Grafite profundo em vez de preto absoluto
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    paddingHorizontal: 30,
    paddingBottom: 40
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 80
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -1,
  },
  logoGym: {
    color: '#00E676', // Verde esmeralda vibrante mas suave
  },
  logoPro: {
    color: '#FFFFFF',
  },
  logoSeparator: {
    color: '#444',
  },
  logoCorridas: {
    color: '#00E676',
    fontSize: 36,
  },
  tagline: {
    color: '#888', // Cinza médio para subtítulo
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 8,
    opacity: 0.8
  },
  form: {
    width: '100%'
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: { 
    color: '#FFF', // Label em branco para maior clareza
    fontSize: 11, 
    fontWeight: '700', 
    marginBottom: 8, 
    marginLeft: 4,
    letterSpacing: 1
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Cinza um pouco mais claro que o fundo
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2C2C2C',
    paddingHorizontal: 15,
    height: 60,
  },
  inputIcon: {
    marginRight: 12,
    opacity: 0.9
  },
  input: { 
    flex: 1,
    color: '#FFF', 
    fontSize: 16,
    fontWeight: '400'
  },
  loginButton: { 
    backgroundColor: '#00E676', 
    height: 60,
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20,
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
    gap: 10
  },
  loginButtonText: { 
    color: '#000', 
    fontWeight: '800', 
    fontSize: 16,
    letterSpacing: 0.5
  },
  registerContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  registerLink: { 
    color: '#999', 
    fontSize: 13,
  },
  registerLinkHighlight: { 
    color: '#00E676', 
    fontWeight: 'bold' 
  }
});
