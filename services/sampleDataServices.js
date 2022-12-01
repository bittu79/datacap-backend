var mongoose = require('mongoose');
const sampleData = require("../models/sampleData")
exports.find = async () => {
    
    // return await sampleData.aggregate([{
    //     $project:{
    //         name:1
    //     }
    // }])

    return await sampleData.find({},{name:1,email_address:1})
}


exports.update = async ()=>{
    return await sampleData.updateMany({},{founded_year:2222,founded_month:22,founded_day:33})

}

exports.aggregatingData = async()=>{
    return await sampleData.aggregate([{
        $group:{
            "_id":"$name",
            "count":{$sum:1}
        },
        
    },
    {
        $sort:{"_id":-1}
    }
    ])
}



