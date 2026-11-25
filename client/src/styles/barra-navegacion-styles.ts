import { StyleSheet } from 'react-native';

export const barraNavegacionStyles = StyleSheet.create({
  contenedor: {
    height: 56,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 50,
    gap: 2,
    boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.1)'
  },
  entrada: {
    flexGrow: 1,
    alignItems: 'center',
    gap: 2
  },
  texto: {
    fontSize: 13,
    lineHeight: 13,
    fontFamily: 'Poppins_500Medium'
  },
  entradaActiva: {
    backgroundColor: 'rgba(228, 43, 184, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(228, 43, 184, 0.05)',
    borderRadius: 50,
    paddingVertical: 2
  }
});
