import {useColorScheme} from 'react-native';

export default function useColorScheme() {
  const isDarkMode = useColorScheme() === 'dark';

  return isDarkMode;
}
