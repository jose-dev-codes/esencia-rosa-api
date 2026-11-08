import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { pantallaCargaStyles } from '@/styles/pantalla-carga-styles';

const PantallaCarga = () => {
  return (
    <SafeAreaView style={pantallaCargaStyles.contenedor}>
      <ActivityIndicator
        size='large'
        color='#E42BB8'
        style={{ transform: [{ scale: 2 }] }}
      />
    </SafeAreaView>
  );
};

export default PantallaCarga;
