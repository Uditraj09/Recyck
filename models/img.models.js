module.exports = (mongoose) => {
    var imgSchema = mongoose.Schema({
        pic : String
    })
    const imgUpload = mongoose.model("images", imgSchema);
    return imgUpload;
};