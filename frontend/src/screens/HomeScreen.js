import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert, TouchableOpacity, StatusBar, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Polyline, PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { Pedometer } from 'expo-sensors';
import io from 'socket.io-client';
import { Ionicons } from '@expo/vector-icons';
import styles from './HomeScreen.styles';
import { announcementApi } from '../api/announcementService';

const SOCKET_URL = 'http://192.168.1.9:3000'; 
const socket = io(SOCKET_URL);

// Estilo "CYBER RADAR" - Fundo preto, ruas neon sutil, zero nomes
const mapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
  { "elementType": "labels", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#111111" }] },
  { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#1a1a1a" }] },
  { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#222222" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#00E676" }, { "weight": 0.5 }, { "opacity": 0.2 }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#001a1a" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#050505" }] }
];

export default function HomeScreen({ route, navigation }) {
  const params = route?.params || {};
  const tournamentId = params.tournamentId || null;

  const [location, setLocation] = useState(null);
  const [heading, setHeading] = useState(0);
  const mapRef = useRef(null);
  const [isTracking, setIsTracking] = useState(false);
  const [shouldFollow, setShouldFollow] = useState(true);
  const [recordedRoute, setRecordedRoute] = useState([]);
  const [distance, setDistance] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [stepCount, setStepCount] = useState(0);
  const [lastMovementTime, setLastMovementTime] = useState(Date.now());
  const [announcement, setAnnouncement] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    announcementApi.getActive()
      .then(res => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setAnnouncement(String(res.data[0]?.message || ''));
        }
      })
      .catch(err => console.log('Aviso API:', err.message));
  }, []);

  const recordMovement = () => setLastMovementTime(Date.now());

  useEffect(() => {
    let interval = null;
    if (isTracking) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTracking]);

  useEffect(() => {
    let locSubscription;
    (async () => {
      try {
        const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
        if (locStatus !== 'granted') return;

        locSubscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 1 },
          (newLocation) => {
            if (!newLocation?.coords) return;
            const { latitude, longitude, speed, heading: newHeading } = newLocation.coords;
            
            const currentPoint = { 
              latitude: Number(latitude) || 0, 
              longitude: Number(longitude) || 0 
            };

            setLocation(currentPoint);
            setHeading(Number(newHeading) || 0);

            if (isTracking) {
              const speedKmh = speed ? Number(speed) * 3.6 : 0;
              if (speedKmh > 35) {
                setIsTracking(false);
                Alert.alert('ALERTA', 'Velocidade anormal detectada.');
                return;
              }
              setRecordedRoute((prev) => [...(prev || []), currentPoint]);
              setDistance(prev => prev + 1); 
            }

            if (shouldFollow && mapRef.current) {
              mapRef.current.animateCamera({ 
                center: currentPoint, 
                pitch: 60, // Inclinação maior para efeito simulator
                heading: Number(newHeading) || 0,
                zoom: 19 
              }, { duration: 1000 });
            }
            
            socket.emit('updateLocation', { userId: 1, coords: currentPoint, anonymous: isAnonymous });
          }
        );
      } catch (e) {}
    })();
    return () => { if (locSubscription?.remove) locSubscription.remove(); };
  }, [isTracking, shouldFollow, isAnonymous]);

  const handleStartStop = () => {
    if (isTracking) {
      setIsTracking(false);
      setShouldFollow(false);
      Alert.alert('MISSÃO ENCERRADA', 'Sincronizando dados...');
    } else {
      setRecordedRoute([]);
      setDistance(0);
      setSeconds(0);
      setIsTracking(true);
      setShouldFollow(true);
    }
  };

  const formatTime = (s) => {
    const totalSeconds = Number(s) || 0;
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {location?.latitude && location?.longitude ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === 'android' ? null : PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          initialRegion={{
            ...location,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          rotateEnabled={true}
          pitchEnabled={true}
          showsUserLocation={false}
          onPanDrag={() => setShouldFollow(false)}
        >
          {recordedRoute.length > 1 && (
            <Polyline 
                coordinates={recordedRoute} 
                strokeColor="#00E676" 
                strokeWidth={5} 
                lineDashPattern={[1, 1]} // Linha pontilhada estilo radar
            />
          )}

          {/* Radar Pulse Effect */}
          <Circle 
            center={location}
            radius={30}
            strokeColor="rgba(0, 230, 118, 0.3)"
            fillColor="rgba(0, 230, 118, 0.05)"
          />

          <Marker coordinate={location} flat anchor={{ x: 0.5, y: 0.5 }}>
            <View style={[styles.playerMarker, { transform: [{ rotate: `${heading}deg` }] }]}>
              <View style={styles.markerArrow} />
              <View style={styles.markerGlow} />
            </View>
          </Marker>
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
           <Ionicons name="scan" size={40} color="#00E676" />
           <Text style={styles.loadingText}>ESCANEANDO ÁREA...</Text>
        </View>
      )}

      {/* HUD OVERLAYS */}
      <SafeAreaView style={styles.topOverlay} edges={['top']}>
        <View style={styles.hudBadge}>
            <View style={styles.hudDot} />
            <Text style={styles.hudText}>OPERACIONAL</Text>
        </View>
        {announcement && (
          <View style={styles.announcementContainer}>
            <Ionicons name="warning" size={16} color="#FFD600" />
            <Text style={styles.announcementText}>{announcement}</Text>
          </View>
        )}
      </SafeAreaView>

      {!shouldFollow && (
        <TouchableOpacity style={styles.recenterHUD} onPress={() => setShouldFollow(true)}>
          <Ionicons name="expand" size={24} color="#00E676" />
        </TouchableOpacity>
      )}

      <View style={styles.hudDashboard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.hudStatsRow}>
            <View style={styles.hudStatBox}>
              <Text style={styles.hudLabel}>VELOCIDADE</Text>
              <Text style={styles.hudValue}>0.0<Text style={styles.hudUnit}>KM/H</Text></Text>
            </View>
            <View style={[styles.hudStatBox, { borderLeftWidth: 1, borderColor: '#222' }]}>
              <Text style={styles.hudLabel}>DISTÂNCIA</Text>
              <Text style={styles.hudValue}>{(distance / 1000).toFixed(2)}<Text style={styles.hudUnit}>KM</Text></Text>
            </View>
          </View>

          <View style={styles.hudFooter}>
             <View style={styles.hudTimeBox}>
                <Text style={styles.hudLabel}>MISSION TIME</Text>
                <Text style={styles.hudTimeValue}>{formatTime(seconds)}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.8} style={[styles.hudActionButton, isTracking ? styles.hudStop : styles.hudStart]} onPress={handleStartStop}>
                <Text style={styles.hudBtnText}>{isTracking ? 'STOP' : 'ENGAGE'}</Text>
              </TouchableOpacity>
          </View>

          <View style={styles.hudDivider} />

          <Text style={styles.hudSectionTitle}>MÓDULOS DE MISSÃO</Text>
          <View style={styles.hudCardsRow}>
            <TouchableOpacity style={styles.hudCard} onPress={() => navigation?.navigate('Social')}>
              <Ionicons name="flash" size={20} color="#FF3D00" />
              <Text style={styles.hudCardTitle}>1V1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.hudCard} onPress={() => Alert.alert("SISTEMA", "Modo Ghost Ativo!")}>
              <Ionicons name="skull-outline" size={20} color="#00B0FF" />
              <Text style={styles.hudCardTitle}>GHOST</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
