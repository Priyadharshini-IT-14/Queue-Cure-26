import { state } from "../../context/clinicState.js";
import { mainLayout } from "../../layouts/MainLayout.js";
import { logsTable, queueTable, statCards } from "../../components/ui.js";
import { escapeHtml, tokenText } from "../../utils/format.js";

export function ReceptionistDashboard() {
  const draft = state.registrationDraft;
  const patient = state.generatedTokenModal;
  return mainLayout(`
    <section class="page-heading">
      <p class="eyebrow">Reception desk</p>
      <h2>Queue Control</h2>
    </section>
    ${statCards([
      { label: "Patients Waiting", value: state.queue.waitingPatients.length },
      { label: "Current Token", value: tokenText(state.queue.currentPatient) },
      { label: "Average Wait", value: state.analytics?.averageWait || "0m" },
      { label: "Queue Status", value: state.queue.patients.length ? "Open" : "Not Started" }
    ])}
    <section class="dashboard-grid">
      <article class="panel">
        <h3>Patient Registration</h3>
        <form id="registrationForm">
          <label>Name</label><input name="name" value="${escapeHtml(draft.name)}" placeholder="Patient name" autocomplete="name">
          <label>Age</label><input name="age" value="${escapeHtml(draft.age)}" type="number" min="1" max="120" placeholder="35">
          <label>Phone Number</label><input name="phone" value="${escapeHtml(draft.phone)}" inputmode="numeric" placeholder="9876543210">
          <label>Consultation Type</label>
          <select name="type">
            ${["General", "Dental", "Physio", "Follow-up"].map((type) => `<option ${draft.type === type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
          <button type="button" class="solid full" data-action="generate-token">Generate Token</button>
        </form>
      </article>
      <article class="panel">
        <h3>Activity Feed</h3>
        ${logsTable(state.queue.logs.slice(0, 6))}
      </article>
    </section>
    <section class="panel">
      <div class="panel-title">
        <h3>Queue Table</h3>
        <button class="solid" data-action="call-next">Call Next</button>
      </div>
      ${queueTable(state.queue.patients)}
    </section>
    ${patient ? `
      <section class="modal-backdrop">
        <article class="token-modal">
          <p class="eyebrow">Token generated</p>
          <strong>${patient.token}</strong>
          <h3>${escapeHtml(patient.name)}</h3>
          <p>${escapeHtml(patient.type)} consultation · ${patient.created}</p>
          <div class="modal-actions">
            <button class="solid" data-action="register-another">Register Another</button>
            <button class="ghost" data-action="track-generated">Track Token</button>
            <button data-action="close-token-modal">Close</button>
          </div>
        </article>
      </section>
    ` : ""}
  `);
}
