import { useState } from 'react';
import { View } from 'react-native';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvToggleSelect from '@/components/ui/hvInputForm/hvToggleSelect';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';

const BloodPressure = (): JSX.Element => {
	// radio buttons
	const [hand, setHand] = useState('Hægri');
	const [position, setPosition] = useState('Sitjandi');
	// num inputs
	const [sys, setSys] = useState('');
	const [dia, setDia] = useState('');
	const [pulse, setPulse] = useState('');

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={() => {}}>
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
