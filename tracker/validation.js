const Joi = require('joi');

function validateEvent(req, res, next) {
    const schema = Joi.array().items({
        event: Joi.string().required(),
        tags: Joi.array(),
        url: Joi.string().required(),
        title: Joi.string().required(),
        ts: Joi.string().required(),
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        console.log(error)
        res.status(400).send({ status: 'invalid data' })
    } else {
        req.body = value;
        next();
    }
}

module.exports = validateEvent
