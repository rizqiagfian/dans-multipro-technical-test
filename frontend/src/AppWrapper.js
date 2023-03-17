import React, { useEffect } from "react";
import { Route, useLocation, withRouter } from "react-router-dom";
import { HomeLandingPage } from "./pages/HomeLandingPage";
import App from "./App";

const AppWrapper = (props) => {
    let location = useLocation();
    const pathNotNeedLogin = ['/', '/login']
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);


    return (
        <>
            {
                pathNotNeedLogin.includes(props.location.pathname) ?
                    <>
                        {props.location.pathname === '/' && <Route path="/" component={HomeLandingPage} />}
                        {props.location.pathname === '/login' && <Route path="/login" component={HomeLandingPage} />}
                    </>
                    : <App />
            }
        </>
    )
};
export default withRouter((AppWrapper));
