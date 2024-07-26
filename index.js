const express =  require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require("path")
const { route } = require('./server')
const multer = require("multer")


const MAX_NUMBER_OF_FILES = 100;
const ACCEPTED_FILE_TYPES = /jpeg|jpg|png|gif/;
const MAX_FILES_SIZE = 1000000000; //1000MB limit file sze



// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',  // Set the destination for uploaded files
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  });

  // Initialize upload variable with storage settings
const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILES_SIZE },  // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
      // Check file type
      const extname = ACCEPTED_FILE_TYPES.test(path.extname(file.originalname).toLowerCase());
      const mimetype = ACCEPTED_FILE_TYPES.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    }
  }).array('files', MAX_NUMBER_OF_FILES);  // .array() method allows for multiple file uploads
  



dotenv.config();
const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use(cors());

var appName = "DESKTOP APP TEMPLATE"


const api = require(path.join(__dirname, "/server"))
app.use('/api', api)

 app.use("/", express.static(path.join(__dirname, "/frontend")))
app.use("/home", express.static(path.join(__dirname, "/frontend/index.html")))
app.use("/settings", express.static(path.join(__dirname, "/frontend/settings.html")))
app.use("/contact", express.static(path.join(__dirname, "/frontend/contact.html")))
app.use("/image-upload", express.static(path.join(__dirname, "/frontend/imageUpload.html")))

app.use("*", express.static(path.join(__dirname, "/frontend/404.html")))



app.get('/', (req, res) => {
    res.status(200).json({ message: "WELCOME TO ..."+appName })
})



app.post('/upload',(req,res)=>{

    upload(req, res, (err) => {
        if (err) {
          res.status(400).send(err);
        } else {
          if (req.files.length === 0) {
            res.status(400).send('No files were uploaded.');
          } else {
            res.send('Files uploaded successfully!');
          }
        }
      });

})


const PORT = process.env.PORT || 6001;

app.listen(PORT, (error) => {
    if(error){
        res.status(200).json({ message: "Error occured, error is:"+appName })
        console.log(`Error occured, error is: ${PORT}`);

    }
    console.log(`app runnning on port ${PORT}`);
})