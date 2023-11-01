import { ITask } from "./task.interface";

export interface IResponse<TDocument>{
    object: TDocument;
    isSuccess:boolean;
    errors:string[];
}