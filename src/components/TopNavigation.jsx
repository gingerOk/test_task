import React from "react";
import {NavLink} from "react-router-dom";
import {useUser, logout} from "contexts/UserContext";


const TopNavigation = () => {
    const [user, dispatch] = useUser();
    const isAuth = !!user.token;

    return (
        <div className="ui secondary pointing menu">
          <NavLink exact to="/" className="item">
            <i className="icon home" />
            Home
          </NavLink>
    
          <NavLink exact to="/films" className="item">
            <i className="icon films" /> Films
          </NavLink>
    
          {isAuth && (
            <NavLink exact to="/films/new" className="item">
              <i className="icon plus" /> Add new film
            </NavLink>
          )}
    
          <div className="right menu">
            {isAuth ? (
              <span onClick={() => logout(dispatch)} className="item">
                <i className="icon sign-out" /> Logout
              </span>
            ) : (
              <>
                <NavLink to="/signup" className="item">
                  <i className="icon sign-in"></i> Signup
                </NavLink>
                <NavLink to="/login" className="item">
                  <i className="icon user"></i> Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      );
}

export default TopNavigation;