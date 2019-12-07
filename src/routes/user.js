const express =require('express');
const router = express.Router();
const userCon=require('../controllers/userCotroller')

router.post('/',userCon.createUser);
router.post('/login',userCon.userLogin);
router.get('/',userCon.getAllUser);
router.put('/update/:id',userCon.updateUser);
router.get('/getUserById/:id',userCon.getUserById);
router.delete('/delete/:id',userCon.deleteUserById);

router.post('/register',userCon.registerStudent);

module.exports = router;