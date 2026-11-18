import {
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useEffect, useState } from 'react';

import { modalBaseStyles } from '@/styles/modal-base-styles';
import { modalFechaStyles } from '@/styles/modal-fecha-styles';
import {
  construirFechaDia,
  obtenerDiasEnMes,
  obtenerPrimerDiaSemana
} from '@/utils/calendario-utilidades';

import Boton from '@/components/boton';

type Props = {
  visible: boolean,
  alCerrar: () => void,
  fechaSeleccionada: string,
  alSeleccionar: (fecha: string) => void
};

const ModalFechaNacimiento = ({
  visible,
  alCerrar,
  fechaSeleccionada,
  alSeleccionar
}: Props) => {
  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();
  const anioMinimo = anioActual - 100;

  const [anioVisible, setAnioVisible] = useState(anioActual - 18);
  const [mesVisibleNumero, setMesVisibleNumero] = useState(mesActual);

  useEffect(() => {
    if (!visible) return;

    if (fechaSeleccionada) {
      const [anio, mes] = fechaSeleccionada.split('-').map(Number);
      setAnioVisible(anio);
      setMesVisibleNumero(mes - 1);
    } else {
      setAnioVisible(anioActual - 18);
      setMesVisibleNumero(mesActual);
    }
  }, [visible]);

  const cambiarMes = (delta: number) => {
    const nuevoMes = mesVisibleNumero + delta;

    if (nuevoMes < 0) {
      if (anioVisible - 1 < anioMinimo) return;
      setAnioVisible(anioVisible - 1);
      setMesVisibleNumero(11);
    } else if (nuevoMes > 11) {
      if (anioVisible + 1 > anioActual) return;
      setAnioVisible(anioVisible + 1);
      setMesVisibleNumero(0);
    } else {
      if (anioVisible === anioActual && nuevoMes > mesActual) return;
      setMesVisibleNumero(nuevoMes);
    }
  };

  const cambiarAnio = (delta: number) => {
    const nuevoAnio = anioVisible + delta;

    if (nuevoAnio < anioMinimo || nuevoAnio > anioActual) return;
    if (nuevoAnio === anioActual && mesVisibleNumero > mesActual) {
      setMesVisibleNumero(mesActual);
    }
    setAnioVisible(nuevoAnio);
  };

  const primerDiaSemana = obtenerPrimerDiaSemana(anioVisible, mesVisibleNumero);
  const diasDelMes = obtenerDiasEnMes(anioVisible, mesVisibleNumero);
  const mesVisible = new Date(anioVisible, mesVisibleNumero, 1);

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
            Selecciona tu fecha de nacimiento
          </Text>

          <View style={modalFechaStyles.encabezadoMes}>
            <TouchableOpacity onPress={() => cambiarAnio(-1)}>
              <Text style={modalFechaStyles.flechaMes}>{'<<'}</Text>
            </TouchableOpacity>

            <Text style={modalFechaStyles.textoMes}>{anioVisible}</Text>

            <TouchableOpacity onPress={() => cambiarAnio(1)}>
              <Text style={modalFechaStyles.flechaMes}>{'>>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={modalFechaStyles.encabezadoMes}>
            <TouchableOpacity onPress={() => cambiarMes(-1)}>
              <Text style={modalFechaStyles.flechaMes}>{'<'}</Text>
            </TouchableOpacity>

            <Text style={modalFechaStyles.textoMes}>
              {mesVisible.toLocaleString('es', { month: 'long' })}
            </Text>

            <TouchableOpacity onPress={() => cambiarMes(1)}>
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
                const fechaDia = construirFechaDia(anioVisible, mesVisibleNumero, dia);
                const seleccionado = fechaSeleccionada === fechaDia;

                return (
                  <TouchableOpacity
                    key={dia}
                    onPress={() => {
                      alSeleccionar(fechaDia);
                      alCerrar();
                    }}
                    style={modalFechaStyles.diaCalendario}
                  >
                    <View
                      style={[
                        modalFechaStyles.diaInterior,
                        modalFechaStyles.diaDisponible,
                        seleccionado
                          ? modalFechaStyles.diaSeleccionado
                          : null,
                      ]}
                    >
                      <Text
                        style={[
                          modalFechaStyles.textoDia,
                          modalFechaStyles.textoDiaDisponible,
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

export default ModalFechaNacimiento;
