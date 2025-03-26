import { StyleSheet } from 'react-native';
// constants
import { TAB_ICON_SIZE } from './constants';

export const STYLES = StyleSheet.create({
	defaultView: {
		paddingHorizontal: 20,
		gap: 12,
		marginBottom: TAB_ICON_SIZE + 10,
	},
	defaultNoPadView: {
		gap: 12,
		marginBottom: TAB_ICON_SIZE + 10,
	},
	loadingView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageView: {
		marginBottom: TAB_ICON_SIZE + 10,
	},
});
