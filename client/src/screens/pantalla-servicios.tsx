import { Animated, View, Text, Modal, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useFocusEffect, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  IconClockHour8,
  IconCoins,
  IconBrush,
  IconWand,
  IconSparkleHighlight,
  IconSparkles,
  IconEyeClosed,
  IconPlus
} from '@tabler/icons-react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import Encabezado from '@/components/encabezado';
import Boton from '@/components/boton';
import BarraBusqueda from '@/components/barra-busqueda';
import PestaniaFiltro from '@/components/pestania-filtro';
import PantallaCarga from '@/components/pantalla-carga';
import BotonTarjeta from '@/components/boton-tarjeta';
import BarraNavegacion from '@/components/barra-navegacion';
import BotonFlotante from '@/components/boton-flotante';
import BarraScroll from '@/components/barra-scroll';
import EstadoVacio from '@/components/estado-vacio';
import ModalModificar from '@/components/modal-modificar';
import ModalMensaje from '@/components/modal-mensaje';
import ModalExito from '@/components/modal-exito';

import {
  eliminarServicio,
  habilitarServicio,
  inhabilitarServicio,
  obtenerServicios
} from '@/services/servicio-servicio';
import { formatearPrecio } from '@/utils/formulario-utilidades';

import { modalBaseStyles } from '@/styles/modal-base-styles';
import { citasStyles } from '@/styles/citas-styles';
import { serviciosStyles } from '@/styles/servicios-styles';
import { obtenerRol } from '@/services/sesion-servicio';

type Servicio = {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  costo: number;
  duracion_minutos: number;
  estado: string
};

const obtenerIconoPorServicio = (nombre: string) => {
  const n = nombre.toLowerCase();

  if (n.includes('ceja')) return IconEyeClosed;
  if (n.includes('uñas') || n.includes('manicure') || n.includes('pedicure')) {
    return IconBrush;
  }
  if (n.includes('facial') || n.includes('limpieza')) return IconSparkleHighlight;
  if (n.includes('depilación')) return IconWand;

  return IconSparkles;
};

