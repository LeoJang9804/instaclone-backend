import client from "../../client";
import { protectedResolver } from "../../users/user.Utils";

export default {
  Query: {
    seeRooms: protectedResolver(async (_, __, { loggedInUser }) => {
      return client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id
            }
          }
        }
      })
    })
  }
}