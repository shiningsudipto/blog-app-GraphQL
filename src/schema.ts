export const typeDefs = `#graphql
    type Query {
        users: [User]
        user: User
        posts: [Post]
        profile(userId: ID!): Profile
    }

    type Mutation {
        signup(
            name: String!,
            email: String!,
            password: String!
            bio: String
        ): AuthRes,
        signin(
            email: String!,
            password: String!
        ): AuthRes,

        addPost(post: PostInput!): PostPayload,
        updatePost(postId: ID!, post: PostInput!): PostPayload,
        deletePost(postId: ID!): PostPayload,
        publishPost(postId: ID!): PostPayload
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User
        createdAt: String!
        published: Boolean!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        createdAt: String!
        posts: [Post]
    }

    type Profile {
        id: ID!
        bio: String!
        createdAt: String!
        user: User!
    }

        type AuthRes {
    userError: String
    token: String
    }
    type PostPayload {
    error: String
    data: Post
    }
        input PostInput {
        title: String
        content: String
    }
`;
