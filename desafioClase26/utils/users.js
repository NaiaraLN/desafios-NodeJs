import userModel from "../model/userModel.js";
import ContainerMongoDB from "../containers/containerMongoDB.js";

class User extends ContainerMongoDB{
    constructor(connection){
        super(connection)
        this.model = userModel
    }
    async getUser(username){
        try {
            const user = await this.model.findOne({username})
            return user
        } catch (error) {
            console.log(error)
        }
    }
    async saveUser(newUser){
        try {
            const newuser = new this.model(newUser)
            await newuser.save()
            const username = newUser.username
            return username
        } catch (error) {
            console.log(`error al guardar el usuario ${error}`)
        }
        
    }
}

export default User