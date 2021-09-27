import { Router } from "express";
import moviesRoute from "./moviesRoute";

const router = Router();

router.use("/movies", moviesRoute);

export default router;
