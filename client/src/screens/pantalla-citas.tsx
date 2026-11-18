import {
  Alert,
  Animated,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import {
  formatearFechaLarga,
  formatearPrecio,
  formatearHora12
} from '@/utils/formulario-utilidades';

import { cancelarCita, obtenerMisCitas } from '@/services/cita-servicio';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, router, Color } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  IconCalendarPlus,
  IconCalendarEvent,
  IconCircleCheck,
  IconCircleX,
  IconClockHour8,
  IconCoins,
  IconClockQuestion
} from '@tabler/icons-react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import BarraNavegacion from '@/components/barra-navegacion';
import Encabezado from '@/components/encabezado';
import BotonTarjeta from '@/components/boton-tarjeta';
import ModalExito from '@/components/modal-exito';
import ModalEliminarCita from '@/components/modal-eliminar-cita';
import PestaniaFiltro from '@/components/pestania-filtro';
import PantallaCarga from '@/components/pantalla-carga';
import { citasStyles } from '@/styles/citas-styles';

type Cita = {
  id_cita: number;
  id_servicio: number;
  id_usuario: number;
  id_especialista: number;
  fecha: string;
  hora: string;
  especialista_nombres: string;
  especialista_apellidos: string;
  estado: string;
  servicio: string;
  precio: string
};

const obtenerIconoEstado = (estado: string) => {
  if (estado === 'cancelada') {
    return {
      icono: IconCircleX,
      color: '#D63031'
    };
  }

  if (estado === 'completada') {
    return {
      icono: IconCircleCheck,
      color: '#00875A'
    };
  }

  return {
    icono: IconClockQuestion,
    color: '#D922AC'
  };
};

