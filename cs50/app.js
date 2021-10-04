const express = require("express");
const upload = require("express-fileupload");
const app = express();
const calmFolder = "./video/calm";
const motivateFolder = "./video/motivate";
const fs = require("fs");
var check = false;
const contactText = JSON.parse(
  fs.readFileSync(`${__dirname}/contactus-txt/text.json`)
);
const Calmquote = JSON.parse(
  fs.readFileSync(`${__dirname}/quote/calm-quote.json`)
);
const Motivatequote = JSON.parse(
  fs.readFileSync(`${__dirname}/quote/motivate-quote.json`)
);
const Tipquote = JSON.parse(
  fs.readFileSync(`${__dirname}/quote/tip-quote.json`)
);
const videoCalm = JSON.parse(
  fs.readFileSync(`${__dirname}/link/calm-link.json`)
);
const videoMotivate = JSON.parse(
  fs.readFileSync(`${__dirname}/link/calm-link.json`)
);
app.use(express.json());
app.use(express.static(__dirname));

app.use(upload());

app.get("/mood", (req, res) => {
  res.sendFile(__dirname + "/money.html");
});

app.get("/admin", (req, res) => {
  check = true;
  res.sendFile(__dirname + "/admin/upload.html");
});
app.post("/admin", (req, res) => {
  if (req.files.calm) {
    var file = req.files.calm;
    var fileName = file.name;
    console.log(fileName);
    file.mv("./video/calm/" + fileName, (err) => {
      if (err) {
        res.send(err);
      } else {
        const newVideo = "video/calm/" + fileName;
        videoCalm.push(newVideo);
        fs.writeFile(
          `${__dirname}/link/calm-link.json`,
          JSON.stringify(videoCalm),
          (err) => {
            res.status(201).json({
              status: "success",
              data: {
                video: newVideo,
              },
            });
          }
        );
        //res.send("File Uploaded");
      }
    });
  } else if (req.files.motivate) {
    var file = req.files.motivate;
    var fileName = file.name;
    file.mv("./video/motivate/" + fileName, (err) => {
      if (err) {
        res.send(err);
      } else {
        const newVideo = "video/motivate/" + fileName;
        videoMotivate.push(newVideo);
        console.log(req.body);
        fs.writeFile(
          `${__dirname}/link/motivate-link.json`,
          JSON.stringify(videoMotivate),
          (err) => {
            res.status(201).json({
              status: "success",
              data: {
                video: newVideo,
              },
            });
          }
        );
        // res.send("File Uploaded");
      }
    });
  }
});
app.post("/contactus", (req, res) => {
  const newContact =
    "text: " +
    req.body.contactustext +
    " | email: " +
    req.body.email +
    " | number: " +
    req.body.phone;
  contactText.push(newContact);
  console.log(newContact);
  fs.writeFile(
    `${__dirname}/contactus-txt/text.json`,
    JSON.stringify(contactText),
    (err) => {
      res.sendFile(__dirname + "/contact-us/contactus.html");
    }
  );
});

app.get("/contactlist", (req, res) => {
  var list = "";
  contactText.forEach((file) => {
    list += file + "<br></br>";
  });
  if (check == true) {
    check = false;
    res.send(list);
  } else {
    res.sendFile(__dirname + "/404/index.html", 404);
  }
});

app.get("/calmlist", (req, res) => {
  var folder = "";
  fs.readdir(calmFolder, (err, files) => {
    files.forEach((file) => {
      folder += file + "<br></br>";
    });
    res.send(folder);
  });
});
app.get("/motivatelist", (req, res) => {
  var folder = "";
  fs.readdir(motivateFolder, (err, files) => {
    files.forEach((file) => {
      folder += file + "<br></br>";
    });
    res.send(folder);
  });
});
app.post("/calmquote", (req, res) => {
  const newQuote = req.body.calmsjon;
  Calmquote.push(newQuote);
  console.log(newQuote);
  fs.writeFile(
    `${__dirname}/quote/calm-quote.json`,
    JSON.stringify(Calmquote),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          quote: newQuote,
        },
      });
    }
  );
});
app.post("/motivatequote", (req, res) => {
  const newQuote = req.body.motivatejson;
  Motivatequote.push(newQuote);
  console.log(newQuote);
  fs.writeFile(
    `${__dirname}/quote/motivate-quote.json`,
    JSON.stringify(Motivatequote),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          quote: newQuote,
        },
      });
    }
  );
});
app.post("/calmLink", (req, res) => {
  const newVideo = req.body.linkcalm;
  videoCalm.push(newVideo);
  console.log(req.body.linkcalm);
  fs.writeFile(
    `${__dirname}/link/calm-link.json`,
    JSON.stringify(videoCalm),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          video: newVideo,
        },
      });
    }
  );
});
app.post("/motivateLink", (req, res) => {
  const newVideo = req.body.linkmotivate;
  videoMotivate.push(newVideo);
  console.log(req.body.linkmotivate);
  fs.writeFile(
    `${__dirname}/link/motivate-link.json`,
    JSON.stringify(videoMotivate),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          video: newVideo,
        },
      });
    }
  );
});
app.post("/dailytip", (req, res) => {
  const newQuote = req.body.tip;
  Tipquote.push(newQuote);
  console.log(newQuote);
  fs.writeFile(
    `${__dirname}/quote/tip-quote.json`,
    JSON.stringify(Tipquote),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          quote: newQuote,
        },
      });
    }
  );
});
app.get("/metamask", (req, res) => {
  res.sendFile(__dirname + "/404/metamask.html");
});
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/404/index.html", 404);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port 5000`);
});

///////////////////////////////////////////////////////
