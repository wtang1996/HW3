import React from 'react';
import Draggable from 'react-draggable';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';

// function based "dumb" component with no state
const Note = (props) => {
  const onStartDrag = (e, ui) => {
    props.updatePosition(ui.x, ui.y);
    props.setZIndex();
  };

  const onDrag = (e, ui) => {
    props.updatePosition(ui.x, ui.y);
  };

  const onStopDrag = (e, ui) => {
    props.updatePosition(ui.x, ui.y);
  };

  const onDeleteClick = () => {
    props.deleteNote();
  };

  const onEditClick = () => {
    props.editNote(true);
  };

  const onEditFinish = () => {
    props.editNote(false);
  };

  const onInputChange = (event) => {
    props.editText(event.target.value);
  };

  const editing = () => {
    if (props.note.isEditing) {
      return (
        <div className="note" style={{ zIndex: props.note.zIndex }} >
          <div className="topBar">
            <div className="leftBar">
              <div>{props.note.title}</div>
              <i onClick={onDeleteClick} className="fa fa-trash-o" />
              <i onClick={onEditFinish} className="fa fa-check" />
            </div>
            <i className="note-mover fa fa-arrows-alt" />
          </div>
          <Textarea className="content" onChange={onInputChange} />
        </div>
      );
    } else {
      return (
        <div className="note" style={{ zIndex: props.note.zIndex }} >
          <div className="topBar">
            <div className="leftBar">
              <div>{props.note.title}</div>
              <i onClick={onDeleteClick} className="fa fa-trash-o" />
              <i onClick={onEditClick} className="fa fa-pencil" />
            </div>
            <i className="note-mover fa fa-arrows-alt" />
          </div>
          <div className="content" dangerouslySetInnerHTML={{ __html: marked(props.note.text || '') }} />
        </div>
      );
    }
  };

  return (
    <div>
      <Draggable
        handle=".note-mover"
        grid={[50, 50]}
        position={{ x: props.note.x, y: props.note.y }}
        onStart={onStartDrag}
        onDrag={onDrag}
        onStop={onStopDrag}
        zIndex={props.note.zIndex}
      >
        {editing()}
      </Draggable>
    </div>
  );
};


export default Note;
