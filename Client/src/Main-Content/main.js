import { useRef } from "react";
import Axios from "axios";
import Delete from "./delete";
import classes from "./main.module.css";
import Update from "./update";

function Main() {
  const nameRef = useRef();
  const policyNumberRef = useRef();
  const dueMonthRef = useRef();
  const amountRef = useRef();
  function clickHandler(event) {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredpNumber = policyNumberRef.current.value;
    const enteredMonth = dueMonthRef.current.value;
    const enteredAmount = amountRef.current.value;
    const addData = {
      policy_no: enteredpNumber,
      name: enteredName,
      due_month: enteredMonth,
      amount: enteredAmount,
    };
    Axios.post("http://localhost:3001/add", addData).then((res) => {
      console.log(res);
      const h3 = document.createElement("h3");
      h3.innerText =
        "Policy added successfully. Kindly click on view-all to view the added one";
      document.getElementById("message").appendChild(h3);
      setTimeout(() => {
        if (document.getElementById("message").firstChild === null) {
          return;
        } else {
          document.getElementById("message").removeChild(h3);
        }
      }, 8000);
    });
  }
  return (
    <div>
      <div className={classes.row}>
        <div className={classes.formcard}>
          <form action="/add" method="post" onSubmit={clickHandler}>
            <table cellSpacing="3px" cellPadding="10px">
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Add Policy
                </td>
              </tr>
              <tr>
                <td>Name</td>{" "}
                <td>
                  <input type="text" name="name" ref={nameRef} required />
                </td>
              </tr>
              <tr>
                <td>Policy Number</td>{" "}
                <td>
                  <input
                    type="text"
                    name="pno"
                    ref={policyNumberRef}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Amount</td>{" "}
                <td>
                  <input type="text" name="am" ref={amountRef} required />
                </td>
              </tr>
              <tr>
                <td>Due Month</td>{" "}
                <td>
                  <input type="text" name="dm" ref={dueMonthRef} required />
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  <input type="submit" value="Add Policy" />
                </td>
              </tr>
            </table>
          </form>
        </div>
        <Update />
      </div>
      <Delete />
    </div>
  );
}
export default Main;
