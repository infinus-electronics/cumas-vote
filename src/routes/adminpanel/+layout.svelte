<script>
	import { Content, SideNav } from "carbon-components-svelte";

</script>
<Content>
    <SideNav isOpen={true}>
        <slot />
    </SideNav>
</Content>