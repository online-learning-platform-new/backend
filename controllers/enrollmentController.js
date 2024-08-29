const Enrollment = require('../models/enrollment');
const Student = require('../models/student');
const Course = require('../models/course');
const { verifyToken } = require('../middleware/authMiddleware');

// Controller for Admin to Create an Enrollment
const createEnrollment = async (req, res) => {
    const { studentId, courseIds } = req.body;

    try {
        // Validate student and courses
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const courses = await Course.findAll({ where: { id: courseIds } });
        if (courses.length !== courseIds.length) {
            return res.status(404).json({ message: 'One or more courses not found' });
        }

        // Create enrollments
        const enrollments = await Promise.all(courseIds.map(async (courseId) => {
            return Enrollment.create({ studentId, courseId });
        }));

        res.status(201).json({
            message: 'Enrollments created successfully',
            enrollments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller for Admin to View All Enrollments
const getAllEnrollments = async (req, res) => {
    try {
        // Fetch all enrollments
        const enrollments = await Enrollment.findAll();

        res.status(200).json({
            message: 'Enrollments retrieved successfully',
            enrollments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller for Admin to View an Enrollment by ID
const getEnrollmentById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the enrollment by ID
        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        res.status(200).json({
            message: 'Enrollment retrieved successfully',
            enrollment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller for Admin to Update an Enrollment
const updateEnrollment = async (req, res) => {
    const { id } = req.params;
    const { studentId, courseId } = req.body;

    try {
        // Fetch the enrollment by ID
        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Optionally update the enrollment details
        await enrollment.update({ studentId, courseId });

        res.status(200).json({
            message: 'Enrollment updated successfully',
            enrollment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller for Admin to Remove an Enrollment
const deleteEnrollment = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the enrollment by ID
        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Delete the enrollment
        await enrollment.destroy();

        res.status(200).json({
            message: 'Enrollment removed successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller for Students to Enroll in Courses
const enrollInCourses = async (req, res) => {
    const studentId = req.user.id; // Get student ID from JWT token
    const { courseIds } = req.body;

    try {
        // Validate courses
        const courses = await Course.findAll({ where: { id: courseIds } });
        if (courses.length !== courseIds.length) {
            return res.status(404).json({ message: 'One or more courses not found' });
        }

        // Create enrollments
        const enrollments = await Promise.all(courseIds.map(async (courseId) => {
            return Enrollment.create({ studentId, courseId });
        }));

        res.status(201).json({
            message: 'Enrollment in courses successful',
            enrollments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
    enrollInCourses,
};
