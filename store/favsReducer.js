import { getFavorites } from '../storage';

// reducer for favs Screen

const initialState = {
    favorites: []
};

export const favsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_FAVORITE_ITEM':
            if (state.favorites.some(favorite => favorite.id === action.payload.id)) {
                return state;
            }
            return { ...state, favorites: [...state.favorites, action.payload] };
        case 'DELETE_FAVORITE':
            return { ...state, favorites: state.favorites.filter(favorite => favorite.id !== action.payload) };
        case 'DELETE_FAVORITE_ITEMS':
            return { ...state, favorites: [] };
        case "GET_FAVORITE_ITEMS":
                return { ...state, isLoading : false, favorites: action.payload };
        default:
            return state;
    }
};

export const fetchFavoritesData = () => async (dispatch) => {
    try {
        const favs = await getFavorites();
        dispatch({ type: 'GET_FAVORITE_ITEMS', payload: favs });
    } catch (error) {
        console.log(error)
    }
};