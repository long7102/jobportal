import jwt from 'jsonwebtoken';

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: "Người dùng chưa xác thực",
                success: false
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(400).json({
                message: "Token không hợp lệ",
                success: false,
            })
        }
        req.id = decode.userId;
        next()
    } catch (error) {
        throw new Error(error)
    }
}
export default isAuthenticated