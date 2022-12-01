const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    AdID: { type: String },
    AdText: { type: String },
    Clicks: { type: String },
    Impressions: { type: String },
    Age: { type: String },
    CreationDate: { type: String },
    LandingPage: { type: String },
    Behaviors: { type: String },
    Placements: { type: String },
    PeopleWhoMatch: { type: String },
    Interests: { type: String },
    Language: { type: String },
    FriendsOfConnections: { type: String },
    ExcludedConnections: { type: String },
    Gender: { type: String },
    Generation: { type: String },
    Politics: { type: String },
    CustomAudience: { type: String },
    AdSpend: { type: String },
    AdSpendCurrency: { type: String },
    SourceFile: { type: String },
    SourceZip: { type: String },
    pages: { type: String },
});
// , {timestamps: true, strict:false}
module.exports = mongoose.model('Titan', dataSchema)







