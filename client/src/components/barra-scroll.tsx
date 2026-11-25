import { Animated, StyleSheet, View } from 'react-native';
import { useState } from 'react';

type BarraScrollProps = {
  posicionScroll: Animated.Value;
  altoContenido: number;
  altoVentana: number
};

const BarraScroll = ({
  posicionScroll,
  altoContenido,
  altoVentana
}: BarraScrollProps) => {
  const [altoIndicador, setAltoIndicador] = useState(0);

  return (
    <View
      style={styles.indicadorScroll}
      onLayout={(evento) =>
        setAltoIndicador(evento.nativeEvent.layout.height)
      }
    >
      <Animated.View
        style={[
          styles.barraScroll,
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
  );
};

const styles = StyleSheet.create({
  indicadorScroll: {
    position: 'absolute',
    right: 3,
    top: 5,
    bottom: 5,
    width: 3,
  },
  barraScroll: {
    width: '100%',
    height: 100,
    backgroundColor: '#E42BB8',
    borderRadius: 3,
  },
});

export default BarraScroll;
