export const profileQuery = {
  byUserId: (userId: string) => ({
    profiles: {
      $: {
        where: {
          "user.id": userId,
        },
      },
    },
  }),
};
