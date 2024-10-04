import User from '../db/models/user.model'
// import {hashSync} from 'bcrypt-ts'
// import {hashSync} from "bcryptjs";

interface UserRepositoryInterface {
    create(user: User): Promise<User | string>;

    delete(userId: number): Promise<object>;

    getAll(): Promise<User[]>;

    getById(userId: number): Promise<User | null>;

    update(userId: number, data: User): Promise<User[] | string>;
}

class UserRepository implements UserRepositoryInterface{
    // @ts-ignore
    async create(user: User): Promise<User | string>{
        try{
            // let hashedPass : string;
            // if (user.password != null) {
            //     hashedPass = hashSync(user.password, 10);
            // }

            let newUser : User = await User.create({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                password: user.password
            });

            if(newUser) {
                let userInfo = newUser.dataValues;
                delete userInfo.password;
                return userInfo;
            }
            else throw new Error("Something went wrong.")
        }
        catch(e){
            if(e instanceof Error){
                return  "Error: " + e.message
            }
        }
    }

    // @ts-ignore
    async delete(userId: number): Promise<object> {
        try{
            const success = await User.destroy({
                where: {
                    id: userId
                }
            })

            if(success) return {success: "User successfully deleted"}
        }
        catch(e){
            if(e instanceof Error){
                return {message: e.message}
            }
        }
    }

    // @ts-ignore
    async getAll(): Promise<User[]> {
        try{
            return await User.findAll()
        }
        catch(e){
        }
    }

    // @ts-ignore
    async getById(userId: number): Promise<User | null | string> {
        try{
            return await User.findByPk(userId)
        }
        catch(e){
            if(e instanceof Error){
                return e.message
            }
        }
    }

    // @ts-ignore
    async update(userId: number, data: User): Promise<User[] | string> {
        const {firstName, lastName, email, username} = data;

        try{
            let updatedUser : any = await User.update({
            firstName, lastName, email, username
            }, {where: {id : userId}, returning: true});

            if(updatedUser) {
                updatedUser = await User.findOne({
                    where: {
                        id: userId
                    }
                })

                return updatedUser;
            }
        }
        catch(e){
            if(e instanceof Error){
                return e.message
            }
        }
    }

}

export default new UserRepository();