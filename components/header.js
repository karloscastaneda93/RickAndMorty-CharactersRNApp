import React from 'react';
import { View, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { themeColors } from '../theme';

export default function Header(props) {
    return (
        <View style={{
            backgroundColor: 'white',
            flex: 1,
            position: 'relative',
            height: 'auto'
        }}>
            <Image
                source={require('../assets/images/bg-1.png')}
                style={{
                    height: 220,
                    width: "100%",
                    opacity: 0.6,
                    top: 0,
                    position: "absolute",
                    resizeMode: 'cover'
                }}
            />
            <SafeAreaView style={{
                flex: 1,
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 0
            }}>
                {/* search bar */}
                <View style={{
                    marginHorizontal: 5,
                    marginTop: 180,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2
                }}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: 999,
                        padding: 5,
                        backgroundColor: "#e6e6e6"
                    }}>
                        <TextInput placeholder='Search' style={{
                            flex: 1,
                            fontWeight: "600",
                            fontSize: 16,
                            lineHeight: 20,
                            color: "#4B5563"
                        }} />
                        <TouchableOpacity style={{
                            borderRadius: 999,
                            padding: 5,
                            backgroundColor: "#F3F4F6"
                        }}>
                            <MagnifyingGlassIcon size={25} strokeWidth={2} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
