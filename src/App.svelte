<script lang="ts">
	import { rgbToLightness } from "./lib/utils/luminance"
	import * as tf from "@tensorflow/tfjs"
	import { onDestroy } from "svelte"
	import Cubed from "./lib/Cubed.svelte"
	import Todo from "./lib/Todo.svelte"

	// Calcs
	let luminance = 0.6
	let actualLuminance = 0.6
	let loc = [1, 1]
	let logLoc = [1, 1]
	let actualLoc = [0, 0]
	let dimensions = {
		width: 1024,
		height: 728,
	}

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

	// Clamp number between two values with the following line:
	const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

	async function detectLightness() {
		tf.engine().startScope()
		const img = await cam.capture()
		const [width, height, _rgbLen] = img.shape
		dimensions = { width, height }
		const lightness = tf.tensor(
			((await img.reshape([width * height, 3]).array()) as Array<number[]>).map((values) => {
				// @ts-ignore
				const lightness = rgbToLightness(...values)
				return lightness
			}),
		)
		actualLuminance = (lightness.sum().arraySync() as number) / (lightness.arraySync() as Array<number>).length / 100
		luminance = clamp(luminance - 0.1, actualLuminance, luminance + 0.1)
		document.documentElement.style.setProperty("--luminance", `${Math.trunc(luminance * 100)}%`)
		const maxInd = lightness.argMax(0).arraySync() as number
		actualLoc = [Math.floor(maxInd / height), maxInd % height]
		loc = actualLoc
		logLoc = [(loc[0] / height) * 10, (loc[1] / width) * 10]
		logLoc = [
			Math.trunc(clamp(logLoc[0] - 1, (loc[0] / height) * 10, logLoc[0] + 1)),
			Math.trunc(clamp(logLoc[1] - 1, (loc[1] / width) * 10, logLoc[1] + 1)),
		]
		document.documentElement.style.setProperty("--max-y", `${logLoc[0]}px`)
		document.documentElement.style.setProperty("--max-x", `${logLoc[1]}px`)
		lightness.dispose()
		img.dispose()
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
