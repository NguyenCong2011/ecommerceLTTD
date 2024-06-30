const multer = require('multer');
const path=require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if(file.mimetype==="image/pdf"||file.mimetype==="image/jpeg"||file.mimetype==="image/png"){
            cb(null, path.join(__dirname, 'uploads'));
        }
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

module.exports = upload;
