import { router, Stack,Link, useFocusEffect } from 'expo-router';
import * as React from 'react';
import { useEffect, useState,useLayoutEffect, memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const  Index=()=> {
  const [form, setForm] = useState({
    email: '',
    password: '',
    id:'',
  });
  const [check,setChecks] =useState(0)
  const [check1,setCheck1s] =useState(0)
  const [user,setUser] = useState<any>([])

  const getAPIuser=()=>{
    axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user')
    .then((res)=>{
        setUser(res.data)
    })
  }
  const setID = (id:string)=>{
    setForm({...form,id})
  }
  const handleSignin=  ()=>{
      for(let i=0;i<user.length;i++){
          if(user[i].username == form.email && user[i].password == form.password){
            router.replace({pathname:'./Tabs',params:{username:form.email,id:user[i].id}})
            break
          }
          else{
            Alert.alert('Thông báo','Mật Khẩu hoặc Tài Khoản Không đúng')
            setCheck1s(0)
          }
      }
      setChecks(2)
    }

  const Signup = ()=>{
    router.navigate('./Signup')
  }
  useFocusEffect(
    React.useCallback(()=>{
    getAPIuser()
  },[check || check1])
)
  return (
    <>
     <Stack.Screen options={{
        headerTransparent: true,
        headerTitle:"",
        headerShown:false
      }}></Stack.Screen>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ded7c4' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={require('../assets/images/logo.png')} />
          </View>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="minhquanlekim"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>
            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  handleSignin()
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.formLink}>Forgot password?</Text>
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          onPress={Signup}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

    </>
  );
}
export default memo(Index) 

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#929292',
    textAlign:'center',
    fontFamily:'Arial',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 5,
    borderRadius:15,
    marginTop:50,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#9edce8',
    borderColor: '#9edce8',
    width:250,
    marginLeft:55
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#000000',
  },
});