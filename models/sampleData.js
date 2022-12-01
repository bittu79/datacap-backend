const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');
const Double = require('@mongoosejs/double');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    permalink: { type: String, default: "" },
    cruchbase_url: { type: String, default: "" },
    homepage_url: { type: String, default: "" },
    blog_url: { type: String, default: "" },
    twitter_username: { type: String, default: "" },
    category_code: { type: String, default: "" },
    number_of_employess: { type: Number, default: 0 },
    founded_year: { type: Number, default: 0 },
    founded_month: { type: Number, default: 0 },
    founded_day: { type: Number, default: 0 },
    deadpooled_year: { type: Number, default: 0 },
    tag_list: { type: String, default: "" },
    alias_list: { type: String, default: "" },
    email_address: { type: String, default: "" },
    phone_number: { type: String, default: "" },
    description: { type: String, default: "" },
    created_at: { type: Date, default: new Date().toISOString() },
    updated_at: { type: String, default: "" },
    overview: { type: String, default: "" },
    image: {
        available_sizes: []
    },
    products: [{
        name: { type: String, default: "" },
        permalink: { type: String, default: "" }
    }],
    relationships: [{
        is_past: { type: Boolean, default: true },
        title: { type: String, default: "" },
        person: {
            first_name: { type: String, default: "" },
            last_name: { type: String, default: "" },
            permalink: { type: String, default: "" }
        }
    }
    ],
    competitions: [
        {
            competitor: {
                name: { type: String, default: "" },
                permalink: { type: String, default: "" }
            }
        }
    ],
    providerships: [{
        title: { type: String, default: "" },
        is_past: { type: String, default: "" },
        provider: [
            {
                name: { type: String, default: "" },
                permalink: { type: String, default: "" }
            }
        ]
    }
    ],
    total_money_raised: { type: String, default: "" },
    funding_rounds: [{
        id: { type: Number, default: 0 },
        source_url: { type: String, default: "" },
        source_description: { type: String, default: "" },
        raised_amount: { type: Number, default: 0 },
        raised_currency_code: { type: String, default: "" },
        founded_year: { type: Number, default: 0 },
        founded_month: { type: Number, default: 0 },
        founded_day: { type: Number, default: 0 },
        investments:[
            {
                company:{ type: String, default: null },
                financial_org:{ type: String, default: null },
                person:{
                    first_name:{ type: String, default: "" },
                    last_name:{ type: String, default: "" },
                    permalink:{ type: String, default: "" },
                }
            }
        ]
    }]
})

module.exports = mongoose.model("companies", UserSchema);