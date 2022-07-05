import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      album: [],
    };
  }

  componentDidMount() {
    this.mountAlbum(window.location.href.split('album/')[1]);
  }

  mountAlbum = async (id) => {
    this.setState({
      album: await getMusics(id),
    }, () => {
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading, album } = this.state;
    if (loading) {
      return (
        <div data-testid="page-album">
          <Header />
          <p>Carregando...</p>
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <div className="allTracks">
          {album.map((obj, index) => {
            if (index === 0) {
              return (
                <div className="album" data-testid="artist-name">
                  <img
                    src={ obj.artworkUrl100 }
                    alt={ obj.artistName }
                    className="trackImg"
                  />
                  <p className="trackName" data-testid="album-name">
                    {`${obj.artistName} - ${obj.collectionName}`}
                  </p>
                  <p>{`Gênero: ${obj.primaryGenreName}`}</p>
                  <p>{`Copyright: ${obj.copyright}`}</p>
                </div>
              );
            }
            return (
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
                    <MusicCard trackObj={ obj } fullAlbum={ album } />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Album;
