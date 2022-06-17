import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { API } from "../helpers/const";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  async function getToEdit(id) {
    try {
      let response = await axios(`${API}/${id}`);
      dispatch({
        type: "GET_TO_EDIT",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getToEdit(params.id);
  }, []);
  
  const toEdit = useSelector((state) => state.GetTo.toEdit);
  const [author, setAuthor] = useState(toEdit.author);
  const [title, setTitle] = useState(toEdit.title);
  const [category, setCategory] = useState(toEdit.category);
  const [image, setImage] = useState(toEdit.image);
  if (!toEdit) {
    return <h2>Loading...</h2>;
  }
  async function getBooks() {
    try {
      let response = await axios(API);
      dispatch({
        type: "GET_BOOKS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function saveEdited(editedBook) {
    try {
      await axios.patch(`${API}/${editedBook.id}`, editedBook);
    } catch (error) {
      console.log(error);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let edited = {
      ...toEdit,
      author,
      title,
      category,
      image,
    };
    saveEdited(edited);
    getBooks();
    navigate("/");
  }

  return (
    <div className="div-save">
      <div className="form-save">
        <form onSubmit={handleSubmit}>
          <FormControl
          placeholder="Change an author"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
          <FormControl
          placeholder="Change a title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <FormControl
          placeholder="Change the category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <FormControl
          placeholder="Change an image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />

          <Button type="submit" variant="success">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
