import { StyleSheet } from 'react-native';

export const modalBaseStyles = StyleSheet.create({
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContenido: {
    width: '88%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0px 30px rgba(0, 0, 0, 0.30)'
  },
  tituloModal: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 25,
    textAlign: 'center',
    color: '#E42BB8',
    marginBottom: 20
  },
  listaOpciones: {
    maxHeight: 300,
  },
  opcion: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(228, 43, 184, 0.1)',
    borderColor: 'rgba(228, 43, 184, 0.10)',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 3
  },
  textoOpcion: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 22,
    color: '#D922AC',
  },
  botonCerrarModal: {
    marginTop: 20,
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: '#E42BB8',
  },
  textoBotonCerrar: {
    fontSize: 15,
    lineHeight: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  mensajeModal: {
    color: '#5F5359',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 15,
  },
  advertenciaModal: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 18,
    color: '#D63031',
    textAlign: 'center',
    marginBottom: 25,
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
