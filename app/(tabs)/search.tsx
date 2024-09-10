import React from "react";
import { View,Text,StyleSheet } from "react-native";

const search = ()=>{
    return(
        <View style={styles.container}>
            <Text>search</Text>
        </View>
    )
}


export default search
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
