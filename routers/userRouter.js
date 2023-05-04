const router=require('express').Router();
const requireUser = require('../middlewares/requireUser')
const userController=require('../controller/userController')

router.post("/follow",requireUser,userController.followOrUnfollowUserController);
router.get("/getfeedData",requireUser,userController.getPostOfFollowing);
router.get("/getMyPosts",requireUser,userController.getMyPosts);
router.get("/getUserPost",requireUser,userController.getUserPosts);
router.get('/getMyInfo',requireUser,userController.getMyInfo);
router.delete("/",requireUser,userController.deleteMyProfile);
router.put('/',requireUser,userController.updateUserProfile);
router.post('/getUserProfile',requireUser,userController.getUserProfile);
module.exports=router;