import client from "../client";

export default {
  Photo: {
    user: (root) => {
      return client.user.findUnique({ where: { id: root.userId } });
    },
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
  },
  Hashtag: {
    totalPhotos: ({ id }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
    photos: ({ id }, { page }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
    },
  },
};
