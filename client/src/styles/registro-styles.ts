import { StyleSheet } from 'react-native';

export const registroStyles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 120
  },
  vistaTeclado: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  contenedorBotones: {
    marginTop: 30
  },
  areaSegura: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  encabezado: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    zIndex: 1
  }
});
