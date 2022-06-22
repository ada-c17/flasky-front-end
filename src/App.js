import { useEffect, useState } from "react";
import DriverList from "./components/DriverList";
import axios from "axios";

function App() {
  const [drivers, setDrivers] = useState([]);

  const URL = 'http://localhost:5000/drivers';

  useEffect(() => {
    axios.get(URL)
    .then((res) => {
      const newDrivers = res.data.map((driver) => {
        return {
          id: driver.id,
          name: driver.name,
          country: driver.country,
          team: driver.team,
          cars: driver.cars,
          handsome: driver.handsome
        };
      });
      setDrivers(newDrivers);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

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
          const newDriver = {...driver};
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
    </div>
  );
}

export default App;
