import { mainLayout } from "../../layouts/MainLayout.js";

export function Login() {
  return mainLayout(`
    <section class="empty-state">
      <h2>Choose Your Staff Area</h2>
      <p>Each dashboard has its own login screen.</p>
      <div class="hero-actions">
        <button class="solid" data-link="/receptionist">Receptionist Login</button>
        <button class="ghost" data-link="/doctor">Doctor Login</button>
        <button class="ghost" data-link="/admin">Admin Login</button>
      </div>
    </section>
  `, true);
}
