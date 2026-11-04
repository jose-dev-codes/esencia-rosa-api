import { Text, View } from 'react-native';
import { encabezadoStyles } from '@/styles/encabezado-styles';

const Encabezado = ({ titulo }: { titulo: string }) => {
  return (
    <View style={encabezadoStyles.encabezado}>
      <Text style={encabezadoStyles.tituloEncabezado}>
        {titulo}
      </Text>
    </View>
  );
};

export default Encabezado;
