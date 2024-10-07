const router = require("express").Router();
const Account = require("../models/Account");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//CHECK LOGGED IN
router.get("/authorize", async (req, res) => {
  res.status(202).send("Logged in");
});

//CHECK Gmail EXISTS
router.get("/checkGmail/:gmail", async (req, res) => {
  const account = await Account.findOne({
    gmail: req.params.gmail,
  });
  if (account) return res.status(201).send("gmail already exists");
  else return res.status(200).send("OK");
});

//Register
router.post("/register", async (req, res) => {
  const newAccount = new Account({
    gmail: req.body.gmail,
    phone: req.body.phone,
    fullname: req.body.fullname,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORDSECURITY
    ).toString(),
    loginByGoogle: req.body?.loginByGoogle ? req.body.loginByGoogle : false,
    image: req.body?.image
      ? req.body.image
      : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif",
  });
  try {
    //checkmail
    const gmail = await Account.findOne({
      gmail: req.body.gmail,
    });

    if (gmail) return res.status(409).json("This gmail had been used");
    //save new account
    const savedAccount = await newAccount.save();
    // SIGN TOKEN
    const accessToken = jwt.sign(
      { id: savedAccount._id, isAdmin: savedAccount.isAdmin },
      process.env.JWTSECURITY,
      { expiresIn: "3d" }
    );
    // SEND RESPONSE
    const { password, ...accountData } = savedAccount._doc;
    return res.status(201).json({ accessToken, ...accountData });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const account = await Account.findOne({ gmail: req.body.gmail });
    if (!account) return res.status(401).json("Incorrect gmail");
    const hasedPassword = CryptoJS.AES.decrypt(
      account.password,
      process.env.PASSWORDSECURITY
    );
    const Originalpassword = hasedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;
    if (Originalpassword !== inputPassword)
      return res.status(401).json("Incorrect password");

    const accessToken = jwt.sign(
      {
        id: account._id,
        isAdmin: account.isAdmin,
      },
      process.env.JWTSECURITY,
      { expiresIn: "3d" }
    );
    const { password, ...accountData } = account._doc;

    res.status(200).json({ ...accountData, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
