import React from "react";
import { View,Text,StyleSheet } from "react-native";

const category = ()=>{
    return(
        <View style={styles.container}>
            <Text>category</Text>
        </View>
    )
}


export default category
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
