<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
</script>

<header>
	<div />
</header>
<slot />

<style lang="scss">
	header {
		position: fixed;
		z-index: 8000;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		height: 3rem;
		align-items: center;
		border-bottom: 1px solid #393939;
		background-color: #161616;
	}
</style>
