import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="uk-card uk-card-default uk-card-body uk-position-center uk-card-color">
        <h1 className="uk-margin-medium uk-text-center uk-text-bold">
          Create An Account
        </h1>
        <form noValidate onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="name"
            type="name"
            placeholder="Username"
            className={classnames(
              "uk-input uk-form-width-large uk-margin-bottom",
              {
                invalid: errors.name
              }
            )}
          />
          <span className="red-text">{errors.name}</span>
          <br />

          <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
            placeholder="Email"
            className={classnames(
              "uk-input uk-form-width-large uk-margin-bottom",
              {
                invalid: errors.email
              }
            )}
          />
          <span className="red-text">{errors.email}</span>
          <br />

          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            placeholder="Password"
            className={classnames(
              "uk-input uk-form-width-large uk-margin-bottom",
              {
                invalid: errors.password
              }
            )}
          />
          <span className="red-text">{errors.password}</span>
          <br />

          <input
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.password2}
            id="password2"
            type="password"
            placeholder="Confirm Password"
            className={classnames("uk-input uk-form-width-large", {
              invalid: errors.password2
            })}
          />
          <span className="red-text">{errors.password2}</span>

          <button
            className="uk-button uk-button-primary uk-margin"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
