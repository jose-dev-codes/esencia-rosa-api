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
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: '#E42BB8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iniciales: {
    color: '#FFFFFF',
    fontSize: 25,
    fontFamily: 'Poppins_600SemiBold',
  },
  nombre: {
    color: '#8F1568',
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },
  correo: {
    color: '#5F5359',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },
  tarjetaInformacion: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tituloSeccion: {
    color: '#9F167C',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 14,
  },
  filaInformacion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  detalleInformacion: {
    flex: 1,
  },
  etiqueta: {
    color: '#8F1568',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
  },
  dato: {
    color: '#5F5359',
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    marginTop: 2,
  },
  opciones: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 18,
  },
  filaOpcion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  textoOpcion: {
    flex: 1,
    color: '#8F1568',
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
  },
  navegacion: {
    marginBottom: 5,
  }
});
