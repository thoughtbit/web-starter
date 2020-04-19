export const GetUser = {
  variable: '$username: String',
  query: `
  getUser: getUser(username: $username) {
    id
    username
    token
  }
  `,
};
export const GetUserList = {
  variable: '$userId: String',
  query: `
  getUserList: getUserList(userId: $userId) {
    id
    username
    token
  }
  `,
};
