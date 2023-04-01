import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomMenu } from './components/BottomBar'

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
            <SafeAreaProvider>

                <BottomMenu />

            </SafeAreaProvider>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

});
