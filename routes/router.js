
const express = require("express");
const router = express.Router();
const knex = require("../db/connection");


router.get("/", (req, res) => {
  res.render("welcome");
});


const MAX_COOKIE_AGE = 1000 * 60 * 60 * 24 * 7;
router.post("/signin", (req, res) => {
  const params = req.body; // { username: 'username passed' }
  res.cookie("username", params.username, { maxAge: MAX_COOKIE_AGE });
  res.redirect("/");
});

router.post("/signout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});


router.get("/signin", (req, res) =>{
  res.render("signin")
});


router.get("/new", (req, res) =>{
  if(req.cookies.username){
    res.render("new");
  }
  else {
    res.redirect("/signin");
  }

});

router.post("/new", (req, res) => {
  const formData = req.body;
  const { content, imageUrl } = formData;
  console.log(content, imageUrl );
  if (req.cookies) {
  var username = req.cookies.username;
  }

  knex("clucks")
    .insert({
      imageUrl: imageUrl,
      content : content,
      username : username
    })

    .returning("*")
    .then(() => {
      res.redirect("/clucks");
    });
});


router.get("/clucks", (req, res) => {
  if(req.cookies.username){
    knex("clucks")
      .orderBy("created_at", "DESC")
      .then((clucks) => {
        console.log(clucks);
        res.render("index", { clucks });
      });
  }
  else {
    res.redirect("/signin");
  }

});


router.delete("/clucks/:id", (req, res) => {
  knex("clucks")
    .where("id", req.params.id)
    .del()
    .then(() => {
      res.redirect("/clucks");
    });
});







module.exports = router;
