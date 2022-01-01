import client from "../../client";
import { protectedResolver } from "../../users/user.Utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          // parse caption
          hashtagObj = processHashtags(caption);
          console.log(hashtagObj);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        // get or create Hashtag
        // save the photo with the parsed hashtags
        // add the photo to the hashtags
      }
    ),
  },
};
