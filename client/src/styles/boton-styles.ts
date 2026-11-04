import { StyleSheet } from 'react-native';

export const botonStyles = StyleSheet.create({
  boton: {
    backgroundColor: '#E42BB8',
    paddingVertical: 14,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
    lineHeight: 19.5
  }
});
