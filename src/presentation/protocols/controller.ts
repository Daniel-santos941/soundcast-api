import { HttpRequest } from "../http/request";

export interface Controller {
    handle(httpRequest?: HttpRequest): Promise<any>;
}