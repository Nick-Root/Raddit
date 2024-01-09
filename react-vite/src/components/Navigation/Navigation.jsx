import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className='nav'>
      <ul>
        <NavLink to="/home" className='homelink'>Raddit</NavLink>
      </ul>

      <ul>
        <ProfileButton />
      </ul>
    </ul>
  );
}

export default Navigation;
