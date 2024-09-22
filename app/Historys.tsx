import axios from 'axios';
import { router, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Animated, Button, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import AntDesign from '@expo/vector-icons/AntDesign';
  var dem:number = 0
const  Historys =()=>{
const {id} =useLocalSearchParams()
const [his,setHis]=useState<any>([])
const [alearDel,setalertDel] = useState(false)

const deleteHistory = async (id:string)=>{
    await axios.delete('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/checkin/'+id)
    .then((res)=>{
      setalertDel(true)
    })
    .catch(err=>{
      return 0
    })
}
const cleardel =()=>{
  setalertDel(false)
  setHis([])
  getAPIHisuser()
}
const getAPIHisuser=  ()=>{
   axios.get('https://6641d7633d66a67b34352311.mockapi.io/api/todolist/checkin')
  .then(res=>{
        res.data.map((item:any)=>{
          if(item.iduser == id){
            setHis((e:any)=>[...e,item])
          }
        })
  })
  .catch(err =>{
   return 0
  })
}
useFocusEffect(
  React.useCallback(()=>{
    setHis([])
    getAPIHisuser()
  },[])
)

const BookingItem = ({item}:any) => (
  <>
    <>
  <Stack.Screen options={{
     headerTransparent: true,
        headerTitle:"",}} key={item.madatphong}>
  </Stack.Screen>
  <View style={styles.bookingItem} key={item.idphong}>
    <View style={styles.bookingHeader}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.timeText}>{item.Hourorder}</Text>
    </View>
    <Animated.Image style={styles.statusBadge} source={{ uri: item.image}}></Animated.Image>
    <Text style={styles.bookingCode}>Mã đặt phòng: {item.madatphong}</Text>
    <Text style={styles.hotelName}>{item.name}</Text>
    <Text style={styles.stayType}>{item.timecheckin}  -  {item.timecheckout}</Text>
    <View style={styles.priceContainer}>
      <Icon name="money" type="font-awesome" color="#A00000" size={16} />
      <Text style={styles.price}>{item.cost}</Text>
    </View>
      <TouchableOpacity style={styles.delete} onPress={()=>{deleteHistory(item.id)}}>
      <AntDesign name="delete" size={24} color="black" style={styles.deleteicon} />
      </TouchableOpacity>
    <TouchableOpacity style={styles.reviewButton}>
      <Text style={styles.reviewButtonText}>Đánh giá</Text>
    </TouchableOpacity>
  </View>
  </>
    {alearDel&&
    <>
      <View style={[styles.container1,{opacity:0.9}]}></View>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thông Báo!</Text>
          <Text style={styles.modalText}>
            Đã Xóa Lịch Sử
          </Text>
          <Button title="Okay" onPress={cleardel} />
        </View>
    </>
}
  </>

  
);

  return (
      <FlatList
        data={his}
        renderItem={({ item }) => <BookingItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
  );
}

export default memo(Historys)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  container1: {
    position:'absolute',
    flex: 1,
    backgroundColor: 'white',
    width:500,
    height:500,
  },
  delete:{
    alignItems:'flex-end',
    marginBottom:15,
  },
  modalContent: {
    display:'flex',
    position:'relative',
    bottom:150,
    zIndex:1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  deleteicon:{
    backgroundColor:'red',
    borderRadius:10,
    padding:10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listContainer: {
    padding: 10,
  },
  bookingItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginTop:25,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold'
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    marginLeft:8,
    width:350,
    height:150,
  },
  bookingCode: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight:'600'
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomType: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  stayType: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A00000',
  },
  reviewButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});



function usefocusEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

