const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const router = require("express").Router();
const Account = require("../models/Account");
const CryptoJS = require("crypto-js");
router.get("/something", (req, res) => {
  res.send("Success 1");
});
//Update
router.patch("/:id", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORDSECURITY
    ).toString();
  }

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAccount);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Account
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    const { password, ...others } = account._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get All Account
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const accounts = query
      ? await Account.find().sort({ _id: -1 }).limit(5)
      : await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get Account Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Account.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
