import HvBackStack from '@/components/ui/hvBackStack';
import { useTranslation } from 'react-i18next';

const Layout = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<HvBackStack
			// title='Mælingar'
			title={t('measurements.page.measurements')}
			ignoreHeaderRoutes={[
				'(bloodPressure)',
				'(bloodSugar)',
				'(temperature)',
				'(weight)',
				'(oxygenSaturation)',
			]}
		/>
	);
};

export default Layout;
