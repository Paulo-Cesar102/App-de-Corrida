import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ShopScreen.styles';

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="cart" size={80} color="#00FF00" />
      <Text style={styles.title}>LOJA: EM BREVE</Text>
      <Text style={styles.subtitle}>Skins exclusivas e itens para seu avatar.</Text>
    </View>
  );
}
