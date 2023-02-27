<script lang="ts">
	import { SideNav, SideNavItems, SideNavMenuItem } from "carbon-components-svelte";
    
  /** @type {import('./$types').LayoutData} */  
  export let data;

  // console.log("layout rerender")

</script>

<SideNav isOpen={true}>
    <SideNavItems>
        {#each data.positions as position}
        <SideNavMenuItem id={position.id} isSelected={data.currentSelected === position.id} href="/vote/{position.id}" data-sveltekit-preload-data="tap">{position.title}</SideNavMenuItem>
        {/each}
    </SideNavItems>
</SideNav>

<slot/>