const express = require("express");
const router = express.Router();
const { Offers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Offers:
 *       type: object
 *       required:
 *         - couponid
 *         - username
 *       properties:
 *         couponid:
 *           type: number
 *           description: The id of the coupon
 *         username:
 *           type: string
 *           description: Username of customer who claimed offer
 *       example:
 *         couponid: 1
 *         username: Harshit
 */

/**
 * @swagger
 * tags:
 *   name: Offers
 *   description: The Offers managing API
 */

/**
 * @swagger
 * /offer:
 *   post:
 *     summary: stores the information of user who claimed the offer
 *     tags: [Offers]
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Offers'
 *     responses:
 *       200:
 *         description: The offer claimed successfully
 *       400:
 *          description: Offer already claimed by the user          
 */

router.post("/", validateToken, async (req, res) => {
  try {
    const offer = req.body;
    offer.couponid = req.body.id;
    offer.username = req.body.username;
    await Offers.create(offer);
    res.json(offer);
  }
  catch (error) {
    console.log(error.message, 'love car');
    res.status(400).send('User had already claimed offer.Try another offer.');
  }
});


module.exports = router;
