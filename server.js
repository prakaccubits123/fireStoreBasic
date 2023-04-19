const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});