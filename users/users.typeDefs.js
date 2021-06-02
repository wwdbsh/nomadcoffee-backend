import { gql } from "apollo-server-core";

export default gql`
    type User{
        id:Int!
        username:String!
        email:String!
        name:String
        avatarURL:String
        shops:[CoffeeShop]
        location:String
        githubUsername:String
        createdAt:String!
        updatedAt:String!
        following(page:Int!):[User]
        followers(page:Int!):[User]
        totalFollowing:Int!
        totalFollowers:Int!
        isMe:Boolean!
        isFollowing:Boolean!
    }
`;