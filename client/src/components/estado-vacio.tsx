import { Animated, Image, View, Text } from "react-native";
import { citasStyles } from "@/styles/citas-styles";

type EstadoVacioProps = {
  opacidad: Animated.Value,
  imagen?: number;
  icono?: React.JSX.Element;
  texto: string
};

const EstadoVacio = ({
  opacidad,
  imagen,
  icono,
  texto
}: EstadoVacioProps) => {
  return (
    <Animated.View style={{ opacity: opacidad, flex: 1 }}>
      <View style={citasStyles.citasVacia}>
        {icono
          ? icono
          : <Image
              source={imagen}
              style={citasStyles.imagenVacia}
            />

        }
        <Text style={citasStyles.mensajeVacio}>
          {texto}
        </Text>
      </View>
    </Animated.View>
  );
};

export default EstadoVacio;
