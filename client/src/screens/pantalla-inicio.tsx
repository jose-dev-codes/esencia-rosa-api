import { BackHandler, View, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { obtenerPerfil } from '@/services/usuario-servicio';
import { obtenerProximaCita } from '@/services/cita-servicio';
import { formatearFechaLarga, formatearHora12 } from '@/utils/formulario-utilidades';
import Encabezado from '@/components/encabezado';
import BarraNavegacion from '@/components/barra-navegacion';
import PantallaCarga from '@/components/pantalla-carga';

import {
  IconCalendarTime,
  IconClock,
  IconMapPin,
  IconCalendarPlus
} from '@tabler/icons-react-native';

import { inicioStyles } from '@/styles/inicio-styles';

const PantallaInicio = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [proximaCita, setProximaCita] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const cargarTodo = async () => {
        setCargando(true);

        const resultadoCita = await obtenerProximaCita();
        if (resultadoCita) setProximaCita(resultadoCita.datos);

        const resultadoPerfil = await obtenerPerfil();
        if (resultadoPerfil) setUsuario(resultadoPerfil.datos);

        setCargando(false);
      };

      cargarTodo();

      const onBackPress = () => true;
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );
      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView style={inicioStyles.areaSegura}>
      {cargando ? (
        <PantallaCarga />
      ) : (
        <>
          <View style={inicioStyles.encabezado}>
            <Encabezado titulo='Inicio' />
          </View>

          <View style={inicioStyles.contenido}>
            <View style={inicioStyles.contenedorBienvenida}>
              <Text style={[inicioStyles.tituloBienvenida, { color: '#9F167C' }]}>
                Hola
              </Text>
              <Text style={[inicioStyles.tituloBienvenida, { color: '#E42BB8' }]}>
                {usuario?.nombres ?? '...'}!
              </Text>
            </View>

            <View style={inicioStyles.tarjetaEspecialidades}>
              <MaterialCommunityIcons
                name='hand-heart'
                size={40}
                color='#E42BB8'
              />
              <View style={inicioStyles.textoEspecialidades}>
                <Text style={inicioStyles.tituloEspecialidades}>
                  Especialidades
                </Text>
                <Text style={inicioStyles.datoTarjeta}>
                  Cejas · Uñas · Cuidado facial
                </Text>
              </View>
            </View>

            <Text style={inicioStyles.tituloSeccion}>Lo que necesitas</Text>

            <View style={inicioStyles.contenedorTarjetas}>
              <View style={inicioStyles.tarjeta}>
                <IconCalendarTime
                  size={30}
                  color="#E42BB8"
                  strokeWidth={1.8}
                />

                <Text style={inicioStyles.tituloTarjeta}>Próxima cita</Text>

                {proximaCita ? (
                  <>
                    <Text style={inicioStyles.datoTarjeta}>
                      • {proximaCita.servicio}
                    </Text>
                    <Text style={inicioStyles.datoTarjeta}>
                      • {formatearFechaLarga(proximaCita.fecha)}
                    </Text>
                    <Text style={inicioStyles.datoTarjeta}>
                      • {formatearHora12(proximaCita.hora)}
                    </Text>
                  </>
                ) : (
                    <Text style={inicioStyles.datoTarjeta}>
                      No tienes citas próximas
                    </Text>
                )}
              </View>

              <View style={inicioStyles.tarjetaAgendar}>
                <LinearGradient
                  colors={['#FFFFFF', 'rgba(228, 43, 184, 0.20)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1.6 }}
                  style={inicioStyles.degradadoAgendar}
                >
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => router.push('/crear-cita')}
                  >
                    <IconCalendarPlus
                      size={30}
                      color="#E42BB8"
                      strokeWidth={1.8}
                    />
                    <Text style={inicioStyles.tituloTarjeta}>
                      Agendar cita
                    </Text>
                    <Text style={inicioStyles.datoTarjeta}>
                      Reserva tu próxima cita
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              <View style={inicioStyles.tarjeta}>
                <IconClock
                  size={30}
                  color="#E42BB8"
                  strokeWidth={1.8}
                />
                <Text style={inicioStyles.tituloTarjeta}>Horario</Text>
                <Text style={inicioStyles.datoTarjeta}>Lunes a sábado</Text>
                <Text style={inicioStyles.datoTarjeta}>8:00 a.m. - 6:00 p.m.</Text>
              </View>

              <View style={inicioStyles.tarjeta}>
                <IconMapPin
                  size={30}
                  color="#E42BB8"
                  strokeWidth={1.8}
                />
                <Text style={inicioStyles.tituloTarjeta}>Dirección</Text>
                <Text style={inicioStyles.datoTarjeta}>Carrera 14 # 10-25</Text>
                <Text style={inicioStyles.datoTarjeta}>Armenia, Quindío</Text>
              </View>
            </View>
          </View>

          <View style={inicioStyles.navegacion}>
            <BarraNavegacion />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default PantallaInicio;
