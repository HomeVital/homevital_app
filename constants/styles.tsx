import { StyleSheet } from 'react-native';
// constants
import { DARK_GREEN } from '@/constants/colors';
import { TAB_HEIGHT, TAB_ICON_SIZE } from './sizes';


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
    },
    defaultView: {
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: TAB_HEIGHT + TAB_ICON_SIZE + 10,
    },
});
