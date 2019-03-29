const { Router } = require('express');
const StudentController = require('../controllers/studentController.js');

const routes = Router();

routes.get('/', StudentController.getAllStudents);
routes.get('/:id', StudentController.getSingleStudent);

module.exports = routes;