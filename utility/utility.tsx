import { jwtDecode } from 'jwt-decode';

export const formatDate = (dateString: string, hour?: boolean): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	if (hour) {
		return `${day}.${month}.${year}, ${hours}:${minutes}`;
	}
	return `${day}.${month}.${year}`;
};

type JWTClaims = {
	[key: string]: never;
};

export function getClaimsBySubstring(token: string, includes?: string[]): Partial<JWTClaims> {
	const payload = jwtDecode<JWTClaims>(token);

	if (!includes || includes.length === 0) return payload;

	const filtered: Partial<JWTClaims> = {};
	for (const key in payload) {
		if (includes.some((sub) => key.includes(sub))) {
			filtered[key] = payload[key];
		}
	}
	return filtered;
}

export const getClaimBySubstring = (token: string, includes: string): string => {
	const payload = jwtDecode<JWTClaims>(token);

	if (!includes) return '';

	for (const key in payload) {
		if (key.includes(includes)) {
			return payload[key];
		}
	}

	return '-1';
};

export const isExpired = (token: string): boolean => {
	const payload = jwtDecode<JWTClaims>(token);
	const exp = payload.exp as number;
	const now = Math.floor(Date.now() / 1000);
	return exp < now;
};
