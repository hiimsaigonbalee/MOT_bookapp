import { StyleSheet,Text,View,ScrollView,FlatList, ListRenderItem,Image,Linking } from "react-native";
import React, { memo } from "react";
import Colors from "@/constants/Colors";
import diadiem from "@/data/diadiem";
import { useRef,useState,useEffect,useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons,FontAwesome5 } from "@expo/vector-icons";
import { Link } from 'expo-router';
import { Listingtype } from "@/types/listingtype";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";

interface Luttru 
  {
  username: string,
  password: string,
  image:string,
  id: string,
  bookmark: [
    {
      idphong: string
    }
  ],
  history: [
    {
      idphong: string
    }
  ],
}
type Props = {
    listings: any[];
    diadiem: any;
  };


const DSphong = ({listings,diadiem}:Props)=>{
const [loadlist,setLoadlist] = useState<Luttru>()
  const [loading, setLoading] = useState(false);
  // const getAPI= async ()=>{
  //   await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/hinhanh')
  //   .then(res=>{
  //     res.data.map((item:any)=>{
  //           setLoadlist((e)=>[...e,item])
  //     })
  //   })
  // }
  const getAPIuser= async ()=>{
    await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+diadiem)
    .then(res=>{
            setLoadlist(res.data)
    })
  }
  const checkbookmark=(id:string)=>{
    const x = loadlist?.bookmark.find((item=>item.idphong == id))
    if(x == undefined){
      return false
    }
  return true
  }
useEffect(()=>{
  console.log('Update Listing');
  setLoading(true);
  getAPIuser()
  setTimeout(() => {
  setLoading(false)}, 200)}
,[]);
 
const renderItems:ListRenderItem<Listingtype> = ({item})=>{
    return(
        <Link  href={{pathname:'/listing/linkdetail',params:{idphong:diadiem,id:item.id}} } asChild key={item.id}>
            <TouchableOpacity style={styles.item}>
                <View>
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
        </Link>
        
       
    )
}
    return(
        <View>
            <FlatList data={loading?[]:listings} renderItem={renderItems}  horizontal
        showsHorizontalScrollIndicator={false} ></FlatList>
      </View>
    )
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: Colors.white,
      padding: 10,
      borderRadius: 10,
      marginRight: 20,
      width: 220,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 30,
      },
      bookmark: {
        position: "absolute",
        display:'none',
        top: 185,
        right: 30,
        backgroundColor: Colors.primaryColor,
        padding: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: Colors.white,
      },
        bookmark1: {
          position: "absolute",
          display:"flex",
          top: 185,
          right: 30,
          backgroundColor: Colors.primaryColor,
          padding: 10,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: Colors.white,
        },
      itemTxt: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
      },
      itemLocationTxt: {
        fontSize: 12,
        marginLeft: 5,
      },
      itemPriceTxt: {
        fontSize: 12,
        fontWeight: "600",
        color: Colors.primaryColor,
      },
})
export default memo(DSphong)
