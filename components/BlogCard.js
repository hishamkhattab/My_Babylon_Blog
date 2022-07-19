import { StyleSheet,View, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";

import { COLORS, SIZES, SHADOWS, assets } from "./../constants";
import { CircleButton,RectButton } from "./Button";
import { BlogSnippet, BlogTitle, SubInfo } from './SubInfo';

const BlogCard = ({ data,imageData }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.cardContainer}>

            {/* card-image */}
            <View style={{
                width: "100%",
                height: 250
            }}>
                <Image
                    source={{uri: imageData[data.imageID]}}
                    resizeMode="cover"
                    style={styles.imageStyle}
                />

                <CircleButton right={10} top={10}>
                    <FontAwesome name="heart-o" size={24} color={COLORS.white} />
                </CircleButton>

            </View>

            {/* blog-information */}
            <SubInfo view={data.views} date={data.date} rating={data.rating} />
            
            <View
                style={{
                    width: "100%",
                    padding: SIZES.font
                }}
            >
                <BlogTitle
                    title={data.title}
                    subTitle={data.creator}
                    titleSize={SIZES.large}
                    subTitleSize={SIZES.small}
                />

                <View style={styles.viewContainer}>
                    <BlogSnippet snippet={data.snippet} />

                </View>
                <View style={styles.viewContainer}>
                    <RectButton
                        minWidth={120}
                        fontSize={SIZES.font}
                        handlePress={() => navigation.navigate("Details", { data, url:imageData[data.imageID] })}
                        text="Details"
                    />
                </View>
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark
    },
    imageStyle: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: SIZES.font,
        borderTopRightRadius: SIZES.font,
    },
    viewContainer: {
        flex: 1,
        marginTop: SIZES.small,
    }
});

export default BlogCard
