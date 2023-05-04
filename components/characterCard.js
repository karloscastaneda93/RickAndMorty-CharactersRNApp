import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlusIcon } from 'react-native-heroicons/outline';
import { themeColors } from '../theme';

const cardStyles = {
    borderRadius: 40,
    backgroundColor: themeColors.bgDark,
    height: 350,
    width: 250,
    padding: 15
};

const imageStyles = {
    shadowColor: 'black',
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.8,
};

const CharacterCard = React.memo(({ customCardStyles = {}, item }) => {
    const navigation = useNavigation();
    const { name, status, gender, image } = item;

    const mergedStyles = {
        ...cardStyles,
        ...customCardStyles
    };

    return (
        <View style={mergedStyles}>
            <View style={[imageStyles, { flexDirection: 'row', justifyContent: 'center', marginTop: 0 }]}>
                <Image source={{ uri: image }} style={{ height: 120, width: 120, borderRadius: 100 }}
                    onError={() => console.warn('Failed to load image:', image)} />
            </View>
            <View style={{ padding: 5, marginTop: 5 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', zIndex: 10 }} numberOfLines={2}>{name}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Status: {status}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 5 }}>Gender: {gender}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>view more</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Product', { ...item })} style={{ padding: 10, backgroundColor: 'white', borderRadius: 999, shadowColor: 'black', shadowRadius: 40, shadowOffset: { width: -20, height: -10 }, shadowOpacity: 1 }}>
                        <PlusIcon size={25} strokeWidth={2} color={themeColors.bgDark} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

export default CharacterCard;