// import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
// import {
// 	deleteBloodPressure,
// 	deleteBloodSugar,
// 	deleteBodyTemperature,
// 	deleteBodyWeight,
// 	deleteOxygenSaturation,
// } from './delete';
// import {
// 	IBloodPressure,
// 	IBloodSugar,
// 	IBodyTemperature,
// 	IBodyWeight,
// 	IOxygenSaturation,
// } from '@/interfaces/measurements';
// import {
// 	isBloodPressure,
// 	isBloodSugar,
// 	isBodyTemperature,
// 	isBodyWeight,
// 	isOxygenSaturation,
// } from '@/constants/typeGuards';

// // const { mutateAsync: deleteMutationBP } = useMutation({
// // 	mutationFn: async (itemId: string) => deleteBloodPressure(itemId),
// // 	onSuccess: () => {
// // 		queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
// // 		queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// // 	},
// // });

// // const { mutateAsync: deleteMutationBS } = useMutation({
// // 	mutationFn: async (itemId: string) => deleteBloodSugar(itemId),
// // 	onSuccess: () => {
// // 		queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
// // 		queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// // 	},
// // });

// // const { mutateAsync: deleteMutationBT } = useMutation({
// // 	mutationFn: async (itemId: string) => deleteBodyTemperature(itemId),
// // 	onSuccess: () => {
// // 		queryClient.invalidateQueries({ queryKey: ['bodytemperature'] });
// // 		queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// // 	},
// // });

// // const { mutateAsync: deleteMutationBW } = useMutation({
// // 	mutationFn: async (itemId: string) => deleteBodyWeight(itemId),
// // 	onSuccess: () => {
// // 		queryClient.invalidateQueries({ queryKey: ['bodyweight'] });
// // 		queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// // 	},
// // });

// // const { mutateAsync: deleteMutationOS } = useMutation({
// // 	mutationFn: async (itemId: string) => deleteOxygenSaturation(itemId),
// // 	onSuccess: () => {
// // 		queryClient.invalidateQueries({ queryKey: ['oxygensaturation'] });
// // 		queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// // 	},
// // });

// interface Props<
// 	T = IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
// > {
// 	dataType: T;
// 	itemId: string;
// 	onClose: () => void;
// 	queryClient: QueryClient;
// }

// export const handleDeleteMutation = async <T,>({
// 	dataType,
// 	itemId,
// 	onClose,
// 	queryClient = useQueryClient(),
// }: Props<T>): Promise<void> => {
// 	try {
// 		if (isBloodPressure(dataType)) {
// 			// await deleteMutationBP(itemId);
// 			useMutation({
// 				mutationFn: async (itemId: string) => deleteBloodPressure(itemId),
// 				onSuccess: () => {
// 					queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
// 					queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// 				},
// 			}).mutateAsync(itemId);
// 		} else if (isBloodSugar(dataType)) {
// 			useMutation({
// 				mutationFn: async (itemId: string) => deleteBloodSugar(itemId),
// 				onSuccess: () => {
// 					queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
// 					queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// 				},
// 			}).mutateAsync(itemId);
// 		} else if (isBodyTemperature(dataType)) {
// 			useMutation({
// 				mutationFn: async (itemId: string) => deleteBodyTemperature(itemId),
// 				onSuccess: () => {
// 					queryClient.invalidateQueries({ queryKey: ['bodytemperature'] });
// 					queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// 				},
// 			}).mutateAsync(itemId);
// 		} else if (isBodyWeight(dataType)) {
// 			useMutation({
// 				mutationFn: async (itemId: string) => deleteBodyWeight(itemId),
// 				onSuccess: () => {
// 					queryClient.invalidateQueries({ queryKey: ['bodyweight'] });
// 					queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// 				},
// 			}).mutateAsync(itemId);
// 		} else if (isOxygenSaturation(dataType)) {
// 			useMutation({
// 				mutationFn: async (itemId: string) => deleteOxygenSaturation(itemId),
// 				onSuccess: () => {
// 					queryClient.invalidateQueries({ queryKey: ['oxygensaturation'] });
// 					queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
// 				},
// 			}).mutateAsync(itemId);
// 		}
// 		onClose();
// 	} catch (error) {
// 		console.error('Error deleting blood pressure:', error);
// 	}
// };
