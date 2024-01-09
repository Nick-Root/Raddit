import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import { thunkLogin } from "../../redux/session";
import './SignupForm.css'
import { thunkGetAllPosts } from "../../redux/post";
import { thunkGetAllCommunities } from "../../redux/community";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({})

  if (sessionUser) return <Navigate to="/home" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setSignupErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        firstname,
        lastname,
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setSignupErrors(serverResponse);
    } else {
      navigate("/home");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: email2,
        password: password2,
      })
    );

    if (serverResponse) {
      setLoginErrors(serverResponse);
    } else {
      dispatch(thunkGetAllPosts())
      dispatch(thunkGetAllCommunities())
      navigate("/");
    }
  };

  const demo = async (e) => {
    e.preventDefault()
    return await dispatch(thunkLogin({ email: 'demo@aa.io', password: 'password' }))
      .then(closeModal)
      .then(navigate('/questions'))
  }

  return (
    <div className='splash-container'>
      <div className="white-space">
        <div className="splash-form-signup">
          <h2 className='formhead'>Sign Up</h2>
          {signupErrors.server && <p className="error">{signupErrors.server}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              First Name
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {signupErrors.email && <p className="error">{signupErrors.email}</p>}
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            {signupErrors.username && <p className="error">{signupErrors.username}</p>}
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {signupErrors.password && <p className="error">{signupErrors.password}</p>}
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {signupErrors.confirmPassword && <p className="error">{signupErrors.confirmPassword}</p>}
            <button type="submit" className="signup">Sign Up</button>
          </form>
        </div>
        <div className="splash-form-login">
          <h2 className='formhead'>Log In</h2>
          {loginErrors.length > 0 &&
            loginErrors.map((message) => <p key={message} className="error">{message}</p>)}
          <form onSubmit={handleLoginSubmit}>
            <label>
              Email
              <input
                type="text"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                required
              />
            </label>
            {loginErrors.email && <p className="error">{loginErrors.email}</p>}
            <label>
              Password
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </label>
            {loginErrors.password && <p className="error">{loginErrors.password}</p>}
            <button type="submit" className="login">Log In</button>
          </form>
          <button className="demouser" onClick={demo} style={{ cursor: 'pointer' }}>Demo User</button>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
