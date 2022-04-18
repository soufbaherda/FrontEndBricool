import React, { useEffect, useState } from "react";
import { ThemeProvider } from "react-jss";
import Rating, { theme } from "react-rating-stats";

function RatingStat(props) {
  
  const [data, setData] = useState([]);

  
  useEffect(() => {
    fetch("http://localhost:8080/Rating/get?idEmploye="+props.idemploye, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => setData(result))
      .then(console.log(data))
      .catch((error) => console.log("error", error));
  }, []);

  console.log(data);
  
  if (data.length === 0) {
    return <h1>loading</h1>;
  }else {
    return (
      <ThemeProvider className="RatingStat" theme={theme}>
        <Rating values={[data[0], data[1], data[2], data[3], data[4]]} />
      </ThemeProvider>
    );
  }
}

export default RatingStat;
