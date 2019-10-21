import multer from 'multer'

export const avatar = multer({
  limits: {
    fileSize: 1000000,
    files: 1
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(Error('Unsupported file type. Allowed file extensions are jpg, jpeg and png.'), false)
    }

    cb(null, true)
  }
})