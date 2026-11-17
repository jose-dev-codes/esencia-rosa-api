import { Text, TouchableOpacity } from 'react-native';
import { pestaniaFiltroStyles } from '@/styles/pestania-filtro-styles';

type Propiedades = {
  texto: string,
  activo: boolean,
  onPress: () => void
};

const PestaniaFiltro = ({ texto, activo, onPress }: Propiedades) => {
  return (
    <TouchableOpacity
      style={activo
        ? pestaniaFiltroStyles.activa
        : pestaniaFiltroStyles.inactiva
      }
      onPress={onPress}
    >
      <Text
        style={activo
          ? pestaniaFiltroStyles.textoActivo
          : pestaniaFiltroStyles.textoInactivo
        }
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
};

export default PestaniaFiltro;
