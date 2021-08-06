import { useEffect, useRef } from "react";
import classes from "./main.module.css";
import Axios from "axios";

function Update() {
  const policyNumberRef = useRef();
  const amountRef = useRef();
  function amountHandler(event) {
    event.preventDefault();
    const optionpNumber = policyNumberRef.current.value;
    const enteredAmount = amountRef.current.value;
    const amountData = {
      policyNumber: optionpNumber,
      amountRecieved: enteredAmount,
    };
    Axios.post("http://localhost:3001/amount", amountData)
      .then((res) => {
        console.log(res);
        const h1 = document.createElement("h3");
        const h2 = document.createElement("h4");
        h1.innerText = "Amount updated successfully. ";
        h2.innerText = "Kindly click on view-all to view the updated one";
        document.getElementById("message").appendChild(h1);
        document.getElementById("message").appendChild(h2);
        setTimeout(() => {
          document.getElementById("message").removeChild(h1);
          document.getElementById("message").removeChild(h2);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    Axios.get("http://localhost:3001/dropdown").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        var option = document.createElement("option");
        option.value = response.data[i].policy_no;
        option.text =
          response.data[i].name +
          ", Policy Number: " +
          response.data[i].policy_no;
        document.getElementById("nameSelect").appendChild(option);
      }
    });
  }, []);
  return (
    <div className={classes.updatedata}>
      <form action="/insert" method="post" onSubmit={amountHandler}>
        <table cellSpacing="3px" cellPadding="10px">
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              Update Amount Recieved
            </td>
          </tr>
          <tr>
            <td>Name</td>{" "}
            <td>
              <select id="nameSelect" ref={policyNumberRef}></select>
            </td>
          </tr>
          <tr>
            <td>Amount recieved</td>{" "}
            <td>
              <input type="text" name="ar" ref={amountRef} required />
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ textAlign: "center" }}>
              <input type="submit" value="Insert" />
            </td>
          </tr>
        </table>
      </form>
      <div id="message" className={classes.message}></div>
    </div>
  );
}
export default Update;
