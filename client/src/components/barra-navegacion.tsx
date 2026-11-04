import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Href, router, usePathname } from 'expo-router';

import { barraNavegacionStyles } from '@/styles/barra-navegacion-styles';

const BarraNavegacion = () => {
  const rutaActual = usePathname();

  const navegar = (ruta: Href) => {
    if (rutaActual === ruta) return;

    router.navigate(ruta);
  };

  return (
    <View style={barraNavegacionStyles.contenedor}>
      <TouchableOpacity
        style={[
          barraNavegacionStyles.entrada,
          rutaActual === '/home' && barraNavegacionStyles.entradaActiva
        ]}
        onPress={() => navegar('/home')}
      >
        <MaterialCommunityIcons
          name='home'
          size={26}
          color={rutaActual === '/home' ? '#FFFFFF' : '#E42BB8'}
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            {
              color: rutaActual === '/home'
                ? '#FFFFFF'
                : '#E42BB8'
            }
          ]}>Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={barraNavegacionStyles.entrada}>
        <MaterialCommunityIcons
          name='creation'
          size={26}
          color='#E42BB8'
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            { color: '#E42BB8' }
          ]}>Servicios
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          barraNavegacionStyles.entrada,
          rutaActual === '/citas' && barraNavegacionStyles.entradaActiva
        ]}
        onPress={() => navegar('/citas')}
      >
        <MaterialCommunityIcons
          name='calendar-month'
          size={26}
          color={rutaActual === '/citas' ? '#FFFFFF' : '#E42BB8'}
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            {
              color: rutaActual === '/citas'
                ? '#FFFFFF'
                : '#E42BB8'
            }
          ]}>Citas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          barraNavegacionStyles.entrada,
          rutaActual === '/perfil' && barraNavegacionStyles.entradaActiva
        ]}
        onPress={() => navegar('/perfil')}
      >
        <MaterialCommunityIcons
          name='account'
          size={26}
          color={rutaActual === '/perfil' ? '#FFFFFF' : '#E42BB8'}
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            {
              color: rutaActual === '/perfil'
                ? '#FFFFFF'
                : '#E42BB8'
            }
          ]}>Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarraNavegacion;
