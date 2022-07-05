import React from 'react';
import { string, bool, object } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    this.getCheckedboxes();
  }

  checkedFavs = async () => {
    const { favorites } = this.state;
    const { trackObj } = this.props;
    this.setState({ loading: true }, () => this.getCheckedboxes());
    if (favorites.some(({ trackId }) => trackObj.trackId === trackId)) {
      await removeSong(trackObj);
    } else {
      await addSong(trackObj);
    }
    this.setState({ loading: false });
  }

  getCheckedboxes = async () => {
    this.setState({
      favorites: await getFavoriteSongs(),
    });
  }

  render() {
    const { loading, favorites } = this.state;
    const { trackObj } = this.props;
    return (
      <div className="musicPlayer">
        <audio data-testid="audio-component" src={ trackObj.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="checkFav">
          Favorita
          {}
          <input
            type="checkbox"
            name="checkFav"
            onChange={ this.checkedFavs }
            data-testid={ `checkbox-music-${trackObj.trackId}` }
            checked={ favorites.some(({ trackId }) => trackObj.trackId === trackId) }
          />
          {loading && <p className="musicPlayer">Carregando...</p>}
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackUrl: string,
  trackId: string,
  checkedTrack: bool,
  fullAlbum: object,
}.isRequired;

export default MusicCard;
