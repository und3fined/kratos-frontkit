/**
 * File: id.ts
 * Project: kratos-frontkit
 * File Created: 24 Aug 2021 16:08:28
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 24 Aug 2021 16:08:28
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import { nanoid } from 'nanoid/non-secure';

export function shortId(): string {
	return nanoid(8);
}
