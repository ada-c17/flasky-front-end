import "./CatForm.css";
import PropTypes from "prop-types";
import { useState } from "react";

const defaultCat = {name:"", age:0, saying:"meow", color:""};

const CatForm = (props) => {

    const [catData, setCatData] = useState(defaultCat);

    const handleFormInput = (event) => {
        const inputElement = event.target;
        const name = inputElement.name;
        const value = inputElement.value;

        const newCatData = {...catData};
        newCatData[name] = value;
        console.log(newCatData);
        setCatData(newCatData);
    };

    const handleFormSubmission = (event) => {
        event.preventDefault();
        props.handleSubmission(catData);

    };

    return(
        <form onSubmit={handleFormSubmission}>
            <label>Name</label><input name="name" type="text" value={catData.name} onChange={handleFormInput}/>
            <label>Age</label><input name="age" type="text" value={catData.age}  onChange={handleFormInput}/>
            <label>Saying</label><input name="saying" type="text" value={catData.saying}  onChange={handleFormInput}/>
            <label>Color</label><input name="color" type="text" value={catData.color} onChange={handleFormInput}/>
            <input type="submit" />

        </form>
    );
};

CatForm.propTypes = {
    handleSubmission:PropTypes.func.isRequired,
}

export default CatForm;