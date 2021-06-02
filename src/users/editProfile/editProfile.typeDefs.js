import { gql } from "apollo-server-core";

export default gql`
    type EditProfileResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        editProfile(
            username:String
            email:String
            password:String
            name:String
            location:String
            githubUsername:String
            avatarURL:Upload
        ):EditProfileResult!
    }
`;