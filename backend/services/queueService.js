const store = require("../models/clinicStore");
const { displayTime } = require("../utils/time");
const { addLog } = require("./logService");

function tokenFromNumber(number) {
  return `A${String(number).padStart(3, "0")}`;
}

function getQueueState() {
  const currentPatient = store.patients.find((patient) => patient.status === "called" || patient.status === "in_consultation") || null;
  const waitingPatients = store.patients.filter((patient) => patient.status === "waiting");

  return {
    patients: store.patients,
    currentPatient,
    waitingPatients,
    logs: store.logs,
    nextTokenPreview: tokenFromNumber(store.nextTokenNumber)
  };
}

function generateToken(patientData, actor) {
  const token = tokenFromNumber(store.nextTokenNumber);
  store.nextTokenNumber += 1;

  const patient = {
    id: `P${String(store.patients.length + 1).padStart(3, "0")}`,
    token,
    name: patientData.name,
    age: Number(patientData.age),
    phone: patientData.phone,
    type: patientData.type,
    status: "waiting",
    created: displayTime(),
    createdAt: new Date().toISOString(),
    timeline: [{ label: "Token Generated", time: displayTime(), done: true }]
  };

  store.patients.push(patient);
  addLog({ user: actor.name, role: actor.role, action: `Generated Token ${token}` });
  return patient;
}

function callNext(actor) {
  const active = store.patients.find((patient) => patient.status === "called");
  if (active) active.status = "completed";

  const next = store.patients.find((patient) => patient.status === "waiting");
  if (!next) return null;

  next.status = "called";
  next.timeline.push({ label: "Called", time: displayTime(), done: true });
  addLog({ user: actor.name, role: actor.role, action: `Called ${next.token}` });
  return next;
}

function updateStatus(token, status, actor) {
  const patient = store.patients.find((item) => item.token === token);
  if (!patient) return null;

  patient.status = status;
  const label = status === "in_consultation" ? "Consultation Started" : status === "completed" ? "Completed" : status;
  patient.timeline.push({ label, time: displayTime(), done: true });

  if (status === "in_consultation") {
    const existing = store.consultations.find((item) => item.token === token && !item.endTime);
    if (!existing) {
      store.consultations.push({
        token,
        startTime: new Date().toISOString(),
        endTime: null,
        duration: null
      });
    }
  }

  if (status === "completed") {
    const consultation = [...store.consultations].reverse().find((item) => item.token === token && !item.endTime);
    if (consultation) {
      consultation.endTime = new Date().toISOString();
      consultation.duration = Math.max(1, Math.round((new Date(consultation.endTime).getTime() - new Date(consultation.startTime).getTime()) / 60000));
    }
  }

  addLog({ user: actor.name, role: actor.role, action: `${label} ${token}` });
  return patient;
}

function findByTokenOrPhone(query) {
  const normalized = String(query || "").trim().toLowerCase();
  return store.patients.find((patient) => patient.token.toLowerCase() === normalized || patient.phone === normalized) || null;
}

module.exports = { getQueueState, generateToken, callNext, updateStatus, findByTokenOrPhone };
