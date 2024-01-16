import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
function Navigation() {
  const user = useSelector((state) => state.session.user)
  return (
    <>
    { user && <ul className='nav'>
      <ul>
       {user && <NavLink to="/home" className='homelink'><i class="fa-solid fa-fire" style={{color: '#ff8800'}}></i>Raddit</NavLink>}
      </ul>

      <ul>  
      {user && <ProfileButton />}
      </ul>
    </ul>}
    </>
  );
}

export default Navigation;
