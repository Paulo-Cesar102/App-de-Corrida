import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  map: { ...StyleSheet.absoluteFillObject },
  loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', gap: 20 },
  loadingText: { color: '#00E676', fontWeight: '900', fontSize: 12, letterSpacing: 3 },
  
  // HUD Overlays
  topOverlay: { position: 'absolute', top: 50, left: 0, right: 0, alignItems: 'center', zIndex: 10 },
  hudBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#222',
    gap: 10
  },
  hudDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00E676' },
  hudText: { color: '#FFF', fontWeight: 'bold', fontSize: 10, letterSpacing: 2 },
  
  announcementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 214, 0, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFD600',
    marginTop: 10,
    gap: 8,
  },
  announcementText: {
    color: '#FFD600',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  recenterHUD: { 
    position: 'absolute', 
    top: 110, 
    right: 20, 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    padding: 12, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#333' 
  },
  
  // Player Marker
  playerMarker: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
  markerArrow: { 
    width: 0, 
    height: 0, 
    backgroundColor: 'transparent', 
    borderStyle: 'solid', 
    borderLeftWidth: 12, 
    borderRightWidth: 12, 
    borderBottomWidth: 30, 
    borderLeftColor: 'transparent', 
    borderRightColor: 'transparent', 
    borderBottomColor: '#00E676', 
    zIndex: 2 
  },
  markerGlow: { 
    position: 'absolute', 
    width: 20, 
    height: 20, 
    borderRadius: 10, 
    backgroundColor: '#00E676', 
    opacity: 0.4,
    shadowColor: '#00E676',
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15
  },

  // HUD Dashboard
  hudDashboard: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    height: '55%',
    backgroundColor: 'rgba(5, 5, 5, 0.95)', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 25, 
    borderTopWidth: 1, 
    borderTopColor: '#222' 
  },
  hudStatsRow: { flexDirection: 'row', marginBottom: 25 },
  hudStatBox: { flex: 1, paddingHorizontal: 15 },
  hudLabel: { color: '#444', fontSize: 9, fontWeight: '900', letterSpacing: 1.5, marginBottom: 5 },
  hudValue: { color: '#FFF', fontSize: 36, fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Courier-Bold' : 'monospace' },
  hudUnit: { fontSize: 12, color: '#00E676', marginLeft: 5 },
  
  hudFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  hudTimeBox: { flex: 1 },
  hudTimeValue: { color: '#00E676', fontSize: 28, fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Courier-Bold' : 'monospace' },
  
  hudActionButton: { 
    width: 140, 
    height: 55, 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#00E676',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  hudStart: { backgroundColor: 'rgba(0, 230, 118, 0.1)', borderColor: '#00E676' },
  hudStop: { backgroundColor: 'rgba(255, 61, 0, 0.1)', borderColor: '#FF3D00' },
  hudBtnText: { color: '#FFF', fontWeight: '900', fontSize: 14, letterSpacing: 2 },
  
  hudDivider: { height: 1, backgroundColor: '#111', marginBottom: 25 },
  hudSectionTitle: { color: '#333', fontSize: 10, fontWeight: '900', marginBottom: 15, letterSpacing: 2 },
  
  hudCardsRow: { flexDirection: 'row', gap: 15 },
  hudCard: { 
    flex: 1, 
    backgroundColor: '#0A0A0A', 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  hudCardTitle: { color: '#FFF', fontSize: 11, fontWeight: '900', letterSpacing: 1 }
});
