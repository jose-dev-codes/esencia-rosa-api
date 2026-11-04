import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Boton from '@/components/boton';
import { entradaStyles } from '@/styles/entrada-styles';

const PantallaEntrada = () => {
  return (
    <SafeAreaView style={entradaStyles.contenedor}>
      <View style={entradaStyles.circuloIcono}>
        <MaterialCommunityIcons
          name='content-cut'
          size={50}
          color='#FFFFFF'
        />
      </View>

      <Text style={entradaStyles.titulo}>Esencia Rosa</Text>

      <Text style={entradaStyles.subtitulo}>
        Tu belleza, nuestra pasión
      </Text>

      <View style={entradaStyles.botones}>
        <Boton
          texto='Iniciar sesión'
          onPress={() => router.push('/login')}
        />

        <Boton
          texto='Registrarse'
          onPress={() => router.push('/registro')}
          variante='secundario'
        />

        <Boton
          texto="Ver usuarios (prueba)"
          onPress={() => router.push('/usuarios')}
          variante="secundario"
        />
      </View>
    </SafeAreaView>
  );
};

export default PantallaEntrada;
