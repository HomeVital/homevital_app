import { router } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
// components
import { useSession } from '@/authentication/ctx';
import HvButton from '@/components/ui/hvButton';
// constants
import { GRAY, LIGHT_GREEN, WHITE } from '@/constants/colors';
import { WIN_WIDTH } from '@/constants/window';

const SignIn = (): JSX.Element => {
	const { signIn, session } = useSession();
	const [SSN, setSSN] = useState('');

	useEffect(() => {
		if (session) {
			// Navigate to the app screen if there is a session
			router.replace('/');
		}
	}, [session]);

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.form}>
				<TextInput
					style={Styles.input}
					placeholder='SSN'
					value={SSN}
					onChangeText={setSSN}
					keyboardType='numeric'
					autoCapitalize='none'
					// length should always be 10
					maxLength={10}
				/>
			</View>
			<HvButton
				text='Some sign in'
				width={WIN_WIDTH * 0.75}
				onPress={() => {
					signIn(SSN);
					// Navigate after signing in. You may want to tweak this to ensure sign-in is
					// successful before navigating.
					if (router.canDismiss()) router.dismiss();
					router.replace('/');
				}}
			/>
		</SafeAreaView>
	);
};

const Styles = StyleSheet.create({
	container: {
		flex: 1, // take up entire screen
		justifyContent: 'center', // center vertically
		alignItems: 'center', // center horizontally
		padding: 20,
		gap: 20,
		backgroundColor: LIGHT_GREEN,
	},
	homeImage: {
		height: '50%',
		width: '70%',
	},
	form: {
		width: '80%',
	},
	input: {
		height: 40,
		backgroundColor: WHITE,
		borderColor: GRAY,
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 8,
	},
});

export default SignIn;
