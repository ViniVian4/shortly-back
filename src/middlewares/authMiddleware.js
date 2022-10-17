import { authSchema } from "../schemas/authSchema.js"

async function verifyRegister (req, res, next) {
    let { name, email, password, confirmPassword } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    const isValid = authSchema.validate({ name, email, password });
    if (isValid.error) {
        return res.sendStatus(422);
    }

    if (password !== confirmPassword || name.length == 0 || email.length == 0
        || password.length == 0) {
        return res.sendStatus(422)
    }

    res.locals.body = { name, email, password };

    next();
}

export default verifyRegister;