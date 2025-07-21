const { body, validationResult } = require("express-validator");

const validateRegister = [
    body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),

    body('email')
    .trim()
    .isEmail().withMessage("Email is Invalid")
    .normalizeEmail(),

    body('password')
    .isLength({ min:6  }).withMessage('Password must be at least 6 characters'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
]

module.exports = validateRegister;