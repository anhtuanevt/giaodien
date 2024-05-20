const { body, param } = require('express-validator');

module.exports = {

    categoryValidationRules: [
        param('id').isMongoId().withMessage('Invalid ID format'),
        body('name').optional().isString().trim().notEmpty().withMessage('Name must be a non-empty string'),
        body('ordering').optional().isInt().withMessage('Ordering must be an integer'),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either "active" or "inactive"')
    ]

}
