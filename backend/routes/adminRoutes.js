const express=require("express");

const router=express.Router();


const {

createDoctor,
createReceptionist,
exportCSV,
exportPDF

}=require("../controllers/adminController");



router.post(
"/doctor",
createDoctor
);



router.post(
"/receptionist",
createReceptionist
);



router.get(
"/reports/csv",
exportCSV
);



router.get(
"/reports/pdf",
exportPDF
);



module.exports=router;