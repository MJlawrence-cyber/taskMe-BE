const User = require('../models/userModel');

//fetch user data service
const getUserData = async (userid) => {
    try {
        return await User.findById(userid);
    } catch (error) {
        throw new Error ("Error fetching user data");
    }
};

//update user profile
const updateUserProfile = async (userId, userDat) => {
try {
    // find user by id and update
    const updatedUser = await User.findByIdAndDelete(userid,userData,{new:true});
} catch (error) {
    throw new Error ("Error updating user profile");
}

};

module.exports = {getUserData, updateUserProfile}