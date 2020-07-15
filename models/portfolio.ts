import DB,{ObjectId} from '../db.ts';

export interface User {
    fname:'',
    lname:'',
    email:'',
    gender:'',
    phone:'',
    about:'',
    hobbies:'',
    weaknesses:'',
    strengths:'',
    experience:0
}

class UserClass {
    constructor(){

    }

    userCollection = DB.collection('users')

    createUser = async (userDetails : User ) => {
        try {
            const newUser = await this.userCollection.insertOne(userDetails);
            // console.log('NEW USER MSG',newUser)
            // return ;
            if( newUser ) return "success";
            else return "error" ; 
        } catch (error) {
            console.error('Exception in creating a new User'+error)
        }
    }

    // getAllUsers = async (name:string) =>{
    //     try {
    //         console.log("NAME:",name)
    //         const users = await this.userCollection.find({name})
    //         // console.log('GetAllUsers',users);
    //         return users;
    //     } catch (error) {
    //         console.error('Exception in getting all data')
    //     }
    // }
    getAllUsers = async () =>{
        try {
            const users = await this.userCollection.find({})
            // console.log('GetAllUsers',users);
            return users;
        } catch (error) {
            console.error('Exception in getting all data')
        }
    }

    getUser  = async (id:string) =>{
        try {
            const user  = await this.userCollection.find({_id:{$oid:id}})
            // console.log("SINGLE USER:",user);
            return user;

        } catch (error) {
            
        }
    }

}

export default UserClass;