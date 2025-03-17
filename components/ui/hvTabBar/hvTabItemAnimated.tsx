import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, TouchableOpacityProps } from 'react-native';
import { Image } from 'expo-image';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
// components
import HvText from '../hvText';
// constants
import { ACTIVE_OPACITY, FONT_SIZE } from './constants';
import { TAB_BAR_PADDING, TAB_HEIGHT, TAB_ICON_SIZE, TAB_TEXT_HEIGHT } from '@/constants/sizes';

interface Props extends TouchableOpacityProps {
	onPress: () => void;
	source: string;
	source2: string;
	text: string;
	addOpen: boolean;
	large?: boolean;
}

/**
 * Custom animated tab item component with a rotating icon
 * @param onPress - function to execute on tab press
 * @param source - image source for the first icon
 * @param source2 - image source for the second icon
 * @param text - text to display under the icon
 * @param addOpen - boolean value to determine if the tab is open
 * @param large - boolean value to determine if the tab is large
 * @returns custom animated tab item component with a rotating icon
 */
const HvTabItemAnimated = ({
	onPress,
	source,
	source2,
	text,
	addOpen,
	large = false,
	...props
}: Props): JSX.Element => {
	// animation value
	const rotation = useSharedValue<number>(0);
	const opacity = useSharedValue<number>(1);
	const opacity2 = useSharedValue<number>(0);

	useEffect(() => {
		rotation.value = withTiming(addOpen ? 45 : 0);
		opacity.value = withTiming(addOpen ? 0 : 1);
		opacity2.value = withTiming(addOpen ? 1 : 0);
	}, [addOpen, opacity, opacity2, rotation]);

	// style for foreground icon
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
			opacity: opacity.value,
		};
	});
	// style for background icon
	const animatedStyle2 = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: `${rotation.value}deg` }],
			opacity: opacity2.value,
		};
	});

	return (
		<TouchableOpacity
			style={Styles.tabContainer}
			activeOpacity={ACTIVE_OPACITY}
			onPress={onPress}
		>
			<Animated.View
				style={[animatedStyle, large ? Styles.largeContainer : Styles.smallContainer]}
			>
				<Image
					source={source}
					contentFit='contain'
					style={large ? Styles.tabLogoLarge : Styles.tabLogo}
				/>
			</Animated.View>
			<Animated.View
				style={[animatedStyle2, large ? Styles.largeContainer : Styles.smallContainer]}
			>
				<Image
					source={source2}
					contentFit='contain'
					style={large ? Styles.tabLogoLarge : Styles.tabLogo}
				/>
			</Animated.View>
			<View style={{ height: TAB_ICON_SIZE }} />
			<HvText size={FONT_SIZE} style={Styles.tabText}>
				{text}
			</HvText>
			{props.children}
		</TouchableOpacity>
	);
};

const Styles = StyleSheet.create({
	tabContainer: {
		flex: 1,
		paddingVertical: TAB_BAR_PADDING,
	},
	tabLogo: {
		width: TAB_ICON_SIZE,
		height: TAB_ICON_SIZE,
	},
	tabLogoLarge: {
		width: TAB_ICON_SIZE * 2,
		height: TAB_ICON_SIZE * 2,
	},
	largeContainer: {
		position: 'absolute',
		bottom: TAB_HEIGHT - TAB_ICON_SIZE + 1,
		height: TAB_ICON_SIZE * 2,
		left: '50%',
		marginLeft: -TAB_ICON_SIZE,
	},
	smallContainer: {
		position: 'absolute',
		bottom: TAB_TEXT_HEIGHT + TAB_BAR_PADDING,
		height: TAB_ICON_SIZE,
		left: '50%',
		marginLeft: -TAB_ICON_SIZE / 2,
	},
	tabText: {
		textAlign: 'center',
		height: TAB_TEXT_HEIGHT,
	},
});

export default HvTabItemAnimated;
