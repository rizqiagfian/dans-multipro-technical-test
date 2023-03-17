import React from "react";
import Routes from "./Routes";

const App = () => {
    const isLoggedIn = JSON.parse(localStorage.getItem('userLogin'))?.token ? true : false

    return (

        <div className="layout-content">
            {isLoggedIn === true ?
                <Routes /> :
                <div>
                    <h1>Access Denied</h1>
                </div>
            }

        </div>

    );
}
export default App