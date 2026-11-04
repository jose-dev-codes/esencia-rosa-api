import { StyleSheet } from 'react-native';

export const campoFormularioStyles = StyleSheet.create({
  etiqueta: {
    alignSelf: 'flex-start',
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 18,
    color: '#D922AC'
  },
  contenedorInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#D922AC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  contenedorInputError: {
    borderColor: '#D63031',
    marginBottom: 4
  },
  campoTexto: {
    flex: 1,
    paddingVertical: 7,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
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
