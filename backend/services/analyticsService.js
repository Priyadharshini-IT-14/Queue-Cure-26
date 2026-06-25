const store = require("../models/clinicStore");

function minutesBetween(start, end) {
  if (!start || !end) return null;
  const diff = new Date(end).getTime() - new Date(start).getTime();
  if (!Number.isFinite(diff) || diff < 0) return null;
  return Math.max(1, Math.round(diff / 60000));
}

function average(values) {
  const valid = values.filter((value) => Number.isFinite(value));
  if (!valid.length) return 0;
  return Math.round(valid.reduce((sum, value) => sum + value, 0) / valid.length);
}

function hourLabel(hour) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour} ${suffix}`;
}

function getAnalytics() {
  const completed = store.patients.filter((patient) => patient.status === "completed").length;
  const waiting = store.patients.filter((patient) => patient.status === "waiting").length;
  const waitEstimates = store.patients.map((patient, index) => {
    if (patient.status === "completed") return 0;
    if (patient.status === "called" || patient.status === "in_consultation") return 2;
    return Math.max(0, index) * 8;
  });
  const consultationDurations = store.consultations.map((item) => item.duration).filter(Number.isFinite);
  const byHour = Array.from({ length: 24 }, () => 0);

  store.patients.forEach((patient) => {
    const date = patient.createdAt ? new Date(patient.createdAt) : null;
    if (date && !Number.isNaN(date.getTime())) byHour[date.getHours()] += 1;
  });

  const peakCount = Math.max(...byHour);
  const peakIndex = peakCount > 0 ? byHour.indexOf(peakCount) : -1;
  const lastSevenHours = byHour.slice(Math.max(0, new Date().getHours() - 6), new Date().getHours() + 1);
  const chartValues = (lastSevenHours.length ? lastSevenHours : byHour.slice(9, 16)).map((count) => Math.max(8, count * 18));

  return {
    todayPatients: store.patients.length,
    patientsServed: completed,
    patientsWaiting: waiting,
    averageWait: `${average(waitEstimates)}m`,
    averageConsultation: `${average(consultationDurations)}m`,
    longestWait: `${Math.max(0, ...waitEstimates)}m`,
    peakHour: peakIndex >= 0 ? hourLabel(peakIndex) : "-",
    patientsPerHour: chartValues,
    queueLengthTrend: store.patients.slice(-7).map((patient, index) => patient.status === "completed" ? 8 : Math.max(10, (index + 1) * 12)),
    consultationTrend: consultationDurations.slice(-7).map((duration) => Math.min(100, Math.max(8, duration * 6))),
    waitSparkline: waitEstimates.slice(-6).map((value) => Math.min(100, Math.max(10, value * 4))),
    heatmap: byHour.map((count) => Math.max(1, Math.min(10, count + 1)))
  };
}

module.exports = { getAnalytics, minutesBetween };
