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
	defaultModalView: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		padding: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	defaultModalViewDeep: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		padding: 20,
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
