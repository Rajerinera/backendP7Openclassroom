const {getUsersById, getUsers, updateUser, deleteUser} = require ("../controllers/user");
const express = require("express");
const router = express.Router(); 
const auth = require("../middleware/auth")

router.get("/users",auth, getUsers);
router.get("/:id",auth, getUsersById);
router.patch("/:id",auth, updateUser);
router.delete("/:id",auth, deleteUser);
 
module.exports = router; 