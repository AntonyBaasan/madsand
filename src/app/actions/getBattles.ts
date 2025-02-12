'use server'
export type Battle = {
  id: string;
  name: string;
  map: string;
  status: 'COMING' | 'ACTIVE' | 'DONE';
  sideA: string[];// [1111, 2222] - list of tribe IDs 
  sideB: string[];// [1111, 2222] - list of tribe IDs 
  requestedBy: string;// 1111 - ID of a player who started
}
export async function getBattles(): Promise<Battle[]> {
  try {
    const battles = await getBattlesFromDB();
    console.log('battles:', battles.length);
    return battles;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error('Error getting battles:', (error as any).response);
    return [];
  }
}

const getBattlesFromDB = async (): Promise<Battle[]> => {
  return [
    {
      id: 'demo1',
      name: 'Battle for the seven hills',
      map: 'map1',
      status: 'COMING',
      sideA: ['River People'],
      sideB: ['Bullet Brotherhood'],
      requestedBy: 'demoBot1'
    },
    {
      id: 'demo2',
      name: 'Sing in sea',
      map: 'map1',
      status: 'COMING',
      sideA: ['River People'],
      sideB: ['Bullet Brotherhood'],
      requestedBy: 'demoBot1'
    },
  ] as Battle[];
}
