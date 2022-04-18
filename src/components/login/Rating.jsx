import ReactStars from "react-rating-stars-component";
import React, {useState} from "react";

function Rating(props) {
  
  const ratingChanged = (newRating)=> {
      console.log(newRating);
      fetch("http://localhost:8080/Rating/post",{
          method:'POST',
          headers : {
              "Content-Type" : "application/json",
          },
          body : JSON.stringify({
              "idEmploye":props.idemploye,
              "rating": newRating,
          })
      })
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      activeColor="#ffd700"
    />
  );
}

export default Rating;
