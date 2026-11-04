import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const DisenoRaiz = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen
          name="index"
          options={{ title: 'Esencia Rosa' }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default DisenoRaiz;
