import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from './config/database';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000

//Middleware
app.use(cors());
app.use(express.json());

//Routes de health check
app.get("/api/health",  (req: Request, res: Response) => {
    res.status(200).json({ 
        status: 'OK',
        message: 'Servidor Backend rodando com sucesso',
        timestamp: new Date().toISOString()
    });
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o PostgreSQL no supabase realizada com sucesso.')

        app.listen(port, () =>{
            console.log(`Servidor rodando na porta ${port}`);
            console.log(`Healt Check disponivel em? http://localhost:${port}/api/health`);
        });

    } catch (error) {
        console.log('EWrro ao conectar com o banco de dados: ', error);
    }
}


main();
