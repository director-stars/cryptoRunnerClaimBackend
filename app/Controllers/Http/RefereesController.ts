import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Referee from "App/Models/Referee";

export default class RefereesController {
    public async addList({ request, params}: HttpContextContract){
        try {
            const rList = request.input('list');
            // const pList = params.list;
            for(let i = 0; i < rList.length; i ++){
                console.log(rList[i]);
            }
            console.log(rList.length);
            return true;
            // console.log(pList);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
