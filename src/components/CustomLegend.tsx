import React from 'react'

const CustomLegend = ({ payload }:any) => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px", // Adjust spacing between items
          maxWidth: "250px", // Restrict width to force wrapping
          margin: "auto"
        }}
      >
        {payload.map((entry: { color: any; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "30px",
                height: "10px",
                backgroundColor: entry.color,
                // borderRadius: "50%"
              }}
            ></div>
            <span style={{ fontSize: "14px" }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  
}

export default CustomLegend