import { Router } from "express";
import authenticationRoute from "./authenticationRoute.js";

const route = Router();

route.use("/auth", authenticationRoute);

export default route;
