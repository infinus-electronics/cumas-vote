<script lang="ts">
	import {
		Button,
		Column,
		Content,
		FluidForm,
		Grid,
		ListBox,
		PasswordInput,
		Row,
		TextInput
	} from 'carbon-components-svelte';
	

    import {pb, currentUser} from "$lib/pocketbase"
	
	let username: string;
	let password: string;

	async function logIn() {
        try{
            const authData = await pb.collection('users').authWithPassword(username, password);
            console.log(authData)

		// after the above you can also access the auth data from the authStore
		// console.log(pb.authStore.isValid);
		// console.log(pb.authStore.token);
		// console.log(pb.authStore.model.id);

		// "logout" the last authenticated model
		// pb.authStore.clear();
        }
        catch(err){
            console.log(err)
        }
		
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
