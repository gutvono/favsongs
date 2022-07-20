import React from 'react';
import { string, bool, object } from 'prop-types';
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
    const { trackObj } = this.props;
    this.setState({ loading: true });
    if (target.checked) {
      this.setState({ checked: true });
      await addSong(trackObj);
    } else {
      this.setState({ checked: false });
      await removeSong(trackObj);
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
            checked={ checked }
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
