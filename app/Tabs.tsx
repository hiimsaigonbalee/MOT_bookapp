import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Bookmarks from './Bookmark';
import { Stack, useLocalSearchParams } from 'expo-router';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { FontAwesome, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import profile from './profile';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Historys from './Historys';


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
          initialParams={{username:username,id:String(id)}}
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
          initialParams={{username:username,id:String(id)}}
          name="Hồ Sơ"
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="user" size={28} color={color} /> 
            
            ),
          }}
        />
        <Tab.Screen
          component={Bookmarks}
          initialParams={{username:username,id:String(id)}}
          name="BookMark"
          options={{
            tabBarIcon:({color}) => (
              <FontAwesome6 name="bookmark" size={24} color={color} />
            ),
          }}
        />
         <Tab.Screen
          component={Historys}
          initialParams={{username:username,id:String(id)}}
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