import React from "react";

const InputBook = () => {
  const [description, setDescription] = React.useState("");
  const [title, setTitle] = React.useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { title, description };
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5">Add Book</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column", width:"100%"}}>
        <h3>Title</h3>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <h3>Description</h3>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
        </div>
      </form>
    </div>
  );
};

export default InputBook;
