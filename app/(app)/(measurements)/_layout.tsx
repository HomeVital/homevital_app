import HvBackStack from '@/components/ui/hvBackStack';

const Layout = (): JSX.Element => {
	return (
		<HvBackStack
			title='Mælingar'
			ignoreHeaderRoutes={['(bloodPressure)', '(bloodSugar)', '(temperature)', '(weight)']}
		/>
	);
};

export default Layout;
