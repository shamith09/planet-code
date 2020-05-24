import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Editor from './pages/editor/Editor';
import Register from './auth/Register';
import Login from './auth/Login';
import About from './pages/about';
import EditorDemo from './pages/editorDemo';
import Landing from './pages/landing';
import Dashboard from './pages/dashboard';

import Navbar from './components/Navbar';
import Practice from './pages/practice';
import PrivateRoute from './components/PrivateRoute';
import NoRouteMatch from './pages/noRouteMatch';

import 'bulma/css/bulma.css';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = './login';
    }
}

const App = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = () => {
        axios
            .get('/api/questions/get-questions')
            .then((res) => {
                setQuestions({ questions: res['data'] });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Provider store={store}>
            <Router>
                <header>
                    <Navbar />
                </header>
                <Switch>
                    <Route exact path="/" component={Landing} />

                    <Route exact path="/about" component={About} />
                    <Route exact path="/editor-demo" component={EditorDemo} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />

                    {questions.length > 0 &&
                        questions.map(
                            ({ id, name, question, expected, link }) => (
                                <Route
                                    path={link}
                                    render={() => (
                                        <Editor
                                            expectedOutput={expected}
                                            questionName={name}
                                            questionDescription={question}
                                            questionId={id}
                                        />
                                    )}
                                />
                            )
                        )}

                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <PrivateRoute exact path="/practice" component={Practice} />
                    <Route component={NoRouteMatch} />
                </Switch>
            </Router>
        </Provider>
    );
};

export default App;
