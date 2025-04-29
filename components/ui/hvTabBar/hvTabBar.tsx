import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import { RelativePathString, router } from 'expo-router';
// components
import HvTabItem from './hvTabItem';
// constants
import { LIGHT_GRAY, WHITE } from '@/constants/colors';
import HvTabItemAnimated from './hvTabItemAnimated';
import HvTabButtonWheel from './hvTabButtonWheel';
import ModalContext from '@/contexts/modalContext';
// import HideWithKeyboard from 'react-native-hide-with-keyboard';

/**
 * Custom tab bar component with possible large tab, and a rotating tab for a button wheel
 * @returns custom tab bar component
 */
const HvTabBar = (): JSX.Element => {
	const modals = useContext(ModalContext);
	const [stackName, setStackName] = useState('');
	const [wheelOpen, setWheelOpen] = useState(false);

	/**
	 * Handles tab route with proper depth
	 * @param route - route to navigate to
	 * @param prev - previous route
	 * @returns route to navigate to
	 */
	const handleTabRoute = (route: string, prev: string): string => {
		modals.setIsOpen(false);
		setWheelOpen(false);

		// if (prev === route) {
		// 	if (router.canDismiss()) {
		// 		router.dismiss();
		// 		return '';
		// 	} else {
		// 		router.push(route as RelativePathString);
		// 		return route;
		// 	}
		// }
		router.push(route as RelativePathString);

		return route;
	};

	// TODO: change later
	const tempButtons = [
		{
			name: 'BodyTemperatureLight',
			onPress: () => {
				modals.setAddBTVisible(true);
				setWheelOpen(false);
			},
			isVisible: true, // TODO: change later so that we use this with whatever program the person is on
		},
		{
			name: 'BloodPressureLight',
			onPress: () => {
				modals.setAddBPVisible(true);
				setWheelOpen(false);
			},
			isVisible: true,
		},
		{
			name: 'BodyWeightLight',
			onPress: () => {
				modals.setAddBWVisible(true);
				setWheelOpen(false);
			},
			isVisible: true,
		},
		{
			name: 'OxygenSaturationLight',
			onPress: () => {
				modals.setAddBOVisible(true);
				setWheelOpen(false);
			},
			isVisible: true,
		},
		{
			name: 'BloodSugarLight',
			onPress: () => {
				modals.setAddBSVisible(true);
				setWheelOpen(false);
			},
			isVisible: true,
		},
	];

	return (
		<>
			<View>
				<Modal
					visible={wheelOpen}
					animationType='fade'
					onRequestClose={() => {
						modals.setIsOpen(false);
						setWheelOpen(false);
					}}
					transparent={true}
				>
					<TouchableWithoutFeedback
						onPressIn={() => {
							modals.setIsOpen(false);
							setWheelOpen(false);
						}}
					>
						<View style={Styles.scrollView}>
							<HvTabButtonWheel
								radius={65}
								roundness={0.5}
								buttons={tempButtons.filter((button) => button.isVisible)}
							/>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
			{/* <HideWithKeyboard> */}
			<View style={Styles.container}>
				<HvTabItem
					onPress={() => {
						setStackName(handleTabRoute('/(app)/(measurements)', stackName));
					}}
					source={require('@/assets/svgs/barChart.svg')}
					text='Mælingar'
				/>
				<HvTabItemAnimated
					onPress={() => {
						modals.setIsOpen(!wheelOpen);
						setWheelOpen(!wheelOpen);
					}}
					source={require('@/assets/svgs/add.svg')}
					source2={require('@/assets/svgs/addRed.svg')}
					text='Skrá mælingu'
					addOpen={wheelOpen}
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
			{/* </HideWithKeyboard> */}
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

	scrollView: {
		position: 'absolute',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},

	overlay: {
		position: 'absolute',
		top: -1,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
});

export default HvTabBar;
