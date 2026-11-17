import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { modalBaseStyles } from '@/styles/modal-base-styles';
import { modalEspecialistasStyles } from '@/styles/modal-especialistas-styles';

import Boton from './boton';

type Especialista = {
  id_usuario: string,
  nombres: string,
  apellidos: string
};

type Props = {
  visible: boolean,
  alCerrar: () => void,
  especialistas: Especialista[],
  alSeleccionar: (id: string) => void
};

const ModalEspecialistas = ({
  visible,
  alCerrar,
  especialistas,
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
            Selecciona un especialista
          </Text>

          <ScrollView style={modalBaseStyles.listaOpciones}>
            {especialistas.map((especialista) => (
              <TouchableOpacity
                key={especialista.id_usuario}
                style={modalBaseStyles.opcion}
                onPress={() => {
                  alSeleccionar(especialista.id_usuario.toString());
                  alCerrar();
                }}
              >
                <View style={modalEspecialistasStyles.filaEspecialista}>
                  <View style={modalEspecialistasStyles.circuloEspecialista}>
                    <MaterialCommunityIcons
                      name='account-outline'
                      size={20}
                      color='#D922AC'
                    />
                  </View>

                  <Text style={modalBaseStyles.textoOpcion}>
                    {especialista.nombres} {especialista.apellidos}
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

export default ModalEspecialistas;
