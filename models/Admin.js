const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');
const Double = require('@mongoosejs/double');


const AdminSchema = new mongoose.Schema({
    name: { type: String, default: "" },
	email: { type: String, default: "", trim: true },
	mobile_number: { type: Number, default: null },
	experience: { type: Double, default: 0 },
    gender: { type: String, default: "" },
	city: { type: String, default: "Bengaluru" },
	state: { type: String, default: "Karnataka" },
	country: { type: String, default: "India" },
	country_code: { type: Number, default: 91 },
	admin_type: { type: String, enum: ['super', 'admin'], default: 'admin'},
	password: { type: String, default: "" },
	profile_image: { type: String, default: "https://niuli-images.s3.ap-south-1.amazonaws.com/21372076.jpg" },
	active: { type: Boolean, default: true },
    status: { type: String, enum: ['active', 'deleted'], default: "active" },
	token_notification: { type: String, default: "" },
	token_session: { type: String, default: "" },
	tokens_sessions: [{
        token: { type: String, default: "" },
        logged_in_date: { type: Date, default: new Date().toISOString() }
    }],
	last_logged_in_date: { type: Date, default: new Date().toISOString() },
	generic_date: { type: Date, default: new Date().toISOString() }
});


AdminSchema.index({
	"name": "text",
	"email": "text",
	"city": "text"
  }, {
	"name": "admin_full_text",
	"default_language": "en",
	"language_override": "en"
  });
AdminSchema.plugin(timestamps);
AdminSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Admin', AdminSchema);
