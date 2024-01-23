import type { ParamMatcher } from '@sveltejs/kit';
import { z } from 'zod';

export const match: ParamMatcher = (param) => {
	const num = Number(param)
	return !Number.isNaN(num)
};