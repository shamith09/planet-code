import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
