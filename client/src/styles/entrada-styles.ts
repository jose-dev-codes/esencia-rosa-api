import { StyleSheet } from 'react-native';

export const entradaStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FCE3EE'
  },
  titulo: {
    fontSize: 25,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 35,
    textAlign: 'center',
    color: '#E42BB8'
  },
  subtitulo: {
    marginTop: 5,
    marginBottom: 30,
    fontSize: 15,
    lineHeight: 20,
    color: '#8F1568',
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium'
  },
  botones: {
    gap: 15
  },
  circuloIcono: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E42BB8',
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10
  }
});
