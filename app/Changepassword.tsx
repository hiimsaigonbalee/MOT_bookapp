import axios from 'axios';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  TouchableOpacity
} from 'react-native';
const ChangePasswordScreen = () => {
    const {id} = useLocalSearchParams()
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Mật khẩu mới không khớp!');
      return;
    }
    await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
    .then(async (res)=>{
        if(res.data.password == currentPassword){
            await axios.put('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+ id,{
                password:newPassword
            })
            .then(res =>{
                Alert.alert('Mật khẩu đã được thay đổi thành công!');
            })
            .catch(err=>{
                return 0
            })
        }
        else{
            Alert.alert('Mật khẩu hiện tại không khớp!');
        }
    })
    .catch(err=>{
        return 0
    })
  };

  return (
    <>
    <Stack.Screen options={{
      headerTitle:'',
      headerTransparent:true
    }}>

    </Stack.Screen>
    <View style={styles.container}>
      <Text style={styles.title}>Thay đổi mật khẩu</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu hiện tại"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu mới"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Thay đổi mật khẩu</Text>
        </TouchableOpacity>

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
},
input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
},
button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
},
buttonText: {
    color: '#fff',
    fontWeight: 'bold',
},
});

export default ChangePasswordScreen;
