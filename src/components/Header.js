import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
  }

  componentDidMount() {
    this.getLogin();
  }

  getLogin = () => {
    this.setState({ loading: true }, async () => {
      this.setState({ user: await getUser() });
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <h2>TrybeTunes</h2>
        <p data-testid="header-user-name">
          Bem vindo,
          {' '}
          {loading ? <p>Carregando...</p> : <p>{user.name}</p>}
        </p>
        {loading ? <p>Carregando...</p> : (
          <nav>
            <Link to="/search" data-testid="link-to-search">Search </Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites </Link>
            <Link to="/profile" data-testid="link-to-profile">Profile </Link>
          </nav>
        )}
      </header>
    );
  }
}

export default Header;
