import { StyleSheet } from 'react-native';

export const iniciarSesionStyles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  contenedorBotones: {
    gap: 15,
    marginTop: 30
  },
  vistaTeclado: {
    flex: 1,
    backgroundColor: '#FCE3EE'
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
