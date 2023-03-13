<script lang="ts">
	import { rgbToLightness } from "./lib/utils/luminance"
	import * as tf from "@tensorflow/tfjs"
	import { onDestroy } from "svelte"
	import Cubed from "./lib/Cubed.svelte"
	import Todo from "./lib/Todo.svelte"

	const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module'})

	// Calcs
	let luminance = 0.6
	let actualLuminance = 0.6
	let loc = [1, 1]
	let dimensions = {
		width: 1024,
		height: 728,
	}

	worker.addEventListener("message", (e) => {
		const { luminance: l, x,y, loc: actualLoc} = e.data
		luminance = l
		loc = actualLoc
    	document.documentElement.style.setProperty("--luminance", `${Math.trunc(luminance * 100)}%`)
		document.documentElement.style.setProperty("--max-x", `${x}px`)
		document.documentElement.style.setProperty("--max-y", `${y}px`)
	})


	let video
	let cam

	// UI state
	let selected

	const select = (val: string) => {
		selected = val
	}

	onDestroy(() => {
		if (cam) cam.stop()
		tf.disposeVariables()
	})

	const startWebcam = async () => {
		cam = await tf.data.webcam(video)
		detectLightness()
	}

	const disableWebcam = async () => {
		if (cam) {
			cam.stop()
		}
	}

	async function detectLightness() {
		tf.engine().startScope()
		const img = await cam.capture()
		const buffer = new Uint8Array((await img.data()));
		// This is the width/height of the image we're capturing (720x1024)
		worker.postMessage({buffer, shape: img.shape})
		// img.dispose()
		tf.disposeVariables()
		tf.engine().endScope()
		window.requestAnimationFrame(detectLightness)
	}
</script>

<nav>
	<button on:click={() => select("cubed")}>Cubed</button>
	<button on:click={() => select("todo")}>Todo</button>
	{#if !cam}
		<button on:click={startWebcam}>Enable Webcam</button>
	{:else}
		<button on:click={disableWebcam}>Disable Webcam</button>
	{/if}
</nav>

<main>
	{#if selected === "cubed"}
		<Cubed {luminance} {loc} />
	{:else if selected === "todo"}
		<Todo {loc} />
	{/if}
</main>

<!-- svelte-ignore a11y-media-has-caption -->
<video height="720" width="1024" bind:this={video} autoplay={false} playsinline={true} muted={true} />

<style>
	nav {
		display: flex;
		justify-content: center;
	}

	video {
		display: none;
	}
</style>
