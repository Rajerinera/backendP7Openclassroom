const {getUsersById, getUsers, updateUser, deleteUser} = require ("../controllers/user");
const express = require("express");
const router = express.Router(); 
const auth = require("../middleware/auth")

router.get("/users", getUsers);
router.get("/:id", getUsersById);
router.patch("/:id",auth, updateUser);
router.delete("/:id", deleteUser);
 
module.exports = router; 