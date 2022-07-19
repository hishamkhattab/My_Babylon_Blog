import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { StyleSheet,View, Text, Image, FlatList, Modal, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';

//reducers
import { getCommentsForCertainPost,addComment } from "../store/commentSlice";


//icons
import { AntDesign } from '@expo/vector-icons'; 
import {FontAwesome} from "@expo/vector-icons";


import { SHADOWS, SIZES, assets, FONTS, COLORS } from '../constants';
import { FocusStatusBar,RectButton,CircleButton, BlogTitle, CommentSection} from "../components";

const DetailsHeader = ({ data, navigation,imageurl }) => (
    <View style={styles.HeaderContainer}>
        <Image
            source={{uri:imageurl}}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
        />

        <CircleButton
            handlePress={() => navigation.goBack()}
            left={15}
            top={30}
        >
            <AntDesign name="back" size={24} color={COLORS.white} />
        </CircleButton>

        <CircleButton right={10} top={30}>
            <FontAwesome name="heart-o" size={24} color={COLORS.white} />
        </CircleButton>
    </View>
);

const CommentHeader = () => (
    <View style={styles.commentHeaderContainer}>
        <Text style={styles.commentHeaderText}>Comments</Text>
    </View>
);

const DetailsScreen = ({ data, navigation,imageurl }) => (
    <>
        <FocusStatusBar
            barStyle="dark-content"
            backgroundColor={COLORS.secondary}
            // translucent={true}
        />


        <DetailsHeader data={data} navigation={navigation} imageurl={imageurl}/>


        <View style={styles.detailsContainer}>
            <View style={{alignSelf:"centers"}}>
                <BlogTitle
                    title={data.title}
                    subTitle={data.creator}
                    titleSize={SIZES.extraLarge}
                    subTitleSize={SIZES.small}
                />
            </View>
            <Text style={styles.textBody}>{data.body}</Text>
        </View>


        <CommentHeader />
    </>
);

const Details = ({ route, navigation }) => {

    const { data,url } = route.params;
    const { allCommentsData, isLoading } = useSelector(state => state.comments)
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState("");
    const [commentBody, setCommentBody] = useState("");

    useEffect(() => {
        dispatch(getCommentsForCertainPost(data.id));
    }, [dispatch]);

    const handleAddComment = () => {
        const commentID = `${data.id}-${username.slice(0, 4)}-${rating}`;
        const date = new Date();
        const commentDate = date.toLocaleString();
        const random = Math.ceil(Math.random() * 3);
        // const commentImage = assets[`person0${random}`];
        const comment = {
            id: commentID,
            name: username,
            date: commentDate,
            body: commentBody,
            rating: rating
        };
        dispatch(addComment({ postID: data.id, commentData:comment }))
        setShowModal(false);
    }
    return (
        <>
            {isLoading && <Text>Loading ...</Text>}
            {!isLoading &&
                <FlatList
                    // style={{ marginBottom: SIZES.extraLarge * 3 }}
                    data={allCommentsData.comments}
                    renderItem={({ item }) => <CommentSection comment={item} />}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<DetailsScreen data={data} navigation={navigation} imageurl={url}/>}
                    ListFooterComponent={
                        <View style={styles.BtnContainer}>
                            <RectButton
                                handlePress={() => setShowModal(true)}
                                text="Comment"
                                minWidth={170}
                                fontSize={SIZES.large}
                                {...SHADOWS.dark}
                            />
                        </View>
                    }
                />
            }
            <Modal
                visible={showModal}
                animationType="slide"
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <CircleButton top={30} right={20} handlePress={() => setShowModal(!showModal)}>
                            <AntDesign
                    
                                name="closecircleo"
                                size={24}
                                color={COLORS.white}
                    
                            />
                        </CircleButton>
                        <View style={styles.commentHeaderContainer}>
                            <Text style={styles.commentHeaderText}>Add Comment</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Name ex: John Morto"
                                placeholderTextColor="#d3d3d3"
                                onChangeText={(val) => setUsername(val)}
                            />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="numeric"
                                placeholder="Rating of The Blog"
                                placeholderTextColor="#d3d3d3"
                                onChangeText={(val) => setRating(val)}
                            />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Your Comment"
                                placeholderTextColor="#d3d3d3"
                                onChangeText={(val) => setCommentBody(val)}
                            />
                        </View>
                        <RectButton
                            handlePress={handleAddComment}
                            text="Send"
                            minWidth={170}
                            fontSize={SIZES.large}
                            {...SHADOWS.dark}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};


const styles = StyleSheet.create({
    HeaderContainer: {
        width: "100%",
        height: 272
    },
    commentHeaderContainer: {
        marginVertical: SIZES.extraLarge,
        justifyContent: "center",
        alignItems: "center",
    },
    commentHeaderText: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.extraLarge,
        color: COLORS.primary,
        textTransform: "uppercase"
    },
    BtnContainer: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        paddingVertical: SIZES.font,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(225,225,225,0.5)",
        zIndex: 1
    },
    detailsContainer: {
        width: "100%",
        padding: SIZES.font,
        marginBottom: SIZES.font,
    },
    textBody: {
        fontFamily: FONTS.light,
        fontSize: SIZES.large,
        flexWrap: "wrap",
        elevation: 1,
        shadowOffset: { height: 2, width: 3 },
        lineHeight: SIZES.extraLarge,
        paddingVertical: SIZES.font,
    },
    modal: {
        flex: 1,
        padding: SIZES.extraLarge,
    },
    inputText: {
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        color: COLORS.dark,
        width: "100%",
        borderColor: COLORS.dark,
        borderWidth: 0.5,
        marginVertical: SIZES.font
    }
});


export default Details;
