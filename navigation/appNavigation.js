// Import necessary modules and components
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { LogBox, View } from 'react-native';
import ProductScreen from '../screens/ProductScreen';
import { themeColors } from '../theme';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon as HomeOutline, HeartIcon as HeartOutline, ShoppingBagIcon as BagOutline } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, HeartIcon as HeartSolid, ShoppingBagIcon as BagSolid } from 'react-native-heroicons/solid';

// Create a stack navigator and a bottom tab navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Ignore warning logs related to non-serializable values found in the navigation state
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

// Export default function for AppNavigation
export default function AppNavigation() {
    return (
        // Wrap all navigators in a NavigationContainer
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                contentStyle: { backgroundColor: 'white' }
            }}>
                {/* Define stack navigator screens */}
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeTabs} />
                <Stack.Screen name="Product" options={{ headerShown: false }} component={ProductScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

// Define function for HomeTabs
function HomeTabs() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => menuIcons(route, focused), // Use menuIcons function to display icon for each tab
            tabBarStyle: {
                marginVertical: 30,
                borderRadius: 50,
                marginHorizontal: 30,
                backgroundColor: themeColors.bgDark,
                height: 70
            },
        })}

        >
            {/* Define tabs */}
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="favourite" component={HomeScreen} />
            <Tab.Screen name="cart" component={HomeScreen} />
        </Tab.Navigator>
    )
}

// Define function to display appropriate icon for each tab
const menuIcons = (route, focused) => {
    // Define the icon components to be used
    const icons = {
        home: focused ? <HomeSolid size="30" color={themeColors.bgDark} /> : <HomeOutline size="30" strokeWidth={2} color="white" />,
        favourite: focused ? <HeartSolid size="30" color={themeColors.bgDark} /> : <HeartOutline size="30" strokeWidth={2} color="white" />,
        cart: focused ? <BagSolid size="30" color={themeColors.bgDark} /> : <BagOutline size="30" strokeWidth={2} color="white" />,
    };

    // Get the icon component for the current route
    const icon = icons[route.name];

    // Return the container with the icon component and class name
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <View style={{ backgroundColor: (focused ? themeColors.text : themeColors.bgDark), borderRadius: 50, padding: 10 }}>
                <View style={{ alignSelf: 'center' }}>
                    {icon}
                </View>
            </View>
        </View>
    );
};
