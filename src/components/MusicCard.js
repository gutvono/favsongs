import React from 'react';
import { object, func } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  async componentDidMount() {
    this.getCheckedboxes();
  }

  checkedFavs = async ({ target }) => {
    const { trackObj, attFav } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      this.setState({ checked: true });
      await addSong(trackObj);
    } else {
      this.setState({ checked: false });
      await removeSong(trackObj);
      await attFav();
    }
    this.setState({ loading: false });
  }

  getCheckedboxes = async () => {
    const { trackObj } = this.props;
    const allTracks = await getFavoriteSongs();
    if (allTracks.some(({ trackId }) => trackId === trackObj.trackId)) {
      this.setState({ checked: true });
    }
  }

  render() {
    const { loading, checked } = this.state;
    const { trackObj } = this.props;
    if (loading) { return <p className="musicPlayer">Carregando...</p>; }
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
        <label htmlFor={ `fav-${trackObj.trackId}` }>
          Favorita
          <input
            type="checkbox"
            name={ `fav-${trackObj.trackId}` }
            id={ `fav-${trackObj.trackId}` }
            onChange={ this.checkedFavs }
            data-testid={ `checkbox-music-${trackObj.trackId}` }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  fullAlbum: object,
  attFav: func,
}.isRequired;

export default MusicCard;
