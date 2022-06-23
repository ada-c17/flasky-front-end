import React, {useState} from "react";
import './NewCatForm.css';
import PropTypes from 'prop-types';

const defaultFormState = {
  name: '',
  breed: '',
  age: '',
  personality: '',
};

const NewCatForm = ({addCatCallback}) => {
  const [newCatData, setNewCatData] = useState(defaultFormState);

  const handleChange = (event) => {
    setNewCatData({...newCatData, [event.target.name]: event.target.value})
  }

  const submitNewCatData = (event) => {
    event.preventDefault();
    addCatCallback(newCatData);
    setNewCatData(defaultFormState); 
  }

  return (
  <form onSubmit={submitNewCatData} className="new-cat__form">
    <section>
      <h2>Add a Cat</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="breed">Breed</label>
        <input name="breed" id="breed" onChange={handleChange}/>
      </div><div>
        <label htmlFor="age">Age</label>
        <input name="age" id="age" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="personality">Personality</label>
        <input name="personality" id="personality" onChange={handleChange}/>
      </div>
      <button className="button new-cat__submit" type="submit">
        Add Cat
      </button>
    </section>
  </form>
  )
}

NewCatForm.propTypes = {
  addCatCallback: PropTypes.func.isRequired
}

export default NewCatForm
