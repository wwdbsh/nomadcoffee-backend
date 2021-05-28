import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
    try{
        if(!token){
            return null;
        }
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({where:{id}});
        return user ? user : null;
    }catch{
        return null;
    }
};

export function protectedResolver(ourResolver){
    return function (root, args, context, info){
        if(!context.loggedInUser){
            return {
                ok:false,
                error:"Please log in to perform this action."
            };
        }
        return ourResolver(root, args, context, info);
    };
}