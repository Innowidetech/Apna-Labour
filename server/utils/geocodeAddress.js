const axios = require("axios");

exports.geocodeAddress = async (address) => {
    if (!address || address.trim() === "") {
        console.error("OpenCage Geocoding Error: Address is required");
        throw new Error("Failed to get coordinates from address");
    }

    try {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.OPENCAGE_API_KEY}&limit=1`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data.results || data.results.length === 0) {
            console.error("OpenCage Geocoding Error: No coordinates found for address");
            throw new Error("Failed to get coordinates from address");
        }

        const location = data.results[0].geometry;
        return {
            lat: location.lat,
            lng: location.lng
        };
    } catch (err) {
        console.error("OpenCage Geocoding Error:", err.response?.data || err.message);
        throw new Error("Failed to get coordinates from address");
    }
};