import {FETCH_EPISODES_REQUEST,FETCH_EPISODES_SUCCESS,FETCH_EPISODES_FAILURE} from "../actions";
// reducer for EpisodesScreen
export const episodesReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_EPISODES_REQUEST:
            return { ...state, loading: true };
        case FETCH_EPISODES_SUCCESS:
            return { ...state, loading: false, data: action.payload };
        case FETCH_EPISODES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};