import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { memo, useEffect, useState,useLayoutEffect } from "react";
import { View,Text,StyleSheet,Image, TouchableOpacity,FlatList, Alert } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ListBookmItem = ({item}:any)=>(
    <>
      <Stack.Screen options={{
          headerTransparent: true,
          headerTitle:""}}>
      </Stack.Screen>
      <View style={styles.container} key={item.idphong}>
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

const Bookmarks = ()=>{
    const {id} = useLocalSearchParams()
    const [Listp,setListphong] = useState<any>([])
    const [FilteredRO,setFiltered] = useState<any>([])
    const [loading,setLoading] = useState(false)
    const getAPIuser =  async ()=>{
        await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
          .then((res)=>{
                setListphong(res.data.bookmark)
                setLoading(true)
              })
              .catch(err =>{
                Alert.alert('Thông Báo','Vui Lòng chờ trong giây lát')
              })
      }
      const getAPIroom=  async (idphong:string)=>{
        await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/hinhanh/'+idphong)
        .then((res)=>{
            setFiltered((e:any)=>[...e,res.data])
        })
        .catch(err =>{
          Alert.alert('Thông Báo','Vui Lòng chờ trong giây lát')
        })
      }

useLayoutEffect(()=>{
  getAPIuser()
  console.log('render')
  if(Listp.length !=0){
    Listp.map((item:any)=>{
    getAPIroom(item.idphong)})
  }
},[loading])


return(
      <FlatList 
      data={FilteredRO} 
      renderItem={({ item }) => <ListBookmItem item={item} />} 
      showsHorizontalScrollIndicator={false} ></FlatList>
    )
}
export default memo(Bookmarks)

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
function useLayouEffect(arg0: () => void, p0: never[]) {
  throw new Error("Function not implemented.");
}

