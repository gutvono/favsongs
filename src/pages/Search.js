import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      validateButton: true,
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

  render() {
    const { validateButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <label htmlFor="searchInput">
            Procurar:
            <input
              type="text"
              name="searchInput"
              id="searchInput"
              placeholder="insira o nome da música ou artista"
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
        </form>
      </div>
    );
  }
}

export default Search;
