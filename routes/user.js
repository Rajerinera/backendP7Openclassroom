const {getUsersById, getUsers, updateUser, deleteUser} = require ("../controllers/user");
const express = require("express");
const router = express.Router(); 

router.get("/users", getUsers);
router.get("/:id", getUsersById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
 
module.exports = router; 