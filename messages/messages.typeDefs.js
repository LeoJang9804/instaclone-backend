import { gql } from "apollo-server";

export default gql`
type Message{
  id: Int!
  createdAt: String!
  updatedAt: String!
  payload: String!
  user: User!
  room: Room!
  read: Boolean!
}
type Room{
  id: Int!
  users: [User]
  unreadTotal: Int!
  messages: [Message]
  createdAt: String!
  updatedAt: String!
}`