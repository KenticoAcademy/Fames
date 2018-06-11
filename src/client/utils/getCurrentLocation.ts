const FI_MUNI_COORDS = {
    latitude: 49.2099358,
    longitude: 16.598976799999946
};

export interface ILocationCoordinates {
    readonly latitude: number;
    readonly longitude: number;
}

export const getCurrentLocation = (): ILocationCoordinates => {
    let location = FI_MUNI_COORDS;

    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(
                (position: Position) => location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                (error) => console.log(error)
            );
    }

    return location;
};
