// import { router } from 'expo-router';
// import { StyleSheet, TextInput, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useEffect, useState } from 'react';
// // components
// import { useSession } from '@/hooks/ctx';
// import HvButton from '@/components/ui/hvButton';
// // constants
// import { GRAY, LIGHT_GREEN, WHITE } from '@/constants/colors';
// import { WIN_WIDTH } from '@/constants/window';

// /**
//  * Sign in screen which allows the user to sign in with their SSN
//  * @returns sign in screen
//  */
// const SignIn = (): JSX.Element => {
// 	const { signIn, session } = useSession();
// 	const [SSN, setSSN] = useState('');

// 	useEffect(() => {
// 		if (session) {
// 			// Navigate to the app screen if there is a session
// 			router.replace('/');
// 		}
// 	}, [session]);

// 	return (
// 		<SafeAreaView style={Styles.container}>
// 			<View style={Styles.form}>
// 				<TextInput
// 					style={Styles.input}
// 					placeholder='SSN'
// 					value={SSN}
// 					onChangeText={setSSN}
// 					keyboardType='number-pad'
// 					autoCapitalize='none'
// 					// length should always be 10
// 					maxLength={10}
// 				/>
// 			</View>
// 			<HvButton
// 				text='Submit'
// 				width={WIN_WIDTH * 0.75}
// 				onPress={() => {
// 					signIn(SSN);
// 					// Navigate after signing in
// 					if (router.canDismiss()) router.dismiss();
// 					router.replace('/');
// 				}}
// 			/>
// 		</SafeAreaView>
// 	);
// };

// const Styles = StyleSheet.create({
// 	container: {
// 		flex: 1, // take up entire screen
// 		justifyContent: 'center', // center vertically
// 		alignItems: 'center', // center horizontally
// 		padding: 20,
// 		gap: 20,
// 		backgroundColor: LIGHT_GREEN,
// 	},
// 	form: {
// 		width: '80%',
// 	},
// 	input: {
// 		height: 50,
// 		backgroundColor: WHITE,
// 		borderColor: GRAY,
// 		fontSize: 24,
// 		borderRadius: 10,
// 		textAlign: 'center',
// 		textAlignVertical: 'center',
// 	},
// });

// export default SignIn;

import { router } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
// components
import { useSession } from '@/hooks/ctx';
import HvButton from '@/components/ui/hvButton';
// constants
import { GRAY, LIGHT_GREEN, WHITE } from '@/constants/colors';
import { WIN_WIDTH } from '@/constants/window';
import HvText from '@/components/ui/hvText';
import { ISignIn } from '@/interfaces/signInInterfaces';
import { AxError } from '@/interfaces/axErrorInterfaces';
import { GetErrorMessage } from '@/errorHandler';

/**
 * Sign in screen which allows the user to sign in with their SSN
 * @returns sign in screen
 */
const SignIn = (): JSX.Element => {
	const { signIn, session } = useSession();

	useEffect(() => {
		// Navigate to the app screen if there is a session
		if (session) {
			if (router.canDismiss()) router.dismiss();
			router.replace('/');
		}
	}, [session]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<ISignIn>({
		defaultValues: {
			ssn: '',
		},
		mode: 'onBlur',
	});

	const onSubmit = async (data: ISignIn) => {
		try {
			await signIn(data.ssn);
		} catch (e: unknown) {
			setError('ssn', { type: 'manual', message: GetErrorMessage(e as AxError, data) });
		}
	};

	return (
		<SafeAreaView style={Styles.container}>
			<TextInput keyboardType='numeric' autoCapitalize='none' maxLength={10} />
			<HvText weight='semibold' size='l'>
				Social Security Number
			</HvText>
			<Controller
				control={control}
				rules={{
					required: {
						value: true,
						message: 'SSN is required.',
					},
					minLength: {
						value: 10,
						message: 'SSN must be 10 digits.',
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<View style={[Styles.form, errors.ssn && Styles.error]}>
						<TextInput
							style={Styles.input}
							placeholder='0123456789'
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType='number-pad'
							autoCapitalize='none'
							maxLength={10}
						/>
					</View>
				)}
				name='ssn'
			/>
			{errors.ssn && <HvText>{errors.ssn.message}</HvText>}

			<HvButton text='Submit' width={WIN_WIDTH * 0.75} onPress={handleSubmit(onSubmit)} />
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
	form: {
		width: '80%',
	},
	input: {
		height: 50,
		backgroundColor: WHITE,
		borderColor: GRAY,
		fontSize: 24,
		borderRadius: 10,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	error: {
		borderColor: 'red',
		borderWidth: 2,
		borderRadius: 10,
	},
});

export default SignIn;
