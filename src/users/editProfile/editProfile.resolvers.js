import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
    _,
    {username, email, password:newPassword, name, location, githubUsername, avatarURL },
    { loggedInUser }
) => {
    let avatarUrl = null;
    if(avatarURL){
        const { filename, createReadStream } = await avatarURL;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`;
    }
    let hashedPassword = null;
    if(newPassword){
        hashedPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where:{
            id:loggedInUser.id
        },
        data:{
            username,
            email,
            name,
            location,
            githubUsername,
            avatarURL,
            ...(hashedPassword && {password:hashedPassword}),
            ...(avatarUrl && { avatarURL:avatarUrl }),
        }
    });
    if(updatedUser.id){
        return {
            ok:true
        };
    }else{
        return {
            ok:false,
            error:"Could not update profile."
        };
    }
};

export default{
    Mutation:{
        editProfile:protectedResolver(resolverFn),
    }
};
