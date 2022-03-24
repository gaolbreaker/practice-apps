import React from 'react';
import { render } from "react-dom";
import Search from './Search.jsx';
import Add from './Add.jsx';
import List from './List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wordsList: [{term: 'blank', definition: 'blank'}]};
  }

  componentDidMount() {
    this.getListOfWords();
  }

  getListOfWords() {
    axios.get('http://localhost:3000/words')
      .then( (response) => {
        let arrayOfWords = [...response.data];
        console.log('Running getListOfWords');
        console.log(arrayOfWords);
        // console.log(arrayOfWords.isArray());
        this.setState({wordsList: arrayOfWords});
      });
  }

  showSearch(arrayOfWords) {
    if (arrayOfWords.length > 0) {
      this.setState({wordsList: arrayOfWords});
    }
  }

  render() {
    return (
      <div>
        <header> <h1>Glossary App</h1> </header>
        <div>
          <Search showSearch={this.showSearch.bind(this)} />
        </div>
        <div>
          <Add appRender={this.getListOfWords.bind(this)} />
        </div>
        <div>
          <List wordsList={this.state.wordsList} getListOfWords={this.getListOfWords.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;