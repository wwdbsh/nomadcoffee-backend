import { gql } from "apollo-server-core";

export default gql`
    type createCoffeeShopResult{
        ok:Boolean!,
        error:String,
        shop:CoffeeShop
    }
    type Mutation{
        createCoffeeShop(
            coffeeShopName:String!,
            latitude:String,
            longitude:String,
            categories:[String],
            photos:[String]
        ):createCoffeeShopResult
    }
`;