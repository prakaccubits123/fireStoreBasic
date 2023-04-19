const express = require("express");
const router = express.Router();
const {
  createUserHandler,
  getUserByIdHandler,
  createSkill,
  getSkill
} = require("../controller/userController");

router.post("/", createUserHandler);
router.get("/:userId", getUserByIdHandler);
router.post("/post", createSkill);
router.get('/skill/:skillId', getSkill)


module.exports = router;
