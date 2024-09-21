import {
  Alert,
  Button,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Listingtype } from "@/types/listingtype";
import listingData from "@/data/hinhanh.json";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import axios from "axios";
import BookingPopup from "../Bookingpopup";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 300;

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
  ]
}


const ListingDetails = () => {
  const { idphong } = useLocalSearchParams(); //iduserphong
  const {id} = useLocalSearchParams()
  const [booking,setBooking] = useState(false)
  const [booking1,setBooking1] = useState(false)
  const listing:Listingtype | any = (listingData as Listingtype[]).find(
    (item) => item.id === id
  );
  const [lutru,setLuutru] = useState<Luttru>()

  const bookphong = ()=>{
    if(booking){
      setBooking(false)
      setBooking1(false)
    }
    else{
       setBooking(true)
       setTimeout(()=>{
        setBooking1(true)
       },530)
    }
   
  }
  const getAPIcheckbookmark =  async ()=>{
    const a = await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+idphong)
    .then(res=>{
        setLuutru(res.data)
    })
    .catch(err=>{
      return 0
    })
    }
  const checkbookmark = ()=>{
    const x  = lutru?.bookmark.find((item)=>item.idphong == id)
    if(x == undefined){
      let y = lutru?.bookmark
      y?.push({"idphong":`${id}`})
      axios.put('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+idphong,{
          bookmark:y
      })
      .then(res=>{
        Alert.alert('Thông báo','Đã thêm Vào Bookmark')
      })
      .catch(err=>{
        return 0
      })
    }
    else{
      Alert.alert('Thông báo','Đã có trong Bookmark')
    }
  }
  useEffect(()=>{
    getAPIcheckbookmark()
  })
  const router = useRouter();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {router.back()
              }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 10,
                padding: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: 6,
                  borderRadius: 10,
                }}
              >
                <Feather name="arrow-left" size={20} />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {checkbookmark()}}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: 10,
                padding: 4,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.white,
                  padding: 6,
                  borderRadius: 10,
                }}
              >
                <Ionicons name="bookmark-outline" size={20} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <Animated.Image
            source={{ uri: listing.image }}
            style={[styles.image, imageAnimatedStyle]}
          />
          <View style={styles.contentWrapper}>
            <Text style={styles.listingName}>{listing.name}</Text>
            <View style={styles.listingLocationWrapper}>
              <FontAwesome5
                name="map-marker-alt"
                size={18}
                color={Colors.primaryColor}
              />
              <Text style={styles.listingLocationTxt}>{listing.location}</Text>
            </View>

            <View style={styles.highlightWrapper}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.highlightIcon}>
                  <Ionicons name="time" size={18} color={Colors.primaryColor} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Ngày</Text>
                  <Text style={styles.highlightTxtVal}>
                    {listing.duration} Days
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.highlightIcon}>
                  <FontAwesome
                    name="users"
                    size={18}
                    color={Colors.primaryColor}
                  />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Person</Text>
                  <Text style={styles.highlightTxtVal}>{listing.person}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.highlightIcon}>
                  <Ionicons name="star" size={18} color={Colors.primaryColor} />
                </View>
                <View>
                  <Text style={styles.highlightTxt}>Rating</Text>
                  <Text style={styles.highlightTxtVal}>
                    {listing.rating} 
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.listingDetails}>{listing.description}</Text>
          </View>
        </Animated.ScrollView>
      </View>

      <Animated.View style={styles.footer} entering={SlideInDown.delay(200)}>
        <TouchableOpacity
          onPress={bookphong}
          style={[styles.footerBtn, styles.footerBookBtn]}
        >
          <Text style={styles.footerBtnTxt}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.footerBtn}>
          <Text style={styles.footerBtnTxt}>${listing.price}</Text>
        </TouchableOpacity>
      </Animated.View>
      {booking&& <BookingPopup iduser={idphong} idphong={id}></BookingPopup>}
      {booking1&&
        <TouchableOpacity onPress={bookphong} style={styles.closeButton}>
          <Text style={styles.closeText}>Đóng</Text>
        </TouchableOpacity>
      }
       
    </>
  );
}

export default memo(ListingDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: width,
    height: IMG_HEIGHT,
  },
  contentWrapper: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  listingName: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.black,
    letterSpacing: 0.5,
  },
  listingLocationWrapper: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  listingLocationTxt: {
    fontSize: 14,
    marginLeft: 5,
    color: Colors.black,
  },
  highlightWrapper: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  highlightIcon: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
  },
  highlightTxt: {
    fontSize: 12,
    color: "#999",
  },
  highlightTxtVal: {
    fontSize: 14,
    fontWeight: "600",
  },
  listingDetails: {
    fontSize: 16,
    color: Colors.black,
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: width,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  footerBookBtn: {
    flex: 2,
    backgroundColor: Colors.primaryColor,
    marginRight: 20,
  },
  footerBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  containerpopup: {
    justifyContent:'center',
    alignItems: 'center',
    display:'flex',
    marginBottom:200
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  dateButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    position:'absolute',
    display:'flex',
    height:30,
    left:150,
    bottom:10,
    padding: 5,
    backgroundColor: '#ff5c5c',
    borderRadius: 5,
    width:100,
    alignItems:'center',
    justifyContent:'center'
  },
  closeText: {
    color: 'white',
    fontSize:15,
  },
});