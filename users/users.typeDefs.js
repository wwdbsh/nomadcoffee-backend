import { gql } from "apollo-server-core";

export default gql`
    type User{
        id:Int!
        username:String!
        email:String!
        name:String
        avatarURL:String
        location:String
        githubUsername:String
        createdAt:String!
        updatedAt:String!
    }
`;