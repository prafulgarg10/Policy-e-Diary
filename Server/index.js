const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

(async function () {
  try {
    await mongoose.connect(
      "mongodb+srv://praful:Jbaj1MotD5JRgdlJ@policydetails.zpnvo.mongodb.net/PolicyHolderDetails",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.log(err.message);
  }
})();
const client = mongoose.model(
  "lic_datas",
  new mongoose.Schema({
    policy_no: { type: Number, unique: true },
    name: String,
    due_month: String,
    amount: Number,
    amount_recieved: { type: Number, default: 0 },
  })
);

app.post("/add", urlencodedParser, function (req, res) {
  response = {
    policy_no: req.body.policy_no,
    name: req.body.name,
    due_month: req.body.due_month,
    amount: req.body.amount,
  };
  client.create(response);
  res.send("Inserted Successfully");
});

app.get("/dropdown", urlencodedParser, async function (req, res) {
  var result = await client.find().sort({ name: 1 });
  res.send(result);
});

app.post("/amount", urlencodedParser, async function (req, res) {
  await client.findOneAndUpdate(
    { policy_no: req.body.policyNumber },
    { amount_recieved: req.body.amountRecieved },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send("Updated Successfully");
      }
    }
  );
  console.log("Updated!!");
});

app.delete("/deletePolicy/:pno", urlencodedParser, async function (req, res) {
  const pno = req.params.pno;
  await client.findOneAndDelete({ policy_no: pno }, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      if (doc == null) {
        console.log("No such policy exist");
        res.send("No such policy exist");
      } else {
        console.log("Deleted successfully");
        res.send("Deleted!!");
      }
    }
  });
});

app.listen(3001, () => {
  console.log("Listening at port 3001");
});
