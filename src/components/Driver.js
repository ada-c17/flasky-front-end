import "./Driver.css";
import PropTypes from "prop-types";
import { useState } from "react";

const Driver = (props) => {
  // I have access to props.handsomeCallback
  const flipMyHandsome = () => {
    props.handsomeCallback(props.id);
  };

  const deleteMe = () => {
    props.deleteCallback(props.id);
  };
  return (
    <div>
      <h2 className="driver__name">{props.name}</h2>
      <ul>
        <li>Team: {props.team}</li>
        <li>Country: {props.country}</li>
        <li>Cars: {props.cars}</li>
        <li>Handsome: {props.handsome ? "Hella fine" : "Not for me"}</li>
        <button onClick={flipMyHandsome}>Change Handsomeness</button>
        <button onClick={deleteMe}>Delete</button>
        {/* Set Country
        <input
          type="text"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        ></input> */}
      </ul>
    </div>
  );
};

Driver.propTypes = {
  name: PropTypes.string.isRequired,
  team: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  handsome: PropTypes.bool.isRequired,
  cars: PropTypes.array.isRequired
};

export default Driver;
