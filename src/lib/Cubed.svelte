<script lang="ts">
	import * as THREE from "three"
	import * as SC from "svelte-cubed"
	let height = 1,
		width = 1,
		depth = 1
	export let luminance = 0.6
	export let loc = [0, 0]
</script>

<SC.Canvas antialias background={new THREE.Color("papayawhip")} fog={new THREE.FogExp2("papayawhip", 0.1)} shadows>
	<SC.Group position={[0, -height / 2, 0]}>
		<SC.Mesh
			geometry={new THREE.PlaneGeometry(50, 50)}
			material={new THREE.MeshStandardMaterial({ color: "burlywood" })}
			rotation={[-Math.PI / 2, 0, 0]}
			receiveShadow
		/>
		<SC.Primitive object={new THREE.GridHelper(50, 50, "papayawhip", "papayawhip")} position={[0, 0.001, 0]} />
	</SC.Group>

	<SC.Mesh
		geometry={new THREE.BoxGeometry()}
		material={new THREE.MeshStandardMaterial({ color: 0x0c91d5 })}
		scale={[width, height, depth]}
		castShadow
	/>

	<SC.PerspectiveCamera position={[1, 1, 3]} />
	<SC.OrbitControls enableZoom={true} maxPolarAngle={Math.PI * 0.51} />
	<SC.AmbientLight intensity={luminance} />
	<SC.DirectionalLight
		intensity={luminance}
		position={[-2, loc[1] / width, loc[0] / height]}
		shadow={{ mapSize: [2048, 2048] }}
	/>
</SC.Canvas>

<div class="controls">
	<span>{loc[0]}</span>
	<span>{loc[1]}</span>
</div>

<style>
	.controls {
		position: absolute;
		left: 1em;
		top: 1em;
	}
</style>
