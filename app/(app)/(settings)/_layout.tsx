import HvBackStack from '@/components/ui/hvBackStack';
import { useTranslation } from 'react-i18next';

const Layout = (): JSX.Element => {
	const { t } = useTranslation();
	return <HvBackStack title={t('tabbar.settings')} />;
};

export default Layout;
