import { Star } from "@material-ui/icons";

const Card = ({ place, rating, review, time, username }) => {
  return (
    <div className="card">
      <label>Place</label>
      <h4>{place}</h4>
      <label>Review</label>
      <p>{review}</p>
      <label>Rating</label>
      <div className="stars">
        <Star />
        <Star />
        <Star />
        <Star />
      </div>

      <div className="info">
        <p>
          Information created by <b>{username}</b>
        </p>
        <p>{time} ago</p>
      </div>
    </div>
  );
};

export default Card;
