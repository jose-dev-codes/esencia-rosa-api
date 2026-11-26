import { StyleSheet } from 'react-native';

export const citasStyles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 5
  },
  encabezado: {
    marginTop: 5
  },
  acciones: {
    marginHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    marginBottom: 8
  },
  contenedorCita: {
    gap: 5,
    flex: 1,
    minWidth: 0
  },
  cita: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: 'rgba(217, 34, 172, 0.25)',
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    gap: 5,
    boxShadow: '0px 0px 4px 1px rgba(0, 0, 0, 0.04)',
  },
  encabezadoCita: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0
  },
  perfilCita: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: 'rgba(228, 43, 184, 0.20)',
    borderColor: 'rgba(228, 43, 184, 0.40)',
    borderWidth: 1,
    borderRadius: 100
  },
  nombreServicio: {
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold',
    color: '#E42BB8',
    lineHeight: 21,
    flexWrap: 'wrap',
    marginBottom: 4
  },
  especialistaCita: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    flexWrap: 'wrap',
    lineHeight: 16,
    color: '#9F167C'
  },
  separador: {
    height: 1,
    backgroundColor: 'rgba(217, 34, 172, 0.30)',
    marginTop: 5,
    marginBottom: 6
  },
  filaDatos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20
  },
  filaConIcono: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  valorConIcono: {
    fontSize: 14,
    color: '#9F167C',
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12
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
    backgroundColor: '#FFFFFF',
  },
  tituloModal: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    lineHeight: 24,
    textAlign: 'center',
    color: '#E42BB8',
    marginBottom: 12,
  },
  mensajeModal: {
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
    marginBottom: 25
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
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
  },
  citasVacia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15
  },
  imagenVacia: {
    width: 130,
    height: 135,
    marginBottom: 15
  },
  mensajeVacio: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 21,
    textAlign: 'center',
    color: '#E42BB8'
  },
  areaSegura: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  botonFlotante: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    gap: 10,
    height: 56,
    paddingHorizontal: 13,
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
  },
  cajaAdaptable: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0
  },
  navegacion: {
    marginVertical: 5
  }
});
