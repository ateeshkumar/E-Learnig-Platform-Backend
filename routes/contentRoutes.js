const express = require("express");
const {
  getSingleContent,
  getContent,
  getHtmlDescriptionDetalis,
  getJeeMain,
  getJeeMainSingle,
  getJeeMainDes,
  setContent,
  setDescription,
  setJeeMainDes,
  setJeeMain,
  setSubscribe,
  setJavaScript,
  setJavaScriptContent,
  getJavaScriptTitle,
  getJavaScriptSingleTitle,
  getJavaScriptContent,
} = require("../controller/contentController");

const route = express.Router();

const path = require('path');
const multer = require('multer');
const { requestSignIn, adminAccess } = require("../middleware/authMiddleware");

route.get("/get-html", getContent);
route.get("/get-html/:id", getSingleContent);
route.post("/create-content",requestSignIn,adminAccess, setContent);
route.post("/create-description",requestSignIn,adminAccess, setDescription);
route.get('/get-detail-html/:id',getHtmlDescriptionDetalis);
route.post('/jeemain',requestSignIn,adminAccess,setJeeMain);
route.post('/jeemaindes',requestSignIn,adminAccess,setJeeMainDes);
route.get('/get-jeemain',getJeeMain);
route.get('/get-jeemain/:id',getJeeMainSingle);
route.get('/get-detail-jeemain/:id',getJeeMainDes);
route.post('/subscribe',setSubscribe);

//javaScript
route.post('/create-javascript-title',requestSignIn,adminAccess,setJavaScript);
route.post('/create-javascript-content',requestSignIn,adminAccess,setJavaScriptContent);
route.get('/get-jevascript-title',getJavaScriptTitle);
route.get('/get-jevascript-title/:slug',getJavaScriptSingleTitle);
route.get('/get-javascript-content/:slug',getJavaScriptContent);
module.exports = route;
