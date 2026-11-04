import { StyleSheet } from 'react-native';

export const mensajeErrorStyles = StyleSheet.create({
  error: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D63031',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(214, 48, 49, 0.12)',
    gap: 8
  },
  mensaje: {
    flexShrink: 1,
    fontSize: 14.5,
    color: '#D63031',
    fontFamily: 'Poppins_500Medium',
    lineHeight: 19
  }
});
