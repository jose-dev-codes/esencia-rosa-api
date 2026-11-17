import { StyleSheet } from 'react-native';

export const modalFechaStyles = StyleSheet.create({
  encabezadoMes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textoMes: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#333333',
    textAlign: 'center',
  },
  flechaMes: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#E42BB8',
    paddingHorizontal: 10,
  },
  filaDiasSemana: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  celdaDiaSemana: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoDiaSemana: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Poppins_500Medium',
    color: '#898989'
  },
  cuadriculaDias: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8
  },
  diaCalendario: {
    width: '14.28%',
    height: 40,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  diaInterior: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  textoDia: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Poppins_400Regular',
    color: '#333333',
  },
  diaDisponible: {
    backgroundColor: 'rgba(228, 43, 184, 0.10)',
  },
  textoDiaDisponible: {
    color: '#D922AC',
    fontFamily: 'Poppins_500Medium',
  },
  diaNoDisponible: {
    backgroundColor: 'transparent',
  },
  textoDiaNoDisponible: {
    color: '#C9C9C9',
  },
  diaSeleccionado: {
    backgroundColor: '#E42BB8',
  },
  textoDiaSeleccionado: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
  }
});
