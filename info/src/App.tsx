import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

import { getIpAddress, getLatLon, getAddress, saveUserInfo } from "./utils";

import { userInfoSchema } from "./types";
import type { locationData } from "./types";
import { UserinfoPage } from "./pages/userInfo/userinfoPage";
import { Header } from "./components/header";
import Homepage from "./pages/homepage";
import { AllUserData } from "./pages/allUserData/allUserData";

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

        const addressResult = await getAddress(data.latitude, data.longitude);
        console.log("region from getAddress:", addressResult);
        setAddress(addressResult);

        const userInfo = {
          ipaddress: ipAddress,
          coordinates: [data.latitude, data.longitude] as [number, number],
          country: data.country,
          capital: data.country_capital,
          state: data.region,
          zip: null,
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
        setError("Failed to fetching data");
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
          <p>Fetching data...</p>
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
        <Route path="/" element={<Homepage />} />
        <Route
          path="/profile"
          element={
            <UserinfoPage locationData={locationData} address={address} />
          }
        />
        <Route
          path="/data"
          element={
            <AllUserData  />
          }
        />
      </Routes>
    </>
  );
}

export default App;
