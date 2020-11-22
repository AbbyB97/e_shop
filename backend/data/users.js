//used only for initializing with dummy values
import bcrypt from 'bcryptjs'

const users = [
    {
        name:'Admin user',
        email:'admin@example.com',
        //async should be preferred but since its static data we are using sync method
        password : bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'John Doe',
        email:'john@example.com',
        password : bcrypt.hashSync('123456',10),
    },
    {
        name:'Jane Doe',
        email:'jane@example.com',
        password : bcrypt.hashSync('123456',10),
    },
]

export default users