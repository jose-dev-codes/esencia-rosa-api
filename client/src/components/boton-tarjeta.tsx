import { Text, TouchableOpacity } from 'react-native';

import { botonTarjetaStyles } from '@/styles/boton-tarjeta-styles';

type BotonTarjetaProps = {
  texto: string,
  onPress: () => void,
  flex?: number,
  variante?: 'principal' | 'peligro'
};

// Botón plano, sin sombra, para usar dentro de las tarjetas de citas.
const BotonTarjeta = ({
  texto,
  onPress,
  flex,
  variante = 'principal'
}: BotonTarjetaProps) => {
  return (
    <TouchableOpacity
      style={[
        botonTarjetaStyles.boton,
        {
          flex,
          backgroundColor:
            variante === 'principal'
              ? 'rgba(255, 84, 212, 0.25)'
              : 'rgba(214, 48, 49, 0.25)',
          borderColor:
            variante === 'principal'
              ? 'rgba(228, 43, 184, 0.15)'
              : 'rgba(214, 48, 49, 0.15)'
        }
      ]}
      onPress={onPress}
    >
      <Text style={[
        botonTarjetaStyles.textoBoton,
        {
          color: variante === 'principal' ? '#E42BB8' : '#D63031'
        }
      ]}>{texto}</Text>
    </TouchableOpacity>
  );
};

export default BotonTarjeta;
