import React, { useRef, useState } from "react";
import { UseFetchCollection } from "../firebase/config";
import { formatTimestamp } from "../utils/Formatter";
import DisplayObject from "../utils/DisplayObject";

function LocationList() {
  const loction = UseFetchCollection("locations");
  const locationDetailsRefs = useRef([]);

  const [accordionState, setAccordionState] = useState(null);
  const [heights, setHeights] = useState({});

  const handleOnClick = (index) => {
    const currentRef = locationDetailsRefs.current[index];
    if (currentRef) {
      const scrollHeight = currentRef.scrollHeight;

      // Toggle the accordion; if it's already open, close it
      setAccordionState((prevIndex) => (prevIndex === index ? null : index));
      
      // Set height only for the current clicked index
      setHeights({
        [index]: scrollHeight});
    }
  };

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
                      <th className="w-fit sm:px-2 px-1 py-2">Country</th>
                      <th className="w-fit sm:px-2 px-1 py-2">Dist/State</th>
                      <th className="w-fit sm:px-2 px-1 py-2">City</th>
                      <th className="w-fit sm:px-2 px-1 py-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loction.map((location, index) => (
                      <React.Fragment key={index}>
                        <tr
                          className="text-textpara border-b border-primary dark:border-dark-primary bg-secondary dark:bg-dark-secondary cursor-pointer"
                          onClick={() => handleOnClick(index)}
                        >
                          <td className="px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium">
                            {location.address?.country ||
                              location.country_name ||
                              "N/A"}
                          </td>
                          <td className="px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium">
                            {location.address?.state || location.state_prov || "N/A"}
                          </td>
                          <td className="px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium">
                            {location.address?.town ||
                              location.address?.city ||
                              location.city ||
                              "N/A"}
                          </td>
                          <td className="px-1 sm:px-2 py-2 text-center text-[10px] sm:text-xs font-medium flex justify-center items-center">
                            {(() => {
                              const timestamp = location.createdAt;
                              if (timestamp) {
                                const [date, time] = formatTimestamp(timestamp).split(",");
                                return (
                                  <div className="sm:flex sm:gap-1">
                                    <div>{date.trim()}</div>
                                    <div>{time.trim()}</div>
                                  </div>
                                );
                              }
                              return "N/A";
                            })()}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4">
                            <div
                              className="w-full bg-gray-100 dark:bg-dark-secondary rounded overflow-hidden transition-all duration-200"
                              style={{
                                height: accordionState === index ? `${heights[index]}px` : "0px",
                              }}
                              ref={(el) => (locationDetailsRefs.current[index] = el)}
                            >
                              <DisplayObject object={location} />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
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
