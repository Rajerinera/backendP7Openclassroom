const {getUsersById, getUsers, updateUser, deleteUser} = require ("../controllers/user");
const express = require("express");
const router = express.Router(); 
const {checkToken} = require("../middleware/checkToken")

router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUsersById);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
 
module.exports = router;