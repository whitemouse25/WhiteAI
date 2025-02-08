import { User } from "../models/user.model";

export const createUser = async ({
    email, password
}) => {
    if(!email || !password) {
        throw new Error ("Email and password are required");
    }
     const hashedPassword = await User.hashpassword(password)

     const user =  await User.create({
        email,
        password: hashedPassword,
    })
    return user;
}