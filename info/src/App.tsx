import { useState, useEffect } from "react";
import "./App.css";

import { getIpAddress, getLatLon, getAddress } from "./utils";
import { saveUserInfo } from "./clients/supabase";

import { userInfoSchema } from "./types";
import { UserinfoPage } from "./pages/userInfo/userinfoPage";

export interface LocationData {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

function App() {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
        const ipAddress = await getIpAddress();
        console.log(ipAddress);

        const data = await getLatLon(ipAddress);

        console.log(data);
        setLocationData(data);

        const addressResult = await getAddress(data.latitude, data.longitude);
        console.log(addressResult);
        setAddress(addressResult);

        const userInfo = {
          ipaddress: ipAddress,
          coordinates: [data.latitude, data.longitude] as [number, number],
          country: data.country_name,
          capital: data.country_capital,
          state: data.region,
        };

        const parsed = userInfoSchema.safeParse(userInfo);

        if (!parsed.success) {
          console.error("Failed to validate user info payload", parsed.error);
          return;
        }

        await saveUserInfo(parsed.data);
      } catch (err) {
        setError("Failed to fetch location data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Fetching your location...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-card">
          <h2>❌ Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return <UserinfoPage locationData={locationData} address={address} />;
}

export default App;
