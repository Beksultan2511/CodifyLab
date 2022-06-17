import axios from "axios";
import React, { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/const";

const AddPage = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  async function addBook(newBook) {
    try {
      await axios.post(API, { ...newBook });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !category.trim() || !image.trim()) {
      alert("Fields required");
      return;
    }
    let newBook = {
      author,
      title,
      category,
      image,
    };
    addBook(newBook)
    setAuthor("");
    setTitle("");
    setCategory("");
    setImage("");
    navigate("/");
  }

  return (
    <div className="main-add">
      <div className="form-add">
        <form onSubmit={handleSubmit}>
          <FormControl
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            placeholder="Specify the author of the book"
          />
          <FormControl
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Specify the title of the book"
          />
          <FormControl
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            placeholder="Specify the category of the book"
          />
          <FormControl
            onChange={(e) => {
              setImage(e.target.value);
            }}
            placeholder="Insert a picture of the book"
          />

          <Button type="submit" variant="success">
            ADD A NEW BOOK
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
