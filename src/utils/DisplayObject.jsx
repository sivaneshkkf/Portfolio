import React from "react";

const DisplayObject = ({ object }) => {
  const renderData = (data) => {
    if (typeof data === "object" && data !== null) {
      return (
        <div style={{ marginLeft: "20px" }} className="text-xs font-semibold dark:font-normal dark:text-dark-textHead">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "10px" }}>
              <span className="font-normal dark:text-dark-textpara">{key}:</span>{" "}
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>{renderData(item)}</li>
                  ))}
                </ul>
              ) : typeof value === "object" ? (
                renderData(value)
              ) : (
                <span className="ml-2">{value}</span>
              )}
            </div>
          ))}
        </div>
      );
    }
    return <span>{data}</span>;
  };

  return <div>{renderData(object)}</div>;
};

export default DisplayObject;
