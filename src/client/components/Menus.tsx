import * as React from "react";
import {Menu} from "./Menu";
import {getCurrentLocation } from "../utils/getCurrentLocation";
import {getRestaurantByDistance, loadRestaurants, Restaurant} from "../restaurants";

import LatLng = google.maps.LatLng;

// Restaurants are sorted by distance from Kentico Academy (CERIT)
export class Menus extends React.PureComponent<{}, { location: LatLng, restaurants: Restaurant[] }> {

    constructor(props: {}) {
        super(props);
        this.state = {
            location: getCurrentLocation(),
            restaurants: [],
        };
    }

    async componentDidMount() {
        const restaurants = await loadRestaurants(this.state.location);
        const orderedRestaurants = getRestaurantByDistance(restaurants);
        this.setState(() => ({ restaurants: orderedRestaurants }));
    }

    render() {
        return (
            <div className="col-md-10">
                {
                   this.state.restaurants.map(restaurant => (
                        <Menu
                            key={restaurant.id}
                            restaurantName={restaurant.address.substr(0, restaurant.address.indexOf(','))}
                            restaurantId={restaurant.id}
                            restaurantDistance={restaurant.duration}
                        />
                    ))
                }
            </div>
        );
    }
}
