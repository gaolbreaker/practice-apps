import React from 'react';
import axios from 'axios';

// let's use functional components instead of class components this time!

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
  }

  toggleEdit() {
    const previousValue = this.state.edit;
    this.setState({edit: !previousValue}, () => {console.log(this.state.edit)});
  }

  render() {
    let data = this.props.wordsList;

    let style = {
      display: this.state.edit ? 'inline' : 'none'
    };

    return (
      <div>
        <h2>
          List of Words (Current Number: {this.props.wordsList.length})
        </h2>
        <ol>
          {data.map( (element) =>
            <li>
              <strong>Term: </strong>
              <span> {element.term} </span>
              <span> | </span>
              <strong>Definition: </strong>
              <span> {element.definition} </span>
              <button onClick={this.toggleEdit.bind(this)}>Edit</button>
              <button onClick={ (event) => {
                axios.delete('http://localhost:3000/delete', {data: {term: element.term}})
                  .then( (data) => {
                    this.props.getListOfWords();
                  });
              }}>Delete</button>
              <div style={style}>What the what</div>
            </li>
          )}
        </ol>
      </div>
    );
  }
}

export default List;