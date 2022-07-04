import React from 'react';
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
    if (loading) return <p>Carregando...</p>;
    return (
      <header data-testid="header-component">
        TrybeTunes
        <p data-testid="header-user-name">
          Bem vindo,
          {' '}
          {user.name}
        </p>
      </header>
    );
  }
}

export default Header;
