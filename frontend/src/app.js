import { initRouter } from "./routes/router.js";
import { loadClinicState } from "./context/clinicState.js";

await loadClinicState();
initRouter();
