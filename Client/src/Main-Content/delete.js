import axios from "axios";
import { useRef } from "react";
import classes from "./main.module.css";
function Delete() {
  const policyRef = useRef();
  function deleteHandler(event) {
    event.preventDefault();
    const policy_no = policyRef.current.value;
    axios
      .delete(`http://localhost:3001/deletePolicy/${policy_no}`)
      .then((res) => {
        let h3;
        if (res.data === "No such policy exist") {
          h3 = document.createElement("h4");
          h3.innerText = res.data;
        } else {
          h3 = document.createElement("h3");
          h3.innerText = res.data;
        }
        document.getElementById("deleteMessage").appendChild(h3);
        setTimeout(() => {
          if (document.getElementById("deleteMessage").firstChild === null) {
            return;
          } else {
            document.getElementById("deleteMessage").removeChild(h3);
          }
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className={classes.row}>
      <div className={classes.viewdata}>
        <form action="/details" method="post" onSubmit={deleteHandler}>
          <table cellSpacing="3px" cellPadding="10px">
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                Delete Policy
              </td>
            </tr>
            <tr>
              <td>Policy Number</td>{" "}
              <td>
                <input type="number" name="vpno" required ref={policyRef} />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center" }}>
                <input type="submit" value="Delete" />
              </td>
            </tr>
          </table>
        </form>
        <div className={classes.deleteMessage} id="deleteMessage"></div>
      </div>
      <div className={classes.emptyDiv}></div>
    </div>
  );
}
export default Delete;
