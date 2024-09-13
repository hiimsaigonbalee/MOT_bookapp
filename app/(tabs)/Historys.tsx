import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const BookingItem = ({item}) => (
  <View style={styles.bookingItem}>
    <View style={styles.bookingHeader}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
    <Text style={styles.statusBadge}>{item.status}</Text>
    <Text style={styles.bookingCode}>Mã đặt phòng: {item.bookingCode}</Text>
    <Text style={styles.hotelName}>{item.hotelName}</Text>
    <Text style={styles.roomType}>{item.roomType}</Text>
    <Text style={styles.stayType}>{item.stayType}</Text>
    <View style={styles.priceContainer}>
      <Icon name="money" type="font-awesome" color="#A00000" size={16} />
      <Text style={styles.price}>{item.price}</Text>
    </View>
    <TouchableOpacity style={styles.reviewButton}>
      <Text style={styles.reviewButtonText}>Đánh giá</Text>
    </TouchableOpacity>
  </View>
);

export default function Historys() {
const {id} =useLocalSearchParams()
const [his,setHis]=useState([])
const getAPIuser= async ()=>{
  await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+id)
  .then(res=>{
        setHis(res.data.history)
  })
}
const getAPIhis= async (idphong:any)=>{
  await axios.get('https://66dbfa2047d749b72aca6935.mockapi.io/webappsale/user/'+idphong)
  .then(res=>{
      
  })
}
useEffect(()=>{
  getAPIuser()
  if(his.length !=0)
    his.map((item:any)=>{
      getAPIhis(item.idphong)
  })
})



const [bookings,setBooking] = useState([])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" type="material" color="#000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đặt phòng của tôi</Text>
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookingItem item={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

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
