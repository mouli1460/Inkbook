import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const NoteItem = ({ note }) => {
  return (
    <div className="card my-2">
      <div className="card-body">
        <h5 className="card-title">
          {note.title} 
          <FontAwesomeIcon icon={faPenToSquare} className="mx-2" />
        </h5>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
};

export default NoteItem;
