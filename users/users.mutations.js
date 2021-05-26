import bcrypt from "bcrypt";
import client from "../client";

export default{
    Mutation:{
        createAccount: async (_, {
            username,
            email,
            name,
            location,
            password,
            avatarURL,
            githubUsername
        }) => {
            try{
                // check if username or email are already on DB
                const existingUser = await client.user.findFirst({
                    where:{
                        OR:[
                            {
                                username
                            },
                            {
                                email
                            }
                        ]
                    }
                });
                if(existingUser){
                    throw new Error("This username/email is already taken.");
                }
                // hash password
                const uglyPassword = await bcrypt.hash(password, 10) ;
                // save and return the user
                await client.user.create({
                    data:{
                        username,
                        email,
                        name,
                        location,
                        avatarURL,
                        githubUsername,
                        password:uglyPassword,
                    }
                });
                return {
                    ok:true,
                };
            }catch(e){
                return {
                    ok:false,
                    error:e.message
                };
            }
        },
    }
}