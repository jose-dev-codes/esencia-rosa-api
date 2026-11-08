import { StyleSheet } from 'react-native';

export const inicioStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FCE3EE'
  },
  contenido: {
    flex: 1,
    padding: 20
  },
  encabezado: {
    marginTop: 5
  },
  contenedorBienvenida: {
    flexDirection: 'row',
    gap: 5
  },
  tituloBienvenida: {
    fontSize: 20,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
    lineHeight: 25
  },
  contenedorTarjetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  tarjeta: {
    width: '48%',
    minHeight: 145.5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.04)',
  },
  tituloTarjeta: {
    color: '#E42BB8',
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    marginTop: 3,
    marginBottom: 5
  },
  datoTarjeta: {
    color: '#5F5359',
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18
  },
  tarjetaEspecialidades: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(228, 43, 184, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(228, 43, 184, 0.08)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginBottom: 20,
    boxShadow: '0px 1px 2px 1px rgba(0, 0, 0, 0.04)',
    gap: 10
  },
  textoEspecialidades: {
    paddingHorizontal: 18,
    borderLeftWidth: 1,
    justifyContent: 'center',
    borderLeftColor: 'rgba(228, 43, 184, 0.50)',
  },
  tituloEspecialidades: {
    color: '#E42BB8',
    fontSize: 15,
    lineHeight: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
  },
  tituloSeccion: {
    color: '#9F167C',
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 8
  },
  navegacion: {
    marginBottom: 5
  },
  tarjetaAgendar: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(217, 34, 172, 0.10)',
    padding: 3,
    marginBottom: 14,
    boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden'
  },
  degradadoAgendar: {
    flex: 1,
    borderRadius: 13,
    padding: 11
  }
});
