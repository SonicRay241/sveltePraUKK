<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
    import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	
    export let data: PageData
	export let avatar: any;
	
	let modal: any;
	let modalData  = {
		titlePengaduan: "",
		isiLaporan: "",
		tglPengaduan: "",
		foto: "",
		status: ""
	}

	let title: any;
	let isi: any;

	let files: any;
	let imageGenerated: boolean = false
	
	const doModalThing = (titlePengaduan: any, isiLaporan: any, tglPengaduan: any, foto: any, status: any) => {
		modalData.titlePengaduan = titlePengaduan
		modalData.isiLaporan = isiLaporan
		modalData.tglPengaduan = tglPengaduan
		modalData.foto = foto
		modalData.status = status

		modal.toggle()
	}

	const onFileSelected = (e:any) => {
	let image = e.target.files[0];
		imageGenerated = true
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = e => {
			avatar = e.target?.result ?? ""
		};
	}

	$: ({ pengaduan } = data)
</script>

<Navbar logged={true} name = { data.user?.name ?? "" } nik = {data.user?.nik ?? ""}/>
<main class="container">
	<div class="grid">
		<article>
			<form method="POST">
				<!-- Markup example 2: input is after label -->
				<label for="titlePengaduan"><h3>Pengaduan</h3></label>
				<input type="text" bind:value={title} name="titlePengaduan" id="titlePengaduan" placeholder="Judul Laporan">
				<div>
					<textarea id="isiLaporan" bind:value={isi} name="isiLaporan" placeholder="Isi Laporan" style="resize: vertical;"/>
				</div>
				<label for="image">Upload a picture:</label>
				<input accept="image/png, image/jpeg" bind:files on:change={(e)=>onFileSelected(e)} id="image" name="image" type="file" />
				<small>Max 900kb*</small>
				{#if files}
				{#if Number(files[0].size)/1024 > 900}
					<p style="color:red">File too big!</p>
				{/if}
				{/if}
				<input type="text" name="foto" id="foto" value={avatar} style="display: none" readonly>
				<!-- <small>We'll never share your email with anyone else.</small> -->
				<!-- Button -->
				{#if (title == undefined || isi == undefined || title == "" || isi == "" || !files)}
					<button type="submit" disabled>Submit</button>
				{:else if Number(files[0].size)/1024 > 900}
					<button type="submit" disabled>Submit</button>
				{:else}
					<button type="submit">Submit</button>
				{/if}
			</form>
		</article>
		
		<div class="table-wrapper">
			<table role="grid">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Judul</th>
						<th scope="col">Tanggal</th>
						<th scope="col">Status</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					{#if pengaduan != undefined}
					{#each pengaduan as a, i}
					<tr>
						<th scope="row">{i + 1}</th>
						<td>{a.titlePengaduan}</td>
						<td>{a.tglPengaduan}</td>
						{#if a.status === "NULL"}
						<td>BELUM DIPROSES</td>
						{:else}
						<td>{a.status}</td>
						{/if}
						<td><button on:click={() => doModalThing(a.titlePengaduan, a.isiLaporan, a.tglPengaduan, a.foto, a.status)}>Cek</button></td>
					</tr>
					{/each}
					{/if}
					
				</tbody>
			</table>
		</div>
		<Modal bind:this={modal}>
			<header>
				<h2>{modalData.titlePengaduan}</h2>
			</header>
			<div class="grid">
				<div>
					<p>
						{modalData.isiLaporan}
					</p>
				</div>
				<div>
					<img src={modalData.foto} alt="" style="max-width: 300px;float:right;">
				</div>
			</div>
			<footer>
				<div class="grid">
					<div>
						<p>{modalData.tglPengaduan}</p>
					</div>
					<div>
						{#if modalData.status == "NULL"}
						<p style="float: right">Status: BELUM DIPROSES</p>
						{:else}
						<p style="float: right">Status: {modalData.status}</p>
						{/if}
					</div>
				</div>
			</footer>

	</Modal>
	</div>
</main>

<style>
	textarea {
		height: 200px;
	}
	thead {
		position: sticky;
		top: 0px;

		backdrop-filter: blur(5px);
	}
	.table-wrapper{
		max-height: 700px;
		overflow-y: scroll;
		margin-top: 40px;
	}
</style>
