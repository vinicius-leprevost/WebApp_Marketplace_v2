<<<<<<< Updated upstream
import express from 'express'
import listingCtrl from '../controllers/listing.controller.js'
import authCtrl from '../controllers/auth.controller.js'
=======
import express from 'express';
import multer from 'multer';
import listingCtrl from '../controllers/listing.controller.js';
>>>>>>> Stashed changes

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// Routes
router.route('/api/listings')
    .get(listingCtrl.list)
    .post(upload.single('image'), listingCtrl.create) // Handle image uploads
    .delete(listingCtrl.removeAll);

router.route('/api/listings/:listingId')
    .get(listingCtrl.read)
    .put(listingCtrl.update)
    .delete(listingCtrl.remove);

router.param('listingId', listingCtrl.listingByID);

export default router;
