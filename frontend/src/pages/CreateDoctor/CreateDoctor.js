import { mainLayout } from "../../layouts/MainLayout.js";

export function CreateDoctor() {

return mainLayout(`

<section class="page-heading">

<p class="eyebrow">
Admin
</p>

<h2>Create Doctor</h2>

<p>
Add a new doctor account.
</p>

</section>


<section class="panel">

<label>
Doctor Name
</label>

<input 
id="doctorName"
placeholder="Enter doctor name"
/>


<label>
Email
</label>

<input
id="doctorEmail"
placeholder="Doctor email"
/>


<label>
Password
</label>

<input
type="password"
id="doctorPassword"
placeholder="Password"
/>


<button
class="solid full"
data-action="create-doctor">

Create Doctor

</button>


</section>

`);

}