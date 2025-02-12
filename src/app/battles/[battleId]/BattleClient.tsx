/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import BattleScene from './BattleScene';

interface BattleClientProps {
  battleId?: string;
}
const BattleClient: React.FC<BattleClientProps> = ({ battleId }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [fooEvents, setFooEvents] = useState<any>([]);
  const [socket, setSocket] = useState<Socket>();
  const [token, setToken] = useState<string>('tokenDemoUser1');
  const [side, setSide] = useState<string>('River People');
  const [name, setName] = useState<string>('Player1');
  const [message, setMessage] = useState<string>('');
  const [debugMessage, setDebugMessage] = useState<string>('');

  useEffect(() => {
    const URL = 'http://localhost:1999';
    const socket = io(URL, {
      autoConnect: false,
      auth: { token },
      query: {
        battleId: battleId,
        player: JSON.stringify({
          name: name,
          tribe: side,
        }),
      },
    });
    setSocket(socket);

    function onConnect() {
      setIsConnected(true);
      setDebugMessage('connected');
    }
    function onConnectError(error: any) {
      setIsConnected(false);
      setDebugMessage('connect_error: ' + error.message);
    }
    function onDisconnect() {
      setIsConnected(false);
      setDebugMessage('disconnected');
    }
    function onFooEvent(value: any) {
      setFooEvents((prev: any) => [...prev, value]);
    }
    socket.on('connect', onConnect);
    socket.on('connect_error', onConnectError);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
  }, [battleId, name, token]);

  const clickConnect = () => {
    if (socket) {
      socket.connect();
    }
  };

  const clickDisconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  const clickSendEvent = () => {
    if (message && socket) {
      socket.emit('foo', message);
    }
  };

  return (
    <div className='text-sm flex flex-col gap-2'>
      <div>isConnected: {isConnected ? 'true' : 'false'}</div>
      <div>battleId: {battleId}</div>
      <div>
        Player name:{' '}
        <input
          className='p-1 border border-1 border-black'
          value={name}
          onChange={(value) => setName(value.target.value)}
        />
        ({name})
      </div>
      <div className='flex flex-row gap-2'>
        <div>choose your side: </div>
        <div className='flex flex-row gap-2'>
          <div className='flex items-center'>
            <input
              onClick={() => setSide('River People')}
              defaultChecked={side === 'River People'}
              id='default-radio-1'
              type='radio'
              value=''
              name='default-radio'
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            <label
              htmlFor='default-radio-1'
              className='ms-2 text-sm font-medium dark:text-gray-300 px-2 bg-red-400 text-white'
            >
              River People
            </label>
          </div>
          <div className='flex items-center'>
            <input
              onClick={() => setSide('Bullet Brotherhood')}
              defaultChecked={side === 'Bullet Brotherhood'}
              id='default-radio-2'
              type='radio'
              value=''
              name='default-radio'
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            <label
              htmlFor='default-radio-2'
              className='ms-2 text-sm font-medium text-white px-2 dark:text-gray-300 bg-blue-400'
            >
              Bullet Brotherhood
            </label>
          </div>
        </div>
      </div>
      <div>events: {JSON.stringify(fooEvents)}</div>
      <div>debug: {debugMessage}</div>
      <div className='flex flex-col gap-4'>
        <div>actions: </div>
        <div className='p-5 flex flex-col gap-2'>
          <div className=''>
            <input
              className='border border-1 border-gray-500 p-1'
              value={token}
              onChange={(value) => setToken(value.target.value)}
            />
            <button className='bg-blue-500 text-white p-1' type='button' onClick={clickConnect}>
              Connect
            </button>
          </div>
          <div className=''>
            <input
              className='border border-1 border-gray-500 p-1'
              onChange={(value) => setMessage(value.target.value)}
            />
            <button className='bg-blue-500 text-white p-1' type='button' onClick={clickSendEvent}>
              Send
            </button>
          </div>
          <button className='bg-blue-500 text-white p-1' type='button' onClick={clickDisconnect}>
            Disconnect
          </button>
        </div>
      </div>
      <div>Board:</div>
      <div><BattleScene /></div>
    </div>
  );
};

export default BattleClient;
