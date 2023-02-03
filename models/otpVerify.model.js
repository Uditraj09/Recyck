module.exports = (mongoose) => {
  var otpverifySchema = mongoose.Schema(
    {
      phonenumber: Number,
      otp: String,
      createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
    },
    { timestamps: true }
  );

  const otpVerify = mongoose.model("verifieduser", otpverifySchema);
  return otpVerify;
};
