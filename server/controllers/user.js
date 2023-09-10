import bcrypt from 'bcrypt.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import User from '../models/user';

const privateKey = 'def' //fs.readFileSync('private_key.pem', 'utf8');
const publicKey = 'abc' //fs.readFileSync('public_key.pem', 'utf8');

export const signin = async (req, res) => {
    const { email, password } = req.body;

    
        // ... (existing user and password validation)
        try {
            const oldUser = await UserModal.findOne({ email });
        
            if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
        
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        
            if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            privateKey,
            { algorithm: 'RS256', expiresIn: '1h' }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        // ... (new user creation and validation)
        
            const oldUser = await UserModal.findOne({ email });
        
            if (oldUser) return res.status(400).json({ message: "User already exists" });
        
            const hashedPassword = await bcrypt.hash(password, 12);
        
            const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            privateKey,
            { algorithm: 'RS256', expiresIn: '1h' }
        );

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

