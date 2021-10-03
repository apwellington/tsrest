import express, { Application } from "express";
import userRoutes from "../routes/user-route";
import cors from 'cors';
import db from '../database/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPath = {
        user: '/api/user'
    };

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middelware();


        //rutas
        this.routes();
        
    }

    async dbConnection(){
        try{

            await db.authenticate();
            console.log("Database online");

        }catch(error){
            console.log(error);
            throw new Error(  );
        }
    }

    //middlewares = fuciones que se ejecutan antes de que el req llegue a las rutas.
    middelware(){
        //cors peticiones cros domain
        this.app.use( cors() );

        //lectura del body parsear req a json
        this.app.use( express.json() );

        //carpeta publica
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Server runing on port ${this.port}`);
        })
    }

    routes(){
        this.app.use(this.apiPath.user, userRoutes);
    }
}

export default Server;