const express = require("express");
const app = express();
const cors = require("cors");

const swaggerjsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'Coupons API',
      description: 'Coupons API information',
      contact: {
        name: 'Harshit'
      },
      servers: ['http://localhost:3001']
    }
  },

  apis: ['./routes/*']
};

const swaggerDocs = swaggerjsDoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));





app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const couponRouter = require("./routes/Coupons");
app.use("/coupons", couponRouter);
const offerRouter = require("./routes/Offers");
app.use("/offer", offerRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
