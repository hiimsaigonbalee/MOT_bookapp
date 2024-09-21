import { router, Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet,Image,Text, TouchableOpacity } from 'react-native';
const QR = () => {
  return (
    <>
    <Stack.Screen options={{
        headerTitle:'',
        headerTransparent:true,
        headerShown:false,
    }}>

    </Stack.Screen>
    <View style={styles.container}>
      <Image
        source={require('../assets/images/QR.png')} // Đường dẫn đến ảnh QR
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={()=>{router.back()}}>
        <Text style={styles.text}>Đã Thanh Toán</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
    button: {
        borderTopColor: "#6B4F4F",
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
      },
      text:{
        backgroundColor:'blue',
        padding:15,
        borderRadius:10,
        color:'white',
        marginTop:25,
        fontSize:15,
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4bc',
  },
  
  image:{
    width:300,
    height: 500,
  }
});


export default QR;
