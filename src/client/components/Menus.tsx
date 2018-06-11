import * as React from "react";

import {Menu} from "./Menu";
import {getRestaurantByDistance} from "../restaurants";
import {getCurrentLocation, ILocationCoordinates} from "../utils/getCurrentLocation";

// Restaurants are sorted by distance from Kentico Academy (CERIT)
export class Menus extends React.Component<Object, { location: ILocationCoordinates }> {

    constructor() {
        super();
        this.state = {
            location: getCurrentLocation(),
        };
    }

    render() {
        return (
            <div className="col-md-10">
                {
                    getRestaurantByDistance(this.state.location).map(restaurant => (
                        <Menu
                            key={restaurant.id}
                            restaurantName={restaurant.name}
                            restaurantId={restaurant.id}
                            restaurantDistance={restaurant.distance}
                        />
                    ))
                }
            </div>);
    }
}
