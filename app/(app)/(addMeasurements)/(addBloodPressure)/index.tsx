import { View } from 'react-native';
import { router } from 'expo-router';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvToggleSelect from '@/components/ui/hvInputForm/hvToggleSelect';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';
import { useSession } from '@/hooks/ctx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAddBloodPressure } from '@/interfaces/measurements';
import { Controller, useForm } from 'react-hook-form';
import { postBloodPressure } from '@/queries/post';
import { useState } from 'react';
import HvModalValidation from '@/components/modals/hvModalValidation';

const BloodPressure = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// post modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalStatus, setModalStatus] = useState('');
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
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			setModalStatus(data.status);
			setModalVisible(true);
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
			<HvModalValidation
				visible={modalVisible}
				onClose={() => {
					setModalVisible(false);
					router.dismissAll();
				}}
				validationStatus={modalStatus}
			/>
		</HvScrollView>
	);
};

export default BloodPressure;
