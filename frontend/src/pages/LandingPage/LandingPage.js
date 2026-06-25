import { state } from "../../context/clinicState.js";
import { mainLayout } from "../../layouts/MainLayout.js";
import { tokenText } from "../../utils/format.js";

export function LandingPage() {
  const current = state.queue.currentPatient;
  return mainLayout(`
    <section class="hero">
      <div>
        <p class="eyebrow">Transparent, real-time clinic queue management</p>
        <h1>QueueCure Pro</h1>
        <p class="hero-copy">Know exactly when it's your turn.</p>
        <div class="hero-actions">
          <button class="solid" data-link="/track">Track My Queue</button>
          <button class="ghost" data-link="/display">View Waiting Room</button>
        </div>
      </div>
      <aside class="hero-board">
        <span>NOW SERVING</span>
        <strong class="${current ? "" : "empty-token"}">${tokenText(current)}</strong><br>
        <p>${state.queue.waitingPatients.length} patients waiting</p>
      </aside>
    </section>
    <section class="feature-grid">
      ${["Real-Time Updates", "Accurate Wait Prediction", "Live Queue Tracking", "Clinic Analytics"].map((title) => `
        <article class="feature-card">
          <span class="feature-icon">${title.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>
          <h3>${title}</h3>
          <p>Clear visibility for patients, reception teams, doctors, and clinic admins.</p>
        </article>
      `).join("")}
    </section>
    <section class="workflow">
      ${["Patient Registration", "Token Generated", "Queue Tracking", "Consultation", "Analytics"].map((step, index) => `
        <div class="workflow-step"><span>${index + 1}</span><strong>${step}</strong></div>
      `).join("")}
    </section>
  `);
}
