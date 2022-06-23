import { useEffect, useState } from "react";
import DriverList from "./components/DriverList";
import axios from "axios";
import DriverForm from "./components/DriverForm";

function App() {
  const [drivers, setDrivers] = useState([]);

  const URL = "http://localhost:5000/drivers";

  const fetchDrivers = () => {
    axios
      .get(URL)
      .then((res) => {
        const newDrivers = res.data.map((driver) => {
          return {
            id: driver.id,
            name: driver.name,
            country: driver.country,
            team: driver.team,
            cars: driver.cars,
            handsome: driver.handsome,
          };
        });
        setDrivers(newDrivers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(fetchDrivers, []);

  const flipHandsome = (id) => {
    // const newDrivers = [];
    // for (const driver of drivers) {
    //   if (driver.id === id) {
    //     driver.handsome = !driver.handsome;
    //   }
    //   newDrivers.push(driver);
    // }
    // setDrivers(newDrivers);
    axios
      .patch(`${URL}/${id}/fliphandsome`)
      .then(() => {
        const newDrivers = [];
        for (const driver of drivers) {
          const newDriver = { ...driver };
          if (newDriver.id === id) {
            newDriver.handsome = !newDriver.handsome;
          }
          newDrivers.push(newDriver);
        }
        setDrivers(newDrivers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDriver = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const newDrivers = [];
        for (const driver of drivers) {
          if (driver.id !== id) {
            newDrivers.push(driver);
          }
        }
        setDrivers(newDrivers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addDriver = (driverInfo) => {
    axios
      .post(URL, driverInfo)
      .then((response) => {
        console.log(response);
        fetchDrivers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /*
  class Vendor
    ......

  auberon = Vendor(price=6)
  */
  return (
    <div>
      <DriverList
        drivers={drivers}
        handsomeCallback={flipHandsome}
        deleteCallback={deleteDriver}
      />
      <DriverForm addDriverCallback={addDriver} />
    </div>
  );
}

export default App;
