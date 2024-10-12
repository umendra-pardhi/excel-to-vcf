const fs = require("fs");
const parser = require('simple-excel-to-json');
const path = require("path");


const home = (req, res) => {
  res.render('index');
}


const excelToJson = (req, res, next) => {

  const file = req.file.destination + '/' + req.file.filename;

  try{

  const result = parser.parseXls2Json(
    fs.readFileSync(file)

  );

  const firstContact = result[0][0];
  const keys = Object.keys(firstContact);
  const numberOfKeys = keys.length;

  // res.send(result)
  const data = JSON.stringify(result[0]);
  // res.render('secondModifyContact',{keys:keys,data:data ,noofkeys:numberOfKeys})
  res.render('index', { keys: keys, data: data, noofkeys: numberOfKeys })
}
catch(err){
  console.log(err)
  res.send("something went wrong: please check your excel file and ensure contain contacts.")
}

}


const downloadVcf = (req, res) => {

  const data = req.body;
  const contacts = JSON.parse(data.contacts);
  const arr = JSON.parse(data.arr);
  console.log(typeof (arr))

  // var const=`BEGIN:VCARD
  // VERSION:3.0
  // FN:${name}
  // N:${firstname};${lastname};;;
  // EMAIL;TYPE=INTERNET,WORK:${email}
  // TEL;TYPE=CELL,PREF:${contact.Number}
  // TEL;TYPE=WORK:${WN}
  // TEL;TYPE=HOME:${HN}
  // ADR;TYPE=WORK;LABEL="${addr}":
  // ORG:${org}
  // TITLE:${desc}
  // URL:${url}
  // BDAY:${bday}
  // END:VCARD\n`;
  let card='';
  contacts.map(person => {
    let vCard = `BEGIN:VCARD\nVERSION:3.0\n`;

    for (const [key, value] of Object.entries(arr)) {
      if (key == 'FN') {
        let ln = '';
        arr['LN'] != undefined ? ln = person[arr['LN']] : ln = ''
        vCard += `N:${ln};${person[value]};;;\n`;
      }

      if (key == 'EMAIL') {
        vCard += `EMAIL;TYPE=INTERNET,WORK:${person[value]}\n`;
      }

      if (key == 'MN') {
        vCard += `TEL;TYPE=CELL,PREF:${person[value]}\n`;
      }
      if (key == 'WN') {
        vCard += `TEL;TYPE=WORK:${person[value]}\n`;
      }
      if (key == 'HN') {
        vCard += `TEL;TYPE=HOME:${person[value]}\n`;
      }
      if (key == 'ADR') {
        vCard += `ADR;TYPE=WORK;LABEL="${person[value]}":\n`;
      }

      if (key == 'ORG') {
        vCard += `ORG:${person[value]}\n`;
      }

      if (key == 'TITLE') {
        vCard += `TITLE:${person[value]}\n`;
      }
      if (key == 'URL') {
        vCard += `URL:${person[value]}\n`;
      }
      if (key == 'BDAY') {
        vCard += `BDAY:${person[value]}\n`;
      }

    }

    vCard += `END:VCARD\n`;
    card+=vCard;
    // fs.appendFileSync('contacts.vcf',vCard);
    // console.log(vCard);
  });
  
  fs.writeFileSync('vcf/contacts.vcf',card);
  console.log(data.arr);

  res.send({msg:"Success"});
  // res.redirect('/savevcf');
}


const saveVcf = (req, res) => {
  res.download(path.resolve('./vcf/contacts.vcf'));
}

const downloadSample = (req, res) => {
  res.download(path.resolve('./sample/sample.xlsx'));
}

module.exports = { home, excelToJson, downloadVcf, saveVcf,downloadSample };

