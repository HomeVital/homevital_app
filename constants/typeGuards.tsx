import { IBloodPressure } from '@/interfaces/measurements';
import { IBloodSugar } from '@/interfaces/measurements';
import { IBodyTemperature } from '@/interfaces/measurements';
import { IBodyWeight } from '@/interfaces/measurements';
import { IOxygenSaturation } from '@/interfaces/measurements';

// Type guards
export const isBloodPressure = (item: unknown): item is IBloodPressure =>
	item !== null && typeof item === 'object' && 'systolic' in item && 'diastolic' in item;

export const isOxygenSaturation = (item: unknown): item is IOxygenSaturation =>
	item !== null && typeof item === 'object' && 'oxygenSaturationValue' in item;

export const isBodyTemperature = (item: unknown): item is IBodyTemperature =>
	item !== null && typeof item === 'object' && 'temperature' in item;

export const isBodyWeight = (item: unknown): item is IBodyWeight =>
	item !== null && typeof item === 'object' && 'weight' in item;

export const isBloodSugar = (item: unknown): item is IBloodSugar =>
	item !== null && typeof item === 'object' && 'bloodsugarLevel' in item;
