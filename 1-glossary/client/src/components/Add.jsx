import React from 'react';
import axios from 'axios';

// let's use functional components instead of class components this time!

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termToAdd: '',
      definitionToAdd: ''
    };
  }

  addToDB(event) {
    event.preventDefault()
    if (this.state.termToAdd !== '' && this.state.definitionToAdd !== '') {
      axios.post('http://localhost:3000/words', {term: this.state.termToAdd, definition: this.state.definitionToAdd})
      .then((data) => {
        this.setState({
          termToAdd: '',
          definitionToAdd: ''
        }, this.props.appRender);
      });
    }
  }

  handleTermChange(event) {
    this.setState({termToAdd: event.target.value});
  }

  handleDefinitionChange(event) {
    this.setState({definitionToAdd: event.target.value});
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
      <h2>
        Add a New Term!
      </h2>
      <form>
        <input type="text" value={this.state.termToAdd} onChange={this.handleTermChange.bind(this)} placeholder="term..."></input>
        <input type="text" value={this.state.definitionToAdd} onChange={this.handleDefinitionChange.bind(this)} placeholder="definition..."></input>
        <button onClick={this.addToDB.bind(this)}>Submit</button>
      </form>
    </div>
    );
  }
}

export default Add;