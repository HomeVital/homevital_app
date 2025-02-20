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

const HvTabBar = (): JSX.Element => {
	const [stackName, setStackName] = useState('');
	const [addOpen, setAddOpen] = useState(false);

	// for updating routes right
	const handleTabRoute = (route: string, prev: string): string => {
		setAddOpen(false); // close add tab if open
		if (router.canGoBack()) {
			router.back();
			if (prev === route) {
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

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			display: opacity.value === 0 ? 'none' : 'flex',
		};
	});

	// TODO: change later
	const tempButtons = [
		{
			icon: require('@/assets/svgs/heart.svg') as string,
			onPress: () => setStackName(handleTabRoute('/(app)/(bloodSugar)', stackName)),
			isVisible: true,
		},

		{
			icon: require('@/assets/svgs/heart.svg') as string,
			onPress: () => setStackName(handleTabRoute('/(app)/(bloodPressure)', stackName)),
			isVisible: true,
		},
		{
			icon: require('@/assets/svgs/scale.svg') as string,
			onPress: () => setStackName(handleTabRoute('/(app)/(weight)', stackName)),
			isVisible: false,
		},
		{
			icon: require('@/assets/svgs/lungs.svg') as string,
			onPress: () => setStackName(handleTabRoute('/(app)/(bloodOxygen)', stackName)),
			isVisible: true,
		},
		{
			icon: require('@/assets/svgs/lungs.svg') as string,
			onPress: () => setStackName(handleTabRoute('/(app)/(temperature)', stackName)),
			isVisible: true,
		},
	];

	// const activeButtons = tempButtons.filter((button) => button.isVisible);

	// const bottomPaddings = [35, 15, -5, -5, -5];

	return (
		<>
			<TouchableWithoutFeedback onPressOut={() => setAddOpen(false)}>
				<Animated.View style={[Styles.animatedContainer, animatedStyle]}>
					<HvTabButtonWheel
						state={addOpen}
						// bottom={bottomPaddings[tempButtons.length - 1]}
						radius={65}
						roundness={0.5}
						buttons={tempButtons}
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
