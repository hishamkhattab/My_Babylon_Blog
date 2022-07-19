import {View, StyleSheet, Text, Image} from 'react-native'
import { EvilIcons } from '@expo/vector-icons';

import { SIZES,COLORS, FONTS, assets } from '../constants'


const CommentSection = ({ comment }) => {
    let counter = comment.rating;
    const arr = [];

    //create rating stars
    while (counter > 0) {
        arr.push(<EvilIcons key={counter+1} name="star" size={16} color={COLORS.lightYellow} />)
        counter--;
    };


    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                {/* name and profile */}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <View style={{ width: 45, height: 45, marginRight: SIZES.small }}>
                        <Image
                            source={assets.person03}
                            resizeMode="contain"
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </View>
                    <Text style={{ fontSize: SIZES.large, fontFamily: FONTS.medium, textTransform: "capitalize" }}>{comment.name}</Text>
                </View>

                {/* rating */}
                <View style={{
                    flexDirection: "row"
                }}>
                    {arr.map(el => el)}
                </View>
            </View>


            {/* body */}
            <View style={styles.infoContainer}>
                <Text style={{
                    padding: SIZES.small,
                    fontFamily: FONTS.light,
                }}>{comment.body}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginBottom: SIZES.extraLarge * 3,
        borderBottomColor: COLORS.dark,
        borderBottomWidth: 1,
        paddingHorizontal: SIZES.base,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});

export default CommentSection
