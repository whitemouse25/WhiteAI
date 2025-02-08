import { User } from "../models/user.model";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

const userController = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }); 
    }
    try{
        const user = await createUser.createUser(req.body);

        const token = await user.generateJWT(); 
        res.status(201).json({ user, token });
    }
    catch(error){
        res.status(400).send(error.message)
    }
}