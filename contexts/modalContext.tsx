import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import { createContext } from 'react';

const ModalContext = createContext<{
	// add
	addBPVisible: boolean;
	setAddBPVisible: (visible: boolean) => void;
	addBSVisible: boolean;
	setAddBSVisible: (visible: boolean) => void;
	addBOVisible: boolean;
	setAddBOVisible: (visible: boolean) => void;
	addBWVisible: boolean;
	setAddBWVisible: (visible: boolean) => void;
	addBTVisible: boolean;
	setAddBTVisible: (visible: boolean) => void;
	// edit
	editBPVisible: boolean;
	setEditBPVisible: (visible: boolean) => void;
	editBSVisible: boolean;
	setEditBSVisible: (visible: boolean) => void;
	editBOVisible: boolean;
	setEditBOVisible: (visible: boolean) => void;
	editBWVisible: boolean;
	setEditBWVisible: (visible: boolean) => void;
	editBTVisible: boolean;
	setEditBTVisible: (visible: boolean) => void;
	// other
	validationVisible: boolean;
	setValidationVisible: (visible: boolean) => void;
	validationStatus: string;
	setValidationStatus: (status: string) => void;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	isEditOpen: boolean;

	setIsEditOpen: (open: boolean) => void;

	editModalData: {
		title: string;
		item: IBloodPressure | IBloodSugar | IBodyWeight | IBodyTemperature | IOxygenSaturation;
	};
	setEditModalData: (data: {
		title: string;
		item: IBloodPressure | IBloodSugar | IBodyWeight | IBodyTemperature | IOxygenSaturation;
	}) => void;

	// loading
	contentReady: boolean;
	setContentReady: (ready: boolean) => void;
	modalVisible: number;
	setModalVisible: (visible: number) => void;
	editReady: boolean;
	setEditReady: (ready: boolean) => void;
	editModalVisible: number;
	setEditModalVisible: (visible: number) => void;
	// language
	changeLangVisible: boolean;
	setChangeLangVisible: (visible: boolean) => void;
}>({
	// add
	addBPVisible: false,
	setAddBPVisible: () => null,
	addBSVisible: false,
	setAddBSVisible: () => null,
	addBOVisible: false,
	setAddBOVisible: () => null,
	addBWVisible: false,
	setAddBWVisible: () => null,
	addBTVisible: false,
	setAddBTVisible: () => null,
	// edit
	editBPVisible: false,
	setEditBPVisible: () => null,
	editBSVisible: false,
	setEditBSVisible: () => null,
	editBOVisible: false,
	setEditBOVisible: () => null,
	editBWVisible: false,
	setEditBWVisible: () => null,
	editBTVisible: false,
	setEditBTVisible: () => null,
	// other
	validationVisible: false,
	setValidationVisible: () => null,
	validationStatus: '',
	setValidationStatus: () => null,
	// between modals
	isOpen: false,
	setIsOpen: () => null,
	isEditOpen: false,
	setIsEditOpen: () => null,
	editModalData: {
		title: '',
		item: {} as
			| IBloodPressure
			| IBloodSugar
			| IBodyWeight
			| IBodyTemperature
			| IOxygenSaturation,
	},
	setEditModalData: () => null,
	// loading
	contentReady: false,
	setContentReady: () => null,
	modalVisible: 0,
	setModalVisible: () => null,
	editReady: false,
	setEditReady: () => null,
	editModalVisible: 0,
	setEditModalVisible: () => null,
	// language
	changeLangVisible: false,
	setChangeLangVisible: () => null,
});

export default ModalContext;
