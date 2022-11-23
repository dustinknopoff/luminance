<script lang="ts">
	export let loc = [1, 1]
	let value = ""
	let list = []
</script>

<div class="container">
	<div class="vertical">
		<div>
			<input type="text" placeholder="I have to" bind:value />
			<button
				on:click={() => {
					list = [...list, value]
					value = ""
				}}>+</button
			>
		</div>
		<ul>
			{#each list as todo}
				<li>
					<span>{todo}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<div class="controls">
	<span>{loc[0]}</span>
	<span>{loc[1]}</span>
</div>

<style>
	:global(:root) {
		--luminance: 60%;
		--max-y: 6px;
		--max-x: 3px;
		--shadow-color: 0deg 0% var(--luminance);
	}

	:global(#app) {
		margin: 0;
		padding: 0;
	}

	.controls {
		position: absolute;
		left: 1em;
		top: 1em;
	}
	.container {
		width: 100vw;
		height: 95vh;
		background: linear-gradient(
			249.49deg,
			#01942a 0.51%,
			rgba(67, 129, 219, 0.520833) 52.92%,
			rgba(187, 47, 190, 0) 106.43%
		);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.vertical {
		display: flex;
		flex-direction: column;
	}

	input {
		width: 30vw;
		font-size: 48px;
		background: none;
		border: none;
		border-bottom: 4px solid white;
		color: white;
		padding: 10px;
		border-radius: 6px;
		box-shadow: calc(var(--max-x) * 0.33) calc(var(--max-y) * 0.33) calc(var(--max-y) * 0.33)
				hsl(var(--shadow-color) / 0.333),
			calc(var(--max-x) * 0.66) calc(var(--max-y) * 0.66) calc(var(--max-y) * 0.66) hsl(var(--shadow-color) / 0.333),
			var(--max-x) var(--max-y) var(--max-y) hsl(var(--shadow-color) / 0.333);
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		height: 33vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	li {
		width: 25vw;
		margin: 25px;
		padding: 10px;
		font-size: 36px;
		border-radius: 6px;
		box-shadow: calc(var(--max-x) * 0.33) calc(var(--max-y) * 0.33) calc(var(--max-y) * 0.33)
				hsl(var(--shadow-color) / 0.333),
			calc(var(--max-x) * 0.66) calc(var(--max-y) * 0.66) calc(var(--max-y) * 0.66) hsl(var(--shadow-color) / 0.333),
			var(--max-x) var(--max-y) var(--max-y) hsl(var(--shadow-color) / 0.333);
		overflow-y: scroll;
	}

	input::after {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	::placeholder {
		color: white;
	}

	:global(body) {
		margin: 0;
	}
</style>
