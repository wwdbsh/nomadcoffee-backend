import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation:{
        toggleLike:protectedResolver(async (_, { id }, { loggedInUser }) => {
            try{
                const photo = await client.coffeeShopPhoto.findUnique({
                    where:{
                        id,
                    },
                });
                if(!photo){
                    throw new Error("Photo not found");
                }
                const likeWhere = {
                    photoId_userId:{
                        userId:loggedInUser.id,
                        photoId:id
                    }
                };
                const like = await client.like.findUnique({
                    where:likeWhere
                });
                if(like){
                    await client.like.delete({
                        where:likeWhere
                    });
                }else{
                    await client.like.create({
                        data:{
                            user:{
                                connect:{
                                    id:loggedInUser.id
                                }
                            },
                            photo:{
                                connect:{
                                    id:photo.id
                                }
                            }
                        },
                    })
                }
                return {
                    ok:true
                };
            }catch(e){
                return {
                    ok:false,
                    error:e.message
                };
            }
        }),
    }
};
