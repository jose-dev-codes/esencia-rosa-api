import { StyleSheet } from 'react-native';

export const perfilStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FCE3EE',
  },
  encabezado: {
    marginTop: 5,
  },
  contenido: {
    flex: 1,
    padding: 20,
    paddingTop: 20,
  },
  tarjetaPerfil: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: '#FFFFFF'
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: 'rgba(228, 43, 184, 0.12)',
    borderWidth: 1.5,
    borderColor: '#E42BB8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iniciales: {
    color: '#8F1568',
    fontSize: 25,
    fontFamily: 'Poppins_600SemiBold',
    letterSpacing: -1,
    lineHeight: 30
  },
  nombre: {
    color: '#8F1568',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 23,
    textAlign: 'center',
  },
  correo: {
    color: '#5F5359',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
    marginTop: 4,
  },
  tarjetaInformacion: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    gap: 15
  },
  tituloSeccion: {
    color: '#9F167C',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 21,
    marginBottom: 10,
  },
  filaInformacion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 1,
  },
  detalleInformacion: {
    flex: 1,
  },
  etiqueta: {
    color: '#8F1568',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18
  },
  dato: {
    color: '#5F5359',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 19,
    marginTop: 5,
  },
  opciones: {
    gap: 10,
    marginBottom: 40,
  },
  filaOpcion: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    padding: 15,
    gap: 12,
  },
  textoOpcion: {
    flex: 1,
    color: '#8F1568',
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 19
  },
  navegacion: {
    marginBottom: 5,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCE3EE'
  }
});
