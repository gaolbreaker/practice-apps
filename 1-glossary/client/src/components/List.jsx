import React from 'react';
import axios from 'axios';
import Word from './Word.jsx';

// let's use functional components instead of class components this time!

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
  }

  render() {
    let data = this.props.wordsList;

    return (
      <div>
        <h2>
          List of Words (Current Number: {this.props.wordsList.length})
        </h2>
        <ol>
          {data.map( (element) => <Word wordObject={element} getListOfWords={this.props.getListOfWords}/>
          )}
        </ol>
      </div>
    );
  }
}

export default List;

            // <li>
            //   <strong>Term: </strong>
            //   <span> {element.term} </span>
            //   <span> | </span>
            //   <strong>Definition: </strong>
            //   <span> {element.definition} </span>
            //   <button onClick={this.toggleEdit.bind(this)}>Edit</button>
            //   <button onClick={ (event) => {
            //     axios.delete('http://localhost:3000/delete', {data: {term: element.term}})
            //       .then( (data) => {
            //         this.props.getListOfWords();
            //       });
            //   }}>Delete</button>
            //   <div style={style}>
            //     <input type="text"></input>
            //     <input type="text"></input>
            //     <button>Save</button>
            //   </div>
            // </li>