const axios = require("axios");
const ORS_API_KEY = process.env.ORS_API_KEY;

exports.getDistanceBetweenPoints = async (fromCoords, toCoords) => {
    try {
        const url = "https://api.openrouteservice.org/v2/directions/driving-car";
        const body = {
            coordinates: [
                [fromCoords.lng, fromCoords.lat],
                [toCoords.lng, toCoords.lat],
            ],
        };

        const response = await axios.post(url, body, {
            headers: {
                Authorization: ORS_API_KEY,
                "Content-Type": "application/json",
            },
        });

        const meters = response.data.routes[0].summary.distance;
        const km = (meters / 1000).toFixed(2);
        return `${km} km`;
    } catch (error) {
        console.error("OpenRouteService Distance Error:", error.message);
        return "0 km";
    }
};