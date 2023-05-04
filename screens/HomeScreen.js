import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { categories } from '../constants';
import Carousel from 'react-native-snap-carousel';
import CharacterCard from '../components/characterCard';
import { fetchHomeData } from '../store/homeReducer';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState(1);
    const [isFisrtLoad, setIsFistLoad] = useState(true);
    const [page, setPage] = useState(1);
    
    const {characters,isLoading,error} = useSelector(state => state.homeReducer);

    const dispatch = useDispatch();

    useEffect(()=>{
        if(!isLoading)
            setIsFistLoad(false)
    },[isLoading])

    useEffect(() => {
      dispatch(fetchHomeData(page, 5));
    }, [dispatch, page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const renderCardItem = ({ item, index }) => {
        if (index === characters?.length) {
            return (
                <TouchableOpacity
                    style={{
                        width: 260,
                        height: 330,
                        backgroundColor: themeColors.bgLight,
                        borderRadius: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                    onPress={handleLoadMore}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Load More</Text>
                </TouchableOpacity>
            );
        }
        return <CharacterCard item={item} />;
    };

    // Create an object for the "Load More" button
    const loadMoreObject = {
        id: -1,
        name: 'Load More',
    };

    if (isLoading && isFisrtLoad) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    // Add the "Load More" object to the end of the characters array
    const charactersWithLoadMore = [...characters,loadMoreObject];
    
    return (
        <View className="flex-1 relative bg-white">
            <StatusBar />
            <SafeAreaView className="flex-1">
                {/* categories */}
                <View className="px-5">
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        keyExtractor={item => item.id.toString()}
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
                        data={charactersWithLoadMore}
                        renderItem={({ item, index }) => renderCardItem({ item, index })}
                        firstItem={0}
                        loop={false}
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