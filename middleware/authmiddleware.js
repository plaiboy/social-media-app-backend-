import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) =>{
    try {
        let token = req.header("Authorisation");

        if (!token){
            return res.status(403).send("Acces denied");
        }

        if (!token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trimleft();
        
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user =verified;
        next();
    } catch (error) {
        
    }
}