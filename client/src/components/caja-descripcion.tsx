import { Text, View, TextInput } from 'react-native';

import { campoFormularioStyles } from '@/styles/campo-formulario-styles';
import { serviciosStyles } from '@/styles/servicios-styles';

type CajaDescripcionProps = {
  texto: string;
  valor: string;
  errores?: string;
  alCambiartexto: (texto: string) => void;
};
const CajaDescripicion = ({
  texto,
  valor,
  errores,
  alCambiartexto
}: CajaDescripcionProps) => {
  return (
    <>
      <Text style={campoFormularioStyles.etiqueta}>
        {texto}
      </Text>

      <View
        style={[
        serviciosStyles.cajaDescripcion,
        errores
          ? campoFormularioStyles.contenedorInputError
          : null
        ]}
      >
        <TextInput
          multiline
          value={valor}
          style={serviciosStyles.textoDescripcion}
          placeholder='Describe aquí tu servicio...'
          onChangeText={alCambiartexto}
        />
      </View>

      {errores &&
        <Text style={campoFormularioStyles.mensajeError}>
          {errores}
        </Text>
      }
    </>
  );
};

export default CajaDescripicion;
