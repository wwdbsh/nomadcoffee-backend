import client from "../../client";

export default {
    Query:{
        seeCategory: (_, { slug, page }) => client.coffeeShop.findMany({
            where:{
                categories:{
                    some:{
                        slug
                    }
                }
            },
            take:5,
            skip:(page-1)*5
        }),
    }
};