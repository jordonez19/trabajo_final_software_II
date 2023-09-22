import UsersModel from '../../models/user'

export const createUser = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const newUser = new UsersModel({ email, password, username });
        await newUser.save();

        res.json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al crear el usuario' });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await UsersModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
}
