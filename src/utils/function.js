
import bcrypt from "bcrypt";
import _ from "lodash";


const generateHashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    return hashPassword
}


const utilComparePassword = async (requestPassword, existsPassword) => {

    if (_.isString(requestPassword) && _.isString(existsPassword)) {
        return await bcrypt.compareSync(requestPassword, existsPassword);
    } else {
        if (!_.isString(requestPassword)) {
            throw new Error(`@requestPassword is must be String`);
        } else if (!_.isString(existsPassword)) {
            throw new Error(`@existsPassword is must be String`);
        } else {
            throw new Error(`Unexceptional error occurred`);
        }
    }
};


const isNull = (data) => {
    if (data == null || data === '' || data === 'undefined' || data === 'null') {
        return true;
    } else {
        return false;
    }
}

function isUUID(uuid) {
    let s = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) {
        return false;
    }
    return true;
}


const enumModifier = [
    {
        modifier: 's',
        multiplexer: 1,
    },
    {
        modifier: 'm',
        multiplexer: 60,
    },
    {
        modifier: 'h',
        multiplexer: (60 * 60),
    },
    {
        modifier: 'd',
        multiplexer: (60 * 60) * 24,
    }
];

const utilConvertStringToNumberSeconds = (inputString = "") => {
    if (!inputString) {
        return 0;
    }
    else {

        const regexMatchFormat = /^([0-9]+)(d|D|m|M|y|Y|h|H|m|M|s|S){1}$/g;

        const regexSelect1 = /^[0-9]+$/g;

        const regexSelect2 = /^(d|D|m|M|y|Y|h|H|m|M|s|S){1}$/g;

        if (!regexMatchFormat.test(inputString)) { throw new Error("Parameter @inputString wrong format"); }
        else {
            const splitData = inputString.split(regexMatchFormat).filter(where => where !== "");
            if (splitData.length !== 2) { throw new Error("Parameter @inputString wrong format, due failed to split data"); }
            else {
                const valueData = splitData[0];
                if (valueData.replace(regexSelect1, "").length !== 0) { throw new Error("Parameter @inputString wrong format, due wrong format in selection 1"); }
                else if (!Number.isSafeInteger(Number(valueData))) { throw new Error("Parameter @inputString wrong format, due wrong format in selection 1"); }
                else {
                    const modifierData = splitData[1];
                    if (modifierData.replace(regexSelect2, "").length !== 0) { throw new Error("Parameter @inputString wrong format, due wording format in selection 2"); }
                    else {
                        const getContentModifier = enumModifier.filter(where => where.modifier === modifierData.toLowerCase());
                        if (getContentModifier.length !== 1) { throw new Error("Parameter @inputString wrong format, due no modifier matched in selection 2"); }
                        else {
                            return (+valueData) * getContentModifier[0].multiplexer;
                        }
                    }
                }
            }
        }
    }
};

const dateStrToDdmmyyy = (str) => {

    // toLocaleString('th-TH', {
    //     timeZone: 'Asia/Bangkok'
    // })

    //"23/10/2015"; // Oct 23
    let date = str.split(" ");
    let dateParts = date[0].split("/");
    // let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    dateParts = dateParts[1] + '-' + dateParts[0] + '-' + dateParts[2]
    if (date[1] != null)
        dateParts = dateParts + ' ' + date[1]
    let dateObject = new Date(dateParts);
    return dateObject
}



export {
    generateHashPassword,
    utilComparePassword,
    isNull,
    isUUID,
    utilConvertStringToNumberSeconds,
    dateStrToDdmmyyy
}
