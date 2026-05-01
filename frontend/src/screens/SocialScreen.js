import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './SocialScreen.styles';

export default function SocialScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="people" size={80} color="#00FF00" />
      <Text style={styles.title}>EM BREVE: SOCIAL</Text>
      <Text style={styles.subtitle}>Conecte-se com outros corredores.</Text>
    </View>
  );
}
