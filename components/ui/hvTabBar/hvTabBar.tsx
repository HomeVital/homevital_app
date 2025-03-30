import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import Animated, { withTiming, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
// components
import HvTabItem from './hvTabItem';
// constants
import { LIGHT_GRAY, WHITE } from '@/constants/colors';
import HvTabItemAnimated from './hvTabItemAnimated';
import HvTabButtonWheel from './hvTabButtonWheel';

/**
 * Custom tab bar component with possible large tab, and a rotating tab for a button wheel
 * @returns custom tab bar component
 */
const HvTabBar = (): JSX.Element => {
	const [stackName, setStackName] = useState('');
	const [addOpen, setAddOpen] = useState(false);

	/**
	 * Handles tab route with proper depth
	 * @param route - route to navigate to
	 * @param prev - previous route
	 * @returns route to navigate to
	 */
	const handleTabRoute = (route: string, prev: string): string => {
		setAddOpen(false); // close add tab if open

		if (prev === route) {
			if (router.canDismiss()) {
				router.dismiss();
				return '';
			} else {
				router.push(route as RelativePathString);
				return route;
			}
		}
		router.push(route as RelativePathString);

		return route;
	};

	// animation value
	const opacity = useSharedValue<number>(0);

	useEffect(() => {
		opacity.value = withTiming(addOpen ? 1 : 0);
	}, [addOpen, opacity]);

	// style for which icon for the button wheel tab is visible
	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			display: opacity.value === 0 ? 'none' : 'flex',
		};
	});

	// TODO: change later
	const tempButtons = [
		{
			name: 'BodyTemperatureLight',
			onPress: () => setStackName(handleTabRoute('/(app)/(addTemperature)', stackName)),
			isVisible: true,
		},
		{
			name: 'BloodPressureLight',
			onPress: () => setStackName(handleTabRoute('/(app)/(addBloodPressure)', stackName)),
			isVisible: true,
		},
		{
			name: 'BodyWeightLight',
			onPress: () => setStackName(handleTabRoute('/(app)/(addWeight)', stackName)),
			isVisible: true,
		},
		{
			name: 'OxygenSaturationLight',
			onPress: () => setStackName(handleTabRoute('/(app)/(addBloodOxygen)', stackName)),
			isVisible: true,
		},
		{
			name: 'BloodSugarLight',
			onPress: () => setStackName(handleTabRoute('/(app)/(addBloodSugar)', stackName)),
			isVisible: true,
		},
	];

	return (
		<>
			<TouchableWithoutFeedback onPressOut={() => setAddOpen(false)}>
				<Animated.View style={[Styles.animatedContainer, animatedStyle]}>
					<HvTabButtonWheel
						radius={65}
						roundness={0.5}
						buttons={tempButtons.filter((button) => button.isVisible)}
					/>
				</Animated.View>
			</TouchableWithoutFeedback>

			<HideWithKeyboard>
				<View style={Styles.container}>
					<HvTabItem
						onPress={() => {
							setStackName(handleTabRoute('/(app)/(measurements)', stackName));
						}}
						source={require('@/assets/svgs/barChart.svg')}
						text='Mælingar'
					/>
					<HvTabItemAnimated
						onPress={() => setAddOpen(!addOpen)}
						source={require('@/assets/svgs/add.svg')}
						source2={require('@/assets/svgs/addRed.svg')}
						text='Skrá mælingu'
						addOpen={addOpen}
						large
					/>
					<HvTabItem
						onPress={() => {
							setStackName(handleTabRoute('/(app)/(settings)', stackName));
						}}
						source={require('@/assets/svgs/manUser.svg')}
						text='Stillingar'
					/>
				</View>
			</HideWithKeyboard>
		</>
	);
};

const Styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
		width: '100%',
		paddingHorizontal: 20,
		backgroundColor: WHITE,
		borderTopWidth: 1,
		borderTopColor: LIGHT_GRAY,
	},

	animatedContainer: {
		position: 'absolute',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		alignItems: 'flex-end',
		justifyContent: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
	},
});

export default HvTabBar;
