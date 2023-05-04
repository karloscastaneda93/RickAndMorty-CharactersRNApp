import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { themeColors } from '../theme';
import CharacterCard from '../components/characterCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { clearAllFavoriteItems } from '../storage';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFavItems } from '../actions';
import { fetchFavoritesData } from '../store/favsReducer';

function generateUniqueId() {
	let timestamp = Date.now().toString(36).slice(-5);
	let randomChars = Math.random().toString(36).slice(-5);
	return timestamp + randomChars;
}

export default function FavoritesScreen() {
	const dispatch = useDispatch();
	const { favorites } = useSelector(state => state.favsReducer);

	console.log(favorites);

	useEffect(() => {
		dispatch(fetchFavoritesData());
	}, [dispatch]);

	return (
		<View style={styles.container}>
			<StatusBar />

			<SafeAreaView style={{ paddingTop: 20, minWidth: "100%" }}>
				{(!favorites || favorites?.length === 0) ? (
					<View style={styles.noFavoritesContainer}>
						<Text style={styles.noFavoritesText}>No favorites added, browse the main page to check some characters!</Text>
					</View>
				) : (
					<>
						<TouchableOpacity
							onPress={() => {
								clearAllFavoriteItems();
								dispatch(deleteFavItems());
							}}
							style={{ backgroundColor: themeColors.bgDark }}
							className="p-3 m-2 rounded-full shadow absolute text-xs right-5"
						>
							<Text className={"font-semibold text-white"}>Delete all</Text>
						</TouchableOpacity>
						<ScrollView contentContainerStyle={styles.gridContainer}>
							{favorites?.map((item) => (
								<View style={styles.cardContainer} key={`${item.id}${generateUniqueId()}`}>
									<CharacterCard customCardStyles={{ height: "auto", width: "auto", padding: 5 }} item={item} />
								</View>
							))}
						</ScrollView>
					</>
				)}
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		position: "relative",
	},
	listContainer: {
		paddingHorizontal: 16
	},
	noFavoritesContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noFavoritesText: {
		fontSize: 16,
		paddingHorizontal:80
	},
	gridContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16
	},
	cardContainer: {
		width: '45%',
		margin: 8
	},
});
