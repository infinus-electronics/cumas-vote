<script lang="ts">
	import {
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
				<FluidForm>
					<TextInput labelText="CRSid" placeholder="cumas94" required />
					<PasswordInput
						required
						type="password"
						labelText="Password"
						placeholder="Enter password..."
					/>
				</FluidForm>
			</Column>
		</Row>
	</Grid>
</Content>
