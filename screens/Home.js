import { useEffect, useState } from "react";
import {StyleSheet,View,FlatList, SafeAreaView, Modal, TouchableWithoutFeedback, Keyboard, TextInput, Alert} from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { EvilIcons } from '@expo/vector-icons'; 

//components
import { FocusStatusBar, BlogCard, HomeHeader } from "../components";

//constant
import { COLORS,SIZES } from "../constants";

//reducer
import { getAllBlogs, addBlog,deleteBlog } from "../store/postSlice";




const Home = () => {

    const { blogs, imagesData } = useSelector(state => state.blogs);
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [dispatch]);


    return (
        <SafeAreaView style={styles.container}>
            <Modal
                style={styles.modal}
                animationType="fade"
                visible={showModal}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.modalView}>
                    <TextInput 
                        placeholder="Enter your name"
                        onChangeText={(val) => setUsername(val.trim())}
                        style={styles.inputText}
                        placeholderTextColor="#d3d3d3"
                        />
                        <EvilIcons
                            name="arrow-right"
                            size={34}
                            style={{alignSelf:"center"}}
                            color="black" s onPress={() => {
                                if (username.length > 3) {
                                    setShowModal(false);
                                } else {
                                    Alert.alert("Please Enter your Name..")
                                }
                        }} />
                    </View>

                </TouchableWithoutFeedback>
            </Modal>
            <FocusStatusBar backgroundColor={COLORS.dark} barStyle="dark-content"/>
            
            <View style={styles.container}>
                {/* Blog List */}
                <View style={{ zIndex: 0 }}>
                    <FlatList
                        data={blogs}
                        renderItem={({ item }) => <BlogCard data={item} imageData={imagesData}/>}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        ListHeaderComponent={<HomeHeader name={username}/>}
                    />
                </View>

                {/* background color */}
                <View style={styles.backgroundContainer}>
                    <View style={styles.backgroundFirstHalf}></View>
                    <View style={styles.backgroundSecondHalf}></View>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1
    },
    backgroundFirstHalf: {
        height: 300,
        backgroundColor: COLORS.dark,
    },
    backgroundSecondHalf: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent:"centers",
        padding: SIZES.extraLarge,
        // flexDirection:"rosw",
    },
    modalView: {
        alignSelf: "center",
        marginVertical: "50%",
        flexDirection: "row",
        justifyContent: "center",
        padding: SIZES.font,
    },
    inputText: {
        borderBottomWidth:1,
        minWidth: 150,
        paddingHorizontal: SIZES.extraLarge,
        paddingVertical: SIZES.base,
        color: COLORS.dark,
        borderColor: COLORS.dark,
        marginVertical: SIZES.font,
        fontSize: SIZES.large
    }
});

export default Home;
