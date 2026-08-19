const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    },
    // ADDED: only accept PDF files, since the backend can only parse PDFs right now
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are supported for resume upload."))
        }
        cb(null, true)
    }
})

module.exports = upload