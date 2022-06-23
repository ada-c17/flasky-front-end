import "./CatForm.css";
import PropTypes from "prop-types";
import { useState } from "react";

const defaultCat = {name:'', age:0, saying:'', color:''};

const CatForm = (props) => {
    const [catData, setCatData] = useState(defaultCat);
    const updateCatData = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value;
        const newCatData = {...catData};
        console.log(inputName);
        newCatData[inputName] = inputValue;
        setCatData(newCatData);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        props.createCatCallback(catData);
        setCatData(defaultCat);
    }

    return(
        <form onSubmit={onFormSubmit}>
            <label>Name</label><input name="name" type="text" value={catData.name} onChange={updateCatData} />
            <label>Age</label><input name="age" type="text" value={catData.age} onChange={updateCatData} />
            <label>Saying</label><input name="saying" type="text" value={catData.saying} onChange={updateCatData} />
            <label>Color</label><input name="color" type="text" value={catData.color} onChange={updateCatData} />
            <input type="submit" value="Add a Cutie Cat" />
        </form>
    );
};

CatForm.propTypes = {
    createCatCallback:PropTypes.func.isRequired,
}

export default CatForm;