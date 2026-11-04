import { Text, View } from 'react-native';
import { mensajeErrorStyles } from '@/styles/mensaje-error-styles';

import { MaterialCommunityIcons } from '@expo/vector-icons';

type MensajeErrorProps = {
  mensaje: string
};

const MensajeError = ({ mensaje }: MensajeErrorProps) => {
  return (
    <View style={mensajeErrorStyles.error}>
      <MaterialCommunityIcons
        name='alert-outline'
        size={26}
        color='#D63031'
      />

      <Text style={mensajeErrorStyles.mensaje}>
        {mensaje}
      </Text>
    </View>
  );
};

export default MensajeError;
