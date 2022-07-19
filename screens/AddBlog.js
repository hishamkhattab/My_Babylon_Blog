import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, TextInput,Alert, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Button, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import { AntDesign } from '@expo/vector-icons'; 


import { CircleButton, RectButton } from '../components';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants';
import { addBlog, getAllImages } from "../store/postSlice";




const AddBlog = ({ navigation }) => {

    const dispatch = useDispatch();
    const [addBlogError, setAddBlogError] = useState(false);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogSnippet, setBlogSnippet] = useState('');
    const [blogBody, setBlogBody] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogCreator, setBlogCreator] = useState('');
    const imageID = Math.floor(Math.random() * 1000);

    const handleAddBlog = async () => {
        //if title length lesss than 5
        //if created by if less than 3
        //if short desciption is less than 5
        // if category is less than 3
        //if body is less than 10
        if (blogTitle.length > 5 &&
            blogCreator.length > 3 &&
            blogSnippet.length > 5 &&
            blogCategory.length > 3 &&
            blogBody.length > 10 &&
            !addBlogError
        ) {
            const date = new Date();
            const blogDate = date.toLocaleString();
            const blog = {
                title: blogTitle,
                creator: blogCreator,
                category: blogCategory.split(" "),
                body: blogBody,
                snippet: blogSnippet,
                date: blogDate,
                views: 0,
                rating: 0,
                imageID: imageID
            };

            await takePhoto();
            dispatch(getAllImages(imageID));
            dispatch(addBlog(blog));
            navigation.goBack();
        } else {
            setAddBlogError(true);
        }
    };


    useEffect(() => {
        const checkPermisson = async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                
                if (status !== "granted") {
                    Alert.alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        };

        checkPermisson();

    }, []);


    const takePhoto = async () => {
        let imageResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        });

        if (!imageResult.cancelled) {
            // 1) get an instance of the storage
            const storage = getStorage();
            const fileRef = ref(storage, `image-${imageID}.jpg`);

            // 2) convert the image into a string of bytes (blob) ref
            const img = await fetch(imageResult.uri);
            const blob = await img.blob();
            // 3) upload the (blob)
            await uploadBytes(fileRef, blob);
            Alert.alert("Success");
        }
        
    };


    return (
        <ScrollView>
            <View style={{ height: 300, backgroundColor: COLORS.dark, borderBottomLeftRadius: SIZES.font, borderBottomRightRadius: SIZES.font, zIndex: -1, position: "absolute", top: 0, left: 0, right: 0, }}></View>
            <CircleButton
                handlePress={() => navigation.goBack()}
                left={15}
                top={30}
            >
                <AntDesign name="back" size={24} color={COLORS.white} />
            </CircleButton>
            
            <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 60, }}>
                <Text style={{ color: COLORS.white, fontSize: SIZES.extraLarge, fontFamily: FONTS.semiBold, textTransform: "uppercase" }}>Create your blog</Text>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ paddingHorizontal: SIZES.font, marginTop: SIZES.large }}>
                        <Text style={{ color: COLORS.white }}>Blog Title:</Text>
                        <TextInput
                            style={{ ...styles.inputText, backgroundColor: COLORS.white }}
                            placeholderTextColor="#d3d3d3"
                            placeholder="Make it something catchy..."
                            onChangeText={(val) => {
                                setAddBlogError(false);
                                setBlogTitle(val.trim())
                            }}
                        />
                        <Text style={{ color: COLORS.white }}>Created By:</Text>
                        <TextInput
                            style={{ ...styles.inputText, backgroundColor: COLORS.white }}
                            placeholderTextColor="#d3d3d3"
                            placeholder="Your Name..."
                            onChangeText={(val) => {
                                setAddBlogError(false);
                                setBlogCreator(val.trim())
                            }}
                        />
                        <Text>Short description:</Text>
                        <TextInput
                            style={styles.inputText}
                            multiline
                            placeholderTextColor="#d3d3d3"
                            placeholder="Short description for your blog..."
                            onChangeText={(val) => {
                                setAddBlogError(false);
                                setBlogSnippet(val.trim())
                            }}
                        />
                        <Text>Category:</Text>
                        <TextInput
                            style={styles.inputText}
                            placeholderTextColor="#d3d3d3"
                            placeholder="Pick the most relaited category to descripe your blog..."
                            onChangeText={(val) => {
                                setAddBlogError(false);
                                setBlogCategory(val.trim())
                            }}
                        />
                        <Text>Blog Body:</Text>
                        <TextInput
                            style={styles.inputText}
                            multiline
                            placeholderTextColor="#d3d3d3"
                            placeholder="Write your amazing blog..."
                            onChangeText={(val) => {
                                setAddBlogError(false);
                                setBlogBody(val.trim())
                            }}
                        />
                        {addBlogError &&
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>*Title field should be more than 5 characters.</Text>
                                <Text style={styles.errorText}>*Created By field should be more than 3 characters.</Text>
                                <Text style={styles.errorText}>*short desciption field should be more than 5 characters.</Text>
                                <Text style={styles.errorText}>*category field should be more than 3 characters.</Text>
                                <Text style={styles.errorText}>*body field should be more than 10 characters.</Text>
                            </View>
                        }
                        <RectButton
                            handlePress={handleAddBlog}
                            text="Send"
                            minWidth={170}
                            fontSize={SIZES.large}
                            {...SHADOWS.dark}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    inputText: {
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        color: COLORS.dark,
        width: "100%",
        borderColor: COLORS.dark,
        borderWidth: 0.5,
        marginVertical: SIZES.extraLarge,
        borderRadius:SIZES.font,
    },
    errorContainer: {
        marginLeft: SIZES.large,
        marginBottom: SIZES.large
    },
    errorText: {
        fontFamily:FONTS.light,
        fontSize: SIZES.font - 2,
        marginBottom:1,
        color: COLORS.primary,
        textTransform: "capitalize",
    }
})

export default AddBlog