
import axios from 'axios';
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { memo, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Header, Icon } from 'react-native-elements';
import Index from '.';

function UserProfile() {
  const {username} = useLocalSearchParams()
    const {id} = useLocalSearchParams()
    console.log(id)
    let user = {
    name: username,
  };
  const [avatar,setAv]=useState('MinhQuanLeKimMoveOnThing')
  const [email,setEmail] = useState('')
const getAPI = async ()=>{
    await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
    .then(res=>{
        setAv(res.data.image)
        setEmail(res.data.email)
    }      
    )
    .catch(err=>{
        return 0
    })
}
const changePass =()=>{
  router.navigate({pathname:'./Changepassword',params:{id:id}})
}
const signOut = ()=>{
  router.replace('/')
}
useFocusEffect(
  React.useCallback(()=>{
    getAPI()
  },[])
)
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{
        headerTitle:"",  headerTransparent: true,
      }}>

      </Stack.Screen>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Avatar
          rounded
          size="large"
          source={{ uri: avatar }}
        />
        <Text style={styles.profileName}>{username}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="map-marker" type="font-awesome" color="#000" />
          <Text style={styles.menuText}>Cập Nhật Khu Vực</Text>
          <Icon name="chevron-right" type="feather" color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="user" type="feather" color="#000" />
          <Text style={styles.menuText}>Account</Text>
          <Icon name="chevron-right" type="feather" color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuButton} onPress={changePass}>
          <Icon name="lock" type="feather" color="#000" />
          <Text style={styles.menuText}>Thay đổi password</Text>
          <Icon name="chevron-right" type="feather" color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="heart" type="feather" color="#000" />
          <Text style={styles.menuText}>Bookmark</Text>
          <Icon name="chevron-right" type="feather" color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="mail" type="feather" color="#000" />
          <Text style={styles.menuText}>Contact Us</Text>
          <Icon name="chevron-right" type="feather" color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.menuItem}>
        <TouchableOpacity style={styles.menuButton} onPress={signOut}>
          <Text style={styles.menuText1}>Đăng Xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
export default memo(UserProfile)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  profileSection: {
    backgroundColor: '#9edce8',
    alignItems: 'center',
    paddingVertical: 30,
    marginTop:30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  menuItem: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  menuText1: {
    fontSize: 16,
    flex: 1,
    textAlign:'center',
    fontWeight:"bold"
  },
});


