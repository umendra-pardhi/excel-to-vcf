const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {

      const filename = file.originalname;
      const extension = filename.split('.').pop();

      cb(null, "contacts."+extension)
    }
  })
  
  const dest = multer({ storage })

  module.exports=dest;