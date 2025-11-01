// import geoip from "geoip-lite";
// import NodeGeocoder from "node-geocoder";


// Declare geocoder 
// const geocoderOptions = {
//     provider: 'openstreetmap',
// };
// const geocoder = NodeGeocoder(geocoderOptions);



export function getIpAddress(): Promise<string> {
    return fetch("https://api.ipify.org?format=json")
        .then((response) => response.json())
        .then((data) => {
            // console.log("Your IP address is:", data.ip);
            return data.ip;
        })
        .catch((error) => {
            // console.error("Error fetching IP address:", error);
            throw error;
        });
}



// const ip = "2409:40d0:10cc:2121:14de:63:4b89:ba14";
// const geo = geoip.lookup(ip);
// console.log(geo)

/* export function getLatLon(ip: string): void {

    const geo = geoip.lookup(ip);

    if (geo) {
        console.log("Latitude:", geo.ll[0]);
        console.log("Longitude:", geo.ll[1]);

        const lat = geo.ll[0];
        const lon = geo.ll[1];

        return getAddress(lat, lon);
    } else {
        console.log("Geo data not found for the IP address.");
    }
} */


export async function getLatLon(ip: string) {
    // const ipApi  = `https://ipapi.co/${ip}/json/`;
    // const ipApi  = `https://ip-api.com/json/${ip}`;
    const ipApi  = `https://ipwhois.app/json/${ip}`;

    const response = await fetch(ipApi);
    const data = await response.json();
    return data;
    //   return { lat: data.latitude, lon: data.longitude };
    // return getAddress(data.latitude, data.longitude);
}

// getLatLon("2409:40d0:10cc:2121:14de:63:4b89:ba14");


// Define function after everything is ready
/* export async function getAddress(lat: number, lon: number): Promise<string | undefined> {
    try {
        const res = await geocoder.reverse({ lat, lon });
        if (res.length > 0) {
            console.log("📍 node-geocoder:", res[0].formattedAddress);
            return res[0].formattedAddress;
        } else {
            console.log("❌ node-geocoder: No address found.");
            return "No address found";
        }
    } catch (err) {
        console.log("❌ Error in reverse geocoding:", err);
        return "Error in reverse geocoding";
    }
} */


export async function getAddress(lat: number, lon: number) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        return data.display_name;
    } catch (err) {
        console.log("❌ Error in reverse geocoding:", err);
        return "Error in reverse geocoding";
    }

}