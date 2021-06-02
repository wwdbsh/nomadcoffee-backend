import { gql } from "apollo-server-core";

export default gql`
    type CreateAccountResult{
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
        ):CreateAccountResult!
    }
`;
