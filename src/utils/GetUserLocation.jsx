import { AddLocationToFirebase } from "../firebase/config";

async function getUserLocation() {
    try {
        const fetchIp = await fetch("http://ip-api.com/json/?fields=61439");
        const response = await fetchIp.json();

        await AddLocationToFirebase(response).then((docRef) => {
            //console.log("Location saved to Firebase:");
        }).catch((e) => {
            console.error("Firebase failed");
        });

        return response; // Return the fetched response
    } catch (error) {
        console.error("Failed to fetch IP");
        return null;
    }
}

export default getUserLocation;
