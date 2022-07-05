import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import MusicCard from '../components/MusicCard';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      validateButton: true,
      loading: false,
      searchResult: [],
    };
  }

  validate = () => {
    const { searchInput } = this.state;
    this.setState({ validateButton: searchInput.length < 2 });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, this.validate);
  }

  submitSearch = async (e) => {
    e.preventDefault();
    const { searchInput } = this.state;
    const apiCall = await searchAlbumsAPI(searchInput);
    console.log(apiCall);
    this.setState({ loading: true }, () => {
      this.setState({
        searchResult: apiCall,
      });
      this.setState({ loading: false });
    });
  }

  render() {
    const { validateButton, searchResult, loading, searchInput } = this.state;
    if (loading) {
      return (
        <div data-testid="page-search">
          <Header />
          <p>Carregando...</p>
        </div>);
    }
    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.submitSearch } className="searchForm">
          <label htmlFor="searchInput">
            Procurar:
            <input
              type="text"
              name="searchInput"
              id="searchInput"
              placeholder="artista, música ou album"
              size="30"
              onChange={ this.handleChange }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ validateButton }
          >
            Pesquisar
          </button>
          { searchResult.length === 0
            ? <p>Nenhum álbum foi encontrado</p>
            : (
              <p>
                Resultado de álbuns de:
                {' '}
                {searchInput}
              </p>) }
          <div className="allTracks">
            {searchResult
              .map(({ collectionId, artworkUrl100, artistName, collectionName }) => (
                <div key={ collectionId } className="everyTrack">
                  <img
                    src={ artworkUrl100 }
                    alt={ `Img from ${artistName}` }
                    className="trackImg"
                  />
                  <p className="trackName">
                    {`${artistName} - ${collectionName}`}
                  </p>

                  <Link
                    data-testid={ `link-to-album-${collectionId}` }
                    key={ collectionId }
                    to={ `/album/${collectionId}` }
                  >
                    Acessar
                  </Link>
                </div>))}
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
