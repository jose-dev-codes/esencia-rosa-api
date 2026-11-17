import { StyleSheet } from "react-native";

export const pestaniaFiltroStyles = StyleSheet.create({
  activa: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    backgroundColor: '#E42BB8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiva: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    backgroundColor: 'rgba(228, 43, 184, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(228, 43, 184, 0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoActivo: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  textoInactivo: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#9F167C',
    lineHeight: 18,
  },
});
