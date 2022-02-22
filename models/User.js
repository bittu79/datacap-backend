const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');
const Double = require('@mongoosejs/double');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "" , trim: true },
  gender: { type: String, default: "" },
  mobile_number: { type: Number, required: true },
  country_code: { type: Number, default: 91 },
  emailid: { type: String, default: "", trim: true },
  dodo_type: { type: String, default: "beginner" },//'beginner', 'intermediate', 'expert'
  level: { type: Number, default: 1 },
  points: { type: Number, default: 0 },
  dob: { type: String, default: "" },
  city: { type: String, default: "Bengaluru" },
  state: { type: String, default: "" },
  country: { type: String, default: "India" },
  pincode: { type: String, default: "" },
  address: { type: String, default: "" },
  profile_name: { type: String, default: "" , trim: true},
  profile_avatar: { type: String, default: "" },
  profile_image: { type: String, default: "" },
  wallet: {
    total_winnings: { type: Double, default: 0 },
    current_winnings: { type: Double, default: 0 },
    total_cash_bonus: { type: Double, default: 0 },
    current_cash_bonus: { type: Double, default: 0 },
    account_balance: { type: Double, default: 0 },//unutilized wallet as per design
    currency: { type: String, default: "INR" }
  },
  pan_card_number: { type: String, default: "" },
  pan_verification_status:  { type: String, default: "not_verified" },
  email_verification_status: { type: String, default: 'not_verified' },
  bank_verification_status:  { type: String, default: "not_verified" },
  account_verification_status:  { type: String, default: "not_verified" },
  payout_status: { type: String, default: "not_verified" },//or verified
  bank_account_details: {
    account_user_name: { type: String, default: "" },
    account_number: { type: String, default: "" },
    ifsc_code: { type: String, default: "" },
    bank_name: { type: String, default: "" },
    document_url: { type: String, default: "" }
  },
  payment_gateway_details: {
    payment_contact_id: { type: String, default: null },
    payment_fund_account_id: { type: String, default: null }
  },
  referral_code: { type: String, default: "" },
  referred_code: { type: String, default: "" },
  referred_by: { type: String, default: "" },
  token_notification: { type: String, default: "" },
  token_session: { type: String, default: "" },
  tokens_sessions: [{
    token: { type: String, default: "" },
    logged_in_date: { type: Date, default: new Date().toISOString() }
  }],
  portfolio_visibility: { type: String, default: 'public' },//private
  notification_settings: {
    transactional: { type: Boolean, default: true },
    promotional: { type: Boolean, default: true },
    play: { type: Boolean, default: true },
    engage: { type: Boolean, default: true },
    learn: { type: Boolean, default: true },
    profile: { type: Boolean, default: true }
  },
  privacy_preferences: {
    display_full_name: { type: Boolean, default: true },
    show_profile: { type: Boolean, default: true },
    show_recent_game: { type: Boolean, default: true }
  },
  active: { type: Boolean, default: true },
  status: { type: String, enum: ['active', 'deleted'], default: "active" },
  otp: { type: String, default: "" },
  otp_generated_on: { type: Date, default: new Date().toISOString() },
  otp_verified: { type: Boolean, default: false },
  email_verification_otp_generated_on: { type: Date, default: new Date().toISOString() },
  email_verification_otp: { type: String, default: "" },
  is_registered: { type: Boolean, default: false },
  registered_on: { type: Date, default: new Date().toISOString() },
  is_blocked: { type: Boolean, default: false },
  blocked_on: { type: Date, default: new Date().toISOString() },
  first_logged_in: { type: Date, default: new Date().toISOString() },
  last_logged_in: { type: Date, default: new Date().toISOString() },
  generic_date: { type: Date, default: new Date().toISOString() },
});

UserSchema.index({
  "name": "text",
  "emailid": "text",
  "referral_code": "text"
}, {
  "name": "users_full_text",
  "default_language": "en",
  "language_override": "en"
});
UserSchema.plugin(timestamps);
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", UserSchema);