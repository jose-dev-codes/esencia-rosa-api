import { Platform } from 'react-native';

// Define la dirección base del backend de ejemplo.
const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:3000/api'
    : 'http://TU_IP_LOCAL:3000/api';

export default API_URL;
