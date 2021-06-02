import { gql } from "apollo-server-core";

export default gql`
    type editCoffeeShopResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        editCoffeeShop(
            id:Int!,
            name:String
            latitude:String
            longitude:String
            categories:[String],
            photos:[String]
        ):editCoffeeShopResult!
    }
`;