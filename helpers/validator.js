const joi = require('joi');

module.export = (shemaObj, data) => {

    if(!shemaObj) return false;

    let errors = '';
    let isValid = true;
    let chema = joi.object().keys(shemaObj);

    let res = joi.validate(data, shema, {presence:'optional'});

    if(res.error){
        errors = validationResult.error.details.reduce((a, b) => a + b.message, "");
        isValid = false;
    }

    return{
        isValid,
        errors,
    }
}