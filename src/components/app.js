import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';

import InputBar from './input_bar';
import fetchNotes from '../firebase';

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map(),
      id: 0,
      maxZ: 0,
    };
  }

  componentDidMount() {
    const updateNotes = notesObjFirebase => {
      this.setState({
        notes: Immutable.Map(notesObjFirebase),
      });
    };
    fetchNotes(updateNotes);
  }

  setZIndex(id) {
    this.setState({
      maxZ: this.state.maxZ + 1,
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { zIndex: this.state.maxZ });
      }),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  addNote(titleInput) {
    const note = {
      title: titleInput,
      text: 'content',
      x: 400,
      y: 12,
      zIndex: 0,
      isEditing: false,
    };
    this.setState({
      id: this.state.id + 1,
      notes: this.state.notes.set(this.state.id, note),
    });
  }

  updatePosition(id, x, y) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { x }, { y });
      }),
    });
  }

  editNote(id, status) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { isEditing: status });
      }),
    });
  }

  editText(id, text) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { text });
      }),
    });
  }

  render() {
    return (
      <div>
        <h1>Bulletin Board</h1>
        <InputBar addNote={titleInput => this.addNote(titleInput)} />
        <div>
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note key={id} note={note} id={id} updatePosition={
              (x, y) => this.updatePosition(id, x, y)
            } deleteNote={
              () => this.deleteNote(id)
            } editNote={
              (status) => this.editNote(id, status)
            } editText={
              (text) => this.editText(id, text)
            } setZIndex={
              (z) => this.setZIndex(id)
            }
            />
          );
        })}
        </div>
      </div>
    );
  }
}

export default App;
