import { Text, TouchableOpacity } from 'react-native';
import { botonStyles } from '@/styles/boton-styles';

type BotonProps = {
  texto: string,
  onPress: () => void,
  flex?: number,
  borderRadius?: number,
  variante?: 'principal' | 'secundario'
};

// Componente reutilizable para mostrar botones de la aplicación.
const Boton = ({
  texto,
  onPress,
  flex,
  borderRadius = 18,
  variante = 'principal'
}: BotonProps) => {
  return (
    <TouchableOpacity
      style={[
        botonStyles.boton,
        {
          flex,
          borderRadius,
          backgroundColor:
            variante === 'principal' ? '#E42BB8' : 'transparent',
          borderWidth:
            variante === 'secundario' ? 1 : 0,
          borderColor:
            variante === 'secundario' ? '#E42BB8' : 'transparent',
          shadowOpacity: variante === 'principal' ? 0.2 : 0,
          elevation: variante === 'principal' ? 3 : 0
        }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          botonStyles.textoBoton,
          {
            color: variante === 'principal' ? '#FFFFFF' : '#E42BB8'
          }
        ]}
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
};

export default Boton;
