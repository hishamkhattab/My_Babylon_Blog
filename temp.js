// import { Platform } from "expo-modules-core";
// import { useEffect } from "react";
// import * as ImagePicker from "expo-image-picker";
// import { async, uuidv4 } from "@firebase/util";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// export const Temp = () => {

//     const [image, settImage] = useState(null);
//     const [uploading, setUploading] = useState(false);


//     useEffect(() => {
//         if (Platform.OS !== "web") {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if (status !== "granted") {
//                 Alert.alert("Sorry, we need camera roll permissions to make this work!");
//             }
//         }
//     }, []);

//     const maybeRenderUploadingOverlay = () => {
//         if (uploading) {
//             <View style={{
//             backgroundColor: "rgba(0,0,0,0.4)",
//             alignItems: "center",
//             justifyContent: "center",
//             }}>
//                 <ActivityIndicator/>

//             </View>
//         }
//     };

//     const maybeRenderImage = () => {
//         if (!image) return

//         return (
//             <>

//             </>
//         )
//     };

//     const takePhoto = async() => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             allowsEditing: true,
//             mediaTypes: ImagePicker.image
//         });

//         handleImagePicker(result)
//     };

//     const handleImagePicker = async (result) => {
//         try {
//             setUploading(true);

//             if (!result.cancelled) {
//                 const uploadURL = await uploadImageAsync(result.uri);
//                 settImage(uploadURL);
//             }
//         } catch (error) {
//             // console.log(error);
//             Alert.alert(error)
//         } finally {
//             setUploading(false);
//         }
//     };

//     const uploadImageAsync = async (uri) => {
//         const blob = await new Promise((resolve, reject) => {
//             const xhr = new XMLHttpRequest();
//             xhr.onload = function () {
//                 resolve(xhr.response)
//             };

//             xhr.onerror = function (e) {
//                 console.log(e);
//                 reject(new TypeError("Network request failed"));
//             };

//             xhr.responseType = "blob";
//             xhr.open("GET", uri, true);
//             xhr.send(null);
//         });

//         const fileRef = ref(getStorage(), uuidv4());
//         const result = await uploadBytes(fileRef, blob);

//         blob.close();

//         return await getDownloadURL(fileRef);
//     };
//     return (
//         <>
//             {!image && (
//                 <>
//                     Example: upload ImagePicker Result
//                 </>
//             )}

//             <Button onPress={takePhoto}>

//                 {maybeRenderImage}
//                 {maybeRenderUploadingOverlay}
//             </Button>
//         </>
//     )
// }