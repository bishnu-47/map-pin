import { Star } from "@material-ui/icons";
import { format } from "timeago.js";
import "./card.css";

const Card = ({ place, rating, review, time, username }) => {
  return (
    <div className="card">
      <label>Place</label>
      <h4>{place}</h4>

      <label>Review</label>
      <p className="review">{review}</p>

      <label>Rating</label>
      <div className="stars">{Array(rating).fill(<Star />)}</div>

      <div className="info">
        <label>Information</label>
        <p className="info">
          created by <b>{username}</b>
        </p>
        <p className="time">{format(time)}</p>
      </div>
    </div>
  );
};

export default Card;
