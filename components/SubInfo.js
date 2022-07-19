import { StyleSheet,View,Text } from 'react-native';
import { SIZES, FONTS, assets, SHADOWS, COLORS } from '../constants';

import { EvilIcons } from '@expo/vector-icons';

export const BlogTitle = ({ title, subTitle, titleSize, subTitleSize }) => {
    return (
        <View>
            <Text style={{ ...styles.title, fontSize: titleSize }}>
                {title}
            </Text>
            <Text style={{ ...styles.subTitle, fontSize: subTitleSize }}>
                <Text style={{ fontFamily: FONTS.bold, color: COLORS.primary }}>Created By: </Text> {subTitle}
            </Text>
        </View>
    )
};

export const BlogSnippet = ({ snippet }) => {
    return (
        <View style={{ marginVertical: 5 }}>
            <Text style={styles.snippet}>
                {snippet}
            </Text>
        </View>
    )
};

export const ViewsNumber = ({ view }) => {
    return (
        <View style={styles.viewsContainer}>
            <EvilIcons name="eye" size={30} color={COLORS.dark} />
            <Text style={styles.viewsText}>{view}</Text>
        </View>
    )
};

export const EndDate = ({ date }) => {
    const dateArray = date.split(",");
    return (
        <View style={styles.dateCaontainer}>
            <Text style={styles.dateTitle}>Written from:</Text>
            <Text style={styles.dateSubTitle}>{dateArray[0]}</Text>
            <Text style={styles.dateHours}>{dateArray[1]}</Text>
        </View>
    )
};

export const RatingCounter = ({ rating }) => {
    return (
        <View style={styles.viewsContainer}>
            <EvilIcons name="star" size={30} color={COLORS.dark} />
            <Text style={styles.viewsText}>{rating}</Text>
        </View>
    )
};

export const SubInfo = ({ view, date, rating }) => {
    return (
        <View style={styles.subContainer}>
            <ViewsNumber view={view} />
            <RatingCounter rating={rating} />
            <EndDate date={date} />
        </View>
    )
};

const styles = StyleSheet.create({
    //Blogtitle
    title: {
        fontFamily: FONTS.semiBold,
        color: COLORS.primary,
        textTransform: "uppercase",
    },
    subTitle: {
        fontFamily: FONTS.regular,
        color: COLORS.dark,
        textTransform: "capitalize"
    },

    //blog-snippet
    snippet: {
        fontFamily: FONTS.light,
        fontSize: SIZES.medium,
        color: COLORS.dark
    },

    //views-numbers
    viewsContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    viewsText: {
        paddingHorizontal: SIZES.base,
        fontFamily: FONTS.light,
        fontSize: SIZES.large,
        color: COLORS.dark
    },

    //end-date
    dateCaontainer: {
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.dark,
        borderTopRightRadius: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.light,
        elevation: 1,
        maxWidth: "50%"
    },
    dateTitle: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.white
    },
    dateSubTitle: {
        fontFamily: FONTS.semiBold,
        fontSize: SIZES.small,
        color: COLORS.white,
        textAlign: "center"
    },
    dateHours: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.base,
        color: COLORS.white,
        textAlign: "center"
    },

    //sub-info
    subContainer: {
        backgroundColor: "rgba(225s,225,225,0.8)",
        width: "100%",
        paddingHorizontal: SIZES.font,
        marginTop: -SIZES.extraLarge,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
    }

});