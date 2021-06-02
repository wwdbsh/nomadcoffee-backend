import { gql } from "apollo-server-core";

export default gql`
    type CoffeeShop{
        id:Int!
        name:String!
        latitude:String
        longitude:String
        user:User!
        photos:[CoffeeShopPhoto]
        categories:[Category]
        createdAt:String!
        updatedAt:String!
    }
    type Category{
        id:Int!
        name:String!
        slug:String
        shops(page:Int!):[CoffeeShop]
        totalShops:Int
        createdAt:String!
        updatedAt:String!
    }
    type CoffeeShopPhoto{
        id:Int!
        url:String!
        shop:CoffeeShop!
        likes:Int!
        createdAt:String!
        updatedAt:String!
    }
    type Like{
        id:Int!
        photo:CoffeeShopPhoto!
        createdAt:String!
        updatedAt:String!
    }
`;
