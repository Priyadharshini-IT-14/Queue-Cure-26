import { mainLayout } from "../../layouts/MainLayout.js";

export function CreateReceptionist(){

return mainLayout(`

<section class="page-heading">

<p class="eyebrow">
Admin
</p>

<h2>Create Receptionist</h2>

<p>
Add a new receptionist account.
</p>

</section>


<section class="panel">

<label>
Receptionist Name
</label>

<input
id="receptionistName"
placeholder="Enter name"
/>


<label>
Email
</label>

<input
id="receptionistEmail"
placeholder="Email"
/>


<label>
Password
</label>

<input
type="password"
id="receptionistPassword"
placeholder="Password"
/>


<button
class="solid full"
data-action="create-receptionist">

Create Receptionist

</button>


</section>

`);

}