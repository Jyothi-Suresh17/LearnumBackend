//path

const express = require('express');

//import controller
const userController =require('./controller/userController')

//course controller
const courseController = require('./controller/courseController');
const multerConfig = require('./middleware/multerMiddleware');
const multer = require('multer');

const router = new express.Router();

//setup path for each request from the view(frontend)

//registr
router.post('/register',userController.registerController)

//login

router.post('/login',userController.loginController);

//add course
router.post('/addCourse',multerConfig.single('thumbnail'), courseController.addCourseController);

//all courses

router.get('/allCourses',courseController.getallCoursesController)

//for home
router.get('/homeCourses',courseController.homeCourseController)

//for all users
router.get('/allUsers',userController.getallUsersController)

//for deleting courses

router.delete('/deleteCourse/:courseId',courseController.deleteCourseController);

//for deleting user

router.delete('/deleteUser/:userId',userController.deleteUserController);

//for editing
router.put('/editCourse/:courseId',multerConfig.single('thumbnail'),courseController.editCourseController)

module.exports=router