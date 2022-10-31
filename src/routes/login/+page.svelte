<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div>
	<h1>Log in to your account</h1>
	<form method="post" use:enhance>
		<label for="email">email</label><br />
		<input id="email" type="email" name="email" /><br />
		<label for="password">password</label><br />
		<input type="password" id="password" name="password" /><br />
		<!-- <input type="submit" value="Continue" class="button" /> -->
		<button type="submit">Log In</button>
	</form>
</div>
