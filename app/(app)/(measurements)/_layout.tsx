import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
// constants
import { LIGHT_THEME } from '@/constants/colors';
import { STYLES as Styles } from '@/constants/styles';

const MeasurementsLayout = (): JSX.Element => {
	// This layout can be deferred because it's not the root layout.
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
					title: 'Mælingar',
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
			<Stack.Screen
				name='(bloodPressure)'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='(bloodSugar)'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='(temperature)'
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='(weight)'
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default MeasurementsLayout;
