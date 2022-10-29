<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<h1>Create an account</h1>
	<form method="post" use:enhance>
		<label for="username">username</label><br />
		<input id="username" name="username" /><br />
		<label for="password">password</label><br />
		<input type="password" id="password" name="password" /><br />
		<input type="submit" value="Continue" class="button" />
	</form>
</div>
