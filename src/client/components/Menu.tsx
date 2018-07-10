import * as React from "react";
import * as Axios from 'axios';

import Dish from '../../common/Dish';
import DishListItem from './DishListItem';

interface IMenuProps {
    readonly restaurantName: string;
    readonly restaurantId: number;
    readonly restaurantDistance: string;
}

interface IMenuState {
    readonly isLoaded: boolean;
    readonly dishes: Dish[];
    readonly message: string;
}

export class Menu extends React.Component<IMenuProps, IMenuState> {
    constructor(properties: IMenuProps) {
        super(properties);
        this.state = {
            isLoaded: false,
            dishes: null,
            message: 'Loading…'
        };
    }

    _getCorrectFormOfMinutes = (minutes: string) => {
        switch(minutes) {
            case '1':
                return 'minuta';
            case '2':
            case '3':
            case '4':
                return 'minuty';
            default:
                return 'minut';
        }
    };

    componentDidMount() {
        Axios
            .get('/api/restaurant/' + this.props.restaurantId,
                { headers: { 'Accept': 'application/json' } })
            .then(response => {
                this.setState(() => ({
                    dishes: response.data as Dish[],
                    isLoaded: true,
                }));
            })
            .catch(exception => {
                this.setState(() => ({
                    isLoaded: true,
                    message: 'Error while loading lunch menu…',
                }));
                console.log(exception)
            });
    }

    render() {
        const restaurantDistance = this.props.restaurantDistance;
        const timeToRestaurant = restaurantDistance.substr(0, restaurantDistance.indexOf(' '));
        const restaurantTitle = this.props.restaurantName + ` (${timeToRestaurant} ${this._getCorrectFormOfMinutes(timeToRestaurant)} chůze)`;

        // Display status message when results were not loaded or no dishes were returned.
        if (!this.state.isLoaded || this.state.dishes == null) {
            return (
                <div>
                    <h2>
                        {restaurantTitle}
                    </h2>
                    <p>
                        {this.state.message}
                    </p>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <h2>
                        {restaurantTitle}
                        <sup>
                            <small>
                                <a href={'http://zoma.to/r/' + this.props.restaurantId}>
                                    <span className='glyphicon glyphicon-paperclip'/>
                                </a>
                            </small>
                        </sup>
                    </h2>
                    <ul>
                        {this.state.dishes.map(dish => <DishListItem key={dish.name} dish={dish} />)}
                    </ul>
                </div>
            );
        }
    }
}
