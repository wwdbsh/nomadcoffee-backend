import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories, processPhotos } from "../coffeeShop.utils";

export default {
    Mutation:{
        editCoffeeShop: protectedResolver(async (
            _,
            { id, name, latitude, longitude, categories, photos },
            { loggedInUser }
        ) => {
            try{
                const oldShop = await client.coffeeShop.findFirst({
                    where:{
                        id,
                        userId:loggedInUser.id
                    },
                    include:{
                        categories:{
                            select:{
                                name:true,
                            }
                        },
                        photos:{
                            select:{
                                id:true,
                            }
                        }
                    }
                });
                if(!oldShop){
                    throw new Error("Coffee shop not found.");
                }
                const shop = await client.coffeeShop.update({
                    where:{
                        id
                    },
                    data:{
                        ...(name && { name }),
                        ...(latitude && { latitude }),
                        ...(longitude && { longitude }),
                        ...(categories && { categories:{
                            disconnect:oldShop.categories,
                            connectOrCreate:processCategories(categories)
                        }}),
                        ...(photos && { photos:{
                            disconnect:oldShop.photos,
                            connectOrCreate:processPhotos(photos)
                        }}),
                    },
                });
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
