import { ClientSession } from 'mongoose';
import {User} from '../../database/schemas/mongodbSchemas';
const userRepository = {

    getUserByEmail: async (session: ClientSession, email: string) => {
        return await User.findOne({ email }).session(session);
    },
    
    getAllUsers: async (session: ClientSession) => {
        return await User.find({}, null, { session });
    },

    getAllFilterdUsers: async (session: ClientSession) => {
        return await User.find({ role: 'USER' }, null, { session });
    },

    createUser: async (session: ClientSession, userData: any) => {
        return await User.create([{ ...userData, session }]);
    },

    updateUser: async (session: ClientSession, userData: any) => {
        return await User.findOneAndUpdate({ email: userData.email }, userData, { new: true, session });
    },

    deleteUser: async (session: ClientSession, email: string) => {
        return await User.findOneAndDelete({ email }).session(session);
    },
}

export default userRepository;