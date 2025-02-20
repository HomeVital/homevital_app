import { useState } from 'react';
import { View } from 'react-native';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';

const BloodOxygen = (): JSX.Element => {
	// num inputs
	const [bloodOxygen, setBloodOxygen] = useState('');

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={() => {}}>
					<HvInputFormContainer textInput>
						<HvInputField
							itemState={bloodOxygen}
							setItemState={setBloodOxygen}
							description='%'
							keyboardMax={2}
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default BloodOxygen;
