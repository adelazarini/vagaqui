import api from './api_service';
import { RegistroUsuario } from '../models/registro_usuario';

class RegisterService {
    async registrar(data: RegistroUsuario) {
        const response = await api.post('/auth/register', data);
        return response.data;
    }
}

export default new RegisterService();
