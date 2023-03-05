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
	import { getContext } from 'svelte';
	import { applyAction, enhance } from '$app/forms';

	// const { currentUser, pb } = getContext(key) satisfies contextStore;
	
	let username: string;
	let password: string;

	let errorActive = false;
	let errorMessage = "";

	async function logIn() {
        try{
            const authData = await pb.collection('users').authWithPassword(username, password);
				// console.log(authData)
				if(authData.record.username !== "superuser"){
					goto("/vote");
				}
				else{
					goto("/adminpanel");
				}
			
         
        }
        catch(err){

			errorActive=true;
			// console.log(errorActive)
			if (err instanceof Error) errorMessage = err.message
  			else errorMessage = String(err)
			// console.log(err)
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
					method="POST"
					
					
				>
					<TextInput labelText="CRSid" type="id" name="id" placeholder="cumas94" required />
					<PasswordInput
						required
						name= "password"
						type="password"
						labelText="Password"
						placeholder="Enter password..."
						
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
				lowContrast={true}
				timeout={5000}
				on:close={()=>{
					// console.log(close)
					errorActive = false;
				}}
			  />
			  {/if}
			</Column>
		</Row>
	</Grid>
	
</Content>
