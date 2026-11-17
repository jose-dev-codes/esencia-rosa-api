import { StyleSheet } from 'react-native';

export const crearCitaStyles = StyleSheet.create({
  selectorServicio: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#D922AC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    gap: 8,
    alignItems: 'center'
  },
  selectorServicioError: {
    borderColor: '#D63031',
    marginBottom: 4
  },
  textoSelector: {
    flex: 1,
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 21
  },
  textoSelectorDeshabilitado: {
    color: '#898989',
  },
  flechaSelector: {
    color: '#D922AC',
    fontSize: 16,
    fontWeight: 'bold'
  },
  mensajeError: {
    alignSelf: 'flex-start',
    marginBottom: 11,
    fontSize: 14,
    lineHeight: 18,
    color: '#D63031',
    fontFamily: 'Poppins_500Medium'
  }
});
