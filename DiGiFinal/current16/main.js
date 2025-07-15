const express = require('express')
const multer  = require('multer')

const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const upload = multer({ storage: storage });


const app = express()

app.use(express.static('uploads'))

const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html')
})

app.post('/upload', upload.single('image'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log('req.file');
    console.log(req.file);
    console.log('req.body');
    console.log(req.body);
    res.status(200)
    res.send({filePath: req.file.path});
})

app.listen(3000, () => {
    console.log(`Example app listening on port ${port}`)
})
