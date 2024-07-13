const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);
router.get('/:registrationNo', studentController.getStudentById);
router.put('/:registrationNo', studentController.updateStudent);
router.delete('/:registrationNo', studentController.deleteStudent);

module.exports = router;
