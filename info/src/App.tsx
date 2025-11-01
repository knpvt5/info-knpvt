import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";

import { getIpAddress, getLatLon, getAddress } from "./utils";
import { saveUserInfo } from "./clients/supabase";

import { userInfoSchema } from "./types";
import type { locationData } from "./types";
import { UserinfoPage } from "./pages/userInfo/userinfoPage";
import { Header } from "./components/header";

function App() {
  const [locationData, setLocationData] = useState<locationData | undefined>(
    undefined
  );
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
        const ipAddress = await getIpAddress();
        console.log("ipAddress:", ipAddress);

        const data = await getLatLon(ipAddress);

        console.log("full data from getLatLon:", data);

        const addressResult = await getAddress(data.lat, data.lon);
        console.log("region from getAddress:", addressResult);
        setAddress(addressResult);

        const userInfo = {
          ipaddress: ipAddress,
          coordinates: [data.lat, data.lon] as [number, number],
          country: data.country,
          capital: data.regionName,
          state: data.city,
          zip: Number(data.zip),
          region: addressResult,
          timezone: data.timezone,
          isp: data.isp,
        };

        const parsed = userInfoSchema.safeParse(userInfo);

        console.log("parsed", parsed);

        setLocationData(parsed.data);

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

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <UserinfoPage locationData={locationData} address={address} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
