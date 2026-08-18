import { Router, Request, Response } from "express";
import { User } from "../models/Users";

const router = Router();

// POST /api/userscadastrar um novo usuário
router.post("/", async (req: Request, res: Response) => {
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

// GET /api/users/:id - listar um usuário específico
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const usuario = await User.findByPk(Number(id), {
            attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        });

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar usuário' });
    }
});

export { router as userRoutes}
