import { Text, TouchableOpacity } from 'react-native';
import { botonStyles } from '@/styles/boton-styles';

type BotonProps = {
  texto: string,
  onPress: () => void,
  flex?: number,
  borderRadius?: number,
  variante?: 'principal' | 'secundario',
  sinSombra?: boolean,
  paddingHorizontal?: number
};

// Componente reutilizable para mostrar botones de la aplicación.
const Boton = ({
  texto,
  onPress,
  flex,
  borderRadius = 18,
  variante = 'principal',
  sinSombra = false,
  paddingHorizontal = 25
}: BotonProps) => {
  return (
    <TouchableOpacity
      style={[
        botonStyles.boton,
        {
          flex,
          borderRadius,
          paddingHorizontal,
          backgroundColor:
            variante === 'principal' ? '#E42BB8' : 'transparent',
          borderWidth:
            variante === 'secundario' ? 1 : 0,
          borderColor:
            variante === 'secundario' ? '#E42BB8' : 'transparent',
          shadowOpacity: variante === 'principal' && !sinSombra ? 0.2 : 0,
          elevation: variante === 'principal' && !sinSombra ? 3 : 0
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
