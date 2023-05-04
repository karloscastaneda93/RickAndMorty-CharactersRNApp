import { FETCH_HOME_DATA_REQUEST, FETCH_HOME_DATA_SUCCESS, FETCH_HOME_DATA_FAILURE } from "../actions";
import { fetchCharacters  } from '../api';

// reducer for HomeScreen

const initialState = {
    characters: [],
    isLoading: false,
    error: false
};

export const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOME_DATA_REQUEST:
            return { ...state, isLoading : true };
        case FETCH_HOME_DATA_SUCCESS:
            return { ...state, isLoading : false, characters:  [...state.characters, ...action.payload] };
        case FETCH_HOME_DATA_FAILURE:
            return { ...state, isLoading : false, error: action.payload };
        default:
            return state;
    }
};

export const fetchHomeData = (page, limit) => async (dispatch) => {
    dispatch({ type: FETCH_HOME_DATA_REQUEST });
    try {
      const characters = await fetchCharacters(page, limit);
      dispatch({ type: FETCH_HOME_DATA_SUCCESS, payload: characters });
    } catch (error) {
      dispatch({ type: FETCH_HOME_DATA_FAILURE, payload: error });
    }
  };