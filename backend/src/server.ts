import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from './config/database';
import { User } from "./models/Users";
import { userRoutes } from "./routes/userRoutes";

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

//registrar as rotas da aplicação sob o prefixo /api
app.use("/api", userRoutes);

// cadastrar um novo usuário
app.post("/api/users", async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
        }

        const novoUsuario = await User.create({ name, email, password });
        res.status(201).json(novoUsuario);

    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});

//listar todos os usuários
app.get("/api/users", async (req: Request, res: Response) => {
    try { 
        const usuarios = await User.findAll({
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuários' });
    }
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
