import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Boton from '@/components/boton';
import { entradaStyles } from '@/styles/entrada-styles';

const PantallaEntrada = () => {
  const [sesionActiva, setSesionActiva] = useState(false);
  const [verificandoSesion, setVerificandoSesion] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setSesionActiva(true);
        router.replace('/inicio');
      }

      setVerificandoSesion(false);
    };

    verificarSesion();
  }, []);

  return (
    <SafeAreaView style={entradaStyles.contenedor}>
      {!verificandoSesion && (
        <>
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

          {!sesionActiva && (
            <View style={entradaStyles.botones}>
              <Boton
                texto='Iniciar sesión'
                onPress={() => router.push('/iniciar-sesion')}
              />

              <Boton
                texto='Registrarse'
                onPress={() => router.push('/registro')}
                variante='secundario'
              />

              <Boton
                texto='Ver usuarios (prueba)'
                onPress={() => router.push('/usuarios')}
                variante="secundario"
              />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default PantallaEntrada;
