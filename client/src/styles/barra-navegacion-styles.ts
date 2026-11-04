import { StyleSheet } from 'react-native';

export const barraNavegacionStyles = StyleSheet.create({
  contenedor: {
    marginHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    gap: 12,
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.08)'
  },
  entrada: {
    flex: 1,
    alignItems: 'center',
    gap: 1
  },
  texto: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: 'Poppins_500Medium'
  },
  entradaActiva: {
    backgroundColor: '#E42BB8',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 2
  }
});
