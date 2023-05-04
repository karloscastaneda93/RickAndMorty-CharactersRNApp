//favoritesActions
export const getFavItems = (items) => ({
    type: "GET_FAVORITE_ITEMS",
    payload: items
});

export const deleteFavItems = () => ({
    type: "DELETE_FAVORITE_ITEMS"
});

export const saveFavItem = (item) => {
    return {
        type: 'SAVE_FAVORITE_ITEM',
        payload: item
    };
};

export const deleteFavorite = (id) => {
    return {
        type: 'DELETE_FAVORITE',
        payload: id
    };
};

// actions for HomeScreen
export const FETCH_HOME_DATA_REQUEST = 'FETCH_HOME_DATA_REQUEST';
export const FETCH_HOME_DATA_SUCCESS = 'FETCH_HOME_DATA_SUCCESS';
export const FETCH_HOME_DATA_FAILURE = 'FETCH_HOME_DATA_FAILURE';

export const fetchHomeDataRequest = () => ({
    type: FETCH_HOME_DATA_REQUEST,
});

export const fetchHomeDataSuccess = (data) => ({
    type: FETCH_HOME_DATA_SUCCESS,
    payload: data,
});

export const fetchHomeDataFailure = (error) => ({
    type: FETCH_HOME_DATA_FAILURE,
    payload: error,
});

// actions for EpisodesScreen
export const FETCH_EPISODES_REQUEST = 'FETCH_EPISODES_REQUEST';
export const FETCH_EPISODES_SUCCESS = 'FETCH_EPISODES_SUCCESS';
export const FETCH_EPISODES_FAILURE = 'FETCH_EPISODES_FAILURE';

export const fetchEpisodesRequest = () => ({
    type: FETCH_EPISODES_REQUEST,
});

export const fetchEpisodesSuccess = (episodes) => ({
    type: FETCH_EPISODES_SUCCESS,
    payload: episodes,
});

export const fetchEpisodesFailure = (error) => ({
    type: FETCH_EPISODES_FAILURE,
    payload: error,
});