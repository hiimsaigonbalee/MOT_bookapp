import axios from 'axios';
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { memo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

const BookingItem = ({item}:any) => (
  <>
  <Stack.Screen options={{
     headerTransparent: true,
        headerTitle:"",}} key={item.madatphong}>
  </Stack.Screen>
  <View style={styles.bookingItem} key={item.idphong}>
    <View style={styles.bookingHeader}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
    <Text style={styles.statusBadge}>{item.status}</Text>
    <Text style={styles.bookingCode}>Mã đặt phòng: {item.madatphong}</Text>
    <Text style={styles.hotelName}>{item.hotelName}</Text>
    <Text style={styles.stayType}>{item.stayType}</Text>
    <View style={styles.priceContainer}>
      <Icon name="money" type="font-awesome" color="#A00000" size={16} />
      <Text style={styles.price}>{item.cost}</Text>
    </View>
    <TouchableOpacity style={styles.reviewButton}>
      <Text style={styles.reviewButtonText}>Đánh giá</Text>
    </TouchableOpacity>
  </View>
  </>
  
);

  var dem:number = 0
const  Historys =()=>{
const {id} =useLocalSearchParams()
const [his,setHis]=useState<any>([])
const [roomHis,setRoomhis] = useState<any>([])
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
    Alert.alert('Thông Báo','Vui Lòng chờ trong giây lát')
  })
}
const getAPIhis= async (idphong:any)=>{
  await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+idphong)
  .then(res=>{
      setRoomhis((e:any)=>[...e,res.data])
  })
  .catch(err=>{
    Alert.alert('Thông Báo','Vui Lòng chờ trong giây lát')
  })
}
useFocusEffect(
  React.useCallback(()=>{
    console.log('render')
    setHis([])
    getAPIHisuser()
    if(his.length !=0){
      his.map((item:any)=>{
        getAPIhis(item.idphong)
      })
  }
  },[])
)

  return (
      <FlatList
        data={his}
        renderItem={({ item }) => <BookingItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
    // <View>
    //   <Text>sdadas</Text>
    // </View>
  );
}

export default memo(Historys)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
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
    color: '#999',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    color: '#000',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  bookingCode: {
    fontSize: 14,
    marginBottom: 5,
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

