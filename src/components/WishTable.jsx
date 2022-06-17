import React from "react";
import { Table } from "react-bootstrap";

const WishTable = () => {
  let wishCount = JSON.parse(localStorage.getItem("cart"));
  
  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Author</th>
            <th>Title</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {wishCount.products.map((item, index) => (
            <tr >
              <td key={item.id}>{index + 1}</td>
              <td>{item.product.author}</td>
              <td>{item.product.title}</td>
              <td>{item.product.category}</td>
              <td>
                <img width={60} src={item.product.image} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WishTable;
