import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { assets, COLORS, FONTS, SHADOWS, SIZES } from '../constants'
import { CircleButton } from './Button';
import { AntDesign } from '@expo/vector-icons'; 


const HomeHeader = ({name}) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            {/* logo of blog and profile-pic */}
            <View style={styles.logoContainer}>

                <Image
                    source={assets.logo}
                    resizeMode="contain"
                    style={{
                        width: 90,
                        height: 25
                    }}
                />

                <View style={{
                    width: 45, height: 45
                }}>
                    <Image
                        source={assets.person01}
                        resizeMode="contain"
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                        
                </View>
            </View>

            {/* welcome to my blog */}
            <View style={{
                marginVertical: SIZES.font
            }}>
                <Text style={styles.welcomeText}>
                    Welcome to Babylon Blog, {name} 👋
                </Text>
                <Text style={styles.welcomeSubText}>
                    Impossible is nothing...
                </Text>
            </View>

            <View style={{padding: 10}}>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => navigation.navigate("AddBlog")}>
                    <AntDesign name="pluscircleo" size={20} color={COLORS.dark} />
                    <Text style={styles.btnText}>Create Blog</Text>
                </TouchableOpacity>
            </View>
            {/* search blog */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255,255,225,0.2)",
        padding: SIZES.font
    },
    logoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    welcomeText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    welcomeSubText: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.large,
        color: COLORS.primary,
        marginTop: SIZES.base
    },
    btnContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: 125,
        padding: SIZES.base - 4,
        borderRadius: SIZES.font,
        backgroundColor: "rgba(255,255,255,0.6)",
        ...SHADOWS
    },
    btnText: {
        fontSize: SIZES.font,
        marginLeft: SIZES.base,
        color: COLORS.dark
    }
});

export default HomeHeader
