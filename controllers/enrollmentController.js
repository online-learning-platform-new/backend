const Enrollment = require('../models/enrollment');
const Student = require('../models/student');
const Course = require('../models/course');
const { verifyToken } = require('../middleware/authMiddleware');
const { Op } = require('sequelize');
// Controller for Admin to Create an Enrollment
const createEnrollment = async (req, res) => {
    const { student_id, course_id } = req.body;

    try {
        // Validate student and courses
        const student = await Student.findByPk(student_id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const course = await Course.findByPk(course_id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        console.log('inside ');
        

        // const courses = await Course.findAll({ where: { id: courseIds } });
        // if (courses.length !== courseIds.length) {
        //     return res.status(404).json({ message: 'One or more courses not found' });
        // }

        // Create enrollment
        const enrollments = await Enrollment.create({ student_id, course_id });
        // const enrollments = await Promise.all(courseIds.map(async (course_id) => {
        //     return Enrollment.create({ student_id, course_id });
        // }));

        res.status(201).json({
            message: 'Enrollments created successfully',
            enrollments,
        });
    } catch (error) {
        console.error('Error creating enrollment:', error); // Log the error details
        res.status(500).json({ message: 'Server error', error: error.message || error });
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
    const { student_id, course_id } = req.body;

    try {
        // Fetch the enrollment by ID
        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Optionally update the enrollment details
        await enrollment.update({ student_id, course_id });

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
    const student_id = req.user.id; 
    const { courseIds } = req.body;

    try {
        // Validate courses
        const courses = await Course.findAll({ where: { id: courseIds } });
        if (courses.length !== courseIds.length) {
            return res.status(404).json({ message: 'One or more courses not found' });
        }

        // Create enrollments
        const enrollments = await Promise.all(courseIds.map(async (course_id) => {
            return Enrollment.create({ student_id, course_id });
        }));

        res.status(201).json({
            message: 'Enrollment in courses successful',
            enrollments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


const getEnrollmentsByStudentId = async (req, res) => {
    const { student_id } = req.params;

    try {
        // Fetch all enrollments by student_id and include course details
        const enrollments = await Enrollment.findAll({
            where: { student_id },
            include: [{
                model: Course, // Join with the Course model
                as: 'course', // Alias for the included model
                attributes: ['id', 'title', 'description', 'start_date', 'end_date'], // Specify the attributes you want from the course table
            }]
        });

        if (enrollments.length === 0) {
            return res.status(404).json({ message: 'No enrollments found for this student' });
        }

        res.status(200).json({
            message: 'Enrollments retrieved successfully',
            enrollments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};


const getNonEnrollmentsByStudentId = async (req, res) => {
    const { student_id } = req.params;

    try {
        // Fetch the course IDs that the student is already enrolled in
        const enrolledCourses = await Enrollment.findAll({
            where: { student_id },
            attributes: ['course_id'],
        });

        // Extract course IDs into an array
        const enrolledCourseIds = enrolledCourses.map(enrollment => enrollment.course_id);

        // Fetch courses where the id is not in the list of enrolled course IDs
        const unenrolledCourses = await Course.findAll({
            where: {
                id: {
                    [Sequelize.Op.notIn]: enrolledCourseIds, // Sequelize operator for "NOT IN"
                },
            },
            attributes: ['id', 'title', 'description', 'start_date', 'end_date'], // Specify the attributes you want to retrieve
        });

        if (unenrolledCourses.length === 0) {
            return res.status(404).json({ message: 'No unenrolled courses found for this student' });
        }

        res.status(200).json({
            message: 'Unenrolled courses retrieved successfully',
            courses: unenrolledCourses,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message || error });
    }
};



module.exports = {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
    deleteEnrollment,
    enrollInCourses,
    getEnrollmentsByStudentId,
    getNonEnrollmentsByStudentId,
};
