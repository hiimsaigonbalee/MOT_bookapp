import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View,Text,StyleSheet,Image, TouchableOpacity } from "react-native";
import listing  from "@/data/hinhanh.json"
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FlatList } from "react-native";


const Bookmark = ()=>{
    const {username} = useLocalSearchParams()
    const {id} = useLocalSearchParams()
    const [Listp,setListphong] = useState([])
    const [FilteredRO,setFiltered] = useState<any>([])
    const getAPIuser= async ()=>{
        await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
        .then(res=>{
                setListphong(res.data.bookmark)
        })
      }
      const getAPIroom= async (idphong:string)=>{
        await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/hinhanh/'+idphong)
        .then((res)=>{
            setFiltered((e:any)=>[...e,res.data])
        })
      }
    useEffect(()=>{
        setFiltered([])
        getAPIuser()
        Listp.map((item:any)=>{
            getAPIroom(item.idphong)
        })
       
    },[])

const renderItems = ({item}:any)=>{
    return(
        <>
        <Stack.Screen options={{
            headerTransparent: true,
            headerTitle:""}}>
            </Stack.Screen>
            <View style={styles.container}>

            <TouchableOpacity style={styles.item}>
                <View style={styles.container}>
                    <Image source={{uri:item.image}} style={styles.image}></Image>
                    <Text style={styles.itemTxt}  numberOfLines={3} ellipsizeMode="tail">{item.name}</Text>
                   </View>
                   <View
                   style={{ flexDirection: "row", justifyContent: "space-between" }}
                   >
                   <View style={{ flexDirection: "row", alignItems: "center" }}>
                       <FontAwesome5
                       name="map-marker-alt"
                       size={18}
                       color={Colors.primaryColor}
                       />
                       <Text style={styles.itemLocationTxt}>{item.location}</Text>
                   </View>
                   <Text style={styles.itemPriceTxt}>${item.price}</Text>
                   </View>
               </TouchableOpacity>
            </View>
        
        </>
    )
}
    return(
        <View>
            <FlatList data={FilteredRO} renderItem={renderItems}  
        showsHorizontalScrollIndicator={false} ></FlatList>
      </View>
    )
}
export default Bookmark
const styles = StyleSheet.create({
    background:{
        backgroundColor:'white'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    itemLocationTxt: {
        fontSize: 12,
        marginLeft: 5,
      },
      bookmark1: {
        position: "absolute",
        display:"flex",
        top: 185,
        right: 30,
        backgroundColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.white,
      },
      itemPriceTxt: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.primaryColor,
      },
      item: {
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 10,
        marginRight: 20,
        width: 300,
      },
      image: {
        width: 400,
        height: 200,
        borderRadius: 10,
        marginBottom: 30,
        left:10
      },
      itemTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
      },
})
