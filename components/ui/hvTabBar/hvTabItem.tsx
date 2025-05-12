import React from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { Image } from 'expo-image';
// components
import HvText from '../hvText';
// constants
import { FONT_SIZE } from './constants';
import { TAB_BAR_PADDING, TAB_HEIGHT, TAB_ICON_SIZE, TAB_TEXT_HEIGHT } from '@/constants/constants';
import HvButtonContainer from '../hvButtonContainer';

interface Props extends TouchableOpacityProps {
	onPress: () => void;
	source: string;
	text: string;
	large?: boolean;
}

/**
 * Custom tab item component
 * @param onPress - function to execute on tab press
 * @param source - image source for the icon
 * @param text - text to display under the icon
 * @param large - boolean value to determine if the tab is large
 * @returns custom tab item component
 */
const HvTabItem = ({ onPress, source, text, large = false, ...props }: Props): JSX.Element => {
	return (
		<HvButtonContainer
			style={Styles.tabContainer}
			// activeOpacity={ACTIVE_OPACITY}
			onPress={onPress}
		>
			<Image
				source={source}
				contentFit='contain'
				style={large ? Styles.tabLogoLarge : Styles.tabLogo}
			/>
			{large ? <View style={{ height: TAB_ICON_SIZE }} /> : null}
			<HvText size={FONT_SIZE} style={Styles.tabText}>
				{text}
			</HvText>
			{props.children}
		</HvButtonContainer>
	);
};

const Styles = StyleSheet.create({
	tabContainer: {
		flex: 1,
		paddingVertical: TAB_BAR_PADDING,
	},
	tabLogo: {
		width: '100%',
		height: TAB_ICON_SIZE,
	},
	tabLogoLarge: {
		position: 'absolute',
		bottom: TAB_HEIGHT - TAB_ICON_SIZE + 1,
		width: '100%',
		height: TAB_ICON_SIZE * 2,
	},
	tabText: {
		textAlign: 'center',
		height: TAB_TEXT_HEIGHT,
	},
});

export default HvTabItem;
