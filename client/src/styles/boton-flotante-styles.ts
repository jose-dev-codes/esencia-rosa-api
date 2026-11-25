import { StyleSheet } from 'react-native';

export const botonFlotanteStyles = StyleSheet.create({
  botonFlotante: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 10,
    height: 56,
    width: 145.5,
    paddingLeft: 12,
    paddingRight: 14,
    borderRadius: 28,
    backgroundColor: '#E42BB8',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 3px 4px 0px rgba(0, 0, 0, 0.20),
    0px -0.6px 4px 0px rgba(0, 0, 0, 0.20)`
  },
  textoBotonFlotante: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    lineHeight: 20,
  }
});
