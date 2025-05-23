import { Image, ImageProps } from 'expo-image';

interface Props extends ImageProps {
	source: string;
	size?: number;
}

const sources = {
	// measurement icons
	BodyWeight: require('@/assets/images/scaleDark.png'),
	OxygenSaturation: require('@/assets/svgs/lungsDark.svg'),
	BodyTemperature: require('@/assets/images/warmDark.png'),
	BloodPressure: require('@/assets/images/heartDark.png'),
	BloodSugar: require('@/assets/images/waterDark.png'),
	Schedule: require('@/assets/svgs/schedule.svg'),

	// add icons
	BodyWeightLight: require('@/assets/svgs/scale.svg'),
	OxygenSaturationLight: require('@/assets/svgs/lungs.svg'),
	BodyTemperatureLight: require('@/assets/images/warm.png'),
	BloodPressureLight: require('@/assets/svgs/heart.svg'),
	BloodSugarLight: require('@/assets/images/water.png'),

	// toggle icons
	Right: require('@/assets/svgs/handRightArrow.svg'),
	Left: require('@/assets/svgs/handLeftArrow.svg'),
	Sitting: require('@/assets/svgs/sitting.svg'),
	Laying: require('@/assets/svgs/laying.svg'),

	// measurement label icons
	Normal: require('@/assets/svgs/measurementLabel/good.svg'),
	Raised: require('@/assets/svgs/measurementLabel/tight.svg'),
	High: require('@/assets/svgs/measurementLabel/bad.svg'),
	Critical: require('@/assets/svgs/measurementLabel/bad.svg'),
	CriticalHigh: require('@/assets/svgs/measurementLabel/bad.svg'),
	Invalid: require('@/assets/svgs/measurementLabel/bad.svg'),

	// add measurement popup message images
	Healthy: require('@/assets/svgs/popup/healthy.svg'),
	HealthyWarning: require('@/assets/svgs/popup/healthyWarning.svg'),
	Unhealthy: require('@/assets/svgs/popup/unhealthy.svg'),

	// checkmark icons
	Cancel: require('@/assets/svgs/cancel.svg'),
	Edit: require('@/assets/images/pencil.png'),
	View: require('@/assets/svgs/viewArrow.svg'),
	Instruction: require('@/assets/svgs/instruction.svg'),
	Delete: require('@/assets/svgs/trash.svg'),
	NotificationBell: require('@/assets/svgs/notificationBell.svg'),

	// navigation icons
	Back: require('@/assets/svgs/defBack.svg'),
	Forward: require('@/assets/svgs/defForward.svg'),
};

/**
 * Custom image component for displaying images
 * @param source - image source
 * @param size - size of the image
 * @param props - additional props for the image component
 * @returns image component
 */
const HvImage = ({ source, size = 100, ...props }: Props): JSX.Element => {
	return (
		<Image
			source={sources[source as keyof typeof sources]}
			contentFit='contain'
			style={[{ width: size, height: size }, props.style]}
		/>
	);
};

export default HvImage;
