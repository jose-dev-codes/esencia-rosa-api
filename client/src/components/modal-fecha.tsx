import {
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { modalBaseStyles } from '@/styles/modal-base-styles';
import { modalFechaStyles } from '@/styles/modal-fecha-styles';
import {
  construirFechaDia,
  esDiaDisponible,
  obtenerDiasEnMes,
  obtenerPrimerDiaSemana
} from '@/utils/calendario-utilidades';

import Boton from './boton';

type Props = {
  visible: boolean,
  alCerrar: () => void,
  anioVisible: number,
  mesVisible: Date,
  mesVisibleNumero: number,
  diasDisponibles: number[],
  fechaCita: string,
  alCambiarMes: (fecha: Date) => void,
  alSeleccionar: (fecha: string) => void
};

const ModalFecha = ({
  visible,
  alCerrar,
  anioVisible,
  mesVisible,
  mesVisibleNumero,
  diasDisponibles,
  fechaCita,
  alCambiarMes,
  alSeleccionar
}: Props) => {
  const primerDiaSemana = obtenerPrimerDiaSemana(anioVisible, mesVisibleNumero);
  const diasDelMes = obtenerDiasEnMes(anioVisible, mesVisibleNumero);

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={alCerrar}
    >
      <View style={modalBaseStyles.fondoModal}>
        <View style={modalBaseStyles.modalContenido}>
          <Text style={modalBaseStyles.tituloModal}>
            Selecciona una fecha
          </Text>

          <View style={modalFechaStyles.encabezadoMes}>
            <TouchableOpacity
              onPress={() =>
                alCambiarMes(
                  new Date(anioVisible, mesVisibleNumero - 1, 1)
                )
              }
            >
              <Text style={modalFechaStyles.flechaMes}>{'<'}</Text>
            </TouchableOpacity>

            <Text style={modalFechaStyles.textoMes}>
              {mesVisible.toLocaleString(
                'es',
                { month: 'long', year: 'numeric' }
              )}
            </Text>

            <TouchableOpacity
              onPress={() =>
                alCambiarMes(
                  new Date(anioVisible, mesVisibleNumero + 1, 1)
                )
              }
            >
              <Text style={modalFechaStyles.flechaMes}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={modalFechaStyles.filaDiasSemana}>
            <View style={modalFechaStyles.celdaDiaSemana}>
              <Text style={modalFechaStyles.textoDiaSemana}>L</Text>
            </View>
            <View style={modalFechaStyles.celdaDiaSemana}>
              <Text style={modalFechaStyles.textoDiaSemana}>M</Text>
            </View>
            <View style={modalFechaStyles.celdaDiaSemana}>
              <Text style={modalFechaStyles.textoDiaSemana}>M</Text>
            </View>
            <View style={modalFechaStyles.celdaDiaSemana}>
              <Text style={modalFechaStyles.textoDiaSemana}>J</Text>
            </View>
            <View style={modalFechaStyles.celdaDiaSemana}>
              <Text style={modalFechaStyles.textoDiaSemana}>V</Text>
            </View>
            <View style={modalFechaStyles.celdaDiaSemana}>
              <Text style={modalFechaStyles.textoDiaSemana}>S</Text>
            </View>
            <View style={modalFechaStyles.celdaDiaSemana}>
              <Text style={modalFechaStyles.textoDiaSemana}>D</Text>
            </View>
          </View>

          <View style={modalFechaStyles.cuadriculaDias}>
            {Array.from(
              { length: primerDiaSemana },
              (_, i) => (
                <View
                  key={`vacio-${i}`}
                  style={modalFechaStyles.diaCalendario}
                />
              )
            )}

            {Array.from(
              { length: diasDelMes },
              (_, i) => {
                const dia = i + 1;
                const disponible = esDiaDisponible(dia, diasDisponibles);
                const fechaDia = construirFechaDia(anioVisible, mesVisibleNumero, dia);
                const seleccionado = fechaCita === fechaDia;

                return (
                  <TouchableOpacity
                    key={dia}
                    disabled={!disponible}
                    onPress={() => {
                      alSeleccionar(fechaDia);
                      alCerrar();
                    }}
                    style={modalFechaStyles.diaCalendario}
                  >
                    <View
                      style={[
                        modalFechaStyles.diaInterior,
                        disponible
                          ? modalFechaStyles.diaDisponible
                          : modalFechaStyles.diaNoDisponible,
                        seleccionado
                          ? modalFechaStyles.diaSeleccionado
                          : null,
                      ]}
                    >
                      <Text
                        style={[
                          modalFechaStyles.textoDia,
                          disponible
                            ? modalFechaStyles.textoDiaDisponible
                            : modalFechaStyles.textoDiaNoDisponible,
                          seleccionado
                            ? modalFechaStyles.textoDiaSeleccionado
                            : null,
                        ]}
                      >
                        {dia}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            )}
          </View>

          <View style={{ marginTop: 20 }}>
            <Boton
              texto='Cerrar'
              onPress={alCerrar}
              borderRadius={8}
              sinSombra
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalFecha;
