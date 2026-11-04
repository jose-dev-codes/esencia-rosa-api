import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TextInput, View } from 'react-native';

import { campoFormularioStyles } from '@/styles/campo-formulario-styles';

type CampoFormularioProps = {
  label: string,
  value: string,
  onChangeText: (texto: string) => void,
  placeholder?: string,
  secureTextEntry?: boolean,
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icono?: keyof typeof MaterialCommunityIcons.glyphMap;
  error?: string
};

const CampoFormulario = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icono,
  error
}: CampoFormularioProps) => {
  return (
    <>
      <Text style={campoFormularioStyles.etiqueta}>{label}</Text>

      <View style={[
        campoFormularioStyles.contenedorInput,
        error ? campoFormularioStyles.contenedorInputError : null
      ]}>
        {icono && (
          <MaterialCommunityIcons
            name={icono}
            size={24}
            color={error ? '#D63031' : '#D922AC'}
          />
        )}

        <TextInput
          style={campoFormularioStyles.campoTexto}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>

      {error ? (
        <Text style={campoFormularioStyles.mensajeError}>{error}</Text>
      ) : null}
    </>
  );
};

export default CampoFormulario;
