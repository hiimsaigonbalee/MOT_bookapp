// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Image } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const UpdateUserInfoScreen = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [image, setImage] = useState(null);

//     const handleImagePick = () => {
//         launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else {
//                 setImage(response.assets[0].uri);
//             }
//         });
//     };

//     const handleUpdate = () => {
//         // Xử lý cập nhật thông tin người dùng ở đây
//         Alert.alert('Thông báo', 'Thông tin đã được cập nhật thành công!');
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Cập nhật thông tin người dùng</Text>
//             <TouchableOpacity onPress={handleImagePick}>
//                 <View style={styles.imagePicker}>
//                     {image ? (
//                         <Image source={{ uri: image }} style={styles.image} />
//                     ) : (
//                         <Text style={styles.imagePlaceholder}>Chọn hình ảnh</Text>
//                     )}
//                 </View>
//             </TouchableOpacity>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Tên"
//                 value={name}
//                 onChangeText={setName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//             />
//             <TouchableOpacity style={styles.button} onPress={handleUpdate}>
//                 <Text style={styles.buttonText}>CẬP NHẬT THÔNG TIN</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f0f4f8',
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     imagePicker: {
//         width: 100,
//         height: 100,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     image: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 5,
//     },
//     imagePlaceholder: {
//         color: '#aaa',
//     },
//     input: {
//         width: '100%',
//         padding: 15,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginBottom: 15,
//         backgroundColor: '#fff',
//     },
//     button: {
//         backgroundColor: '#007bff',
//         padding: 15,
//         borderRadius: 5,
//         width: '100%',
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: 'bold',
//     },
// });

// export default UpdateUserInfoScreen;