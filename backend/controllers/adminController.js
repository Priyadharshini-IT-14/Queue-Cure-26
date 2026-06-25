const crypto = require("crypto");
const store = require("../models/clinicStore");
const { addLog } = require("../services/logService");

function hashPassword(password) {
    return crypto.createHash("sha256").update(String(password || "")).digest("hex");
}


function createDoctor(req, res) {

    const {
        name,
        email,
        password
    } = req.body;


    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password required"
        });
    }

    if (store.users.some((user) => user.email === email)) {
        return res.status(409).json({
            message: "A user with this email already exists"
        });
    }

    const doctor = {
        name,
        email,
        passwordHash: hashPassword(password),
        role: "doctor"
    };


    store.users.push(doctor);
    addLog({ user: "Admin", role: "admin", action: `Created doctor ${name}` });


    res.json({
        message: "Doctor created successfully",
        doctor: { name: doctor.name, email: doctor.email, role: doctor.role }
    });

}



function createReceptionist(req,res){

    const {
        name,
        email,
        password
    } = req.body;


    if (!name || !email || !password) {

        return res.status(400).json({
            message:"Name, email and password required"
        });

    }

    if (store.users.some((user) => user.email === email)) {
        return res.status(409).json({
            message:"A user with this email already exists"
        });
    }

    const receptionist = {

        name,
        email,
        passwordHash:hashPassword(password),
        role:"receptionist"

    };


    store.users.push(receptionist);
    addLog({ user:"Admin", role:"admin", action:`Created receptionist ${name}` });


    res.json({

        message:"Receptionist created successfully",

        receptionist: { name: receptionist.name, email: receptionist.email, role: receptionist.role }

    });

}



function exportCSV(req,res){

    const rows = [
        ["Token","Patient","Phone","Type","Status","Created"]
    ];


    store.patients.forEach(patient=>{

        rows.push([
            patient.token,
            patient.name,
            patient.phone,
            patient.type,
            patient.status,
            patient.created
        ]);

    });


    const csv =
        rows.map(row=>row.join(",")).join("\n");


    res.setHeader(
        "Content-Type",
        "text/csv"
    );


    res.setHeader(
        "Content-Disposition",
        "attachment; filename=queue-report.csv"
    );


    res.send(csv);

}



function exportPDF(req,res){

    const served = store.patients.filter((patient) => patient.status === "completed").length;

    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", "attachment; filename=queue-report.txt");
    res.send([
        "QueueCure Pro Daily Report",
        "",
        `Total patients: ${store.patients.length}`,
        `Patients served: ${served}`,
        `Patients waiting: ${store.patients.filter((patient) => patient.status === "waiting").length}`,
        "",
        "Patient Tokens:",
        ...store.patients.map((patient) => `${patient.token} - ${patient.name} - ${patient.status}`)
    ].join("\n"));

}



module.exports = {

    createDoctor,

    createReceptionist,

    exportCSV,

    exportPDF

};
