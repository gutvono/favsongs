import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: true,
    user: {},
  }

  componentDidMount() {
    this.attUser();
  }

  attUser = async () => {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        {loading ? <p>Carregando...</p> : (
          <div>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
