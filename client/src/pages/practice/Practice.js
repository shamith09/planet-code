import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

const axios = require('axios');

class Practice extends Component {
    constructor() {
        super();
        this.state = {
            loading: 'intial',
            questions: [],
            user: {},
            questionsCorrect: [],
            everythingLoaded: false,
        };
    }

    componentDidMount() {
        const { user } = this.props.auth;
        this.setState({ user }, () => this.getCompleteQuestions());

        axios
            .get('/api/questions/get-questions')
            .then((res) => {
                this.setState({ questions: res['data'] });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getCompleteQuestions = () => {
        const { user } = this.state;
        axios
            .post('/api/correct/get', {
                userId: user.id,
            })
            .then((res) => {
                this.setState({ questionsCorrect: res.data }, () =>
                    this.setState({ everythingLoaded: true })
                );
            })
            .catch((err) => console.log(err));
    };

    renderTableData = () => {
        return this.state.questions.map((question, index) => {
            const { id, name, difficulty, link } = question; //destructuring
            return (
                <tbody>
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>{difficulty}</td>
                        <td>
                            <Link to={link}>{name}</Link>
                        </td>
                        <td>
                            {this.state.questionsCorrect.includes(id)
                                ? 'Complete'
                                : 'Incomplete'}
                        </td>
                    </tr>
                </tbody>
            );
        });
    };

    render() {
        return (
            <div>
                {this.state.everythingLoaded ? (
                    <div className="question-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Question ID</th>
                                    <th scope="col">Question Name</th>
                                    <th scope="col">Difficulty</th>
                                    <th scope="col">Practice</th>
                                    <th scope="col">Completion</th>
                                </tr>
                            </thead>
                            {this.renderTableData()}
                        </table>
                    </div>
                ) : null}
            </div>
        );
    }
}

Practice.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Practice);
