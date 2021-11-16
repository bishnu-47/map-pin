import { useRef, useState } from "react";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import "./login.css";

const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [msg, setMsg] = useState({ type: "", text: "" });

  const usernameRef = useRef();
  const passwordRef = useRef();

  async function handleOnSubmit(e) {
    e.preventDefault();

    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/api/user/login`,
        user
      );

      // check for error
      if (res.data.error) {
        setMsg({ type: "error", text: res.data.error });
        return;
      }

      setMsg({ type: "success", text: "Login Successfull." });
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setTimeout(() => {
        setShowLogin(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
      setMsg({ type: "error", text: "Something went wrong!" });
    }
  }

  return (
    <div className="loginContainer">
      <div className="logo">
        <span>
          <Room className="icon" />
        </span>
        <span className="title">Travel Pin App</span>
      </div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Login</button>
        <span className={msg.type}>{msg.text}</span>
      </form>

      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
