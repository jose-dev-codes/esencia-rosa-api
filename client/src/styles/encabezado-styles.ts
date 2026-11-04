import { StyleSheet } from 'react-native';

export const encabezadoStyles = StyleSheet.create({
  encabezado: {
    height: 48,
    marginHorizontal: 20,
    alignSelf: 'stretch',
    backgroundColor: '#E42BB8',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  tituloEncabezado: {
    color: '#FFFFFF',
    fontSize: 21,
    fontFamily: 'Poppins_500Medium',
    lineHeight: 30
  }
});
