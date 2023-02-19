import{ Router } from 'express';
import { MessageController } from '../controllers/messageController.js';

const routerMessages = Router()

routerMessages.post('/', MessageController.postMsg.bind(MessageController));
routerMessages.get('/', MessageController.get.bind(MessageController));

export default routerMessages