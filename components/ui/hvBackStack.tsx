import { router, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DARK_GREEN, LIGHT_THEME } from '@/constants/colors';

interface Props {
	title: string;
	ignoreHeaderRoutes?: string[];
}

const HvBackStack = ({ title, ignoreHeaderRoutes = [] }: Props): JSX.Element => {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				contentStyle: { backgroundColor: LIGHT_THEME },
				headerBackButtonDisplayMode: 'default',
				headerStyle: {
					backgroundColor: LIGHT_THEME,
				},
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					title: title,
					headerTitleStyle: {
						...Styles.headerTitle,
					},
					headerBlurEffect: 'light',
					headerShadowVisible: false,
					headerLeft: () => (
						<TouchableOpacity style={Styles.headerBack} onPressIn={() => router.back()}>
							<Image
								source={require('@/assets/svgs/back.svg')}
								contentFit='contain'
								style={Styles.headerBackIcon}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			{ignoreHeaderRoutes.map((route) => (
				<Stack.Screen
					key={route}
					name={route}
					options={{
						headerShown: false,
					}}
				/>
			))}
		</Stack>
	);
};

const Styles = StyleSheet.create({
	headerTitle: {
		fontFamily: 'OpenSansSemibold',
		fontSize: 18,
		color: DARK_GREEN,
	},
	headerBack: {
		alignItems: 'flex-start',
		width: 60,
		height: '100%',
		position: 'relative',
		left: -20,
		zIndex: 1000,
		marginRight: 20,
	},
	headerBackIcon: {
		width: '100%',
		height: 40,
	},
});

export default HvBackStack;
