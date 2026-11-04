import { StyleSheet } from 'react-native';

export const modalExitoStyles = StyleSheet.create({
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modal: {
    width: '88%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  mensajeModal: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 20,
    textAlign: 'center',
    color: '#E42BB8'
  }
});
