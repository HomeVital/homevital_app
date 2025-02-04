import { StyleSheet } from 'react-native';
// constants
import { DARK_GREEN } from '@/constants/colors';


export const STYLES = StyleSheet.create({
    headerTitle: {
        fontFamily: "OpenSansSemibold",
        fontSize: 18,
        color: DARK_GREEN,
    },
    headerBack: {
        alignItems: "flex-start",
        width: 60,
        height: "100%",
        position: "relative",
        left: -20,
        zIndex: 1000,
        marginRight: 20,
    },
    headerBackIcon: {
        width: '100%',
        height: 40,
    }
});
