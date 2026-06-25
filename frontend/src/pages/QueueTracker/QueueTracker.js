import { state } from "../../context/clinicState.js";
import { mainLayout } from "../../layouts/MainLayout.js";
import { numberOrDash, statusText } from "../../utils/format.js";

export function QueueTracker() {
  const tracked = state.trackedQueue;
  const patient = tracked?.patient;
  const timeline = patient?.timeline?.length ? patient.timeline : [];

  return mainLayout(`
    <section class="page-heading">
      <p class="eyebrow">Patient view</p>
      <h2>Track Your Queue</h2>
    </section>
    <section class="two-column">
      <article class="panel">
        <h3>Search</h3>
        <label>Token Number or Phone Number</label>
        <input id="trackInput" placeholder="Enter token after generation">
        <button class="solid full" data-action="track">Track Queue</button>
      </article>
      <article class="panel status-panel">
        <h3>Queue Status</h3>
        <div class="status-grid">
          <span>Token Number<strong>${patient?.token || "-"}</strong></span>
          <span>Position<strong>${numberOrDash(tracked?.position)}</strong></span>
          <span>Patients Ahead<strong>${numberOrDash(tracked?.patientsAhead)}</strong></span>
          <span>Estimated Wait<strong>${tracked?.estimatedWait || "-"}</strong></span>
          <span>Current Token<strong>${tracked?.currentToken || "-"}</strong></span>
          <span>Queue Status<strong>${statusText(patient?.status)}</strong></span>
        </div>
      </article>
    </section>
    <section class="panel">
      <h3>Queue Timeline</h3>
      <div class="timeline">
        ${(timeline.length ? timeline : [{ label: "Token will appear after registration", time: "-", done: false }]).map((item) => `
          <div class="${item.done ? "done" : ""}"><span></span><strong>${item.label}</strong><small>${item.time}</small></div>
        `).join("")}
      </div>
    </section>
    <section class="panel">
      <h3>Queue Progress</h3>
      <div class="progress-line">
        ${state.queue.patients.length ? state.queue.patients.map((item) => `<span class="${item.token === patient?.token ? "active" : ""}">${item.token}</span>`).join("") : `<span>No tokens generated</span>`}
      </div>
    </section>
  `);
}
