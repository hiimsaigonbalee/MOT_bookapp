import React from "react";
import { View,Text,StyleSheet } from "react-native";

const bookmarks = ()=>{
    return(
        <View style={styles.container}>
            <Text>bookmarks</Text>
        </View>
    )
}


export default bookmarks
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
