import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './(tabs)/Home';
import Bookmark from './(tabs)/Bookmark';
import { Stack, useLocalSearchParams } from 'expo-router';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Component } from 'react';
import { FontAwesome, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import profile from './profile';
import Datnhanh from './(tabs)/Bookmark';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Historys from './(tabs)/Historys';


const Tabs= ()=> {
  const Tab = createBottomTabNavigator();
  const {username} = useLocalSearchParams()
  const {id} = useLocalSearchParams()

  return (
    <>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          borderRadius:8,
        },
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: "#999",
      }}>
        <Tab.Screen
          component={Home}
          initialParams={{username:username,id:id}}
          name="Trang chủ"
          options={{
            tabBarIcon: ({color}) => (
              <Ionicons name="compass" size={28} color={color} 
              />
            ),
          }}
        />
         <Tab.Screen
          component={profile}
          initialParams={{username:username,id:id}}
          name="Hồ Sơ"
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="user" size={28} color={color} /> 
            
            ),
          }}
        />
        <Tab.Screen
          component={Bookmark}
          initialParams={{username:username,id:id}}
          name="BookMark"
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome6 name="bookmark" size={24} color={color} />
            
            ),
          }}
        />
         <Tab.Screen
          component={Historys}
          initialParams={{username:username,id:id}}
          name="Lịch Sử"
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome6 name="clock-rotate-left" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>

    </>
    
  );
}

export default Tabs