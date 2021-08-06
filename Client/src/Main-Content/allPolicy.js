import Axios from "axios";
import { useEffect, useState } from "react";
import classes from "./main.module.css";
function AllPolicy() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/dropdown").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className={classes.row1}>
      <div className={classes.details}>
        <table cellSpacing="3px" cellPadding="10px">
          <tr>
            <td>Policy number</td>
            <td>Name</td>
            <td>Due Month</td>
            <td>Amount</td>
            <td>Amount recieved</td>
          </tr>
          {data.map((datas) => (
            <tr>
              <td>{datas.policy_no}</td>
              <td>{datas.name}</td>
              <td>{datas.due_month}</td>
              <td>{datas.amount}</td>
              <td>{datas.amount_recieved}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default AllPolicy;
