import client from "../client";

export default {
    User:{
        totalFollowing:({ id }) => client.user.count({
            where:{
                followers:{
                    some:{
                        id
                    }
                }
            }
        }),
        totalFollowers:({ id }) => client.user.count({
            where:{
                following:{
                    some:{
                        id
                    }
                }
            }
        }),
        isMe:({ id }, _, { loggedInUser }) => {
            if(!loggedInUser){
                return false;
            }
            return id === loggedInUser.id;
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if(!loggedInUser){
                return false;
            }
            const exists = await client.user.count({
                where:{
                    username:loggedInUser.username,
                    following:{
                        some:{
                            id
                        }
                    }
                }
            });
            return Boolean(exists);
        },
        followers:({ id }, { page }) => client.user.findUnique({ where:{ id } }).followers({take:5,skip:(page-1)*5}),
        following:({ id }, { page }) => client.user.findUnique({ where:{ id } }).following({take:5,skip:(page-1)*5}),
        shops: ({ id }) => client.user.findUnique({ where:{ id } }).shops(),
    }
};
