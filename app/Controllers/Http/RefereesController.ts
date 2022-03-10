import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Referee from "App/Models/Referee";

export default class RefereesController {
    public async addList({ request, params}: HttpContextContract){
        try {
            const rList = request.input('list');
            for(let i = 0; i < rList.length; i ++){
                let referee = await Referee.findBy('address', rList[i]);
                if(referee){
                    referee.save();
                }
                else{
                    referee = new Referee()
                    referee.address = rList[i];
                    referee.save();
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public async getTweetedReferee() {
        let list = await Referee.query().where('isRewarded', false).andWhere('isTweeted', true).limit(50).orderBy('createdAt', 'asc');
        return list;
    }

    public async setRewardReferee({request}) {
        try {
            const rList = request.input('list');
            for(let i = 0; i < rList.length; i ++){
                const referee = await Referee.query().where('address', rList[i].address).first();
                if(referee){
                    referee.isRewarded = true;
                    referee.save();
                }
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }        
    }
}
