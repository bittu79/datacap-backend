var mongoose = require('mongoose');
const sampleData = require("../models/sampleData")
exports.find = async () => {
    
    // return await sampleData.aggregate([{
    //     $project:{
    //         name:1
    //     }
    // }])

    return await sampleData.find({},{"AdId":1,"Language":1})
}


exports.update = async ()=>{
    return await sampleData.updateMany({},{})

}

exports.aggregatingData = async()=>{
    return await sampleData.aggregate([
        {
        $group:{
            "_id":"$AdSpend",
            "count":{$sum:1}
        },
        
    },
    {
        $match:{
            "count":{$gt:180},
            "_id":{$ne:null}
        }
    },
    {
        $sort:{"count":1}
    }
    ])
}



exports.create = async(data)=>{
    return await sampleData.create(data)
}

exports.delete = async(data)=>{
    return await sampleData.deleteMany(data)
}