<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<h1>Create an account</h1>
	<form method="post" use:enhance>
		<label for="email">E-Mail</label><br />
		<input id="email" type="email" name="email" /><br />

		<label for="username">User Name</label><br />
		<input id="username" type="text" name="username" /><br />

		<label for="first-name">First Name</label><br />
		<input id="first-name" type="text" name="first-name" /><br />

		<label for="last-name">Last Name</label><br />
		<input id="last-name" type="text" name="last-name" /><br />

		<label for="phone">Phone</label><br />
		<input id="phone" type="tel" name="phone" /><br />

		<label for="password">Password</label><br />
		<input type="password" id="password" name="password" /><br />

		<label for="confirm-password">Confirm Password</label><br />
		<input type="password" id="confirm-password" name="confirm-password" /><br />

		<button type="submit">Submit</button>
	</form>
</div>
