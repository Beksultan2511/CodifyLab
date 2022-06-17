import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { API } from "../helpers/const";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import deleteIcon from "../icons/delete.png";
import editIcon from "../icons/edit.png";
import starIcon from "../icons/star.png";
import checkIcon from "../icons/check.png";
const Cards = () => {
  const dispatch = useDispatch();
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
  useEffect(() => {
    getBooks();
  }, []);

  const books = useSelector((state) => state.Get.book);
  if (!books) {
    return <h2>Loading...</h2>;
  }

  function SortArray(x, y) {
    if (x.author < y.author) {
      return -1;
    }
    if (x.author > y.author) {
      return 1;
    }
    return 0;
  }
  books.sort(SortArray);

  async function deleteBook(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getBooks();
    } catch (error) {
      console.log(error);
    }
  }

  function addAndDelete(product) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
      };
    }
    let cartProduct = {
      product,
    };
    let check = cart.products.find((item) => {
      return item.product.id === product.id;
    });
    if (!check) {
      cart.products.push(cartProduct);
    } else {
      cart.products = cart.products.filter((item) => {
        return item.product.id !== product.id;
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_AND_DELETE",
      payload: cart.products.length,
    });
  }
  function checkProductInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
      };
    }
    let check = cart.products.find((item) => {
      return item.product.id === id;
    });
    if (!check) {
      return false;
    } else {
      return true;
    }
  }

  let detective = books.filter((item) => {
    return item.category === "Detective";
  });
  let fantasy = books.filter((item) => {
    return item.category === "Fantasy";
  });
  let horror = books.filter((item) => {
    return item.category === "Horror";
  });
  let romans = books.filter((item) => {
    return item.category === "Romans";
  });

  return (
    <div>
      <Container>
        <h1 style={{ fontStyle: "italic", marginTop: "50px" }}>
          We have <span style={{ color: "red" }}>{books.length} </span> books in
          stock.
        </h1>
        <div className="category-block">
          <div>
            <strong>Detective category: </strong>
            {detective.length}
          </div>
          <div>
            <strong>Fantasy category: </strong>
            {fantasy.length}
          </div>
          <div>
            <strong>Horror category: </strong>
            {horror.length}
          </div>
          <div>
            <strong>Romans category: </strong>
            {romans.length}
          </div>
        </div>

        <Row>
          {books.map((item) => (
            <Col
              key={item.id}
              style={{ marginBottom: "25px" }}
              md={4}
              sm={6}
              xs={12}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  style={{ background: "contain", height: "300px" }}
                  variant="top"
                  src={item.image}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <span style={{display:'block'}}>
                      <strong> Author:</strong> {item.author}
                    </span>
                    <span>
                      <strong> Category:</strong> {item.category}
                    </span>
                  </Card.Text>
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    {checkProductInCart(item.id) ? (
                      <Button
                        onClick={(e) => {
                          addAndDelete(item);
                          getBooks();
                        }}
                        className="btn-delete"
                      >
                        <img width={30} src={checkIcon} alt="" />
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          addAndDelete(item);
                          getBooks();
                        }}
                        className="btn-delete"
                      >
                        <img width={30} src={starIcon} alt="" />
                      </Button>
                    )}

                    <Link to={`/edit/${item.id}`}>
                      <Button onClick={(e) => {
                          getBooks();
                        }} className="btn-edit">
                        <img width={30} src={editIcon} alt="" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => deleteBook(item.id)}
                      className="btn-delete"
                    >
                      <img width={30} src={deleteIcon} alt="" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Cards;
