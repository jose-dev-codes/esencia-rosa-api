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
          rutaActual === '/inicio' && barraNavegacionStyles.entradaActiva
        ]}
        onPress={() => navegar('/inicio')}
      >
        <MaterialCommunityIcons
          name={rutaActual === '/inicio' ? 'home' : 'home-outline'}
          size={26}
          color={rutaActual === '/inicio' ? '#C81FA3' : '#E42BB8'}
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            {
              color: rutaActual === '/inicio' ? '#C81FA3' : '#E42BB8'
            }
          ]}>Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          barraNavegacionStyles.entrada,
          rutaActual === '/servicios' && barraNavegacionStyles.entradaActiva
        ]}
        onPress={() => navegar('/servicios')}
      >
        <MaterialCommunityIcons
          name={rutaActual === '/servicios' ? 'creation' : 'creation-outline'}
          size={26}
          color={rutaActual === '/servicios' ? '#C81FA3' : '#E42BB8'}
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            {
              color: rutaActual === '/servicios' ? '#C81FA3' : '#E42BB8'
            }
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
          name={rutaActual === '/citas' ? 'calendar-month' : 'calendar-month-outline'}
          size={26}
          color={rutaActual === '/citas' ? '#C81FA3' : '#E42BB8'}
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            {
              color: rutaActual === '/citas' ? '#C81FA3' : '#E42BB8'
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
          name={rutaActual === '/perfil' ? 'account' : 'account-outline'}
          size={26}
          color={rutaActual === '/perfil' ? '#C81FA3' : '#E42BB8'}
        />

        <Text
          style={[
            barraNavegacionStyles.texto,
            {
              color: rutaActual === '/perfil' ? '#C81FA3' : '#E42BB8'
            }
          ]}>Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BarraNavegacion;
