import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { STYLES } from '@/constants/styles';
import { useContext } from 'react';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';
import HvCard from '../cards/hvCard';
import { DARK_RED, LIGHT_THEME } from '@/constants/colors';
import HvButtonCheck from '../ui/hvButtonCheck';
import { useNotification } from '@/contexts/notificationContext';
import HvText from '../ui/hvText';
import HvScrollView from '../ui/HvScrollView';
import HvImage from '../ui/hvImage';
import { formatDate } from '@/utility/utility';
import HvButtonContainer from '../ui/hvButtonContainer';

const ViewNotifications = (): JSX.Element => {
	const { t } = useTranslation();
	const modals = useContext(ModalContext);
	const { notifications, setNotifications } = useNotification();

	const handleClose = (): void => {
		modals.setViewNotificationsVisible(false);
		modals.setIsOpen(false);
	};

	return (
		<Modal
			visible={modals.viewNotificationsVisible}
			animationType={modals.editReady ? 'fade' : 'none'}
			onRequestClose={handleClose}
			transparent={true}
		>
			<TouchableWithoutFeedback onPressIn={handleClose}>
				<View style={[STYLES.defaultModalViewDeep, { opacity: modals.modalVisible }]}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvCard
								gap={20}
								padding={20}
								bgColor={LIGHT_THEME}
								style={{ maxHeight: 600 }}
							>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck
										cancel
										onPress={handleClose}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									{t('modals.notifications.title')}
								</HvText>
								<HvScrollView>
									<View style={{ gap: 12, padding: 10 }}>
										{notifications.length > 0 ? (
											notifications.map((notification) => (
												<HvButtonContainer
													key={notification.request.identifier}
													onPress={() => {
														setNotifications((prev) =>
															prev.filter(
																(item) =>
																	item.request.identifier !==
																	notification.request.identifier,
															),
														);
													}}
												>
													<HvCard padding={12} row>
														<View style={{ gap: 8 }}>
															<View style={{ gap: 4 }}>
																<HvText size='xs'>
																	{formatDate(
																		new Date(
																			notification.date,
																		).toISOString(),
																		true,
																	)}
																</HvText>
																<HvText weight='semibold' size='l'>
																	{
																		notification.request.content
																			.title
																	}
																</HvText>
															</View>
															<HvText size='s'>
																{notification.request.content.body}
															</HvText>
														</View>
														<View
															style={{
																flex: 1,
																alignItems: 'flex-end',
																justifyContent: 'center',
															}}
														>
															<HvImage source={'Delete'} size={24} />
														</View>
													</HvCard>
												</HvButtonContainer>
											))
										) : (
											<HvCard padding={20}>
												<HvText center>
													{t('modals.notifications.noNotifications')}
												</HvText>
											</HvCard>
										)}
									</View>
								</HvScrollView>
							</HvCard>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default ViewNotifications;
