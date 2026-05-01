import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './LoginScreen.styles';
import { authApi } from '../api/authService';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) return Alert.alert('Erro', 'Por favor, informe seu e-mail e senha.');
    
    setLoading(true);
    try {
      const response = await authApi.login(identifier, password);
      
      if (response.data) {
        const role = String(response.data.user.role || 'USER');
        navigation.replace('MainTabs', { userRole: role });
      }
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || 'Não foi possível conectar. Verifique sua rede.';
      Alert.alert('Falha no Login', errorMsg);
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
        <View style={styles.brandContainer}>
          <Text style={styles.logoText}>
            <Text style={styles.logoGym}>GYM</Text>
            <Text style={styles.logoPro}>PRO</Text>
            <Text style={styles.logoSeparator}>-</Text>
            <Text style={styles.logoCorridas}>CORRIDAS</Text>
          </Text>
          <Text style={styles.tagline}>A VELOCIDADE ESTÁ NO SEU SANGUE</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-MAIL GMAIL</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#00FF00" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="seu.email@gmail.com" 
                placeholderTextColor="#444" 
                value={identifier} 
                onChangeText={setIdentifier} 
                keyboardType="email-address" 
                autoCapitalize="none" 
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>SENHA</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#00FF00" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="********" 
                placeholderTextColor="#444" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
              />
            </View>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.loginButtonText}>ACESSAR SISTEMA</Text>
                <Ionicons name="arrow-forward" size={20} color="#000" />
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerContainer}>
            <Text style={styles.registerLink}>Novo por aqui? <Text style={styles.registerLinkHighlight}>Crie sua conta</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
