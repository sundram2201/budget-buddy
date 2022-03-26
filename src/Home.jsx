import React, { useRef, useState } from "react";
import { Table } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [forWhat, setforWhat] = useState("");
  const [date, setdate] = useState("");
  const [amount, setamount] = useState("");
  const [res, setres] = useState([]);

  const resultForm = (e) => {
    e.preventDefault();
    const newRes = { forWhat: forWhat, amount: amount, date: date };
    if (forWhat == "" || date == "" || amount == "") {
      const confirmWithoutFill = window.confirm(
        "Are you sure to continue without filling all inputs ?"
      );
      if (confirmWithoutFill) {
        setres([...res, newRes]);
      } else {
        return newRes;
      }
    } else {
      setres([...res, newRes]);
    }
  };

  return (
    <div className="container-fluid">
      <div className="main container">
        <form onSubmit={resultForm} className="submit-form">
          <label>Payment methods</label>
          <input
            type="text"
            value={forWhat}
            placeholder="Methods"
            onChange={(e) => setforWhat(e.target.value)}
          />
          <br />
          <label>Enter amount</label>

          <input
            type="text"
            value={amount}
            placeholder="enter amount"
            onChange={(e) => setamount(e.target.value)}
          />
          <br />
          <label>Enter the date</label>
          <input
            type="date"
            value={date}
            placeholder="Date"
            onChange={(e) => setdate(e.target.value)}
          />
          <br />
          <input type="submit" className="btn" />
        </form>

        <div className="tableDiv">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {res.map((x) => {
                return (
                  <tr>
                    <th>{x.date}</th>
                    <th>{x.forWhat}</th>
                    <th>{x.amount}</th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Home;
