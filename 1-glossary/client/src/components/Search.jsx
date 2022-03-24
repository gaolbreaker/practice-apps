import React from 'react';
import axios from 'axios';

// let's use functional components instead of class components this time!

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {termToSearch: ''};
  }

  searchDB(event) {
    event.preventDefault();
    const termToSearch = this.state.termToSearch;
    axios.post('http://localhost:3000/search', {term: termToSearch})
      .then( (data) => {
        // console.log('the results! -->');
        // console.log(data.data);
        this.state.termToSearch = '';
        this.props.showSearch(data.data);
        // This is working! Do something with data.data

      })
      .catch( (err) => {console.log(err);})

  }

  handleChange() {
    this.setState({termToSearch: event.target.value})
  }

  render() {
    return (
      <div>
      <h2>
        Search for a Term
      </h2>
      <div>
        <form>
          <input type="text" value={this.state.termToSearch} onChange={this.handleChange.bind(this)}></input>
          <button onClick={this.searchDB.bind(this)}>Submit</button>
        </form>
      </div>
      </div>
    );
  }
}





export default Search;