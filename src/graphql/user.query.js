export const userQuery = {
  login,
  register,
};

function register({ email, password, fullName, country }) {
  const formDataQuery = {
    query: `
      mutation {
        createUser(userInput: {email: "${email}", name:"${fullName}", password:"${password}", country: "${country}"}) {
          _id
          email
        }
      }
    `,
  };

  return formDataQuery;
}

function login({ username, password }) {
  const formDataQuery = {
    query: `{
        login(email: "${username}", password: "${password}"){
          userId
          token
          isVerified
        }
    }`,
  };

  return formDataQuery;
}
