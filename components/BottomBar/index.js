import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from "react-native";
import  TabBar  from "./Tabbar";
import Screen1 from "../../screens/Screen1";
import Screen2 from "../../screens/Screen2";


export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    
    <View style={{ flex: 1, position: "relative",  justifyContent: 'flex-end'}}>
    
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="screen1" component={Screen1} />
        <Tab.Screen name="screen2" component={Screen2} />
        <Tab.Screen name="screen3" component={Screen1} />
        <Tab.Screen name="screen4" component={Screen2} />
      </Tab.Navigator>     
  
    </View>
   
  );
};
