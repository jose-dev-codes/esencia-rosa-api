import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { modalBaseStyles } from '@/styles/modal-base-styles';
import { modalServiciosStyles } from '@/styles/modal-servicios-styles';
import { formatearPrecio } from '@/utils/formulario-utilidades';
import { citasStyles } from '@/styles/citas-styles';

import Boton from './boton';

type Servicio = {
  id_servicio: string,
  nombre: string,
  costo: number
};

type Props = {
  visible: boolean,
  alCerrar: () => void,
  servicios: Servicio[],
  alSeleccionar: (id: string) => void;
};

const ModalServicios = ({
  visible,
  alCerrar,
  servicios,
  alSeleccionar
}: Props) => {
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
            Selecciona un servicio
          </Text>

          <ScrollView style={modalBaseStyles.listaOpciones}>
            {servicios.map((servicio) => (
              <TouchableOpacity
                key={servicio.id_servicio}
                style={modalBaseStyles.opcion}
                onPress={() => {
                  alSeleccionar(servicio.id_servicio.toString());
                  alCerrar();
                }}
              >
                <View style={modalServiciosStyles.filaServicio}>
                  <View style={citasStyles.cajaAdaptable}>
                    <Text style={modalBaseStyles.textoOpcion}>
                      {servicio.nombre}
                    </Text>
                  </View>

                  <Text style={modalBaseStyles.textoOpcion}>
                    {formatearPrecio(servicio.costo)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

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

export default ModalServicios;
