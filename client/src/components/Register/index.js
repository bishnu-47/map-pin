import { useRef, useState } from "react";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import "./register.css";

const Register = ({ setShowRegister, myStorage, setCurrentUser }) => {
  const [msg, setMsg] = useState({ type: "", text: "" });

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleOnSubmit(e) {
    e.preventDefault();

    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/api/user/register`,
        newUser
      );

      // check for error
      if (res.data.error) {
        setMsg({ type: "error", text: res.data.error });
        return;
      }

      setMsg({ type: "success", text: "Registration Successful." });
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setTimeout(() => {
        setShowRegister(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
      setMsg({ type: "error", text: "Something went wrong!" });
    }
  }

  return (
    <div className="registerContainer">
      <div className="logo">
        <span>
          <Room className="icon" />
        </span>
        <span className="title">Travel Pin App</span>
      </div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" placeholder="Username" ref={usernameRef} />
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button type="submit">Register</button>
        <span className={msg.type}>{msg.text}</span>
      </form>

      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
