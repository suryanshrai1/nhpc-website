const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "NHPC CMS API is running."
  });
});

module.exports = app;