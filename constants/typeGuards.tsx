import { IBloodPressure } from '@/interfaces/measurements';
import { IBloodSugar } from '@/interfaces/measurements';
import { IBodyTemperature } from '@/interfaces/measurements';
import { IBodyWeight } from '@/interfaces/measurements';
import { IOxygenSaturation } from '@/interfaces/measurements';

/**
 * Type guard to check if an item is a blood pressure measurement.
 * @param item - The item to check.
 * @returns True if the item is a blood pressure measurement, false otherwise.
 */
export const isBloodPressure = (item: unknown): item is IBloodPressure =>
	item !== null && typeof item === 'object' && 'systolic' in item && 'diastolic' in item;

/**
 * Type guard to check if an item is a blood oxygen saturation measurement.
 * @param item - The item to check.
 * @returns True if the item is a blood oxygen saturation measurement, false otherwise.
 */
export const isOxygenSaturation = (item: unknown): item is IOxygenSaturation =>
	item !== null && typeof item === 'object' && 'oxygenSaturationValue' in item;

/**
 * Type guard to check if an item is a body temperature measurement.
 * @param item - The item to check.
 * @returns True if the item is a body temperature measurement, false otherwise.
 */
export const isBodyTemperature = (item: unknown): item is IBodyTemperature =>
	item !== null && typeof item === 'object' && 'temperature' in item;

/**
 * Type guard to check if an item is a body weight measurement.
 * @param item - The item to check.
 * @returns True if the item is a body weight measurement, false otherwise.
 */
export const isBodyWeight = (item: unknown): item is IBodyWeight =>
	item !== null && typeof item === 'object' && 'weight' in item;

/**
 * Type guard to check if an item is a blood sugar measurement.
 * @param item - The item to check.
 * @returns True if the item is a blood sugar measurement, false otherwise.
 */
export const isBloodSugar = (item: unknown): item is IBloodSugar =>
	item !== null && typeof item === 'object' && 'bloodsugarLevel' in item;
