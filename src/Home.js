import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const Home = () => {
  const [data, setData] = useState({
    payMethod: "",
    date: getCurrentDate(),
    amount: "",
  });
  const [res, setres] = useState([]);
  const { payMethod, date, amount } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRes = { payMethod, amount, date };
    if (payMethod == "" || date == "" || amount == "") {
      const confirmWithoutFill = window.confirm("Are you sure to continue without filling all inputs ?");
      if (confirmWithoutFill) {
        const updatedRes = [...res, newRes];
        setres(updatedRes);
        localStorage.setItem("budget-data", JSON.stringify(updatedRes));
      } else {
        return newRes;
      }
    } else {
      const updatedRes = [...res, newRes];
      setres(updatedRes);
      localStorage.setItem("budget-data", JSON.stringify(updatedRes));
    }
  };
  const handleRemove = (index) => {
    const updatedRes = [...res];
    updatedRes.splice(index, 1);
    setres(updatedRes);
    localStorage.setItem("budget-data", JSON.stringify(updatedRes));
  };

  useEffect(() => {
    const storedData = localStorage.getItem("budget-data");
    if (storedData) {
      setres(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className='container-fluid text-center'>
      <h1 style={{ color: "black", marginTop: "20px" }}>Budget Buddy</h1>
      <p style={{ color: "black" }}>Small budget tracker</p>
      <div className='main container'>
        <form onSubmit={handleSubmit} className='submit-form'>
          <label>Payment Type</label>
          <input
            type='text'
            value={data.payMethod}
            placeholder='Enter payment type'
            onChange={(e) => setData({ ...data, payMethod: e.target.value })}
          />
          <br />
          <label>Amount</label>
          <input
            type='text'
            value={data.amount}
            placeholder='Enter amount'
            onChange={(e) => setData({ ...data, amount: e.target.value })}
          />
          <br />
          <label>Date</label>
          <input
            type='date'
            value={data.date}
            placeholder='Enter date'
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />
          <br />
          <input type='submit' className='btn' />
        </form>

        <div className='tableDiv'>
          {res.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {res.map((el, i) => (
                  <tr key={i}>
                    <th>{el.date}</th>
                    <th>{el.payMethod}</th>
                    <th>{el.amount}</th>
                    <th>
                      <a href='#' onClick={() => handleRemove(i)}>
                        X
                      </a>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div style={{ textAlign: "center", paddingBottom: "10px", color: "black" }}>No data found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