const PantallaCitas = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState<number | null>(null);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [altoIndicador, setPosicionScroll] = useState(0);
  const [altoContenido, setAltoContenido] = useState(0);
  const [altoVentana, setAltoVentana] = useState(0);
  const [pestania, setPestania] = useState<'proximas' | 'historial'>('proximas');
  const [altoBarra, setAltoBarra] = useState(0);
  const [cargando, setCargando] = useState(true);

  const posicionScroll = useRef(new Animated.Value(0)).current;

  const insets = useSafeAreaInsets();
  const opacidad = useRef(new Animated.Value(1)).current;

  const citasFiltradas = citas.filter((cita) => {
    if (pestania === 'proximas') {
      return cita.estado !== 'cancelada' && cita.estado !== 'completada';
    }
    return cita.estado === 'cancelada' || cita.estado === 'completada';
  });

  // Consulta las citas del usuario y actualiza la lista.
  const cargarCitas = async () => {
    setCargando(true);

    const resultado = await obtenerMisCitas();
    if (resultado) setCitas(resultado.datos);

    setCargando(false);
  };

  const confirmarCancelacion = async (id: number) => {
    const resultado = await cancelarCita(id.toString());

    if (resultado?.respuesta.ok) {
      setMostrarExito(true);
      return;
    }

    Alert.alert(
      'Error',
      resultado?.datos.error ?? 'No se pudo cancelar la cita.'
    );
  };

  const mostrarConfirmacionCancelacion = (id: number) => {
    setCitaSeleccionada(id);
    setModalVisible(true);
  };

  useEffect(() => {
    opacidad.setValue(0);
    Animated.timing(opacidad, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, [pestania]);

  useFocusEffect(
    useCallback(() => {
      cargarCitas();
    }, [])
  );

  return (
    <SafeAreaView style={citasStyles.areaSegura} edges={['top', 'bottom']}>
      {cargando ? (
        <PantallaCarga />
      ) : (
        <>
          <View style={citasStyles.encabezado}>
            <Encabezado titulo='Mis citas' />
          </View>

          <View style={citasStyles.acciones}>
            <PestaniaFiltro
              texto='Próximas'
              activo={pestania === 'proximas'}
              onPress={() => setPestania('proximas')}
            />

            <PestaniaFiltro
              texto='Historial'
              activo={pestania === 'historial'}
              onPress={() => setPestania('historial')}
            />
          </View>

          {citasFiltradas.length > 0 && (
            <MaskedView
              style={{ flex: 1 }}
              maskElement={
                <LinearGradient
                  colors={[
                    'transparent',
                    'black',
                    'black',
                    'transparent'
                  ]}
                  locations={[0, 0.015, 0.985, 1]}
                  style={{ flex: 1 }}
                />
              }
            >
              <Animated.View style={{ opacity: opacidad, flex: 1 }}>
                <ScrollView
                  style={{
                    paddingHorizontal: 15,
                    alignSelf: 'stretch',
                    backgroundColor: '#FCE3EE',
                    paddingTop: 8
                  }}
                  showsVerticalScrollIndicator={false}
                  onScroll={(evento) =>
                    posicionScroll.setValue(evento.nativeEvent.contentOffset.y)
                  }
                  scrollEventThrottle={16}
                  onContentSizeChange={(ancho, alto) => setAltoContenido(alto)}
                  onLayout={(evento) =>
                    setAltoVentana(evento.nativeEvent.layout.height)
                  }
                  contentContainerStyle={citasStyles.contenedor}
                >

                  {citasFiltradas.map((cita) => (
                    <View
                      key={cita.id_cita}
                      style={citasStyles.cita}
                    >

                      <View style={citasStyles.contenedorCita}>
                        <View style={citasStyles.encabezadoCita}>
                          <View style={citasStyles.perfilCita}>
                            <MaterialCommunityIcons
                              name='account-check-outline'
                              size={22}
                              color='#D922AC'
                            />
                          </View>

                          <View>
                            <Text style={citasStyles.nombreServicio}>
                              {cita.servicio}
                            </Text>
                            <Text style={citasStyles.especialistaCita}>
                              con {cita.especialista_nombres} {cita.especialista_apellidos}
                            </Text>
                          </View>
                        </View>

                        <View style={citasStyles.separador} />

                        <View
                          style={citasStyles.filaDatos}>
                          <View style={citasStyles.filaConIcono}>
                            <IconCalendarEvent
                              size={23}
                              color='#D922AC'
                              strokeWidth={1.5}
                            />

                            <Text style={citasStyles.valorConIcono}>
                              {formatearFechaLarga(cita.fecha)}
                            </Text>
                          </View>

                          <View style={citasStyles.filaConIcono}>
                            <IconClockHour8
                              size={23}
                              color="#E42BB8"
                              strokeWidth={1.5}
                            />

                            <Text style={citasStyles.valorConIcono}>
                              {formatearHora12(cita.hora)}
                            </Text>
                          </View>
                        </View>

                        <View style={citasStyles.filaDatos}>
                          <View style={citasStyles.filaConIcono}>
                            <IconCoins
                              size={23}
                              color="#E42BB8"
                              strokeWidth={1.5}
                            />

                            <Text style={citasStyles.valorConIcono}>
                              {formatearPrecio(cita.precio)}
                            </Text>
                          </View>

                          <View style={citasStyles.filaConIcono}>

                            {(() => {
                              const {
                                icono: Icono,
                                color
                              } = obtenerIconoEstado(cita.estado);

                              return (
                                <Icono
                                  size={23}
                                  color={color}
                                  strokeWidth={1.5}
                                />
                              );
                            })()}

                            <Text style={citasStyles.valorConIcono}>{cita.estado}</Text>
                          </View>
                        </View>
                      </View>

                      {cita.estado === 'pendiente' && (
                        <View style={citasStyles.botones}>
                          <BotonTarjeta
                            texto='Reagendar'
                            onPress={() =>
                              router.push({
                                pathname: '/actualizar-cita',
                                params: {
                                  id: cita.id_cita.toString(),
                                  id_servicio: cita.id_servicio.toString(),
                                  id_especialista: cita.id_especialista.toString(),
                                  fecha: cita.fecha.slice(0, 10),
                                  hora: cita.hora.slice(0, 5)
                                }
                              })
                            }
                            flex={1}
                          />

                          <BotonTarjeta
                            texto='Cancelar'
                            onPress={() =>
                              mostrarConfirmacionCancelacion(cita.id_cita)
                            }
                            flex={1}
                            variante='peligro'
                          />

                        </View>
                        )}
                    </View>
                  ))}
                </ScrollView>
              </Animated.View>
            </MaskedView>
          )}

          {citasFiltradas.length === 0 && (
            <Animated.View style={{ opacity: opacidad, flex: 1 }}>
              <View
                style={citasStyles.citasVacia}>
                <Image
                  source={require('@/assets/images/avatar-sin-citas.png')}
                  style={citasStyles.imagenVacia}
                />
                <Text
                    style={citasStyles.mensajeVacio}
                  >
                    {pestania === 'proximas'
                      ? '¡No tienes citas agendadas!'
                      : '¡Historial vacío!'
                    }
                  </Text>
              </View>
            </Animated.View>
          )}

          {citasFiltradas.length > 0 && altoContenido > altoVentana && (
            <View
              style={citasStyles.indicadorScroll}
              onLayout={(evento) =>
                setPosicionScroll(evento.nativeEvent.layout.height)
              }
            >
              <Animated.View
                style={[
                  citasStyles.barraScroll,
                  {
                    transform: [
                      {
                        translateY: posicionScroll.interpolate({
                          inputRange: [0, Math.max(0, altoContenido - altoVentana)],
                          outputRange: [0, Math.max(0, altoIndicador - 100)],
                          extrapolate: 'clamp'
                        })
                      }
                    ]
                  }
                ]}
              />
          </View>
          )}

          <View style={citasStyles.navegacion}
            onLayout={(evento) =>
              setAltoBarra(evento.nativeEvent.layout.height)
            }
          >
            <BarraNavegacion />
          </View>

          {altoBarra > 0 && (
            <TouchableOpacity
              style={[
                citasStyles.botonFlotante,
                {
                  bottom: altoBarra + insets.bottom + 40
                }
              ]}
              onLayout={(evento) => {
                console.log("Flotante", evento.nativeEvent.layout.height)
              }}
              onPress={() => router.push('/crear-cita')}
            >
              <IconCalendarPlus
                size={28}
                color="#FFFFFF"
                strokeWidth={2}
              />
              <Text style={citasStyles.textoBotonFlotante}>Nueva cita</Text>
            </TouchableOpacity>
          )}

          <ModalEliminarCita
            visible={modalVisible}
            alCerrar={() => setModalVisible(false)}
            alConfirmar={() => {
              setModalVisible(false);
              if (citaSeleccionada !== null) {
                confirmarCancelacion(citaSeleccionada);
              }
            }}
          />

          <ModalExito
            visible={mostrarExito}
            mensaje='Cita cancelada con exito.'
            onClose={() => {
              setMostrarExito(false);
              cargarCitas();
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default PantallaCitas;
