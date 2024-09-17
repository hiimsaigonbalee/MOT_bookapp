
import axios from 'axios';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { memo, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Header, Icon } from 'react-native-elements';

function UserProfile() {
  const {username} = useLocalSearchParams()
    const {id} = useLocalSearchParams()
    console.log(id)
    let user = {
    name: username,
  };
  const [avatar,setAv]=useState('đasds')
const getAPI = async ()=>{
    await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
    .then(res=>{
        setAv(res.data.image)

    }      
    )
    .catch(err=>{
      Alert.alert('Thông Báo','Vui Lòng chờ trong giây lát')
    })
}
useFocusEffect(
  React.useCallback(()=>{
    getAPI()
  },[])
)
  return (
    <ScrollView style={styles.container}>
      {}
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Avatar
          rounded
          size="large"
          source={{ uri: avatar }}
        />
        <Text style={styles.profileName}>{username}</Text>
        <Text style={styles.profileEmail}>johndoe@gmail.com</Text>
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
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="lock" type="feather" color="#000" />
          <Text style={styles.menuText}>Update Password</Text>
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
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="help-circle" type="feather" color="#000" />
          <Text style={styles.menuText}>FAQs</Text>
          <Icon name="chevron-right" type="feather" color="#000" />
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
});




// export default function UserProfile() {
//     const {username} = useLocalSearchParams()
//     const {id} = useLocalSearchParams()
//     let user = {
//     name: username,
//   };
//   const [avatar,setAv]=useState(String)
// const getAPI = async ()=>{
//     await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
//     .then(res=>{
//         setAv(res.data.image)

//     }      
//     )
// }
//   useLayoutEffect(()=>{
//     getAPI()
//   },[])
// //   return (
// //     <>
// //     <Stack.Screen options={{ headerTransparent: true, headerTitle:"",}}>
// //     </Stack.Screen>
// //     <View style={styles.container}>
// //       <Image source={{ uri: avatar}} style={styles.avatar} />
// //       <Text style={styles.name}>{user.name}</Text>
     
// //     </View>
// //     <View style={styles.containerBtn}>
// //       <TouchableOpacity onPress={()=>{}} style={styles.Btn}>
// //         <AntDesign name="clockcircle" size={20} color="black"  style={styles.icon}/>
// //         <Text style={styles.Btntxt}>Lịch sử đặt phòng</Text>
// //       </TouchableOpacity>
// //     </View>
    
// //     </>
    
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     padding: 20,
// //     backgroundColor:'#FFFFFF'
// //   },
// //   containerBtn: {
// //     flex:4,
// //     alignItems:'baseline',
// //     padding: 20,
// //     backgroundColor:'#FFFFFF'
// //   },
// //   avatar: {
// //     width: 100,
// //     height: 100,
// //     borderRadius: 50,
// //     marginBottom: 20,
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //   },
// //   email: {
// //     fontSize: 18,
// //     color: 'gray',
// //     marginBottom: 20,
// //   },
// //   Btn:{
// //     padding:10,
// //     display:'flex'
// //   },Btntxt:{
// //     fontSize:18,
// //     left:5,
// //   },
// //   icon:{
// //     position:'absolute',
// //     left:-10,
// //     top:13
// //   }
// // });



//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');

//   return (
//     <>
//      <Stack.Screen options={{
//         headerTransparent: true,
//         headerTitle:"",
//         headerShown:false
//       }}></Stack.Screen>
//     <View style={styles.container}>
//       <Text style={styles.headerText}>ACCOUNT</Text>
//       <View style={styles.avatarContainer}>
//         <Avatar
//           rounded
//           size="large"
//           source={{
//             uri:avatar,
//           }}
//         />
//         <TouchableOpacity style={styles.editIcon}>
//           <Text style={styles.editIconText}>✏️</Text>
//         </TouchableOpacity>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Full Name"
//         value={name}
//         onChangeText={setName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Email"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Phone Number"
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <TouchableOpacity style={styles.updatePasswordButton}>
//         <Text style={styles.updatePasswordText}>Update Password</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.saveButton}>
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>
//     </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F3F3',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#0091EA',
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginBottom: 20,
//   },
//   editIcon: {
//     position: 'absolute',
//     bottom: -5,
//     marginLeft: 60,
//     borderRadius: 15,
//     padding: 5,
//     transform: [{rotateY: '60rad'}],
//   },
//   editIconText: {
//     fontSize: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     backgroundColor: 'white',
//   },
//   updatePasswordButton: {
//     width: '80%',
//     padding: 10,
//     backgroundColor: '#F06292',
//     borderRadius: 25,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   updatePasswordText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   saveButton: {
//     width: '80%',
//     padding: 10,
//     backgroundColor: '#FF4081',
//     borderRadius: 25,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

