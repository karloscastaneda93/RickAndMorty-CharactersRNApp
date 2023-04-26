import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories } from '../constants';
import Carousel from 'react-native-snap-carousel';
import CharacterCard from '../components/characterCard';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState(1);
    
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const apiUrl = useMemo(() => `https://rickandmortyapi.com/api/character?page=${page}&limit=${limit}`, [page, limit]);

    console.log(characters.length);

    useEffect(() => {
        axios.get(apiUrl)
        .then(response => {
            setCharacters(response.data.results);
        })
        .catch(error => {
          console.error(error);
        });
    }, [apiUrl]);

    return (
        <View className="flex-1 relative bg-white">
            <StatusBar />
            <Image
                source={require('../assets/images/bg-1.png')}
                style={{ height: 220 }}
                className="w-full absolute -top-3 opacity-60" />
            <SafeAreaView className="flex-1">
                {/* avatar and bell icon */}
                <View className="mx-4 flex-row justify-between items-center">
                    <Image source={require('../assets/images/avatar.png')}
                        className="h-9 w-9 rounded-full" />

                    <View className="flex-row items-center space-x-2">
                        <Text className="font-semibold text-base">
                            Tijuana
                        </Text>
                    </View>
                    <BellIcon size="27" color="black" />
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: 30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Welcome!!</Text>
                </View>
                {/* search bar */}
                <View className="mx-5 mt-10 shadow">
                    <View className="flex-row items-center rounded-full p-1 bg-[#e6e6e6]">
                        <TextInput placeholder='Search' className="p-4 flex-1 font-semibold text-gray-700" />
                        <TouchableOpacity
                            className="rounded-full p-2"
                            style={{ backgroundColor: themeColors.bgLight }}>
                            <MagnifyingGlassIcon size="25" strokeWidth={2} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* categories */}
                <View className="px-5 mt-5">
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        keyExtractor={item => item.id}
                        className="overflow-visible"
                        renderItem={({ item }) => {
                            let isActive = item.id == activeCategory;
                            return (
                                <TouchableOpacity
                                    onPress={() => setActiveCategory(item.id)}
                                    style={{ backgroundColor: isActive ? themeColors.bgLight : themeColors.bgDark }}
                                    className="p-4 px-5 mr-2 rounded-full shadow">
                                    <Text className={"font-semibold text-white"}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
                {/* characters cards */}
                <View className="mt-10 py-2">
                    <Carousel
                        containerCustomStyle={{ overflow: 'visible' }}
                        data={characters}
                        renderItem={({ item }) => <CharacterCard item={item} />}
                        firstItem={1}
                        loop={true}
                        inactiveSlideScale={0.77}
                        inactiveSlideOpacity={1}
                        sliderWidth={400}
                        itemWidth={260}
                        slideStyle={{ display: 'flex', alignItems: 'center' }}
                    />
                </View>
            </SafeAreaView>
        </View>
    )
}