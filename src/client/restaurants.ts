// distance in minutes from Kentico Academy (CERIT)

type Restaurant = {
    name: string;
    id: number;
    distance?: number;
};

const sortByDistance = ({ distance: distance1 = 0 }: Restaurant, { distance: distance2 = 0 }: Restaurant) =>
    distance1 - distance2;

export const restaurants: Restaurant[] = [
    { name: 'Lights of India', id: 16511911, distance: 6 },
    { name: 'U Dřeváka', id: 16505458, distance: 4 },
    { name: 'Al Capone', id: 16515833, distance: 5 },
    { name: 'Divá Bára', id: 16514047, distance: 6 },
    { name: 'U Bílého beránka', id: 16506737, distance: 8 },
    { name: 'Himalaya', id: 18020959, distance: 12 },
].sort(sortByDistance);
