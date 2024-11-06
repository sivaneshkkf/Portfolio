import { useEffect, useState } from "react";
import { AddLocationToFirebase } from "../firebase/config";

function useUserLocation() {
    const [ipAddress, setIpAddress] = useState("");
    const [geoInfo, setGeoInfo] = useState({});

    useEffect(() => {
        const getVisitorIp = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.text();
                setIpAddress(data);
            } catch (error) {
                console.log("Failed to fetch IP");
            }
        };

        getVisitorIp();
    }, []);

    return { ipAddress, geoInfo };
}

export default useUserLocation;
