import client from "../client";

export default {
    CoffeeShop:{
        user:({ userId }) => client.user.findUnique({ where: { id:userId }}),
        photos:({ id }) => client.coffeeShopPhoto.findMany({
            where:{
                shopId:id
            }
        }),
        categories:({ id }) => client.category.findMany({
            where:{
                shops:{
                    some:{
                        id
                    }
                }
            }
        }),
    },
    Category:{
        shops: ({ id }, { page }) => client.coffeeShop.findMany({
            where:{
                categories:{
                    some:{
                        id
                    }
                }
            },
            take:5,
            skip:(page-1)*5
        }),
        totalShops: ({ id }) => client.coffeeShop.count({
            where:{
                categories:{
                    some:{
                        id
                    }
                }
            }
        }),
    },
    CoffeeShopPhoto:{
        likes: ({ id }) => client.like.count({ where:{ photoId:id } })
    }
};