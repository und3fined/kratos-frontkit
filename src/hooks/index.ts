/**
 * File: index.ts
 * Project: ~TODO~
 * File Created: 20 Aug 2021 14:36:38
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 20 Aug 2021 14:36:38
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import cookie from 'cookie';
import { nanoid } from 'nanoid/non-secure';
import type { Handle, GetSession, ExternalFetch } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || nanoid();

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};

export const getSession: GetSession = async (request) => {
	return request.locals.user
		? {
			user: {
				name: request.locals.user.name,
				email: request.locals.user.email,
				avatar: request.locals.user.avatar
			}
		}
		: { user: null };
};

export const externalFetch: ExternalFetch = async (request) => {
	if (request.url.startsWith('https://api.yourapp.com/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('https://api.yourapp.com/', 'http://localhost:9999/'),
			request
		);
	}

	return fetch(request);
}