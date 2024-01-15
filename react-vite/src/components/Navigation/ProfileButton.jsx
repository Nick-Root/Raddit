import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async (e) => {
    e.preventDefault();

    try {
      // Assuming thunkLogout returns a promise
      await dispatch(thunkLogout());
      closeMenu()
      // If successful, navigate to "/"
      navigate("/");
    } catch (error) {
      // Handle any errors that occurred during logout
      console.error("Logout failed:", error);
    }
  };

  const navToMyStuff = () => {
    navigate('/mystuff')
    closeMenu()
  }

  if (!user) return null
  return (
    <>
      <button onClick={toggleMenu} className='pbutton'>
        <i className="fas fa-user-circle" id='proficon' />
        {user.username}
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className='dropdownBox'>
              <ul className='dropdownulButton'><p>Welcome {user.username}!</p></ul>
              <button onClick={navToMyStuff}>My Stuff</button>
              <ul className='dropdownulButton'>
                <button onClick={logout}>Log Out</button>
              </ul>
            </div>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
