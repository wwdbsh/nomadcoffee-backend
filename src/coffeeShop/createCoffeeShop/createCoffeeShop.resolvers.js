import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processCategories, processPhotos } from "../coffeeShop.utils";

export default {
    Mutation:{
        createCoffeeShop:protectedResolver(async (
                _,
                { coffeeShopName, latitude, longitude, categories, photos},
                { loggedInUser }
            ) => {
                try{
                    const shop = await client.coffeeShop.create({
                        data:{
                            name:coffeeShopName,
                            user:{
                                connect:{
                                    id:loggedInUser.id
                                }
                            },
                            ...(latitude && { latitude }),
                            ...(longitude && { longitude }),
                            ...(categories && {
                                categories:{
                                    connectOrCreate:processCategories(categories)
                                }
                            }),
                            ...(photos && {
                                photos:{
                                    connectOrCreate:processPhotos(photos)
                                }
                            })
                        },
                    });
                    return {
                        ok:true,
                        shop
                    };
                }catch(e){
                    return {
                        ok:false,
                        error:e.message
                    };
                }
            }
        )
    }
}
