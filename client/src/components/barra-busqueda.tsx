import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

import { campoFormularioStyles } from '@/styles/campo-formulario-styles';

type BarraBusquedaProps = {
  value: string,
  onChangeText: (texto: string) => void,
  placeholder?: string,
  keyboardType?: 'default';
  autoCapitalize?: 'none';
  icono?: keyof typeof MaterialCommunityIcons.glyphMap;
  colorIcono?: string
  deshabilitado?: boolean
};

const BarraBusqueda = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  icono,
  colorIcono = '#D922AC',
  deshabilitado = false
}: BarraBusquedaProps) => {
  return (
    <>
      <View style={[
        campoFormularioStyles.contenedorInput,
        deshabilitado ? campoFormularioStyles.contenedorInputDeshabilitado : null,
        { borderRadius: 50 , marginBottom: 8}
      ]}>
        {icono && (
          <MaterialCommunityIcons
            name={icono}
            size={24}
            color={colorIcono}
          />
        )}

        <TextInput
          style={campoFormularioStyles.campoTexto}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          editable={!deshabilitado}
        />
      </View>
    </>
  );
};

export default BarraBusqueda;
