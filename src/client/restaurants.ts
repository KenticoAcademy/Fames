import LatLng = google.maps.LatLng;
import TravelMode = google.maps.TravelMode;
import DistanceMatrixResponse = google.maps.DistanceMatrixResponse;
import DistanceMatrixStatus = google.maps.DistanceMatrixStatus;

export type Restaurant = {
    address: string;
    id: number;
    duration?: string;
    distance?: number;
};

const sortByDistance = ({distance: distance1 = 0}: Restaurant, {distance: distance2 = 0}: Restaurant): number =>
    distance1 - distance2;

const restaurants = [
    {
        address: 'U Dřeváka Beer&Grill, Dřevařská, Brno-Královo Pole-Brno-střed',
        id: 16505458,
    },
    {
        address: 'Pizzeria Al Capone, Hrnčířská, Brno-Ponava',
        id: 16515833,
    },
    {
        address: 'Restaurace Divá Bára, Štefánikova, Brno-střed',
        id: 16514047,
    },
    {
        address: 'Light of India, Štefánikova, Brno-Královo Pole-Ponava',
        id: 16511911,
    },
    {
        address: 'U Bílého beránka, Štefánikova, Brno-Královo Pole-Ponava',
        id: 16506737,
    },
    {
        address: 'Himalaya, Pionýrská, Brno',
        id: 18020959
    },
];

export const getRestaurantByDistance = (restaurantsWithDistance: Restaurant[]): Restaurant[] =>
    restaurantsWithDistance.sort(sortByDistance);

export const loadRestaurants = async (currentPosition: LatLng): Promise<Restaurant[]> => {
    const service = new google.maps.DistanceMatrixService();

    const restaurantsWithDistances = restaurants.map(restaurant => new Promise<Restaurant>(
        resolve => {
            service.getDistanceMatrix(
                {
                    origins: [currentPosition],
                    destinations: [restaurant.address],
                    travelMode: TravelMode.WALKING,
                },
                (response, status) => resolve(parseDistances(response, status, restaurant))
            );
        }));

    return Promise.all(restaurantsWithDistances);
};

const parseDistances = (response: DistanceMatrixResponse, status: DistanceMatrixStatus, restaurant: Restaurant): Restaurant => {
    if (status == DistanceMatrixStatus.OK) {
        const googleDuration = response.rows[0].elements[0].duration;
        const googleDistance = response.rows[0].elements[0].distance;

        return {
            address: restaurant.address,
            id: restaurant.id,
            distance: googleDistance.value,
            duration: googleDuration.text,
        };
    }
};
