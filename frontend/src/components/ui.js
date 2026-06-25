import { state } from "../context/clinicState.js";

export function statCards(items) {
  return `<section class="stats-grid">${items.map((item) => `
    <article class="stat-card">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <small>${item.note || ""}</small>
    </article>
  `).join("")}</section>`;
}

export function queueTable(patients) {
  if (!patients.length) {
    return `<div class="empty-state"><h2>No Tokens Generated</h2><p>Register a patient and press Generate Token to start the queue.</p></div>`;
  }

  return `<div class="table">
    <div class="table-head"><span>Token</span><span>Patient</span><span>Status</span><span>Created Time</span><span>Actions</span></div>
    ${patients.map((patient) => `
      <div class="table-row">
        <span>${patient.token}</span>
        <span>${patient.name}</span>
        <span><mark>${patient.status.replace("_", " ")}</mark></span>
        <span>${patient.created}</span>
        <span class="row-actions">
          <button data-token="${patient.token}" data-action="skip">Skip</button>
          <button data-token="${patient.token}" data-action="recall">Recall</button>
        </span>
      </div>
    `).join("")}
  </div>`;
}

export function logsTable(logs = state.queue.logs) {
  return `<div class="table logs-table">
    <div class="table-head"><span>User</span><span>Role</span><span>Action</span><span>Time</span></div>
    ${logs.length ? logs.map((log) => `<div class="table-row"><span>${log.user}</span><span>${log.role}</span><span>${log.action}</span><span>${log.time}</span></div>`).join("") : `<div class="table-row"><span>-</span><span>-</span><span>No activity yet</span><span>-</span></div>`}
  </div>`;
}

export function chartCard(title, values) {
  return `<article class="panel"><h3>${title}</h3><div class="bars">${values.map((value) => `<span style="height:${value}%"></span>`).join("")}</div></article>`;
}

export function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  document.body.appendChild(item);
  setTimeout(() => item.remove(), 2600);
}
