import React from "react";

const EditBook = ({ book }) => {
    const [title, setTitle] = React.useState(book.title);
    const [description, setDescription] = React.useState(book.description);

  const updateDataBook = async e => {
    e.preventDefault();
    try {
      const body = { title, description };
      const response = await fetch(
        `http://localhost:5000/books/${book.item_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${book.item_id}`}
      >
        Edit
      </button>

      <div
        class="modal"
        id={`id${book.item_id}`}
        onClick={() => { setDescription(book.description); setTitle(book.title); }}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Book</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => { setDescription(book.description);setTitle(book.title); }}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", width:"100%"}}>
            
            <h6>Title</h6>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            
            <h6>Description</h6>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            </div>

            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDataBook(e)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => { setDescription(book.description); setTitle(book.title) }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
