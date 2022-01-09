const express = require("express");
const router = express.Router();
const { Coupons } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupons:
 *       type: object
 *       required:
 *         - title
 *         - summary
 *         - couponText
 *         - imageUrl
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the coupon
 *         title:
 *           type: string
 *           description: The coupon title
 *         summary:
 *           type: string
 *           description: The summary of coupon
 *         couponText:
 *           type: string
 *           description: The entire details of coupon
 *         imageUrl:
 *           type: string
 *           description: The location of image
 *       example:
 *         id: 1
 *         title: Trivago 10% off
 *         summary: It is a lorem ipsum...
 *         couponText: Lorem ipsum...
 *         imageUrl: https://image.com
 */

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: The Coupons managing API
 */

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Returns the list of all the coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: The list of the coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupons'
 */

router.get("/", validateToken, async (req, res) => {
  const listOfCoupons = await Coupons.findAll();
  res.json({ listOfCoupons: listOfCoupons });
});


/**
 * @swagger
 * /coupons/byId/{id}:
 *   get:
 *     summary: Get the coupon by id
 *     tags: [Coupons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coupon id
 *     responses:
 *       200:
 *         description: The Coupon description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupons'
 */

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const coupon = await Coupons.findByPk(id);
  console.log({ coupon })
  res.json(coupon);
});


module.exports = router;