const PantallaServicios = () => {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);
  const [rol, setRol] = useState('');
  const [altoBarra, setAltoBarra] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [pestania, setPestania] = useState('todos');
  const [altoContenido, setAltoContenido] = useState(0);
  const [altoVentana, setAltoVentana] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [modalConfirmacionVisible, setModalConfirmacionVisible] = useState(false);
  const [accionModificar, setAccionModificar] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState<Servicio | null>(null);
  const [mensajeError, setMensajeError] = useState('');
  const [modalMensajeVisible, setModalMensajeVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const opacidad = useRef(new Animated.Value(1)).current;

  const posicionScroll = useRef(new Animated.Value(0)).current;

  const cargarServicios = async () => {
    const resultado = await obtenerServicios();

    if (resultado && resultado.respuesta.ok) {
      setServicios(resultado.datos);
    }

    setCargando(false);
  };

  const confirmarAccion = async (servicio: Servicio) => {
    const id = servicio?.id_servicio.toString() ?? '';
    const resultado = accionModificar === 'inhabilitar'
      ? await inhabilitarServicio(id)
      : accionModificar === 'eliminar'
        ? await eliminarServicio(id)
        : await habilitarServicio(id);

    if (resultado?.respuesta.ok) {
      setModalVisible(true);
      return;
    }

    setMensajeError(resultado?.datos.error ?? 'No se pudo completar la acción.');
    setModalMensajeVisible(true);
  };

  const mostrarConfirmacion = (servicio: Servicio) => {
    setServicioSeleccionado(servicio);
    setModalConfirmacionVisible(true);
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
      cargarServicios();
    }, [])
  );

  useEffect(() => {
    const verificarRol = async () => {
      const rol = await obtenerRol();
      setRol(rol);
    };

    verificarRol();
  }, []);

  // Filtra por búsqueda y por pestaña, todo en el front
  const serviciosFiltrados = servicios.filter((servicio) => {
    const coincideBusqueda = servicio.nombre.toLowerCase()
      .includes(busqueda.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    if (pestania === 'activos') {
      return coincideBusqueda && servicio.estado === 'activo';
    }

    if (pestania === 'inactivos') {
      return coincideBusqueda && servicio.estado === 'inactivo';
    }

    return coincideBusqueda;
  });

  return (
    <SafeAreaView style={citasStyles.areaSegura} edges={['top', 'bottom']}>
      {cargando ? (
        <PantallaCarga />
      ) : (
        <>
          <View style={citasStyles.encabezado}>
            <Encabezado titulo='Servicios' />
          </View>

          <View  style={{marginTop: 20, marginHorizontal: 20}}>
            <BarraBusqueda
              value={busqueda}
              placeholder='Buscar servicios...'
              icono='magnify'
              onChangeText={setBusqueda}
            />
          </View>

          {rol === 'admin' && (
            <View style={[citasStyles.acciones, {gap: 10, marginTop: 8}]}>
              <PestaniaFiltro
                texto='Todos'
                activo={pestania === 'todos'}
                onPress={() => setPestania('todos')}
              />

              <PestaniaFiltro
                texto='Activos'
                activo={pestania === 'activos'}
                onPress={() => setPestania('activos')}
              />

              <PestaniaFiltro
                texto='Inactivos'
                activo={pestania === 'inactivos'}
                onPress={() => setPestania('inactivos')}
              />
            </View>
          )}

          {serviciosFiltrados.length > 0 && (
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
              <Animated.View style={{
                opacity: opacidad,
                flex: 1,
                position: 'relative'
              }}>
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
                  {serviciosFiltrados.map((servicio) => (
                    <View
                      key={servicio.id_servicio}
                      style={[
                        citasStyles.cita,
                        servicio.estado === 'inactivo' &&
                        serviciosStyles.servicioInactivo
                      ]}
                    >
                      <View style={citasStyles.contenedorCita}>
                        <View style={citasStyles.encabezadoCita}>
                          {(() => {
                            const Icono = obtenerIconoPorServicio(servicio.nombre);

                            return (
                              <Icono
                                size={23}
                                color={servicio.estado === 'inactivo'
                                  ? '#A8A8A8'
                                  : '#E42BB8'
                                }
                                strokeWidth={2.2}
                              />
                            );
                          })()}

                          <View>
                            <Text style={[
                              citasStyles.nombreServicio,
                              servicio.estado === 'inactivo' &&
                              serviciosStyles.textoInactivo
                            ]}>
                              {servicio.nombre}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={[
                            citasStyles.separador,
                            servicio.estado === 'inactivo' &&
                            { backgroundColor: '#A8A8A8' }
                          ]}
                        />

                        <View style={serviciosStyles.contenedorServicio}>
                          <View style={serviciosStyles.contenedorInfo}>
                            <View style={citasStyles.filaConIcono}>
                              <IconCoins
                                size={23}
                                color={servicio.estado === 'inactivo'
                                  ? '#A8A8A8'
                                  : '#E42BB8'
                                }
                                strokeWidth={1.5}
                              />
                              <Text style={[
                                citasStyles.valorConIcono,
                                servicio.estado === 'inactivo' &&
                                serviciosStyles.textoInactivo
                              ]}>
                                {formatearPrecio(servicio.costo)}
                              </Text>
                            </View>

                            <View style={citasStyles.filaConIcono}>
                              <IconClockHour8
                                size={23}
                                color={servicio.estado === 'inactivo'
                                  ? '#A8A8A8'
                                  : '#E42BB8'
                                }
                                strokeWidth={1.5}
                              />
                              <Text style={[
                                citasStyles.valorConIcono,
                                servicio.estado === 'inactivo' &&
                                serviciosStyles.textoInactivo
                              ]}>
                                {servicio.duracion_minutos} min.
                              </Text>
                            </View>

                            {rol === 'admin' && (
                              <View
                                style={[
                                  serviciosStyles.etiquetaEstado,
                                  servicio.estado === 'inactivo' &&
                                  { backgroundColor: '#A8A8A8' }
                                ]}
                              >
                                <Text style={[
                                  serviciosStyles.textoEstado,
                                  servicio.estado === 'inactivo' &&
                                  {color: '#EDEDED'}
                                ]}>
                                  {servicio.estado}
                                </Text>
                              </View>
                            )}
                          </View>

                          <View style={{ flex: 1, justifyContent: 'center' }}>
                            <BotonTarjeta
                              texto={rol === 'admin'
                                ? 'Administrar'
                                : 'Ver / Agendar'
                              }
                              borderColor={
                                servicio.estado === 'inactivo' ?
                                  'rgba(228, 43, 184, 0.50)'
                                  : undefined
                              }
                              onPress={() => {
                                setServicioSeleccionado(servicio);
                                setModalInfoVisible(true);
                              }}
                            />
                          </View>

                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>

                {serviciosFiltrados.length > 0 &&
                  altoContenido > altoVentana + 25 && (
                    <BarraScroll
                      posicionScroll={posicionScroll}
                      altoContenido={altoContenido}
                      altoVentana={altoVentana}
                    />
                  )
                }
              </Animated.View>
            </MaskedView>
          )}

          {serviciosFiltrados.length === 0 && (
            <EstadoVacio
              opacidad={opacidad}
              icono={
                <IconSparkles
                  size={100}
                  color='#D922AC'
                  strokeWidth={1.5}
                />
              }
              texto={pestania === 'todos'
                ? '¡No hay servicios disponibles!'
                : pestania === 'activos'
                  ? '¡No tienes servicios activos!'
                  : '¡No tienes servicios inactivos!'
              }
            />
          )}

          <Modal
            visible={servicioSeleccionado !== null && modalInfoVisible}
            transparent
            animationType='fade'
            onRequestClose={() => setServicioSeleccionado(null)}
          >
            <View style={modalBaseStyles.fondoModal}>
              <View style={modalBaseStyles.modalContenido}>

                <Text style={[modalBaseStyles.tituloModal,
                  servicioSeleccionado?.estado === 'inactivo'
                    ? serviciosStyles.textoInactivo
                    : null
                  ]}
                >
                  Detalles del servicio
                </Text>

                <View style={serviciosStyles.nombreConIcono}>
                  <View
                    style={[
                      serviciosStyles.iconoServicio,
                      servicioSeleccionado?.estado === 'inactivo'
                        ? { backgroundColor: '#A8A8A8' }
                        : null
                    ]}
                  >
                    {(() => {
                      const Icono = obtenerIconoPorServicio(
                        servicioSeleccionado?.nombre ?? ''
                      );

                      return (
                        <Icono
                          size={40}
                          color='#FFFFFF'
                          strokeWidth={2}
                        />
                      );
                    })()}
                  </View>

                  <View style={serviciosStyles.contenedorTexto}>
                    <Text
                      style={[
                        serviciosStyles.subtituloModal,
                        servicioSeleccionado?.estado === 'inactivo'
                          ? serviciosStyles.textoInactivo
                          : null
                      ]}>
                      {servicioSeleccionado?.nombre}
                    </Text>
                  </View>
                </View>


                <View style={[
                    serviciosStyles.contenedorDescripcionModal,
                    servicioSeleccionado?.estado === 'inactivo'
                      ? serviciosStyles.servicioInactivo
                      : null
                  ]}
                >
                  <Text style={[
                    serviciosStyles.etiquetaServicio,
                    servicioSeleccionado?.estado === 'inactivo'
                      ? serviciosStyles.textoInactivo
                      : null
                    ]}
                  >
                    Descripción:
                  </Text>
                  <Text
                    style={[
                      serviciosStyles.descripcionModal,
                      servicioSeleccionado?.estado === 'inactivo'
                        ? serviciosStyles.textoInactivo
                        : null
                    ]}
                  >
                    {servicioSeleccionado?.descripcion}
                  </Text>
                </View>

                <View
                  style={[
                    serviciosStyles.contenidoModal,
                    servicioSeleccionado?.estado === 'inactivo'
                      ? serviciosStyles.servicioInactivo
                      : null
                  ]}
                >
                  <View style={serviciosStyles.seccionModal}>
                    <Text
                      style={[
                        serviciosStyles.etiquetaServicio,
                        servicioSeleccionado?.estado === 'inactivo'
                          ? serviciosStyles.textoInactivo
                          : null
                      ]}
                    >
                      Precio:
                    </Text>

                    <View style={serviciosStyles.filaDatos}>
                      <Text
                        style={[
                          serviciosStyles.datoServicio,
                          servicioSeleccionado?.estado === 'inactivo'
                            ? serviciosStyles.textoInactivo
                            : null
                        ]}
                      >
                        {formatearPrecio(servicioSeleccionado?.costo ?? 0)}
                      </Text>

                      <IconCoins
                        size={23}
                        color={servicioSeleccionado?.estado === 'inactivo'
                          ? '#A8A8A8'
                          : '#E42BB8'
                        }
                        strokeWidth={1.5}
                      />
                    </View>
                  </View>

                  <View style={serviciosStyles.seccionModal}>
                    <Text
                      style={[
                        serviciosStyles.etiquetaServicio,
                        servicioSeleccionado?.estado === 'inactivo'
                          ? serviciosStyles.textoInactivo
                          : null
                      ]}
                    >
                      Duración:
                    </Text>

                    <View style={serviciosStyles.filaDatos}>
                      <Text
                        style={[
                          serviciosStyles.datoServicio,
                          servicioSeleccionado?.estado === 'inactivo'
                            ? serviciosStyles.textoInactivo
                            : null
                        ]}
                      >
                        {servicioSeleccionado?.duracion_minutos} min.
                      </Text>

                      <IconClockHour8
                        size={23}
                        color={servicioSeleccionado?.estado === 'inactivo'
                          ? '#A8A8A8'
                          : '#E42BB8'
                        }
                        strokeWidth={1.5}
                      />
                    </View>
                  </View>
                </View>

                {rol !== 'admin' && (
                  <View style={citasStyles.botonesModal}>
                    <Boton
                      texto='Cerrar'
                      borderRadius={12}
                      sinSombra
                      flex={1}
                      variante='secundario'
                      onPress={() => {
                        setServicioSeleccionado(null);
                        setModalInfoVisible(false);
                      }}
                    />

                    <Boton
                      texto='Agendar'
                      borderRadius={12}
                      sinSombra
                      flex={1}
                      onPress={() => {
                        const id = servicioSeleccionado?.id_servicio.toString();

                        setServicioSeleccionado(null);
                        setModalInfoVisible(false);

                        router.push({
                          pathname: '/crear-cita',
                          params: {
                            id_servicio: id
                          }
                        });
                      }}
                    />
                  </View>
                )}

                {rol === 'admin' && (
                  <View style={serviciosStyles.botonesModal}>
                    <Text style={serviciosStyles.textoAdministrar}>
                      Administrar
                    </Text>

                    <View style={citasStyles.botonesModal}>
                      <BotonTarjeta
                        texto='Editar'
                          onPress={() => {
                            const id = servicioSeleccionado?.id_servicio.toString();

                            setServicioSeleccionado(null);
                            setModalInfoVisible(false);

                            router.push({
                              pathname: '/actualizar-servicio',
                              params: {
                                id_servicio: id,
                                nombre: servicioSeleccionado?.nombre,
                                descripcion: servicioSeleccionado?.descripcion,
                                costo: servicioSeleccionado?.costo.toString(),
                                duracion_minutos:
                                  servicioSeleccionado?.duracion_minutos.toString(),
                                estado: servicioSeleccionado?.estado
                              }
                            });
                          }}
                          flex={1}
                      />

                      <BotonTarjeta
                        texto={servicioSeleccionado?.estado === 'activo'
                          ? 'Inhabilitar'
                          : 'Habilitar'
                        }
                        onPress={() => {
                          if (servicioSeleccionado !== null) {
                            setModalInfoVisible(false);

                            servicioSeleccionado.estado === 'activo'
                              ? setAccionModificar('inhabilitar')
                              : setAccionModificar('habilitar')

                            mostrarConfirmacion(servicioSeleccionado);
                          }
                        }}
                        flex={1}
                      />
                    </View>

                    <BotonTarjeta
                      texto='Eliminar'
                      variante='peligro'
                      onPress={() => {
                        if (servicioSeleccionado !== null) {
                          setModalInfoVisible(false);
                          setAccionModificar('eliminar');
                          setModalConfirmacionVisible(true);
                        }
                      }}
                    />
                  </View>
                )}

                {rol === 'admin' && (
                  <Boton
                    texto='Cerrar'
                    borderRadius={12}
                    sinSombra
                    variante='secundario'
                    onPress={() => {
                      setServicioSeleccionado(null);
                      setModalInfoVisible(false);
                    }}
                  />
                )}
              </View>
            </View>
          </Modal>

          {rol === 'admin' && (
            <ModalModificar
              visible={accionModificar !== '' && modalConfirmacionVisible}
              accion={accionModificar}
              nombre='servicio'
              adjetivo='este'
              advertencia={accionModificar === 'eliminar'
                ? 'Si tiene citas asociadas no se podrá eliminar.'
                : undefined
              }
              alCerrar={() => {
                setAccionModificar('');
                setModalConfirmacionVisible(false);
                setModalInfoVisible(true);
              }}
              alConfirmar={() => {
                if (servicioSeleccionado !== null) {
                  setModalConfirmacionVisible(false);
                  confirmarAccion(servicioSeleccionado);
                }
              }}
            />
          )}
          <View
            style={citasStyles.navegacion}
            onLayout={(evento) =>
              setAltoBarra(evento.nativeEvent.layout.height)
            }
          >
            <BarraNavegacion />
          </View>

          {altoBarra > 0 && rol === 'admin' && (
            <BotonFlotante
              texto='Servicio'
              onPress={() => router.push('/crear-servicio')}
              icono={IconPlus}
              iconSize={32}
              strokeWidth={2.2}
              bottom={altoBarra + insets.bottom + 40}
            />
            )}

            <ModalExito
              visible={modalVisible}
              mensaje={accionModificar === 'habilitar'
                ? 'Servicio habilitado correctamente.'
                : accionModificar === 'eliminar'
                  ? 'Servicio eliminado correctamente.'
                  : 'Servicio inhabilitado correctamente.'
              }
              onClose={() => {
                setModalVisible(false);
                setAccionModificar('');
                setServicioSeleccionado(null);
                cargarServicios();
              }}
            />

            <ModalMensaje
              visible={modalMensajeVisible}
              titulo='No se pudo eliminar.'
              mensaje={mensajeError}
              alCerrar={() => {
                setModalMensajeVisible(false);
                setMensajeError('');
                setModalInfoVisible(true);
              }}
            />
        </>
      )}
    </SafeAreaView>
  );
};

export default PantallaServicios;
