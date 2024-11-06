import { AddLocationToFirebase } from "../firebase/config";

async function getUserLocation() {

    const apiKey = "fb280a422eff45ba84bc5ab237df3d41"
    const fetchLocationData = async (latitude, longitude) => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            const fetchData = await fetch(url);
            const response = await fetchData.json();
            return response; // Return the response if needed
        } catch (error) {
            console.error("Error fetching location data:", error);
            throw error;
        }
    };

    const fetchLocationData1 = async () => {
        try {
            const url ="https://api.ipgeolocation.io/ipgeo?apiKey=fb280a422eff45ba84bc5ab237df3d41";
            const fetchData = await fetch(url);
            const response = await fetchData.json();
            //console.log(response)
            await AddLocationToFirebase(response);
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };

    // Use the Geolocation API to get the current position
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const geoInfo = await fetchLocationData(latitude, longitude);
                    
                    await AddLocationToFirebase(geoInfo);
    
                    resolve({ lat: latitude, lon: longitude, geoInfo });
                } catch (error) {
                    reject(error); // Handle fetch or Firebase errors
                }
            },
            (error) => {
                // Handle geolocation errors
                if (error.code === error.PERMISSION_DENIED) {
                    reject(new Error("Location access denied by user."));
                    fetchLocationData1()
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    reject(new Error("Location information is unavailable."));
                } else if (error.code === error.TIMEOUT) {
                    reject(new Error("Location request timed out."));
                    fetchLocationData1()
                } else {
                    reject(new Error("An unknown error occurred while retrieving location."));
                    fetchLocationData1()
                }
            }
        );
    });
    
}

export default getUserLocation;
