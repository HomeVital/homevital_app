import { router } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
// components
import { useSession } from '@/hooks/ctx';
import HvButton from '@/components/ui/hvButton';
// constants
import { GRAY, LIGHT_GREEN, WHITE } from '@/constants/colors';
import { WIN_WIDTH } from '@/constants/window';
import HvText from '@/components/ui/hvText';
import { ISignIn, AxError } from '@/interfaces/api';
import { GetErrorMessage } from '@/errorHandler';
import { useTranslation } from 'react-i18next';
import { isExpired } from '@/utility/utility';
import { useNotification } from '@/contexts/notificationContext';

/**
 * Sign in screen which allows the user to sign in with their SSN
 * @returns sign in screen
 */
const SignIn = (): JSX.Element => {
	const { t } = useTranslation();
	const { signIn, session, token } = useSession();
	const [loading, setLoading] = useState(false);
	const { setNotificationCount, setNotifications } = useNotification();
	// Navigate to the app screen if there is a session
	useEffect(() => {
		// clearing for other potential users
		setNotificationCount(0);
		setNotifications([]);
		// log automatically in
		if (session && !isExpired(token)) {
			if (router.canDismiss()) {
				router.dismissAll();
			}
			router.replace('/');
		}
	}, [session, token]);

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
			// set loading spinner
			setLoading(true);
			await signIn(data.ssn);
		} catch (e: unknown) {
			setError('ssn', { type: 'manual', message: GetErrorMessage(e as AxError, data) });
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={Styles.container}>
			{/* <TextInput keyboardType='numeric' autoCapitalize='none' maxLength={10} /> */}
			<HvText weight='semibold' size='l'>
				{t('signIn.ssn')}
			</HvText>
			<Controller
				control={control}
				rules={{
					required: {
						value: true,
						message: t('signIn.ssnRequired'),
					},
					minLength: {
						value: 10,
						message: t('signIn.ssnLength'),
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<View style={Styles.form}>
						<TextInput
							style={[Styles.input, errors.ssn && Styles.error]}
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

			<HvButton
				text={t('signIn.submit')}
				width={WIN_WIDTH * 0.75}
				loading={loading}
				onPress={handleSubmit(onSubmit)}
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
	},
});

export default SignIn;
