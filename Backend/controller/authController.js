import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'



export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).send('Invalid credentials')

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).send('Invalid password');
        const token = jwt.sign({email: user.email}, process.env.SECRETKEY);
        res.header('Authorization', token).send({token, user})
        

        } catch(error) {
            console.error(error);
            res.status(500).send('Server error')
        }     
}


export const registerUser = async (req, res) => {
    try{
        const {name, email, password, phone} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            phone,
            password:  hashedPassword,
        })
        await user.save();
        res.status(201).send(user)
    }catch(error){
        console.error(error);
        res.status(500).send('Server error')
    }
}

export const authenticate = (req, res, next) => {
    const token = req.header['authorization']
    if(!token) return res.status(401).send('Unauthorized')

    jwt.verify(token, 'secretKey', (err, user) => {
        if(err) return res.status(403).send('Forbidden')
        req.user = user
        next()
    })
}

// export default {login, authenticate, registerUser}