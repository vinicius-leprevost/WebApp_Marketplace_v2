import Listing from '../models/user.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
    const listing = new Listing(req.body);
    try {
        await listing.save();
        return res.status(200).json({
            message: "Successfully created listing",
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const list = async (req, res) => {
    try {
        let listings = await Listing.find().select('title description price category images location condition status postedBy created updated');
        res.json(listings);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const listingByID = async (req, res, next, id) => {
    try {
        let listing = await Listing.findById(id);
        if (!listing)
            return res.status(400).json({
                error: "Listing not found",
            });
        req.profile = listing;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve listing",
        });
    }
};

const update = async (req, res) => {
    try {
        let listing = req.profile;
        listing = extend(listing, req.body);
        listing.updated = Date.now();
        await listing.save();
        res.json(listing);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const remove = async (req, res) => {
    try {
        let listing = req.profile;
        let deletedListing = await listing.remove();
        res.json(deletedListing);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export default { create, listingByID, list, update, remove };