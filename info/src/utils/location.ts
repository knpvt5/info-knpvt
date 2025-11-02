
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



export async function getLatLon(ip: string) {
    // const ipApi  = `https://ipapi.co/${ip}/json/`;
    // const ipApi  = `https://ip-api.com/json/${ip}`;
    const ipApi = `https://ipwhois.app/json/${ip}`;

    const response = await fetch(ipApi);
    const data = await response.json();
    return data;
}


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