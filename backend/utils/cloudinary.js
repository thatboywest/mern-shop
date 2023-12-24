const cloudinaryModule=require("cloudinary")

const cloudinary = require('cloudinary').v2; 

cloudinary.config({
    cloud_name: 'dhrybaucr',
    api_key: '681812297514887',
    api_secret: 'sBlqyR2f9O5_m9lVat0Y435uDGs',
});


module.exports=cloudinary;

