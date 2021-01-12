import React from "react";
import { NavLink } from "react-router-dom";
import { useUser, logout } from "contexts/UserContext";

const TopNavigation = () => {
  const [user, dispatch] = useUser();
  const isAuth = !!user.token;

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">
        {isAuth && (
          <NavLink exact to="/users" className="nav-item nav-link">
            Users
          </NavLink>
        )}
        <div>
          {isAuth ? (
            <span
              onClick={() => logout(dispatch)}
              className="nav-item nav-link"
            >
              Logout
            </span>
          ) : (
            <>
              <NavLink to="/signup" className="nav-item nav-link">
                Signup
              </NavLink>
              <NavLink to="/login" className="nav-item nav-link">
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
