import {Router} from "express";
import { InfoController } from "../controllers/infoController";

const infoRouter = Router();

infoRouter.post('/', InfoController.createLead);

export default infoRouter;