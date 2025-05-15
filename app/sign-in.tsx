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
import { DARK_RED, GRAY, LIGHT_GREEN, TRANSLUCENT_TEXT, WHITE } from '@/constants/colors';
import HvText from '@/components/ui/hvText';
import { ISignIn, AxError } from '@/interfaces/api';
import { GetErrorMessage } from '@/errorHandler';
import { useTranslation } from 'react-i18next';
import { isExpired } from '@/utility/utility';
import { useNotification } from '@/contexts/notificationContext';
import HvCard from '@/components/cards/hvCard';

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
		// clearing notifications for potential other users
		setNotificationCount(0);
		setNotifications([]);

		if (session && !isExpired(token)) {
			if (router.canDismiss()) {
				router.dismissAll();
			}
			router.replace('/');
		}
	}, [session, token, setNotificationCount, setNotifications]);

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

	/**
	 * Function to handle the sign in process
	 * @param data sign in data
	 */
	const onSubmit = async (data: ISignIn) => {
		try {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await signIn(data.ssn);
		} catch (e: unknown) {
			setError('ssn', { type: 'manual', message: GetErrorMessage(e as AxError, data) });
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={Styles.container}>
			{!loading ? (
				<HvCard padding={20} gap={20} align='center' style={{ width: '100%', height: 270 }}>
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
								<HvText weight='semibold' size='xl' style={{ marginTop: 10 }}>
									{t('signIn.ssn')}
								</HvText>
								{errors.ssn ? (
									<HvText color={DARK_RED}>{errors.ssn.message}</HvText>
								) : value.length === 10 ? (
									<HvText color={TRANSLUCENT_TEXT}>
										{t('signIn.pressSubmit')}
									</HvText>
								) : (
									<HvText color={TRANSLUCENT_TEXT}>
										{t('signIn.enterInSSN')}
									</HvText>
								)}
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
					<HvButton
						text={t('signIn.submit')}
						width={260}
						loading={loading}
						onPress={handleSubmit(onSubmit)}
						style={{ marginBottom: 10 }}
					/>
				</HvCard>
			) : (
				<HvCard
					padding={30}
					gap={20}
					align='center'
					spacing='space-between'
					style={{ width: '100%', height: 270 }}
				>
					<HvText size='xl' style={{ width: 240 }} center>
						{t('signIn.skilriki')}
					</HvText>
					<HvText size='l' center>
						{t('signIn.followInstructions')}
					</HvText>
					<HvButton
						text={t('signIn.submit')}
						width={260}
						loading={loading}
						onPress={handleSubmit(onSubmit)}
					/>
				</HvCard>
			)}
		</SafeAreaView>
	);
};

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 40,
		backgroundColor: LIGHT_GREEN,
	},
	form: {
		gap: 12,
		alignItems: 'center',
		width: '100%',
	},
	input: {
		height: 50,
		width: 260,
		backgroundColor: WHITE,
		borderColor: GRAY,
		borderWidth: 1,
		fontSize: 24,
		borderRadius: 10,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});

export default SignIn;
