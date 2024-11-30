import { ActivityIndicator } from 'react-native-paper';

export default function Loading() {
  return <ActivityIndicator animating={true} style={{ flex: 1 }} />;
}
