<script lang="ts">
	import 'carbon-components-svelte/css/g90.css';
	import { Content, Header, Theme } from 'carbon-components-svelte';
	import { PUBLIC_VERSION } from '$env/static/public';
</script>

<Header>
	<span slot="platform" class="platform-name">
		CUMaS Voting System &nbsp;<code class="code-01">v{PUBLIC_VERSION || ''}</code>
	</span>
</Header>

<slot />

<style lang="scss">
	.platform-name {
		display: flex;
		align-items: baseline;
	}
	@media (max-width: 580px) {
		.platform-name code {
			display: none;
		}
	}
</style>
