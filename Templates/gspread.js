
const gspread= async (url)=>{
    
    const {GoogleSpreadsheet} = require('google-spreadsheet');
    const creds = require('../Creds/credentials.json');
    const doc = new GoogleSpreadsheet(url.split('/')[5]);
    await doc.useServiceAccountAuth(creds)
    await doc.loadInfo();

    return doc;

}

module.exports = gspread;