import { Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { crearCitaStyles } from '@/styles/crear-cita-styles';
import { campoFormularioStyles } from '@/styles/campo-formulario-styles';

type SelectorDesplegableProps = {
  etiqueta: string;
  icono: React.ComponentProps<
    typeof MaterialCommunityIcons
  >['name'];
  valor: string;
  deshabilitado?: boolean;
  error?: string;
  alPresionar: () => void;
};

const SelectorDesplegable = ({
  etiqueta,
  icono,
  valor,
  deshabilitado = false,
  error,
  alPresionar
}: SelectorDesplegableProps) => {
  const tieneError = !!error;

  const colorIcono = tieneError
    ? '#D63031'
    : deshabilitado
      ? '#A8A8A8'
      : '#D922AC';

  return (
    <>
      <Text
        style={[
          campoFormularioStyles.etiqueta,
          deshabilitado ? { color: '#A8A8A8' } : null
        ]}
      >
        {etiqueta}
      </Text>

      <TouchableOpacity
        style={[
          crearCitaStyles.selectorServicio,
          deshabilitado ? campoFormularioStyles.contenedorInputDeshabilitado : null,
          tieneError ? crearCitaStyles.selectorServicioError : null
        ]}
        disabled={deshabilitado}
        onPress={alPresionar}
      >
        <MaterialCommunityIcons
          name={icono}
          size={24}
          color={colorIcono}
        />

        <Text
          style={[
            crearCitaStyles.textoSelector,
            deshabilitado ? crearCitaStyles.textoSelectorDeshabilitado : null
          ]}
        >
          {valor}
        </Text>

        <MaterialCommunityIcons
          name='chevron-down'
          size={24}
          color={colorIcono}
        />
      </TouchableOpacity>

      {tieneError
        ? <Text style={crearCitaStyles.mensajeError}>{error}</Text>
        : null
      }
    </>
  );
};

export default SelectorDesplegable;
