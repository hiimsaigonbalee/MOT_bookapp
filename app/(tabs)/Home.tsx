import React, { ReactElement, ReactEventHandler, useEffect } from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image } from "react-native"; 
import { router, Stack, useLocalSearchParams } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { TextInput } from "react-native";
import Danhsachbutton from "@/components/Danhsachbutton";
import { useState,useLayoutEffect,useCallback } from "react";
import DSphong from "@/components/DSPhongdiadiem";
import dsphongdiadiems from '@/data/hinhanh.json'
import GroupListings from "@/components/Grouplist";
import groupData from "@/data/groups.json";
import { Listingtype } from "@/types/listingtype";
import axios  from "axios";
import { useFocusEffect } from '@react-navigation/native';
interface Listing {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  price: string;
  duration: string;
  location: string;
  category: string;
}


const Home = ({route}:any)=>{
  const {username} = route.params
  const {id} = route.params
  const headerHeight = useHeaderHeight()
  const [diadiems, setdiadiem] = useState("All");
  const [image,setIM] = useState(String)
  const [timkiem,setTimkiem]= useState('')
  const [indexdd,setIndexdd] = useState(0)
  const [DStheodiadiem,setDStheodiadiem] = useState<Listingtype[]>([])
  const changediadiem = (dd:string)=>{
    setdiadiem(dd)
  }
  const getAPIuser= () =>{
    axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
      .then(res=>{
        setIM(res.data.image)
      })
  }
  const getAPI=  (tendiadiem:string)=>{
     axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/hinhanh')
      .then(res=>{
        res.data.map((item:any)=>{
          if(item.location == tendiadiem){
            setDStheodiadiem((e)=>[...e,item])
          }
        })
      })
  }
  const getAPIall=  ()=>{
     axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/hinhanh')
    .then(res=>{
      res.data.map((item:any)=>{
        setDStheodiadiem((e)=>[...e,item])
      })
    })
}
const checktimkiem = ()=>{
  if(timkiem == "Đà Lạt" ){
    setdiadiem(timkiem)
    setIndexdd(2)
  }
  if(timkiem == "Nha Trang" ){
    setdiadiem(timkiem)
    setIndexdd(1)
  }
  if(timkiem == "Hà Nội" ){
    setdiadiem(timkiem)
    setIndexdd(3)
  }
  if(timkiem == "Sapa" ){
    setdiadiem(timkiem)
    setIndexdd(4)
  }
  if(timkiem == "Bình Dương" ){
    setdiadiem(timkiem)
    setIndexdd(5)
  }
  if(timkiem == "Hội An" ){
    setdiadiem(timkiem)
    setIndexdd(6)
  }
  if(timkiem == "Phú Quốc" ){
    setdiadiem(timkiem)
    setIndexdd(7)
  }

}
const profilescreen = ()=>{
  console.log(username)
  console.log(id)
}
useFocusEffect(
  React.useCallback(()=>{
    getAPIuser()
    if(diadiems === 'All'){
      setDStheodiadiem([])
      getAPIall()
      }
    else{
    setDStheodiadiem([])
    getAPI(diadiems)
  }
  },[diadiems])
)
    return(
      <>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle:"",
        headerLeft:()=>(
          <TouchableOpacity onPress={profilescreen} style={{marginTop:10,marginLeft:10}}>
            <Image source={{uri:image,}} 
            style={{ width: 40, height: 40, borderRadius: 15 }}>
            </Image>
          </TouchableOpacity>

        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              marginRight: 20,
              marginTop:10,
              backgroundColor: Colors.white,
              padding: 8,
              borderRadius: 10,
              shadowColor: "#171717",
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              height:35,
            }}
          >
            <Ionicons name="notifications" size={20} color={Colors.black} />
          </TouchableOpacity>
        ),
      }}>

      </Stack.Screen>
      <View style={[styles.container, {paddingTop:headerHeight}]}>
        <View  style={styles.searchSectionWrapper} >
          <View  style={styles.searchBar} > 
          <Ionicons name="search"
                size={18}
                style={{ marginRight: 5, marginTop:5 }}
                color={Colors.black} />
          <TextInput placeholder="Tìm nơi bạn muốn tới" onChangeText={text=>{setTimkiem(text)}} onSubmitEditing={checktimkiem}></TextInput>
          </View>
          {/* <TouchableOpacity onPress={() => {}} style={styles.filterBtn}>
              <Ionicons name="options" size={28} color={Colors.black} />
            </TouchableOpacity> */}
        </View>
        <Danhsachbutton onDanhsachchanged={changediadiem} indexcheckdd={indexdd}></Danhsachbutton>
        <DSphong listings={DStheodiadiem} diadiem={id} ></DSphong>
        <GroupListings listings={groupData} />
      </View>
      </>
      
    )
}


export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
  },
   inputs:{
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
   },
   searchSectionWrapper: {
    flexDirection: "row",
    marginVertical: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
  },
  filterBtn: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 10,
    marginLeft: 20,
  },
})
