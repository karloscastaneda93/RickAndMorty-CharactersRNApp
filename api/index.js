import axios from 'axios';
import { customDescriptions } from '../constants';

export const fetchCharacters = async (page, limit) => {
    try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&limit=${limit}`);
        const characters = response.data.results.map((character) => {
            const description = customDescriptions[character.name] || 'No description available';
            return { ...character, description };
        });
        return characters;
    } catch (error) {
        console.error(error);
        throw error;
    }
};