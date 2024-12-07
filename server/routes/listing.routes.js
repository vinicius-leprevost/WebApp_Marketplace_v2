import express from 'express'
import listingCtrl from '../controllers/listing.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router();

router.route('/api/listings')
    .get(listingCtrl.list)
    .post(listingCtrl.create)
    .delete(listingCtrl.removeAll);

router.route('/api/listings/:listingId')
    .get(listingCtrl.read)
    .put(listingCtrl.update)
    .delete(listingCtrl.remove);

router.param('listingId', listingCtrl.listingByID);

export default router;