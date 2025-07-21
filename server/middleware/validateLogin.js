const { body, validationResult } = require("express-validator");

const validateLogin = [

    body('email')
    .trim()
    .isEmail().withMessage("Email is Required")
    .normalizeEmail(),

    body('password')
    .notEmpty().withMessage("Password is Required"),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next()
    }
]

module.exports = validateLogin;