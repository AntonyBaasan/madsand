/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { socket } from './socketIo';

interface BattleClientProps {
  battleId?: string;
}
const BattleClient: React.FC<BattleClientProps> = ({ battleId }) => {
  // const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [fooEvents, setFooEvents] = useState<any>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onFooEvent(value: any) {
      setFooEvents((prev: any) => [...prev, value]);
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
  }, []);

  return (
    <div>
      <div>isConnected:{isConnected ? 'true' : 'false'}</div>
      <div>{battleId}</div>
      <div>{JSON.stringify(fooEvents)}</div>
      <div>
        <button type='button' onClick={() => socket.connect()}>
          Connect
        </button>
        <br />
        <button type='button' onClick={() => socket.disconnect()}>
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default BattleClient;
