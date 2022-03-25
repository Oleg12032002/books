import React, {useState} from "react";
import EditBook from "./EditBook";
import Image from 'react-random-image';
import Io from 'socket.io-client'





const ViewBook = ({ book }) => {
    console.log(book)
    const [comments, setComments] = React.useState([]);
    const [comment, setComment] = React.useState("");
    const [description, setDescription] = React.useState(book.description);
    const [title, setTitle] = React.useState(book.title);

    // typing
    const io = Io('127.0.0.1:5000', {reconnect: true});
    const typing = () => {
      io.emit('user typing', "user");
    } 
    const socketRef = React.useRef(null);


    const getComment = async () => {
        try {
          const response = await fetch(`http://localhost:5000/books/${book.item_id}/comment`);
          const jsonData = await response.json();
    
          setComments(jsonData);
        } catch (err) {
          console.error(err.message);
        }
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { comment };
          const response = await fetch(`http://localhost:5000/books/${book.item_id}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
          getComment();
        } catch (err) {
          console.error(err.message);
        }
      };




    React.useEffect(() => {
      
        getComment();
    }, []);

  return (<>


    <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#idd${book.item_id}`}>
      Info
    </button>
    
    <div class="modal fade" id={`idd${book.item_id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">

    <div class="modal-header">
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => { setComment(""); }}
              >
                &times;
              </button>
            </div>
  
    <div style={{margin:"10px"}}>
        <div style={{display:"flex", flexDirection: "row"}}>
            <Image width={100} height={100}/>
            <div style={{display:"flex", flexDirection: "column", margin:"10px"}}>
                <h1>Title: {title}</h1>
                <div style={{display:"flex", flexDirection: "row"}}>
                    <div style={{marginRight:"10px"}}>
                        <strong>Description:</strong> 
                    </div>
                    <div>
                         {description}
                    </div>
                </div>
            </div>
        </div>

        <div style={{display:"flex", flexDirection: "column"}}>
        <table class="table mt-5 text-center">
            <thead>
              <tr>
                  <th style={{background:"gray"}}>Text Comment</th>
              </tr>
            </thead>
            <tbody>
            {comments.map(com => (
                <tr key={com.item_id}>
                  <td>{com.description}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <h1 className="text-center mt-5">Add comment</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
          <pre class="typing" id="typingStatus"></pre>
            <input
            type="text"
            id="messageForm"
            className="form-control"
            value={comment}
            onChange={e => setComment(e.target.value)}
            />
            <button className="btn btn-success">Add</button>
        </form>
      </div>
    </div>

    <div class="modal-footer">
        <button
          type="button"
          class="btn btn-danger"
          data-dismiss="modal"
          onClick={() => { setComment(""); typing();}}
        >
          Close
        </button>
    </div>
    
    
    </div>
    </div>
    </div>
    </>
  )};

export default ViewBook;
