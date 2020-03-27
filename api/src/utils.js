import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
    // Let's pass back the decoded token to the request object
    req.decoded = getLoggedUser(req, res);
    // We call next to pass execution to the subsequent middleware
    next();
}

export const getLoggedUser = (req, res) => {
    const authorizationHeaader = req.headers.authorization
    let result
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        const options = {
            expiresIn: "2d",
            issuer: "http://abes-app.org.br",
        }
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.JWT_SECRET, options)
        } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            throw new Error(err);
        } finally {
            return result
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401,
        };
        res.status(401).send(result);
    }
}
