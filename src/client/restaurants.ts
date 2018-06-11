// distance in minutes from Kentico Academy (CERIT)

import {ILocationCoordinates} from "./utils/getCurrentLocation";
import * as geolib from 'geolib';

type Restaurant = {
    name: string;
    id: number;
    distance?: number;
    coords?: ILocationCoordinates;
};

const sortByDistance = ({ distance: distance1 = 0 }: Restaurant, { distance: distance2 = 0 }: Restaurant) =>
    distance1 - distance2;

const restaurants: Restaurant[] = [
    {name: 'Lights of India', id: 16511911, distance: 6, coords: {latitude: 49.21138759999999, longitude: 16.60189790000004}},
    {name: 'U Dřeváka', id: 16505458, distance: 4, coords: {latitude: 49.209095, longitude: 16.60089579999999}},
    {name: 'Al Capone', id: 16515833, distance: 5, coords: {latitude: 49.2105087, longitude: 16.601534000000015}},
    {name: 'Divá Bára', id: 16514047, distance: 6, coords: {latitude: 49.20995699999999, longitude: 16.6027464}},
    {name: 'U Bílého beránka', id: 16506737, distance: 8, coords: {latitude: 49.2091793, longitude: 16.60371370000007}},
    {name: 'Himalaya', id: 18020959, distance: 12, coords: {latitude: 49.208188, longitude: 16.60556930000007}},
];

export const getRestaurantByDistance = (currentPosition: ILocationCoordinates) => {
    const restaurantDistances = restaurants.map(restaurant => {
        return ({
            distance: geolib.getDistance(currentPosition, restaurant.coords),
            name: restaurant.name,
            id: restaurant.id
        })
    });

    return restaurantDistances
        .sort(sortByDistance)
        .map(restaurant => ({
            ...restaurant,
            distance: Math.round(restaurant.distance / 83),
        }));
};
