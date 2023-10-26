import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag'
import { connect } from "../../../../lib/mongodb";
import User from "@/model/Users";

interface Userprop {
  id?: Number
  username: String
  email: String
  password: String
}

const typeDefs = gql`

  type Users {
    id : ID
    username: String!
    email: String!
    password:String!
  }

  input UserInput {
    username: String
    email: String
    password: String
  }

  type Query {
    getAllUsers: [Users]
    hello: String
  }

  type Mutation {
    pushUser(userinfo : UserInput) : Users
  }

`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      await connect()
      return await (User.find({}))
    },
    hello: () => 'Hello World'
  },
  Mutation: {
    pushUser: async (parent , args) => {
      try {
        await connect();
        
        // Create a new User instance based on the input args
        const newUser = new User({
          username: args.userinfo.username,
          email: args.userinfo.email,
          password: args.userinfo.password,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        return savedUser;
      } catch (err) {
        // Handle errors appropriately
        console.error(err);
        throw new Error("Failed to create a new user.");
      }
    }
  }
}

// can run the folowing command to test the mutation 
// mutation{
//   pushUser(userinfo:{
//       username : "ashish" 
//       email : "ak@test.com" 
//       password : "super_password"
//   }){
//       id
//   }
// }


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST }