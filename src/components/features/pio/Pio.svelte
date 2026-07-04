<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import { pioConfig } from "@/config";

	import type { PioProps } from "./types";

	export let config: Partial<PioProps["config"]> = {};

	const settings = {
		mode: config?.mode ?? pioConfig.mode,
		hidden: config?.hiddenOnMobile ?? pioConfig.hiddenOnMobile,
		dialog: config?.dialog ?? pioConfig.dialog ?? {},
		model:
			config?.models ?? pioConfig.models ?? ["/pio/models/airi/07airi_normal_3.0_f_t03.model3.json"],
		position: pioConfig.position || "right",
		width: pioConfig.width || 280,
		height: pioConfig.height || 250,
	};

	let canvas: HTMLCanvasElement;
	let container: HTMLDivElement;
	let dialogEl: HTMLDivElement;
	let app: any = null;
	let model: any = null;
	let dialogTimer: ReturnType<typeof setTimeout> | null = null;
	let isHidden = false;

	function showDialog(text: string) {
		if (!dialogEl || !text) return;
		dialogEl.textContent = text;
		dialogEl.classList.add("active");
		if (dialogTimer) clearTimeout(dialogTimer);
		dialogTimer = setTimeout(() => {
			dialogEl?.classList.remove("active");
		}, 4000);
	}

	function randomItem(arr: string[]): string {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	async function loadModel() {
		if (!canvas) return;
		try {
			const PIXI = await import("pixi.js");
			const { Live2DModel } = await import("pixi-live2d-display/cubism4");

			app = new PIXI.Application({
				view: canvas,
				autoStart: true,
				backgroundAlpha: 0,
				width: settings.width,
				height: settings.height,
				antialias: true,
				resolution: 2,
				autoDensity: true,
			});

			model = await Live2DModel.from(settings.model[0]);
			app.stage.addChild(model);

			const scale =
				Math.min(
					app.screen.width / model.width,
					app.screen.height / model.height,
				) * 0.95;
			model.scale.set(scale);

			model.x = (app.screen.width - (model.width as number) * scale) / 2;
			model.y = (app.screen.height - (model.height as number) * scale) / 2;

			model.on("hit", () => {
				const defs = model?.internalModel?.motionManager?.definitions;
				if (defs) {
					const keys = Object.keys(defs).filter((k) => k.startsWith("w-"));
					if (keys.length > 0) {
						const group = randomItem(keys);
						const idx = Math.floor(Math.random() * defs[group].length);
						model.motion(group, idx);
					}
				}
				const touch = settings.dialog?.touch;
				if (touch && touch.length > 0) showDialog(randomItem(touch));
			});

			if (settings.dialog?.welcome) {
				setTimeout(() => showDialog(settings.dialog.welcome), 800);
			}

			draggable();
		} catch (e) {
			console.error("Live2D model load failed:", e);
		}
	}

	function draggable() {
		if (!model || settings.mode !== "draggable") return;
		if (!canvas) return;
		let isDown = false;
		let startX = 0;
		let startY = 0;
		let dx = 0;
		let dy = 0;

		canvas.addEventListener("mousedown", (ev) => {
			isDown = true;
			startX = ev.clientX;
			startY = ev.clientY;
			dx = model.x;
			dy = model.y;
			container.classList.add("active");
		});

		window.addEventListener("mousemove", (ev) => {
			if (!isDown) return;
			model.x = dx + (ev.clientX - startX) * (1 / (window as any).devicePixelRatio || 1);
			model.y =
				dy + (ev.clientY - startY) * (1 / (window as any).devicePixelRatio || 1);
		});

		window.addEventListener("mouseup", () => {
			isDown = false;
			container.classList.remove("active");
		});
	}

	function playMotion(group: string) {
		if (!model) return;
		const defs = model?.internalModel?.motionManager?.definitions;
		if (defs && defs[group]) {
			const idx = Math.floor(Math.random() * defs[group].length);
			model.motion(group, idx);
		}
	}

	function onHome() {
		window.location.href = "/";
	}

	function onInfo() {
		if (settings.dialog?.link) {
			window.open(settings.dialog.link, "_blank");
		}
	}

	function onSkin() {
		const skin = settings.dialog?.skin;
		if (skin && skin.length > 0) showDialog(randomItem(skin));
		playMotion("face_smile_01");
	}

	function onClose() {
		isHidden = true;
		if (settings.dialog?.close) showDialog(settings.dialog.close);
		if (model) model.visible = false;
		container?.classList.add("pio-hidden");
	}

	function onShow() {
		isHidden = false;
		if (model) model.visible = true;
		container?.classList.remove("pio-hidden");
	}

	onMount(() => {
		if (!pioConfig.enable) return;
		if (settings.hidden && window.matchMedia("(max-width: 1280px)").matches) return;

		let cancelled = false;
		const start = () => {
			if (cancelled) return;
			loadModel();
		};

		if ("requestIdleCallback" in window) {
			const id = (window as any).requestIdleCallback(start, { timeout: 5000 });
			return () => {
				cancelled = true;
				if (id) (window as any).cancelIdleCallback(id);
			};
		} else {
			const t = setTimeout(start, 2000);
			return () => {
				cancelled = true;
				clearTimeout(t);
			};
		}
	});

	onDestroy(() => {
		if (app) {
			app.destroy(true);
			app = null;
		}
		if (model) {
			model = null;
		}
		if (dialogTimer) clearTimeout(dialogTimer);
	});
</script>

{#if pioConfig.enable}
	<div
		class={`pio-container ${settings.position}`}
		bind:this={container}
	>
		<div class="pio-action">
			<span class="pio-home" title="Home" on:click={onHome}></span>
			<span class="pio-skin" title="Skin" on:click={onSkin}></span>
			<span class="pio-info" title="Info" on:click={onInfo}></span>
			<span class="pio-close" title="Close" on:click={onClose}></span>
		</div>
		<div class="pio-dialog" bind:this={dialogEl}></div>
		<div class="pio-show" on:click={onShow}></div>
		<canvas
			id="pio"
			bind:this={canvas}
			width={settings.width}
			height={settings.height}
		></canvas>
	</div>
{/if}

<style>
	.pio-container {
		bottom: 0;
		z-index: 52;
		color: #666;
		position: fixed;
		user-select: none;
	}

	.pio-container .pio-show {
		left: -1em;
		bottom: 1em;
		width: 3em;
		height: 3em;
		display: none;
		cursor: pointer;
		position: absolute;
		border-radius: 3em;
		border: 3px solid #fff;
		transition: transform 0.3s;
		background: url(/pio/static/avatar.jpg) center / contain;
	}

	.pio-container.pio-hidden .pio-show {
		display: block;
	}
	.pio-container.pio-hidden .pio-show:hover {
		transform: translateX(0.5em);
	}
	.pio-container.pio-hidden #pio,
	.pio-container.pio-hidden .pio-action,
	.pio-container.pio-hidden .pio-dialog {
		display: none;
	}

	.pio-container.left {
		left: 0;
	}
	.pio-container.right {
		right: 0;
	}
	.pio-container.active {
		cursor: move;
	}
	.pio-container.static {
		pointer-events: none;
	}

	.pio-container .pio-action {
		top: 3em;
		opacity: 0;
		position: absolute;
		transition: opacity 0.3s;
	}
	.pio-container.left .pio-action {
		right: 0;
	}
	.pio-container.right .pio-action {
		left: 0;
	}
	.pio-container:hover .pio-action {
		opacity: 1;
	}

	.pio-action span {
		color: #fff;
		width: 1.5em;
		height: 1.5em;
		display: block;
		cursor: pointer;
		text-align: center;
		border-radius: 66%;
		margin-bottom: 0.5em;
		border: 1px solid #666;
		background: #fff center / 70% no-repeat;
	}
	.pio-action .pio-home {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg5My43IDUwNS45SDEyOS4zYy0xMyAwLTI0LjgtNy45LTI5LjgtMTkuOS01LTEyLTIuMi0yNS45IDctMzUuMmwzMDctMzA3YzI2LjEtMjYuMSA2MC45LTQwLjUgOTgtNDAuNXM3MS45IDE0LjQgOTggNDAuNWwzMDcgMzA3YzkuMiA5LjIgMTIgMjMuMSA3IDM1LjItNSAxMi4xLTE2LjcgMTkuOS0yOS44IDE5Ljl6TTY3My4yIDkxOS45aC0zMS41Yy0xNy44IDAtMzIuMy0xNC40LTMyLjMtMzIuM3YtNzcuNGMwLTIzLjEtMTguOC00Mi4xLTQxLjktNDIuNC0yMi4zIDAuMy00MS4xIDE5LjMtNDEuMSA0Mi40djc3LjRjMCAxNy44LTE0LjQgMzIuMy0zMi4zIDMyLjNIMzQ5LjhjLTcwLjkgMC0xMjguNy02My43LTEyOC43LTE0MS45VjU4MS45YzAtMTcuOCAxNC40LTMyLjMgMzIuMy0zMi4zaDUxNi4yYzE3LjggMCAzMi4zIDE0LjQgMzIuMyAzMi4zVjc3OGMtMC4xIDc4LjMtNTcuOCAxNDEuOS0xMjguNyAxNDEuOXoiPjwvcGF0aD48L3N2Zz4=);
	}
	.pio-action .pio-close {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE1NS4yNTIgOTQzLjgyNWMtMTkuMjEzIDAtMzguNDI5LTcuMzMyLTUzLjA4OS0yMS45ODgtMjkuMzE3LTI5LjMyMS0yOS4zMTctNzYuODU1IDAtMTA2LjE3NWw3MTMuNDk0LTcxMy40OTRjMjkuMzE3LTI5LjMyMSA3Ni44NTMtMjkuMzIxIDEwNi4xNzUgMCAyOS4zMTcgMjkuMzE3IDI5LjMxNyA3Ni44NTUgMCAxMDYuMTc1bC03MTMuNDk0IDcxMy40OTRjLTE0LjY2IDE0LjY2LTMzLjg3NCAyMS45ODgtNTMuMDg5IDIxLjk4OHoiIGZpbGw9IiI+PC9wYXRoPjxwYXRoIGQ9Ik04NjguNzQ5IDk0My44MjRjLTE5LjIxMyAwLTM4LjQyOC03LjMzMi01My4wODktMjEuOTg4bC03MTMuNDk0LTcxMy40OTNjLTI5LjMxNy0yOS4zMTctMjkuMzE3LTc2Ljg1NyAwLTEwNi4xNzUgMjkuMzE2LTI5LjMxNyA3Ni44NTUtMjkuMzIxIDEwNi4xNzQgMGw3MTMuNDk0IDcxMy40OTJjMjkuMzE3IDI5LjMyMSAyOS4zMTcgNzYuODU1IDAgMTA2LjE3NS0xNC42NTcgMTQuNjYxLTMzLjg3MSAyMS45OTMtNTMuMDg3IDIxLjk5M3oiIGZpbGw9IiI+PC9wYXRoPjwvc3ZnPg==);
	}
	.pio-action .pio-skin {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTk2NS45MTEgMzEwLjUzMWwtMTc0LjQtMTc0LjM5OGMtMTMuMDIyLTEzLjAyMS0zMC45MzMtMTkuNjQ5LTQ5LjM4MS0xOC4yMjgtMS43NC0wLjE1LTMuNDIyLTAuMjI0LTUuMDctMC4yMjRsLTkyLjkxNCAwLTYuNTE3IDMuNjI1Yy0zNC40MjEgMTkuMTQ2LTc4LjM0MSAyOS42ODktMTIzLjY2OCAyOS42ODktNDUuMzI4IDAtODkuMjQ2LTEwLjU0My0xMjMuNjY3LTI5LjY4OWwtNi41MTgtMy42MjVMMjkwLjg2IDExNy42ODFjLTIzLjY5MSAwLTQ0Ljk4NiAxMi45MjQtNTUuOTk1IDMzLjQ1MUw2Mi40NzcgMzIzLjUyMWMtMTEuOSAxMS44OTktMTguNDU0IDI3LjcyLTE4LjQ1NCA0NC41NDggMCAxNi44MjkgNi41NTQgMzIuNjQ5IDE4LjQ1MyA0NC41NDlsMTI1Ljk1MyAxMjUuOTU1YzEwLjU0IDEwLjUzOCAyNC4xNTcgMTYuODc4IDM4LjgyNiAxOC4xODFsMCAzMDQuMzk5YzAgMzUuMDczIDI4LjUzMyA2My42MDYgNjMuNjA0IDYzLjYwNmg0NDYuMTk5YzM1LjA3NCAwIDYzLjYwNy0yOC41MzMgNjMuNjA3LTYzLjYwNmwtMC4wMDEtMzE3LjM0NWMxNC44NDQtMS4yMTEgMjguNjM5LTcuNTc3IDM5LjI4OC0xOC4yMjRMOTY1LjkxIDM5OS42MjhDOTkwLjQ3NSAzNzUuMDY0IDk5MC40NzUgMzM1LjA5NSA5NjUuOTExIDMxMC41MzF6Ij48L3BhdGg+PC9zdmc+);
	}
	.pio-action .pio-info {
		background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY4Mi45IDgyNS45SDI2Ny44Yy0yMS44IDAtMzkuNS0xNy43LTM5LjUtMzkuNXMxNy43LTM5LjUgMzkuNS0zOS41aDQxNS4xYzIxLjggMCAzOS41IDE3LjcgMzkuNSAzOS41cy0xNy43IDM5LjUtMzkuNSAzOS41ek04NjQuNyAxMDAuNGMtMTguNSAzLjctMzEuMyAyMC45LTMxLjMgMzkuN3Y2NDUuOGMwIDQ4LTM4LjkgODctODcgODdIMjE5LjNjLTE2LjQgMC0yOS42LTEzLjMtMjkuNi0yOS42VjczMi43YzAtMTYuMSAxMy4xLTI5LjIgMjkuMi0yOS4yaDM3NS45Yzg4LjEgMCAxNTkuNS03MS40IDE1OS41LTE1OS41VjE4NS41YzAtNjYuMi01My43LTExOS45LTExOS45LTExOS45aC00MDRjLTY2LjIgMC0xMTkuOSA1My43LTExOS45IDExOS45djY1Ny44YzAgNjAgNDguNyAxMDguNyAxMDguNyAxMDguN2g1MjcuMWM5MS43IDAgMTY2LjEtNzQuMyAxNjYuMS0xNjYuMVYxMzkuMWMwLjEtMjQuNi0yMi4yLTQzLjktNDcuNy0zOC43eiI+PC9wYXRoPjwvc3ZnPg==);
	}

	.pio-container .pio-dialog {
		bottom: 90%;
		bottom: calc(100% - 2em);
		opacity: 0;
		z-index: -1;
		font-size: 0.8em;
		min-width: 12em;
		background: #fff;
		padding: 0.75em 1em;
		border-radius: 1em;
		visibility: hidden;
		position: absolute;
		word-break: break-all;
		border: 1px solid #eee;
		transition:
			opacity 0.3s,
			visibility 0.3s;
	}
	.pio-container.left .pio-dialog {
		left: 1em;
	}
	.pio-container.right .pio-dialog {
		right: 1em;
	}
	.pio-container .pio-dialog.active {
		opacity: 1;
		visibility: visible;
	}

	#pio {
		vertical-align: middle;
		touch-action: none;
	}

	@media screen and (max-width: 768px) {
		#pio {
			width: 8em;
		}
		.pio-container {
			pointer-events: none;
		}
	}
</style>