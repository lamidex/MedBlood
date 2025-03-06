const express = require('express');
const { isAuthenticated } = require("../middleware/isAuthenticated.js");
const { donateBlood, getAll, updateBlood, deleteBlood } = require('../controllers/blood.controller.js');
const router = express.Router();

router.post('/saveBloodsamples',isAuthenticated, donateBlood);
router.get('/getAllApplications',isAuthenticated, getAll);
router.put('/updateApplicationForm/:id',isAuthenticated, updateBlood);
router.delete('/deleteApplication/:id',isAuthenticated, deleteBlood);

module.exports = router;