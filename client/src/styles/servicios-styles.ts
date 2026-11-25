import { Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { StyleSheet } from 'react-native';

export const serviciosStyles = StyleSheet.create({
  contenedorServicio: {
    flexDirection: 'row',
    gap: 10
  },
  contenedorInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: 5
  },
  filaDatos: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5
  },
  etiquetaServicio: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 19,
    color: '#E42BB8'
  },
  contenedorDescripcionModal: {
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    width: '100%',
    backgroundColor: 'rgba(228, 43, 184, 0.10)',
    borderRadius: 8,
    padding: 10,
    gap: 2,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(228, 43, 184, 0.08)'
  },
  datoServicio: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#5F5359',
    lineHeight: 19
  },
  descripcionModal: {
    fontSize: 14,
    width: '100%',
    flexWrap: 'wrap',
    fontFamily: 'Poppins_400Regular',
    color: '#5F5359',
    lineHeight: 19
  },
  iconoServicio: {
    backgroundColor: 'rgba(228, 43, 184, 1)',
    borderRadius: 8,
    padding: 2
  },
  contenidoModal: {
    flexDirection: 'row',
    backgroundColor: 'rgba(228, 43, 184, 0.10)',
    padding: 10,
    borderRadius: 8,
    gap: 2,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(228, 43, 184, 0.08)'
  },
  subtituloModal: {
    flexWrap: 'wrap',
    width: '100%',
    color: '#8F1568',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    textAlignVertical: 'center',
    lineHeight: 23
  },
  seccionModal: {
    flex: 1,
    gap: 2
  },
  botonesModal: {
    gap: 10,
    marginBottom: 20
  },
  nombreConIcono: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 10,
    marginBottom: 15
  },
  textoAdministrar: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: '#8F1568',
    lineHeight: 15
  },
  servicioInactivo: {
    backgroundColor: '#EDEDED',
    borderWidth: 0.8,
    borderColor: '#A8A8A8'
  },
  textoInactivo: {
    color: '#A8A8A8'
  },
  etiquetaEstado: {
    backgroundColor: 'rgba(228, 43, 184, 0.15)',
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignSelf: 'baseline',
    borderRadius: 50
  },
  textoEstado: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#9F167C',
    lineHeight: 19
  },
  cajaDescripcion: {
    minHeight: 45,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D922AC',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  textoDescripcion: {
    paddingVertical: 7,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular'
  },
  contenedorTexto: {
    flex: 1,
    minWidth: 0,
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    paddingVertical: 5,
    paddingHorizontal : 5,
    justifyContent: 'center'
  }
});
