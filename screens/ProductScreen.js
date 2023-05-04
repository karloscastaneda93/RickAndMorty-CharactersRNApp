import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftCircleIcon, MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { saveFavorite } from '../storage';
import { ShoppingBag } from 'react-native-feather';
import { useDispatch } from 'react-redux';
import { saveFavItem } from '../actions';

export default function FavouriteScreen(props) {
    const dispatch = useDispatch();
    const item = props.route.params;
    const navigation = useNavigation();

    const handleGoBack = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    const handleSaveFavorite = useCallback(() => {
        saveFavorite(item);
        dispatch(saveFavItem(item));
    }, [item]);


    const dateObject = new Date(item.created);
    const formattedDate = `${dateObject.toLocaleDateString()}`;
    const firstEpisode = item.episode?.map(url => url.match(/\d+$/)[0])[0];

    return (
        <View className="flex-1" style={{ position: "absolute" }}>
            <StatusBar style="light" />
            <Image
                source={require('../assets/images/bg-2.png')}
                style={{ height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
                className="w-full absolute" />
            <SafeAreaView className="space-y-4">
                <View className="mx-4 flex-row justify-between items-center">
                    <TouchableOpacity className=" rounded-full " onPress={handleGoBack}>
                        <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity className=" rounded-full border-2 border-white p-2" onPress={handleSaveFavorite}>
                        <HeartIcon size="24" color="white" />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        shadowColor: themeColors.bgDark,
                        shadowRadius: 30,
                        shadowOffset: { width: 0, height: 30 },
                        shadowOpacity: 0.9,
                    }}
                    className="flex-row justify-center">
                    <Image source={{ uri: item.image }} className="h-60 w-60 rounded-full" />
                </View>
                <View className="flex-row justify-between items-center">
                    <Text style={{ color: themeColors.text }} className="text-3xl font-semibold text-center w-screen">
                        {item.name}
                    </Text>
                </View>

                <View className="px-4 space-y-2 h-28">
                    <Text style={{ color: themeColors.text }} className="text-lg font-bold">About</Text>
                    <Text className="text-gray-600">
                        {item.description}
                    </Text>
                </View>

                <View className="px-4 space-y-2">
                    <Text style={{ color: themeColors.text }} className="text-lg font-bold">first appearance</Text>
                    <Text style={{ color: themeColors.text }} className="text-gray-600">
                        Epiosde:
                        &nbsp;
                        {firstEpisode}
                        &nbsp;
                        -
                        &nbsp;
                        {formattedDate}
                    </Text>
                </View>

                <View className="flex-row justify-between items-center px-4 mb-2">
                    <View className="flex-row items-center space-x-1">
                        <Text className="text-base text-gray-700 font-semibold opacity-60">
                            Volume
                        </Text>
                        <Text className="text-base text-black font-semibold"> {item.volume}</Text>
                    </View>
                    <View
                        className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
                        <TouchableOpacity>
                            <MinusIcon size="20" strokeWidth={3} color={themeColors.text} />
                        </TouchableOpacity>
                        <Text style={{ color: themeColors.text }} className="font-extrabold text-lg">2</Text>
                        <TouchableOpacity>
                            <PlusIcon size="20" strokeWidth={3} color={themeColors.text} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* buy now button */}
                <View className="flex-row justify-between px-4">
                    <TouchableOpacity className="p-4 rounded-full border border-gray-400">
                        <ShoppingBag size="30" color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgLight }}
                        className="p-4 rounded-full flex-1 ml-4">
                        <Text className="text-center text-white text-base font-semibold">Buy now</Text>
                    </TouchableOpacity>
                </View>


            </SafeAreaView>


        </View>
    )
};