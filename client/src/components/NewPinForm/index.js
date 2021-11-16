import React from "react";
import './newPinForm.css'

const NewPinForm = () => {
  return (
    <form>
      <label>Title</label>
      <input type="text" placeholder="Name of the place" />
      <label>Description</label>
      <textarea
        placeholder="Tell what you like about this place"
      />
      <label>Rating</label>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default NewPinForm;
