<script lang="ts">
	import {
		Button,
		Column,
		Content,
		FluidForm,
		Grid,
		PasswordInput,
		Row,
		TextInput
	} from 'carbon-components-svelte';

	import PocketBase from 'pocketbase';

	const pb = new PocketBase('https://vote.cumas.org');

	let username: string;
	let password: string;

	function logIn() {
		console.log('attemped Log In');
	}
</script>

<Content>
	<Grid padding>
		<Row>
			<Column>
				<h1>Log in:</h1>
			</Column>
		</Row>
		<Row>
			<Column>
				<FluidForm
					on:submit={() => {
						logIn();
					}}
				>
					<TextInput labelText="CRSid" placeholder="cumas94" required bind:value={username} />
					<PasswordInput
						required
						type="password"
						labelText="Password"
						placeholder="Enter password..."
						bind:value={password}
					/>
					<Row>
						<Column>
							<Button type="submit">Submit</Button>
						</Column>
					</Row>
				</FluidForm>
			</Column>
		</Row>
	</Grid>
</Content>
