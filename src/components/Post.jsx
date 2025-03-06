import React, { useState } from 'react';

function Post({ author, body, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(body);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editText);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <li className="post">
      <p className="author">{author}</p>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className="save" type="button" onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p className="text">{body}</p>
          <button className="edit" type="button" onClick={handleEdit}>Edit</button>
        </>
      )}
      <button className="delete" type="button" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Post;