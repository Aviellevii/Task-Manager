import { verify } from "jsonwebtoken";


export default (req: any, res: any, next: any) => {
    const token = req.headers.authorization as string;
    if(!token) {
        console.log("error 1");
        return res.status(401).send();
    }

    try {
        const decodedUser = verify(token, process.env.Secret_Key!);
        req.user = decodedUser;

    } catch (error) {
        console.log("error 2");
        res.status(401).send();
    }

    return next();
}