    import "./App.css";
    import axios from "axios";
    import CatList from "./components/CatList";
    import Cat from "./components/Cat";
    import { useEffect, useState } from "react";

    function App() {
    const [placeholder, setPlaceholder] = useState("Hello");
    //   const catData1 = [
    //     {
    //       id: 1,
    //       name: "Jeff THEE Cat",
    //       saying: "rainbows 5evah",
    //       age: 5,
    //       color: "tabby",
    //     },
    //     { id: 2, name: "Lily", saying: "cry", age: 5, color: "tabby" },
    //     { id: 3, name: "Richard", saying: "food", age: 5, color: "tabby" },
    //     { id: 4, name: "Prince", saying: "meow", age: 5, color: "tuxedo" },
    //   ];
    //   const catData2 = [
    //     { id: 3, name: "Richard", saying: "food", age: 5, color: "tabby" },
    //     { id: 4, name: "Prince", saying: "meow", age: 5, color: "tuxedo" },
    //   ];

    const [cats, setCats] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/cats")
            .then((response) => {setCats(response.data)})
            .catch((error) => {console.log("OH NOES OH NOES!")});
    }, []);

    const handleAppClick = () => {
        setPlaceholder(placeholder + "!");
    };

    const deleteCat = (id) => {
        console.log("delete", id);

        axios.delete(`http://127.0.0.1:5000/cats/${id}`)
            .then((response) => {
                const newCats = cats.filter((cat) => cat.id !== id);
                setCats(newCats);
            })
            .catch((error) => {
                console.log("Unable to delete");
            });


        
    };

    const setCatAge = (id) => {
        console.log("inside setCatAge", id);
        // create a copy of cats
        const olderCats = [...cats];

        let targetCat;
        // increase the age of cat with id
        for (let cat of olderCats) {
            if (cat.id === id) {
                targetCat = cat;
            }
        }

        axios.put(`http://127.0.0.1:5000/cats/${targetCat.id}`, {name:targetCat.name, 
                                                            age:targetCat.age + 1, 
                                                            color:targetCat.color, 
                                                            saying:targetCat.saying })
            .then((response) => {
                targetCat.age += 1;
                setCats(olderCats);
            })
            .catch((error)=> {
                console.log("Couldn't set cat age older");
            });

        // call setCats to update cats array
        // setCats(olderCats);
    };

    return (
        <div className="App">
        <header className="App-header">
            <h1> Otters Flasky </h1>
        </header>
        <button onClick={handleAppClick}>{placeholder}</button>
        <main>
            <CatList
            catData={cats}
            setCatAgeCallback={setCatAge}
            deleteCatCallback={deleteCat}
            />
            {/* <CatList catData={catData2} /> */}
        </main>
        </div>
    );
    }

    export default App;
