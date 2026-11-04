import { StyleSheet } from 'react-native';

export const usuariosStyles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: '#FCE3EE',
  },
  encabezado: {
    marginTop: 5,
  },
  contenedor: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  tarjeta: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 15,
    borderColor: 'rgba(217, 34, 172, 0.25)',
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    gap: 7,
  },
  nombre: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    color: '#E42BB8',
  },
  separador: {
    height: 1,
    backgroundColor: 'rgba(217, 34, 172, 0.30)',
    marginVertical: 5,
  },
  dato: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#9F167C',
  },
  filaDatos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  listaVacia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  mensajeVacio: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#E42BB8',
    textAlign: 'center',
  },
  fondoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    width: '88%',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF'
  },
  tituloModal: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 24,
    textAlign: 'center',
    color: '#E42BB8',
    marginBottom: 12
  },
  mensajeModal: {
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 15
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  botonNo: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D922AC',
  },
  botonSi: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#E42BB8',
  },
  textoBotonNo: {
    color: '#D922AC',
    justifyContent: 'center',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    lineHeight: 20
  },
  textoBotonSi: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    lineHeight: 20
  }
});
