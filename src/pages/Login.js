import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      validateLogin: true,
      username: '',
      loading: false,
      loggedIn: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validate);
  }

  validate = () => {
    const { username } = this.state;
    const condition = 3;
    this.setState({
      validateLogin: username.length < condition,
    });
  }

  saveLogin = () => {
    const { username } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: username });
      this.setState({
        loading: false,
        loggedIn: true,
      });
    });
  }

  preventEvents = (e) => e.preventDefault();

  render() {
    const { validateLogin, loading, loggedIn } = this.state;
    if (loading) return <p>Carregando...</p>;
    if (loggedIn) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form onSubmit={ this.preventEvents }>
          <label htmlFor="username">
            Username:
            <input
              id="username"
              name="username"
              type="text"
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="submit"
            disabled={ validateLogin }
            data-testid="login-submit-button"
            onClick={ this.saveLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
