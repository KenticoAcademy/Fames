// distance in metres form FI main entrance

type Restaurant = {
    name: string;
    id: number;
    distance?: number;
};

const sortByDistance = ({ distance: distance1 = 0 }: Restaurant, { distance: distance2 = 0 }: Restaurant) =>
    distance1 - distance2;

export const restaurants: Restaurant[] = [
    { name: 'Lights of India', id: 16511911, distance: 400 },
    { name: 'Magistr', id: 16506840, distance: 170 },
    { name: 'U Dřeváka', id: 16505458, distance: 300 },
    { name: 'Al Capone', id: 16515833, distnace: 300 },
    { name: 'Divá Bára', id: 16514047, distance: 450 },
    { name: 'U Bílého beránka', id: 16506737, distance: 550 },
    { name: 'Himalaya', id: 18020959, distance: 800 },
].sort(sortByDistance);
