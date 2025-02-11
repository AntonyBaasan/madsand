import { io } from 'socket.io-client';

// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:1999';
const URL = 'http://localhost:1999';

export const socket = io(URL, { autoConnect: true });
