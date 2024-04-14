//* Cargar mis variables de entorno a corde a nuestro archivo .env
import "dotenv/config";
import { get } from "env-var";

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}