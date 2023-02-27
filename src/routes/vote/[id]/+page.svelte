<script>
	import { Content } from 'carbon-components-svelte';

    /** @type {import('./$types').PageData} */  
    export let data;
    console.log(data)
  </script>

<Content>
    {data.id}
</Content>