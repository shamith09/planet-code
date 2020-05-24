import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import './styles.css';
const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    return (
        <div className="container">
            <div style={{ height: '75vh' }}>
                <div className="row">
                    <div className="landing-copy col s12 center-align uk-position-center">
                        <img
                            className="profile-picture"
                            style={{ width: '20%' }}
                            src="user.png"
                        />
                        <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m">
                            <h1 className="uk-card-title">User Profile</h1>
                            <h4>Username: {user.name.split(' ')[0]}</h4>
                            <h4>User ID: {user.id}</h4>
                            <h4>Bio: Planet Code Developer!</h4>
                            <button
                                onClick={() => {
                                    dispatch(logoutUser());
                                }}
                                className="uk-button uk-button-secondary"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
