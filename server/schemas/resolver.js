const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    //query resovler for our get routes
    Query: {
        users: async () => {
            return await User.find({}).populate('savedBooks');
        },
        user: async () => {
            return await User.findById(args.id).populate('savedBooks');
        },
    },

    //mutation for our Post / Delete
    Mutation: {
        createUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            //doing our JWT token here since we are no longer using express server routes
            const token = signToken(user);

            return (token, profile);
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            //if user does not exist
            if (!user) {
                console.error("No profile with this email!");
            };
            //checking PW validity
            const validatePW = await user.isCorrectPassword(password);

            if (!validatePW) {
                console.error("Incorrect PW, please try again");
            };
            //only if correct password, then create JWT, and return 
            //both token to be stored on client, and profile for render
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { description, bookID, title }) => {
            const user = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToset: { savedBooks: { description, bookID, title } } },
                //return updated user's savedBook list
                { new: true, runValidators: true }
            );
        },
        removeBook: async (parent, { bookID }) => {
            const user = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: bookID } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;