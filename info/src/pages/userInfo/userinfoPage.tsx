import React from "react";
import "./userinfoPage.css";

import type { locationData } from "../../types";

interface UserinfoPageProps {
  locationData: locationData | null;
  address: string;
}

export function UserinfoPage({ locationData, address }: UserinfoPageProps) {
  return (
    <div className="container">
      <h1 className="title">🌍 Your Location Information</h1>

      {/* Address Card */}
      <div className="card address-card">
        <h2>{address ? "📍 Address Nearby" : "No address found"}</h2>
        <p className="address-text">{address}</p>
      </div>

      {/* Location Details Grid */}
      <div className="grid">
        {/* IP & Network Info */}
        <div className="card">
          <h3>🌐 Network Information</h3>
          <div className="info-group">
            <div className="info-item">
              <span className="label">IP Address:</span>
              <span className="value">{locationData?.ipaddress}</span>
            </div>
            <div className="info-item">
              <span className="label">ISP:</span>
              <span className="value">{locationData?.isp}</span>
            </div>
            <div className="info-item">
              <span className="label">ASN:</span>
              {/* <span className="value">{locationData?.as}</span> */}
            </div>
          </div>
        </div>

        {/* Geographic Info */}
        <div className="card">
          <h3>📌 Geographic Details</h3>
          <div className="info-group">
            <div className="info-item">
              <span className="label">City:</span>
              <span className="value">{locationData?.state}</span>
            </div>
            <div className="info-item">
              <span className="label">Region:</span>
              <span className="value">
                {locationData?.region} ({locationData?.zip})
              </span>
            </div>
            {/* <div className="info-item">
              <span className="label">Postal Code:</span>
              <span className="value">{locationData?.postal}</span>
            </div> */}
            <div className="info-item">
              <span className="label">Coordinates:</span>
              <span className="value">
                {/* {locationData?.coordinates[0]}°N, {locationData?.coordinates[1]}°E */}
                {locationData?.coordinates}
              </span>
            </div>
          </div>
        </div>

        {/* Country Info */}
        <div className="card">
          <h3>🏳️ Country Information</h3>
          <div className="info-group">
            <div className="info-item">
              <span className="label">Country:</span>
              <span className="value">{locationData?.country}</span>
            </div>
            <div className="info-item">
              <span className="label">Country Code:</span>
              <span className="value">
                {/* {locationData?.countryCode}  */}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Capital:</span>
              <span className="value">{locationData?.capital}</span>
            </div>
          </div>
        </div>

        {/* Time & Contact Info */}
        <div className="card">
          <h3>⏰ Time & Contact</h3>
          <div className="info-group">
            <div className="info-item">
              <span className="label">Timezone:</span>
              <span className="value">{locationData?.timezone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Note */}
      <div className="disclaimer">
        <p>
          ⚠️ <strong>Note:</strong> This address may not be accurate. IP
          geolocation is approximate and based on available data from the ISP.
          Actual location may vary. For precise location information, use GPS or
          other location services.
        </p>
      </div>
    </div>
  );
}
