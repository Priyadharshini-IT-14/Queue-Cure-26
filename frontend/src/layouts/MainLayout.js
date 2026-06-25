import { state } from "../context/clinicState.js";

export function mainLayout(content, compact = false) {
  return `
    <header class="topbar">
      <button class="brand" data-link="/">QueueCure Pro</button>
      <nav>
        <button data-link="/track">Track</button>
        <button data-link="/display">Waiting Room</button>
        <button data-link="/receptionist">Receptionist</button>
        <button data-link="/doctor">Doctor</button>
        <button data-link="/admin">Admin</button>
      </nav>
      <div class="session">
        ${state.user ? `<span>${state.user.name}</span><button data-action="logout">Logout</button>` : `<span>Staff login opens inside each dashboard</span>`}
      </div>
    </header>
    <main class="${compact ? "compact-main" : ""}">${content}</main>
  `;
}

export function guarded(role, page) {
  if (!state.user || state.user.role !== role) {
    return mainLayout(roleLogin(role), true);
  }
  return page();
}

export function roleLogin(role) {
  const labels = {
    receptionist: "Receptionist Dashboard",
    doctor: "Doctor Dashboard",
    admin: "Admin Dashboard"
  };

  const emails = {
    receptionist: "receptionist@test.com",
    doctor: "doctor@test.com",
    admin: "admin@test.com"
  };

  return `
    <section class="login-shell">
      <article class="panel login-card">
        <p class="eyebrow">${role} access</p>
        <h2>${labels[role] || "Staff Dashboard"}</h2>
        <p class="login-copy">Sign in to continue. This page only accepts a ${role} account.</p>
        <label>Email</label>
        <input id="email" value="${emails[role] || ""}" autocomplete="username">
        <label>Password</label>
        <input id="password" type="password" placeholder="Enter password" autocomplete="current-password">
        <button class="solid full" data-action="role-login" data-role="${role}">Login</button>
      </article>
    </section>
  `;
}
