import "./userInfoPage.css";

import type { locationData } from "../../types";

interface UserinfoPageProps {
  locationData: locationData | undefined;
  address: string;
}

export function UserinfoPage({ locationData, address }: Readonly<UserinfoPageProps>) {
  const infoRows = [
    { label: "IP Address", value: locationData?.ipaddress ?? "—" },
    { label: "ISP", value: locationData?.isp ?? "—" },
    {
      label: "Coordinates",
      value:
        locationData?.coordinates.length === 2
          ? `${locationData.coordinates[0]}, ${locationData.coordinates[1]}`
          : "—",
    },
    { label: "Country", value: locationData?.country ?? "—" },
    { label: "Capital", value: locationData?.capital ?? "—" },
    { label: "State / City", value: locationData?.state ?? "—" },
    {
      label: "Region",
      value: locationData?.region ? `${locationData.region} (${locationData.zip})` : "—",
    },
    { label: "Timezone", value: locationData?.timezone ?? "—" },
  ];

  return (
    <div className="container">
      <h1 className="title">🌍 Your Location Information</h1>

      <div className="card details-card">
        <h2>📍 Address Nearby</h2>
        <p className="address-text">{address || "No address found"}</p>

        <div className="info-group single">
          {infoRows.map(({ label, value }) => (
            <div className="info-item" key={label}>
              <span className="label">{label}:</span>
              <span className="value">{value}</span>
            </div>
          ))}
        </div>
      </div>

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
