// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'An unexpected error occurred',
    });
};

const notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Resource Not Found',
    });
};

module.exports = {
    errorHandler,
    notFound,
};
