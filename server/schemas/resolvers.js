const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    //query resovler for our get routes
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })

                return userData;
            }
        },

        users: async () => {
            return await User.find({});
        },
        user: async (parent, args) => {
            return await User.findById(args.id);
        },
    },

    //mutation for our Post / Delete
    Mutation: {
        createUser: async (parent, { name, email, password }) => {
            const user = await User.create({ name, email, password });
            //doing our JWT token here since we are no longer using express server routes
            const token = signToken(user);

            return (token, user);
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
        saveBook: async (parent, { description, bookID, title }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.userID },
                { $addToset: { savedBooks: { description, bookID, title } } },
                //return updated user's savedBook list
                { new: true, runValidators: true }
            );
        },
        deleteBook: async (parent, { bookID }, context) => {
            const user = await User.findOneAndUpdate(
                { _id: context.userID },
                { $pull: { savedBooks: { bookId: bookID } } },
                { new: true }
            );
        },
    },
};

module.exports = resolvers;