const queueService = require("../services/queueService");

const demoActor = { name: "Front Desk", role: "receptionist" };

function getState(req, res) {
  res.json(queueService.getQueueState());
}

function createToken(req, res) {
  const { name, age, phone, type } = req.body;

  if (!name || !age || !phone || !type || String(phone).length < 10) {
    res.status(400).json({ message: "Name, age, phone number, and consultation type are required." });
    return;
  }

  res.status(201).json(queueService.generateToken(req.body, req.body.actor || demoActor));
}

function callNext(req, res) {
  res.json(queueService.callNext(req.body.actor || demoActor));
}

function updateStatus(req, res) {
  const patient = queueService.updateStatus(req.params.token, req.body.status, req.body.actor || demoActor);
  if (!patient) {
    res.status(404).json({ message: "Token not found" });
    return;
  }
  res.json(patient);
}

function track(req, res) {
  const patient = queueService.findByTokenOrPhone(req.query.q);
  if (!patient) {
    res.status(404).json({ message: "No patient found for that token or phone number." });
    return;
  }

  const state = queueService.getQueueState();
  const activeQueue = state.patients.filter((item) => ["waiting", "called", "in_consultation"].includes(item.status));
  const position = activeQueue.findIndex((item) => item.token === patient.token) + 1;

  res.json({
    patient,
    position,
    patientsAhead: Math.max(position - 1, 0),
    estimatedWait: `${Math.max(position - 1, 0) * 8} Minutes`,
    currentToken: state.currentPatient?.token || "-"
  });
}

module.exports = { getState, createToken, callNext, updateStatus, track };
