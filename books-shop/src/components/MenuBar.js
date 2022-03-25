import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    useRouteMatch,
    useParams
  } from "react-router-dom";

const MenuBar = () => {
   return <>
        <div>
            <nav class="navbar navbar-dark bg-dark">
                <NavLink className={"navbar-brand"} to="/">List Book</NavLink>
                <NavLink className={"navbar-brand"} to="/input">Input</NavLink>
            </nav>
        </div>
   </>
};

export default MenuBar;
