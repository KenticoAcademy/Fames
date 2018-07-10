import LatLng = google.maps.LatLng;

const FI_MUNI_COORDS = new google.maps.LatLng(49.209443, 16.598980);

export const getCurrentLocation = (): LatLng => {
    let location = FI_MUNI_COORDS;

    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(
                (position: Position) =>
                    location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                (error) => console.log(error)
            );
    }

    return location;
};
