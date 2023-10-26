import User from "@/model/Users"
import { connect } from "../../../../lib/mongodb"

const registerUser = async (request: Request) => {
    try {
        const body = await request.json()
        await connect()
        const usersNew =  new User(body)
        const savedUser = await usersNew.save()
        return Response.json({ savedUser },{status:200})
    } catch (err) {
        console.log(err)
        return Response.json('internal server error' , {status : 500})
        
    }
}


export {registerUser as POST}