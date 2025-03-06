import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
// constants
import { LIGHT_THEME } from '@/constants/colors';
import { STYLES as Styles } from '@/constants/styles';

const AddWeightLayout = (): JSX.Element => {
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
					title: 'Skrá þyngd',
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
		</Stack>
	);
};

export default AddWeightLayout;
