const express = require( "express" )

const router = express.Router()

const { verifyToken } = require( "../controller/usercontroller" )
const { createReview, getallreview, deletereview, getreviewbyid, editreview } = require( "../controller/reviewcontroller" )

router.get( "/:id", getreviewbyid )
router.get( "/", getallreview )
router.post( "/:id", verifyToken, createReview )
router.delete( "/:id", deletereview )
router.patch( "/:id", editreview )

module.exports = router