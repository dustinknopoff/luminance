<script lang="ts">
	import { rgbToLightness } from "./lib/utils/luminance"
	import * as tf from "@tensorflow/tfjs"
	import { onMount } from "svelte"
	import Cubed from "./lib/Cubed.svelte"
	import Todo from "./lib/Todo.svelte"

	let luminance = 0.6
	let loc = [0, 0]
	let dimensions = {
		width: 1024,
		height: 728,
	}

	let selected

	const select = (val: string) => {
		selected = val
	}

	onMount(async () => {
		const videoElement = document.createElement("video")
		videoElement.width = dimensions.width
		videoElement.height = dimensions.height
		let cam = await tf.data.webcam(videoElement)
		setInterval(async () => {
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
			luminance = (lightness.sum().arraySync() as number) / (lightness.arraySync() as Array<number>).length / 100
			document.documentElement.style.setProperty("--luminance", `${Math.trunc(luminance * 100)}%`)
			const maxInd = lightness.argMax(0).arraySync() as number
			loc = [Math.floor(maxInd / height), maxInd % height]
			document.documentElement.style.setProperty("--max-y", `${(loc[0] / height) * 10}px`)
			document.documentElement.style.setProperty("--max-x", `${(loc[1] / width) * 10}px`)
			tf.dispose()
		}, 50)
	})
</script>

<nav>
	<button on:click={() => select("cubed")}>Cubed</button>
	<button on:click={() => select("todo")}>Todo</button>
</nav>

<main>
	{#if selected === "cubed"}
		<Cubed {luminance} {loc} />
	{:else if selected === "todo"}
		<Todo {loc} />
	{/if}
</main>
