import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_KEY = 'favoriteItems';

// store data
export const saveFavorite = async (item) => {
    try {
        const existingFavorites = await getFavorites();
        let updatedFavorites = [];
        if (existingFavorites) {
            updatedFavorites = [...existingFavorites];
        }
        if (!updatedFavorites.some(favorite => favorite.id === item.id)) {
            updatedFavorites.push(item);
            await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
            console.log('Item saved successfully');
        } else {
            console.log('Item already exists in favorites');
        }
    } catch (error) {
        console.log('Error saving item:', error);
    }
};

// retrieve data
export const getFavorites = async () => {
    try {
        const value = await AsyncStorage.getItem(FAVORITE_KEY);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log('Error retrieving item:', error);
    }
};

export const clearFavoriteItem = async (itemId) => {
    try {
        const items = await AsyncStorage.getItem(FAVORITE_KEY);
        let favoriteItems = JSON.parse(items);

        // Remove the item with the specified id
        favoriteItems = favoriteItems.filter(item => item.id !== itemId);

        // Save the updated list back to storage
        await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favoriteItems));
    } catch (error) {
        console.error(error);
    }
};

export const clearAllFavoriteItems = async () => {
    try {
        await AsyncStorage.removeItem(FAVORITE_KEY);
        console.log('Items deleted successfully');
    } catch (e) {
        console.error('Error clearing favorite items', e);
    }
};