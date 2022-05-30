const router = require('express').Router();
const {
    getUserByUsername,
    getAllUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

//Set up GET all and PST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

//Set up GET one, PUT, and DELETE at /api/users/username
router
    .route('/:id')
    .get(getUserByUsername)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;