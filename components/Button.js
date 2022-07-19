import { StyleSheet,Text, TouchableOpacity } from 'react-native';
import { COLORS,SIZES,SHADOWS,FONTS } from '../constants';

export const CircleButton = ({ children, handlePress, ...props }) => {
    return (
        <TouchableOpacity
            style={{ ...styles.circleContainer, ...props }}
            onPress={handlePress}
        >
            {children}
        </TouchableOpacity>
    )
};

export const RectButton = ({ minWidth, fontSize, text, handlePress, ...props }) => (
    <TouchableOpacity
        style={{ ...styles.rectContainer, minWidth: minWidth, fontSize: fontSize, ...props }}
        onPress={handlePress}
    >
        <Text style={styles.rectText}>
            {text}
        </Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    //circle-button
    circleContainer: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.dark,
        position: "absolute",
        borderRadius: SIZES.extraLarge,
        alignItems: "center",
        justifyContent: "center",
        ...SHADOWS.light,
    },

    //rect-button
    rectContainer: {
        backgroundColor: COLORS.dark,
        borderRadius: SIZES.extraLarge,
        // minWidth: minWidth,
        padding: SIZES.small,
    },
    rectText: {
        fontFamily: FONTS.semiBold,
        color: COLORS.white,
        textAlign: "center"
    }
});