import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import {useFonts, Roboto_700Bold,Roboto_400Regular, Roboto_500Medium, Roboto_300Light, Roboto_900Black} from "@expo-google-fonts/roboto";

import Home from "../screens/Home";
import Details from "../screens/Details";
import AddBlog from "../screens/AddBlog";


const Stack = createStackNavigator();
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "transparent",
    }
};

const RootNavigation = () => {

    let [loaded] = useFonts({
        Roboto_700Bold,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_300Light,
        Roboto_900Black
    });
    
    if (!loaded) return null;


    return (
        <NavigationContainer DefaultTheme={theme}>
            <Stack.Navigator
                initialRouteName='Home'
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='AddBlog' component={AddBlog} />
                <Stack.Screen name='Details' component={Details}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default RootNavigation;