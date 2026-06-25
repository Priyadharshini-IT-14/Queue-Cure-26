import { state } from "../../context/clinicState.js";
import { mainLayout } from "../../layouts/MainLayout.js";
import { statCards } from "../../components/ui.js";

export function DoctorDashboard() {
  const patient = state.queue.currentPatient;
  return mainLayout(`
    <section class="page-heading">
      <p class="eyebrow">Doctor room</p>
      <h2>Consultation Desk</h2>
    </section>
    <section class="doctor-grid">
      <article class="panel current-patient">
        <h3>Current Patient</h3>
        <strong class="${patient ? "" : "empty-token"}">${patient?.token || "No token yet"}</strong>
        <div class="status-grid">
          <span>Patient Name<strong>${patient?.name || "-"}</strong></span>
          <span>Age<strong>${patient?.age || "-"}</strong></span>
          <span>Phone<strong>${patient?.phone || "-"}</strong></span>
          <span>Consultation Type<strong>${patient?.type || "-"}</strong></span>
        </div>
        <div class="button-row">
          <button class="solid" data-action="start-consultation">Start Consultation</button>
          <button class="ghost" data-action="end-consultation">End Consultation</button>
        </div>
      </article>
      <article class="panel">
        <h3>Upcoming Queue</h3>
        <div class="token-stack">${state.queue.waitingPatients.length ? state.queue.waitingPatients.slice(0, 4).map((item) => `<span>${item.token}</span>`).join("") : `<span>No tokens</span>`}</div>
      </article>
    </section>
    ${statCards([
      { label: "Patients Seen Today", value: state.analytics?.patientsServed || 0 },
      { label: "Average Consultation Time", value: state.analytics?.averageConsultation || "0m" },
      { label: "Fastest Consultation", value: state.analytics?.patientsServed ? "6m" : "-" },
      { label: "Longest Consultation", value: state.analytics?.patientsServed ? "24m" : "-" }
    ])}
  `);
}
