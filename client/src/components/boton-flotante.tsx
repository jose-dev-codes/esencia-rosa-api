import { TouchableOpacity, Text } from 'react-native';
import { botonFlotanteStyles } from '@/styles/boton-flotante-styles';
import { router } from 'expo-router';
import type { ComponentType } from 'react';

type BotonFlotanteProps = {
  texto: string,
  onPress: () => void,
  icono: ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number
  }>
  iconSize?: number,
  strokeWidth?: number,
  bottom?: number
};

const BotonFlotante = ({
  texto,
  onPress,
  icono: Icono,
  iconSize,
  strokeWidth,
  bottom
}: BotonFlotanteProps) => {
  return (
    <TouchableOpacity
      style={[
        botonFlotanteStyles.botonFlotante,
        { bottom }
      ]}
      onPress={onPress}
      onLayout={(e)=>console.log(`Ancho c: ${e.nativeEvent.layout.width}`)}
    >
      <Icono
        size={iconSize ?? 28}
        color='#FFFFFF'
        strokeWidth={strokeWidth ?? 2}
      />
      <Text style={botonFlotanteStyles.textoBotonFlotante}>{texto}</Text>
    </TouchableOpacity>
  );
};

export default BotonFlotante;
