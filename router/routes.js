const express=require("express")

const router=express.Router();

const uploadFileMulter=require('../middleware/uploadFile')
const {home, excelToJson,downloadVcf, saveVcf, downloadSample}=require('../controllers/controllers')


router.get('/',home)
//change
// router.post('/modifycontact', uploadFileMulter.single('xlsx-file'),excelToJson);
router.post('/', uploadFileMulter.single('xlsx-file'),excelToJson);


router.post('/downloadVcf',downloadVcf);
router.get('/savevcf',saveVcf)
router.get('/downloadsample',downloadSample)

module.exports=router;