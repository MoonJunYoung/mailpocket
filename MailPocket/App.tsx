import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './src/sreens/OnboardingScreen';
import { Provider } from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeAreaView>
          <OnboardingScreen />
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>

  )
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
