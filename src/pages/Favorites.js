import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    favorites: [],
    loading: true,
  }

  componentDidMount() {
    this.getFav();
    this.setState({ loading: false });
  }

  async getFav() {
    const allTracks = await getFavoriteSongs();
    this.setState({ favorites: allTracks });
  }

  render() {
    const { favorites, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        {loading ? <p>Carregando...</p> : (
          favorites.map((obj, index) => (
            <div key={ index } className="everyTrack">
              <img
                src={ obj.artworkUrl100 }
                alt={ `Img from ${obj.artistName}` }
                className="trackImg"
              />
              <div className="trackNameAndPlayer">
                <p className="trackName">
                  {`${obj.trackName}`}
                </p>
                <div className="musicPlayer">
                  <MusicCard trackObj={ obj } fullAlbum={ favorites } />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
