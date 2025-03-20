import { View } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvToggleSelect from '@/components/ui/hvInputForm/hvToggleSelect';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';
import { BLOODPRESSURE_URL } from '@/constants/api';
import { useSession } from '@/hooks/ctx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAddBloodPressure } from '@/interfaces/bloodPressureInterfaces';
import { Controller, useForm } from 'react-hook-form';

const postBloodPressure = async (sessionId: string, measurement: IAddBloodPressure) => {
	const response = await axios.post(`${BLOODPRESSURE_URL}/${sessionId}`, measurement);
	return response.data;
};

const BloodPressure = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// states
	// const [hand, setHand] = useState('Hægri');
	// const [position, setPosition] = useState('Sitjandi');
	// const [sys, setSys] = useState('');
	// const [dia, setDia] = useState('');
	// const [pulse, setPulse] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddBloodPressure>({
		defaultValues: {
			measureHand: 'Hægri',
			bodyPosition: 'Sitjandi',
			systolic: Number(''),
			diastolic: Number(''),
			pulse: Number(''),
		},
	});

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBloodPressure) =>
			postBloodPressure(session?.toString() || '', measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			if (router.canGoBack()) router.back();
		},
	});

	const onSubmit = (data: IAddBloodPressure) => {
		try {
			addMutation({
				patientID: parseInt(session?.toString() || '0', 10),
				measureHand: data.measureHand === 'Vinstri' ? 'Left' : 'Right',
				bodyPosition: data.bodyPosition === 'Sitjandi' ? 'Sitting' : 'Laying',
				systolic: data.systolic,
				diastolic: data.diastolic,
				pulse: data.pulse,
				status: 'pending',
			});
		} catch (error) {
			console.error('Error adding blood pressure:', error);
		}
	};

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={handleSubmit(onSubmit)}>
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<HvInputFormContainer>
								<HvToggleSelect
									itemState={value}
									setItemState={onChange}
									leftIcon={require('@/assets/svgs/handLeft.svg')}
									rightIcon={require('@/assets/svgs/handRight.svg')}
									description='Mæli hönd'
									leftText='Vinstri'
									rightText='Hægri'
								/>
							</HvInputFormContainer>
						)}
						name='measureHand'
					/>
					<Controller
						control={control}
						render={({ field: { onChange, value } }) => (
							<HvInputFormContainer>
								<HvToggleSelect
									itemState={value}
									setItemState={onChange}
									leftIcon={require('@/assets/svgs/sitting.svg')}
									rightIcon={require('@/assets/svgs/laying.svg')}
									description='Líkamsstaða'
									leftText='Sitjandi'
									rightText='Liggjandi'
								/>
							</HvInputFormContainer>
						)}
						name='bodyPosition'
					/>

					<HvInputFormContainer textInput>
						<Controller
							control={control}
							rules={{
								required: true,
								min: 0,
							}}
							render={({ field: { onChange, value } }) => (
								<HvInputField
									itemState={value}
									setItemState={onChange}
									header='Efri mörk'
									description='SYS'
									metric='mmHg'
									error={errors.systolic}
								/>
							)}
							name='systolic'
						/>
						<Controller
							control={control}
							rules={{
								required: true,
								min: 0,
							}}
							render={({ field: { onChange, value } }) => (
								<HvInputField
									itemState={value}
									setItemState={onChange}
									header='Neðri mörk'
									description='DIA'
									metric='mmHg'
								/>
							)}
							name='diastolic'
						/>
						<Controller
							control={control}
							rules={{
								required: true,
								min: 0,
							}}
							render={({ field: { onChange, value } }) => (
								<HvInputField
									itemState={value}
									setItemState={onChange}
									description='Púls'
									// metric="bpm"
								/>
							)}
							name='pulse'
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default BloodPressure;
