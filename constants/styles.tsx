import { StyleSheet } from 'react-native';
// constants
import { TAB_HEIGHT } from './constants';

const PAD_HORIZONTAL = 20;
const DEFAULT_GAP = 12;
const BOTTOM_MARGIN = TAB_HEIGHT - 12;

export const STYLES = StyleSheet.create({
	defaultView: {
		paddingHorizontal: PAD_HORIZONTAL,
		gap: DEFAULT_GAP,
		marginBottom: BOTTOM_MARGIN,
	},
	defaultViewNoMargin: {
		paddingHorizontal: PAD_HORIZONTAL,
		gap: DEFAULT_GAP,
	},
	defaultNoPadView: {
		gap: DEFAULT_GAP,
		marginBottom: BOTTOM_MARGIN,
	},
	defaultModalView: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		padding: PAD_HORIZONTAL,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	baseModalView: {
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	defaultModalViewDeep: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		padding: PAD_HORIZONTAL,
	},
	loadingView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageView: {
		marginBottom: BOTTOM_MARGIN,
	},
	checkmarkPos: {
		position: 'absolute',
		left: 10,
		top: 10,
		zIndex: 1,
	},
	checkmarkPosCenter: {
		position: 'absolute',
		top: 10,
		left: 40,
		zIndex: 1,
	},
	todo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingLeft: 10,
	},
});
