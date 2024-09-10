import { StyleSheet,Text,View,ScrollView } from "react-native";
import React, { useEffect } from "react";
import Colors from "@/constants/Colors";
import diadiem from "@/data/diadiem";
import { useRef,useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    onDanhsachchanged:(danhsach:string)=>void
    indexcheckdd:number
}
const Danhsachbutton = ({onDanhsachchanged,indexcheckdd}:Props)=>{
    const scrollRef = useRef<ScrollView>(null);
    const [checkdd,setCheckdd] = useState(Number)
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);

    const thaydoi = (index:number)=>{
        const selected = itemRef.current[index] ;
        indexcheckdd = index
        setCheckdd(indexcheckdd)
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x:x, y: 0, animated: true });
          });
          onDanhsachchanged(diadiem[index].title)
    }
    useEffect(()=>{
        setCheckdd(indexcheckdd)
        console.log(checkdd)
    },[indexcheckdd])
    return( 
        <View>
            <Text style={styles.title}> Khách Sạn và Homestay</Text>
            <ScrollView  ref={scrollRef} horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                    gap: 20,
                    paddingVertical: 10,
                    marginBottom: 10,
                    }} > 
                {
                    diadiem.map((item,index)=>(
                        <TouchableOpacity style={checkdd === index?styles.categoryBtnActive:styles.categoryBtn}
                        key={index}
                        ref={(el) => itemRef.current[index] = el} 
                        onPress={()=>{thaydoi(index)}}>
                            <MaterialCommunityIcons name={item.iconName as any} size={20} color={Colors.black}></MaterialCommunityIcons>
                            <Text style={checkdd===index?styles.categoryBtnTxtActive:styles.categoryBtnTxt}>{item.title}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}
export default Danhsachbutton

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.black,
      },
      categoryBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: "#333333",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      categoryBtnActive: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: "#333333",
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        
      },
      categoryBtnTxt: {
        marginLeft: 5,
        color: Colors.black,
      },
      categoryBtnTxtActive: {
        marginLeft: 5,
        color: Colors.black,
      },
})