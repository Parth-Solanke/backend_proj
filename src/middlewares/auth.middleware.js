// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js"

// export const verifyJWT = asyncHandler(async(req,res,next) => {
//     try{
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

//         console.log("Token:", token);
//         console.log("Secret exists:", !!process.env.ACCESS_TOKEN_SECRET);

//         if(!token){
//             throw new ApiError(401,"Unauthorized request")
//         }

//         const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//         //console.log(process.env.ACCESS_TOKEN_SECRET);
        

//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

//         if(!user){
//             throw new ApiError(401,"Invalid Access Token")
//         }
//         req.user = user;
//         next()
//     }
//     catch(error)
//     {
//         throw new ApiError(401,error?.message || "invalid access token")
//     }
// })




import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token safely from cookies or Authorization header (handles case-insensitive 'Bearer ' and spaces)
        const token = 
            req.cookies?.accessToken || 
            req.header("Authorization")?.replace(/^Bearer\s+/i, "").trim();

        if (!token) {
            throw new ApiError(401, "Unauthorized request: Token is missing");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Retrieve user from DB (excluding sensitive fields)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token: User not found");
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        // If error is already an ApiError, rethrow it directly; otherwise throw new ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});



