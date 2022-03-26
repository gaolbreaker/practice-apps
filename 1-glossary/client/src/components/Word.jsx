import React from 'react';
import axios from 'axios';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      termToEdit: props.wordObject.term,
      definitionToEdit: props.wordObject.definition,
    };
  }

  toggleEdit() {
    const previousValue = this.state.edit;
    this.setState({edit: !previousValue});
  }

  handleTermChange(event) {
    event.preventDefault();
    this.setState({termToEdit: event.target.value});
  }

  handleDefinitionChange(event) {
    event.preventDefault();
    this.setState({definitionToEdit: event.target.value});
  }

  handleSave(event) {
    event.preventDefault();
    axios.put('http://localhost:3000/edit', {
      term: this.props.wordObject.term,
      newTerm: this.state.termToEdit,
      newDefinition: this.state.definitionToEdit
    }).then( (data) => {
      this.toggleEdit();
      this.props.getListOfWords();
    });
  }

  handleBack(event) {
    event.preventDefault();
    this.setState({
      termToEdit: this.props.wordObject.term,
      definitionToEdit: this.props.wordObject.definition})
    this.toggleEdit();
  }



  render() {

    let style = {
      display: this.state.edit ? 'block' : 'none'
    };

    let editBtnStyle = {
      display: this.state.edit ? 'none' : 'inline'
    }

    let defnStyle = {
      display: this.state.edit ? 'none' : 'inline'
    }


    return (
      <li>
        <span style={defnStyle}>
          <strong>Term: </strong>
          <span> {this.props.wordObject.term} </span>
          <span> | </span>
          <strong>Definition: </strong>
          <span> {this.props.wordObject.definition} </span>
        </span>
        <button onClick={this.toggleEdit.bind(this)} style={editBtnStyle}>edit</button>
        <button style={editBtnStyle} onClick={(event) => {
          axios.delete('http://localhost:3000/delete', { data: { term: this.props.wordObject.term } })
            .then((data) => {
              this.props.getListOfWords();
            });
        }}>delete</button>
        <div style={style}>
          <strong>Term: </strong><input size="20" type="text" value={this.state.termToEdit} onChange={this.handleTermChange.bind(this)}></input>
          <span> | </span>
          <strong>Definition: </strong><input size="20" type="text" value={this.state.definitionToEdit} onChange={this.handleDefinitionChange.bind(this)}></input>
          <button onClick={this.handleSave.bind(this)}>save</button>
          <button onClick={this.handleBack.bind(this)}>back</button>
        </div>
      </li>
    );
  }
}

export default List;