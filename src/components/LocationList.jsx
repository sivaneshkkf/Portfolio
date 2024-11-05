import { div } from "framer-motion/client";
import { UseFetchCollection } from "../firebase/config";
import { formatTimestamp } from "../utils/Formatter";

function LocationList() {
  const loction = UseFetchCollection("locations");

  //   const location = {
  //     as: "AS31452 ZAIN BAHRAIN B.S.C.",
  //     city: "Manama",
  //     country: "Bahrain",
  //     countryCode: "BH",
  //     isp: "Zain Bahrain",
  //     lat: 26.241,
  //     lon: 50.5779,
  //     org: "",
  //     query: "109.161.176.183",
  //     region: "13",
  //     regionName: "Manama",
  //     status: "success",
  //     timezone: "Asia/Bahrain",
  //     zip: "09834",
  //   };
  return (
    <>
      <h4 className="text-sm font-medium dark:text-white text-textHead mb-2">
        Locations
      </h4>
      <section className="bg-secondary dark:bg-dark-secondary rounded-md overflow-hidden">
        <div className="mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-center bg-secondary dark:bg-dark-secondary text-[10px] sm:text-xs dark:font-normal font-semibold dark:text-white text-textHead border-b border-icon dark:border-dark-icon">
                      <th className="w-fit sm:px-2 px-1 py-2">
                        Country
                      </th>
                      <th className="w-fit sm:px-2 px-1 py-2">
                        CountryCode
                      </th>
                      <th className="w-fit sm:px-2 px-1 py-2">
                        City
                      </th>
                      <th className="w-fit sm:px-2 px-1 py-2">
                        Time
                      </th>
                      <th className="w-fit sm:px-2 px-1 py-2">
                        Pin Code
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loction.map((location, index) => (
                      <tr key={index} className="text-textpara border-b border-primary dark:border-dark-primary bg-secondary dark:bg-dark-secondary">
                        <td className="  px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium">
                          {location.country}
                        </td>
                        <td className="  px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium">
                          {location.countryCode}
                        </td>
                        <td className=" px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium">
                          {location.city}
                        </td>
                        <td className=" px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium flex justify-center items-center">
                          {(() => {
                            const [date, time] = formatTimestamp(
                              location.createdAt
                            ).split(","); // Split the timestamp into date and time
                            return (
                              <div className="sm:flex sm:gap-1">
                                <div>{date.trim()}</div>
                                <div>{time.trim()}</div>
                              </div>
                            );
                          })()}
                        </td>

                        <td className="px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium">
                          {location.zip}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default LocationList;
