import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importação das telas Principais
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TournamentsScreen from './src/screens/TournamentsScreen';
import ShopScreen from './src/screens/ShopScreen';
import SocialScreen from './src/screens/SocialScreen';
import AdminScreen from './src/screens/AdminScreen';

// Importação das telas de Autenticação
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Navegação das Abas (Main)
function MainTabs({ route }) {
  const { userRole } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'help-circle-outline';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Torneios') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Loja') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Social') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Carteira') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Admin') {
            iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00FF00',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#0F0F0F',
          borderTopWidth: 2, // Garantido como número
          borderTopColor: '#00FF00',
          paddingBottom: Platform.OS === 'ios' ? 20 : 10, // Garantido como número
          height: Platform.OS === 'ios' ? 90 : 70,       // Garantido como número
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Torneios" component={TournamentsScreen} />
      <Tab.Screen name="Loja" component={ShopScreen} />
      <Tab.Screen name="Social" component={SocialScreen} />
      <Tab.Screen name="Carteira" component={ProfileScreen} />
      
      {/* Renderização condicional limpa para evitar erros de render no Android */}
      {userRole === 'ADMIN' && (
        <Tab.Screen name="Admin" component={AdminScreen} />
      )}
    </Tab.Navigator>
  );
}

// Navegação Principal do App
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }} 
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}