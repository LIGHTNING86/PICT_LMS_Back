const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.post('/', facultyController.createFaculty);
router.get('/', facultyController.getFaculties);
router.get('/:facultyID', facultyController.getFacultyById);
router.put('/:facultyID', facultyController.updateFaculty);
router.delete('/:facultyID', facultyController.deleteFaculty);

module.exports = router;
