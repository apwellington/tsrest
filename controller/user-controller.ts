import { Request, Response } from "express"
import User from '../models/user-model';

export const getUsers = async(req: Request, res: Response) => {
    const users = await User.findAll();
    res.json({
        users
    });
}

export const getUser = async(req: Request, res: Response) => {
    const {id} = req.params;

    const user = await User.findByPk(id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({
            code:404,
            msg:`UserId ${id} does not exist!`
        });
    }
    
}

export const postUser = async(req: Request, res: Response) => {
    const {body} = req;
    try{
        const emailExiast = await User.findOne({
            where:{
                email: body.email
            }
        });

        if(emailExiast){
            return res.status(400).json({
                msg:`El email ${body.email} ya esta en uso`
            });
        }

        const user = await User.create(body);
        res.json({
            msg: "creado!",
            user
        });

    }catch(error){
        console.log(error);
        res.status(500).json({msj:"Llamar al servicio"});
    }

}

export const putUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;

    const user = await User.findByPk(id);
    if(!user){
        return res.status(400).json({
            msg: "No existe el usuario!"
        });
    }
    await user.update(body);
    res.json(user);
}

export const deleteUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(!user){
        return res.status(400).json({
            msg: "No existe el usuario!"
        });
    }

    await user.update({status:false});

    res.json({
        msg: "deleted!",
    });
}