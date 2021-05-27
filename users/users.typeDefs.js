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
    type MutationResponse{
        ok:Boolean!
        error:String
    }
    type Mutation{
        createAccount(
            username:String!
            email:String!
            password:String!
            name:String
            location:String
            githubUsername:String
        ):MutationResponse
    }
    type Query{
        seeProfile(username:String!):User
    }
`;