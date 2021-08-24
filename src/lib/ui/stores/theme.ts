/**
 * File: theme.ts
 * Project: kratos-frontkit
 * File Created: 24 Aug 2021 14:28:04
 * Author: und3fined (me@und3fined.com)
 * -----
 * Last Modified: 24 Aug 2021 14:28:05
 * Modified By: und3fined (me@und3fined.com)
 * -----
 * Copyright (c) 2021 und3fined.com
 */
import { writable } from 'svelte/store';

export const theme = writable<string>('dark')