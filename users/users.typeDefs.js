import { gql } from "apollo-server-core";

export default gql`
    type User{
        id:Int!
        username:String!
        email:String!
        name:String!
        location:String!
        avatarURL:String
        githubUsername:String
    }
    type MutationResponse{
        ok:Boolean!
        error:String
    }
    type Mutation{
        createAccount(
            username:String!
            email:String!
            name:String!
            location:String!
            password:String!
            avatarURL:String
            githubUsername:String
        ):MutationResponse
    }
    type Query{
        seeProfile(username:String!):User
    }
`;