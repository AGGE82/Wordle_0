import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GameScreen from "../views/GameScreen";
import HomeScreen from "../views/HomeScreen";
import StatsScreen from "../views/StatsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation(){
  return <NavigationContainer> 
            <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Stats" component={StatsScreen} />
            </Stack.Navigator>
    </NavigationContainer>
}