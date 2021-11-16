import { useState } from "react";
import axios from "axios";
import "./newPinForm.css";

const NewPinForm = ({ username, lat, long, pins, setPins, setNewPin }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);

  async function handleOnSubmit(e) {
    e.preventDefault();

    const newPin = { username, title, desc: description, rating, lat, long };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/api/pin`,
        newPin
      );

      setPins([...pins, res.data]);
      setNewPin(null);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <label>Title</label>
      <input
        type="text"
        placeholder="Name of the place"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder="Tell what you like about this place"
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Rating</label>
      <select onChange={(e) => setRating(e.target.value)}>
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
