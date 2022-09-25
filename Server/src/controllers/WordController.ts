import { NextFunction, Request, Response, Router } from 'express';


import { Word } from '../models/Word'

export const WordController: Router = Router();

WordController.get('/getRootWord', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Word.distinct("rootWord").exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
})

WordController.post('/createTag', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.body.rootWord
        const tagCount = req.body.tagCount
        const oneTagCount = Math.floor(tagCount / params.length)
        // console.log(oneTagCount)
        let result = []
        for(let i =0; i< params.length; i++){
           const words = await Word.find({ rootWord: params[i]}).exec()
           if(words.length <= tagCount) {
            result = result.concat(words)
           } else {
            let maxRandomCount = words.length - oneTagCount
            let startCount = Math.floor(Math.random()*maxRandomCount)
            result = result.concat(words.slice(startCount, startCount + oneTagCount))
           }
        }
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
})

WordController.get('/getWordList', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Word.find().exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
})

WordController.delete('/deleteWord/:word', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.word)
    try {
        const result = await Word.remove({ word: req.params.word }).exec()
        res.status(200).send( result );
    } catch (e) {
        next(e);
    }
});

WordController.post('/saveWordJson', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wordArray = JSON.parse(req.body.wordJson).data
        wordArray.forEach(async (v:any) => {
            try {
                const words = await Word.find({ word: v.word}).exec()
                if(words.length==0) {
                    new Word(v).save()
                } else {
                    console.log(`${v.word} is repetition`)
                }
            } catch(e) {
              console.log(encodeURI)
            } 
         })
    
        // let result = []
        // for(let i =0; i< params.length; i++){
        //    const words = await Word.find({ rootWord: params[i]}).exec()
        //    if(words.length <= 10) {
        //     result = result.concat(words)
        //    } else {
        //     let maxRandomCount = words.length - 10
        //     let startCount = Math.floor(Math.random()*maxRandomCount)
        //     result = result.concat(words.slice(startCount, startCount + 10))
        //    }
        // }
        res.status(200).send("ok")
    } catch (e) {
        next(e);
    }
})



// db.collectionName.find({"trnrec.rttype":0,"trnrec.createtime":{ $gte: ISODate("2017-11-23T00:00:00+0800"),  $lt: ISODate("2017-11-24T00:00:00+0800")}}) 

// Platform.distinct(field).exec();


// WordController.get('/:query', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await Word.findOne({ query: req.params.query }).exec()
//         res.status(200).send( result );
//     } catch (e) {
//         next(e);
//     }
// });

// WordController.delete('/:query', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await Word.remove({ query: req.params.query }).exec()
//         res.status(200).send( result );
//     } catch (e) {
//         next(e);
//     }
// });
// WordController.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const result = await Word.find().exec()
//         res.status(200).send( result );
//     } catch (e) {
//         next(e);
//     }
// });
// WordController.get('/queryByCondition/:condition', async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.params)
//     try {
//         let queryCondition:object = {}
//         if(req.params.condition === "checkRemember") {
//             queryCondition = {isRemember: false}
//         } else if (req.params.condition === "remember"){
//             queryCondition = {$or:[{enTozh: false}, {voiceToen: false}, { zhToen: false }]}
//         } else {
//             queryCondition = {}
//         }
//         const result = await Word.find(queryCondition).exec()
//         res.status(200).send( result );
//     } catch (e) {
//         next(e);
//     }
// });

// WordController.put('/uptateRememberStatus/:word/:status', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { word, status } = req.params
//         console.log(word, status)
//         let updataData = {}
//         if(status === "yes") {
//             updataData = {isRemember: true}
//         } else if(status === "no"){
//             updataData = {isRemember: false,enTozh: false,voiceToen: false,zhToen: false }
//         }
//         console.log(updataData)
//         const data = await Word.findOneAndUpdate({query: word},updataData, {new: true, useFindAndModify: false}) // 
//         res.status(200).send({ data });
//     } catch (e) {
//         next(e);
//     }
// });

// WordController.put('/:word', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         console.log(req.body)
//         const data = await Word.findOneAndUpdate({query: req.params.word}, req.body, {new: true, useFindAndModify: false}) // 
//         res.status(200).send({ data });
//     } catch (e) {
//         next(e);
//     }
// });