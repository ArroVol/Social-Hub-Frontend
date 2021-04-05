// => implicit return
//this function takes an array, takes the user thats logged in, returns a string value of the recipient
const getRecipientEmail = (users, userLoggedIn) => 
    //use the questionmark to protect
    // user logged in is also a hook
    users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0];

// want to be able to use this throughout
export default getRecipientEmail;