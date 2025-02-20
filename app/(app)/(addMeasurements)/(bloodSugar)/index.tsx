import { useState } from 'react';
import { View } from 'react-native';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';

const BloodSugar = (): JSX.Element => {
	// num inputs
	const [bloodPressure, setbloodPressure] = useState('');

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={() => {}}>
					<HvInputFormContainer textInput>
						<HvInputField
							itemState={bloodPressure}
							setItemState={setbloodPressure}
							description='Blóðsykur'
							metric='mmol/L'
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default BloodSugar;
