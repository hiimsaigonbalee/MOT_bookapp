import React, { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Props, RadioButton } from "react-native-paper";
import Animated, { SlideInDown } from "react-native-reanimated";
import { router, Stack } from "expo-router";
import axios from "axios";
import { Listingtype } from "@/types/listingtype";
import listingData from "@/data/hinhanh.json";

const BookingPopup = (props: any) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [confirm, setConfirm] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [showprice, setShowprice] = useState(0);
  const [random, setRandom] = useState(
    `${Math.floor(Math.random() * 999999) + 100000}`
  );
  const listing: Listingtype | any = (listingData as Listingtype[]).find(
    (item) => item.id === props.idphong
  );

  const formatCurrencyVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const xacnhan = () => {
    router.back();
  };

  const Confirmbooking = async () => {
    var timedate = new Date();
    if (showprice != 0) {
      await axios
        .post(
          "https://6641d7633d66a67b34352311.mockapi.io/api/todolist/checkin",
          {
            idphong: props.idphong,
            iduser: props.iduser,
            date: `${timedate.getDate()}/${
              timedate.getUTCMonth() + 1
            }/${timedate.getFullYear()}`,
            madatphong: random,
            image: listing.image,
            location: listing.location,
            name: listing.name,
            Hourorder: `${timedate.getHours()}:${timedate.getMinutes()}`,
            timecheckin: checkInDate.toLocaleDateString(),
            timecheckout: checkOutDate.toLocaleDateString(),
            cost: formatCurrencyVND(showprice),
          }
        )
        .then((res) => {
          setTimeout(() => {
            setConfirm(true);
          }, 500);
          if (paymentMethod === "nganhang") {
            router.navigate({
              pathname: "/QRcode",
              params: { id: props.iduser },
            });
          }
        });
    } else {
      Alert.alert("Thông Báo", "Vui lòng chọn lại ngày nhận và trả phòng");
    }
  };

  const onCheckInChange = (event: any, selectedDate: any) => {
    setShowCheckInPicker(false);
    if (selectedDate) {
      setCheckInDate(selectedDate);
    }
  };

  const onCheckOutChange = (event: any, selectedDate: any) => {
    setShowCheckOutPicker(false);
    if (selectedDate) {
      setCheckOutDate(selectedDate);
      const price = selectedDate.getDate() - checkInDate.getDate();
      setShowprice(price * listing.price * 1000);
    }
  };
  useEffect(() => {}, [confirm]);
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      ></Stack.Screen>
      <Animated.View
        style={styles.modalContainer}
        entering={SlideInDown.delay(200)}
      >
        <View>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Đặt Phòng Khách Sạn</Text>
            {/* Ngày nhận phòng */}
            <TouchableOpacity
              onPress={() => setShowCheckInPicker(true)}
              style={styles.dateButton}
            >
              <Text>Ngày nhận phòng: {checkInDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showCheckInPicker && (
              <DateTimePicker
                value={checkInDate}
                mode="date" // Hoặc "time" để chọn giờ
                onChange={onCheckInChange}
              />
            )}

            {/* Ngày trả phòng */}
            <TouchableOpacity
              onPress={() => setShowCheckOutPicker(true)}
              style={styles.dateButton}
            >
              <Text>Ngày trả phòng: {checkOutDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showCheckOutPicker && (
              <DateTimePicker
                value={checkOutDate}
                mode="date"
                display="default"
                onChange={onCheckOutChange}
              />
            )}

            {/* Phương thức thanh toán */}
            <Text style={styles.subtitle}>Phương thức thanh toán:</Text>
            <RadioButton.Group
              onValueChange={(value) => setPaymentMethod(value)}
              value={paymentMethod}
            >
              <View style={styles.radioOption}>
                <RadioButton value="nganhang" />
                <Text>Ngân Hàng</Text>
                <RadioButton value="cash" />
                <Text>Tiền Mặt</Text>
              </View>
            </RadioButton.Group>
            {showprice != 0 ? (
              <Text style={styles.price}>{formatCurrencyVND(showprice)}</Text>
            ) : null}
            <TouchableOpacity style={styles.button} onPress={Confirmbooking}>
              <Text style={styles.text}>Xác nhận đặt phòng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      {confirm && (
        <>
          <View style={[styles.container1, { opacity: 0.6 }]}></View>
          <View style={styles.container2}>
            <Text style={styles.title1}>Đặt Phòng Thành Công</Text>
            <Text style={styles.quote}>{listing.name}</Text>
            <Text style={styles.quote}>Mã Đặt Phòng: {random}</Text>
            <Text style={styles.quote}>
              Thời Gian Nhận Phòng: {checkInDate.toLocaleDateString()}
            </Text>
            <Text style={styles.quote}>
              Thời Gian Trả Phòng: {checkOutDate.toLocaleDateString()}
            </Text>
            <Text style={styles.quote}>
              Thành Tiền: {formatCurrencyVND(showprice)}
            </Text>
            <TouchableOpacity style={styles.button1} onPress={xacnhan}>
              <Text style={styles.buttonText}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: "#9edce8",
    elevation: 3,
    top: 15,
  },
  price: {
    fontSize: 25,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  modalContainer: {
    flex: 1.13,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "white",
  },
  modalContent: {
    width: 300,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "ultralight",
  },
  dateButton: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
  },
  closeText: {
    color: "white",
  },
  container1: {
    position: "absolute",
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 420,
    height: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    display: "flex",
    zIndex: 1,
  },
  container2: {
    position: "absolute",
    backgroundColor: "#F9F9F9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 2,
    top: 280,
    left: 40,
    width: 335,
  },
  title1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6B4F4F",
    marginBottom: 10,
  },
  quote: {
    fontSize: 16,
    color: "#6B4F4F",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 20,
  },
  button1: {
    borderTopWidth: 1,
    borderTopColor: "#6B4F4F",
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B4F4F",
  },
});

export default memo(BookingPopup);
