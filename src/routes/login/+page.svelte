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
		TextInput,
		ToastNotification
	} from 'carbon-components-svelte';
	

    import {pb, currentUser} from "$lib/pocketbase"
	import { goto } from '$app/navigation';
	import { error } from '@sveltejs/kit';
	
	let username: string;
	let password: string;

	let errorActive = false;
	let errorMessage = "";

	async function logIn() {
        try{
            const authData = await pb.collection('users').authWithPassword(username, password);
				console.log(authData)
				if(authData.record.username !== "superuser"){
					goto("/vote");
				}
				else{
					goto("/adminpanel");
				}
			
         
        }
        catch(err){

            
			errorActive=true;
			console.log(errorActive)
			if (err instanceof Error) errorMessage = err.message
  			else errorMessage = String(err)
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
		<Row>
			<Column>
				{#if errorActive === true}
				<ToastNotification
				title="Error"
				subtitle={errorMessage}
				caption={new Date().toLocaleString()}
				fullWidth={true}
				timeout={5000}
				on:close={()=>{
					console.log(close)
					errorActive = false;
				}}
			  />
			  {/if}
			</Column>
		</Row>
	</Grid>
	
</Content>
