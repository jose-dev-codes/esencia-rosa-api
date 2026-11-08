import { BackHandler, View, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { obtenerPerfil } from '@/services/usuario-servicio';
import Encabezado from '@/components/encabezado';
import BarraNavegacion from '@/components/barra-navegacion';
import {
  IconCalendarTime,
  IconClock,
  IconMapPin,
  IconCalendarPlus
} from '@tabler/icons-react-native';
import { inicioStyles } from '@/styles/inicio-styles';

const PantallaInicio = () => {
  const [usuario, setUsuario] = useState<any>(null);

  // Solo provisional para presentación
  const proximaCita = {
    servicio: 'Diseño de cejas',
    fecha: '6 de mayo',
    hora: '10:30 a.m.'
  };

  useFocusEffect(
    useCallback(() => {
      const cargarPerfil = async () => {
        const resultado = await obtenerPerfil();
        if (resultado) setUsuario(resultado.datos);
      };
      cargarPerfil();

      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView style={inicioStyles.contenedor}>
      <View style={inicioStyles.encabezado}>
        <Encabezado titulo='Inicio' />
      </View>

      <View style={inicioStyles.contenido}>
        <View style={inicioStyles.contenedorBienvenida}>
          <Text style={[inicioStyles.tituloBienvenida, { color: '#9F167C' }]}>Hola</Text>
          <Text style={[inicioStyles.tituloBienvenida, { color: '#E42BB8' }]}>
            {usuario?.nombres ?? '...'}!
          </Text>
        </View>

        <View style={inicioStyles.tarjetaEspecialidades}>
          <MaterialCommunityIcons name='hand-heart' size={40} color='#E42BB8' />
          <View style={inicioStyles.textoEspecialidades}>
            <Text style={inicioStyles.tituloEspecialidades}>Especialidades</Text>
            <Text style={inicioStyles.datoTarjeta}>Cejas · Uñas · Cuidado facial</Text>
          </View>
        </View>

        <Text style={inicioStyles.tituloSeccion}>Lo que necesitas</Text>

        <View style={inicioStyles.contenedorTarjetas}>
          <View style={inicioStyles.tarjeta}>
            <IconCalendarTime size={30} color="#E42BB8" strokeWidth={1.8} />
            <Text style={inicioStyles.tituloTarjeta}>Próxima cita</Text>
            <Text style={inicioStyles.datoTarjeta}>• {proximaCita.servicio}</Text>
            <Text style={inicioStyles.datoTarjeta}>• {proximaCita.fecha}</Text>
            <Text style={inicioStyles.datoTarjeta}>• {proximaCita.hora}</Text>
          </View>

          <View style={inicioStyles.tarjetaAgendar}>
            <LinearGradient
              colors={['#FFFFFF', 'rgba(228, 43, 184, 0.20)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1.6 }}
              style={inicioStyles.degradadoAgendar}
            >
              <TouchableOpacity style={{ flex: 1 }} onPress={() => router.push('/crear-cita')}>
                <IconCalendarPlus size={30} color="#E42BB8" strokeWidth={1.8} />
                <Text style={inicioStyles.tituloTarjeta}>Agendar cita</Text>
                <Text style={inicioStyles.datoTarjeta}>Reserva tu próxima cita</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={inicioStyles.tarjeta}>
            <IconClock size={30} color="#E42BB8" strokeWidth={1.8} />
            <Text style={inicioStyles.tituloTarjeta}>Horario</Text>
            <Text style={inicioStyles.datoTarjeta}>Lunes a sábado</Text>
            <Text style={inicioStyles.datoTarjeta}>8:00 a.m. - 6:00 p.m.</Text>
          </View>

          <View style={inicioStyles.tarjeta}>
            <IconMapPin size={30} color="#E42BB8" strokeWidth={1.8} />
            <Text style={inicioStyles.tituloTarjeta}>Dirección</Text>
            <Text style={inicioStyles.datoTarjeta}>Carrera 14 # 10-25</Text>
            <Text style={inicioStyles.datoTarjeta}>Armenia, Quindío</Text>
          </View>
        </View>
      </View>

      <View style={inicioStyles.navegacion}>
        <BarraNavegacion />
      </View>
    </SafeAreaView>
  );
};

export default PantallaInicio;
