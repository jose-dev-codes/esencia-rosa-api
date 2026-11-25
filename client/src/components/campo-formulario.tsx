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
  error?: string;
  sufijo?: string
  deshabilitado?: boolean
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
  error,
  sufijo,
  deshabilitado = false
}: CampoFormularioProps) => {
  return (
    <>
      <Text
        style={[
          campoFormularioStyles.etiqueta,
          deshabilitado ? {color: '#A8A8A8'} : null
        ]}
      >
        {label}
      </Text>

      <View style={[
        campoFormularioStyles.contenedorInput,
        deshabilitado ? campoFormularioStyles.contenedorInputDeshabilitado : null,
        error ? campoFormularioStyles.contenedorInputError : null
      ]}>
        {icono && (
          <MaterialCommunityIcons
            name={icono}
            size={24}
            color={error
              ? '#D63031'
              : deshabilitado
                ? '#A8A8A8'
                : '#D922AC'
            }
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
          editable={!deshabilitado}
        />

        {sufijo && (
          <View style={campoFormularioStyles.contenedorSufijo}>
          <Text style={campoFormularioStyles.textoSufijo}>{sufijo}</Text>
        </View>
        )}
      </View>

      {error ? (
        <Text style={campoFormularioStyles.mensajeError}>{error}</Text>
      ) : null}
    </>
  );
};

export default CampoFormulario;
