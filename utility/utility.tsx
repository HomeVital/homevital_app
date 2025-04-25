import { jwtDecode } from 'jwt-decode';

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
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

	return '';
};
