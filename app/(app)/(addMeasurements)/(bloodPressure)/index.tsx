import { useState } from 'react';
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
import { useSession } from '@/authentication/ctx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IAddBloodPressure } from '@/interfaces/bloodPressureInterfaces';

const postBloodPressure = async (sessionId: string, measurement: IAddBloodPressure) => {
	const response = await axios.post(`${BLOODPRESSURE_URL}/${sessionId}`, measurement);
	return response.data;
};

const BloodPressure = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// radio buttons
	const [hand, setHand] = useState('Hægri');
	const [position, setPosition] = useState('Sitjandi');
	// num inputs
	const [sys, setSys] = useState('');
	const [dia, setDia] = useState('');
	const [pulse, setPulse] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBloodPressure) =>
			postBloodPressure(session?.toString() || '', measurement),
		onSuccess: () => {
			// route back to main screen
			queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
			if (router.canGoBack()) router.back();
		},
	});

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm
					onPress={async () => {
						try {
							await addMutation({
								patientID: parseInt(session?.toString() || '0', 10),
								measureHand: hand === 'Vinstri' ? 'Left' : 'Right',
								bodyPosition: position === 'Sitjandi' ? 'Sitting' : 'Laying',
								systolic: parseInt(sys, 10),
								diastolic: parseInt(dia, 10),
								pulse: parseInt(pulse, 10),
								date: new Date().toISOString(),
								status: 'pending',
							});
						} catch (error) {
							console.error('Error adding blood pressure:', error);
						}
					}}
				>
					<HvInputFormContainer>
						<HvToggleSelect
							itemState={hand}
							setItemState={setHand}
							leftIcon={require('@/assets/svgs/handLeft.svg')}
							rightIcon={require('@/assets/svgs/handRight.svg')}
							description='Mæli hönd'
							leftText='Vinstri'
							rightText='Hægri'
						/>
					</HvInputFormContainer>

					<HvInputFormContainer>
						<HvToggleSelect
							itemState={position}
							setItemState={setPosition}
							leftIcon={require('@/assets/svgs/sitting.svg')}
							rightIcon={require('@/assets/svgs/laying.svg')}
							description='Líkamsstaða'
							leftText='Sitjandi'
							rightText='Liggjandi'
						/>
					</HvInputFormContainer>

					<HvInputFormContainer textInput>
						<HvInputField
							itemState={sys}
							setItemState={setSys}
							header='Efri mörk'
							description='SYS'
							metric='mmHg'
						/>
						<HvInputField
							itemState={dia}
							setItemState={setDia}
							header='Neðri mörk'
							description='DIA'
							metric='mmHg'
						/>
						<HvInputField
							itemState={pulse}
							setItemState={setPulse}
							description='Púls'
							// metric="bpm"
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default BloodPressure;
