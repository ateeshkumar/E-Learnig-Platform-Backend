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
} = require("../controller/contentController");

const route = express.Router();

const path = require('path');
const multer = require('multer');

const storage  = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(`./public/uplode`));

    },
    filename:function(req,file,cb){
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null,filename);
    },
});
const upload = multer({ storage: storage });

route.get("/get-html", getContent);
route.get("/get-html/:id", getSingleContent);
route.post("/create-content", setContent);
route.post("/create-description", setDescription);
route.get('/get-detail-html/:id',getHtmlDescriptionDetalis);
route.post('/jeemain',setJeeMain);
route.post('/jeemaindes',setJeeMainDes);
route.get('/get-jeemain',getJeeMain);
route.get('/get-jeemain/:id',getJeeMainSingle);
route.get('/get-detail-jeemain/:id',getJeeMainDes);
route.post('/subscribe',setSubscribe);

module.exports = route;
