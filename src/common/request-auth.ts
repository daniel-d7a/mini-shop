import type { Request } from 'express';
import type { Session } from '../modules/auth/auth.js';

export type RequestAuth = Session;

export type AuthedRequest = Request & { auth?: RequestAuth };
