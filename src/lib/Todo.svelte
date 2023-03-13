<script lang="ts">
	export let loc = [1, 1]
	let value = ""
	let list = []
</script>

<div class="container">
	<div class="vertical">
		<div class="baseline">
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
		--shadow-color: 0deg 12% var(--luminance);
		--bg-color: var(--shadow-color);
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
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.vertical {
		display: flex;
		flex-direction: column;
		flex-basis: 90vw;
		align-items: center;
	}

	input {
		width: 30vw;
		min-width: 150px;
		font-size: calc(1rem + 2vw);
		background: none;
		border: none;
		border-bottom: 4px solid var(--bg-color);
		color: var(--bg-color);
		padding: 10px;
		border-radius: 6px;
		box-shadow: var(--max-x) var(--max-y) 2px hsla(var(--shadow-color) / 0.333),
			calc(var(--max-x) + 0.6px) calc(var(--max-y) + 0.6px) calc(var(--max-y) + 0.6px) 4px
				hsla(var(--shadow-color) / 0.333),
			calc(var(--max-x)+4px) calc(var(--max-y) + 4px) calc(var(--max-y) + 0.6px) 6px hsla(var(--shadow-color) / 0.333);
		/* filter: 
			 drop-shadow(
			var(--max-x) var(--max-y) calc(var(--max-y) * 0.25) hsl(var(--shadow-color) / 0.333)
		); */
	}

	.baseline {
		display: flex;
		align-items: baseline;
		gap: 16px;
	}

	button {
		font-size: calc(1rem + 2vw);
		border-radius: 6px;
		box-shadow: calc(var(--max-x) * 0.33) calc(var(--max-y) * 0.33) calc(var(--max-y) * 0.33)
				hsla(var(--shadow-color) / 0.333),
			calc(var(--max-x) * 0.66) calc(var(--max-y) * 0.66) calc(var(--max-y) * 0.66) hsla(var(--shadow-color) / 0.333),
			var(--max-x) var(--max-y) var(--max-y) hsla(var(--shadow-color) / 0.333);
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
		overflow-y: scroll;
	}

	li {
		width: 25vw;
		margin: 25px;
		padding: 10px;
		font-size: calc(1rem + 2vw);
		border-radius: 6px;
		color: var(--bg-color);
		transition: all 1s ease-in-out;
		box-shadow: calc(var(--max-x) * 0.33) calc(var(--max-y) * 0.33) calc(var(--max-y) * 0.33)
				hsla(var(--shadow-color) / 0.333),
			calc(var(--max-x) * 0.66) calc(var(--max-y) * 0.66) calc(var(--max-y) * 0.66) hsla(var(--shadow-color) / 0.333),
			var(--max-x) var(--max-y) var(--max-y) hsla(var(--shadow-color) / 0.333);
	}

	input::after {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	::placeholder {
		color: var(--bg-color);
	}

	:global(body) {
		margin: 0;
	}
</style>
