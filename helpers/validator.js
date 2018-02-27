const joi = require('joi');

module.exports = (shemaObj, data) => {
    console.log("validator");
    if(!shemaObj) return false;

    let errors = '';
    let isValid = true;
    let shema = joi.object().keys(shemaObj);

    let res = joi.validate(data, shema, {presence:'optional'});

    if(res.error){
        errors = res.error.details.reduce((a, b) => a + b.message, "");
        isValid = false;
    }

    return{
        isValid,
        errors,
    }
}