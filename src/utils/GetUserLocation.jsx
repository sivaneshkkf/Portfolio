import { useEffect, useState } from "react";
import { AddLocationToFirebase } from "../firebase/config";

export function getUserLocation() {
    const [ipAddress, setIpAddress] = useState("")

    useEffect(() => {

        getVisitorIp()
    },[])


    const getVisitorIp = async() => {
        try {
            const fetchIp = await fetch("http://ip-api.com/json/?fields=61439")
            const response = await fetchIp.json()

            setIpAddress(response)


            await AddLocationToFirebase(response).then((docRef) => {
                //console.log("Location saved to Firebase:");
              })
              .catch((e) => {
                console.error("firebase failed");
              }); 
           
            
        } catch (error) {
            console.error("failed to fetch")
        }
    }

    return {ipAddress}

}

export default getUserLocation;