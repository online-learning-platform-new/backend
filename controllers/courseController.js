const Course = require('../models/course');
const { verifyToken } = require('../middleware/authMiddleware');

// Controller to Create a Course
const createCourse = async (req, res) => {
    const { title, description, start_date, end_date } = req.body;

    try {
        // Create a new course
        const newCourse = await Course.create({
            title,
            description,
            start_date,
            end_date,
        });

        res.status(201).json({
            message: 'Course created successfully',
            course: newCourse,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to View All Courses
const getAllCourses = async (req, res) => {
    try {
        // Fetch all courses
        const courses = await Course.findAll();

        res.status(200).json({
            message: 'Courses retrieved successfully',
            courses,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to View a Single Course
const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the course by ID
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({
            message: 'Course retrieved successfully',
            course,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to Update a Course
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, start_date, end_date } = req.body;

    try {
        // Fetch the course by ID
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Update course details
        await course.update({
            title,
            description,
            start_date,
            end_date,
        });

        res.status(200).json({
            message: 'Course updated successfully',
            course,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to Remove a Course
const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the course by ID
        const course = await Course.findByPk(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Delete the course
        await course.destroy();

        res.status(200).json({
            message: 'Course removed successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};
