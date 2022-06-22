import Driver from "./Driver.js";
import PropTypes from "prop-types";

const DriverList = (props) => {
  // I have access to props.handsomeCallback
  const driverComponents = props.drivers.map((driver) => {
    return (
      <Driver
        key={driver.id}
        id={driver.id}
        name={driver.name}
        team={driver.team}
        cars={driver.cars}
        country={driver.country}
        handsome={driver.handsome}
        handsomeCallback={props.handsomeCallback}
        deleteCallback={props.deleteCallback}
      />
    );
  });
  return (
    <div>
      <h1>Drivers</h1>
      {driverComponents}
    </div>
  );
};

DriverList.propTypes = {
  drivers: PropTypes.array.isRequired,
};

export default DriverList;
