<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
    import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import { fade } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
	
    export let data: PageData
	export let avatar: any;
	
	let modal: any;
	let modalData  = {
		id: "",
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

	let filter: any;
	
	const doModalThing = (idPengaduan:any, titlePengaduan: any, isiLaporan: any, tglPengaduan: any, foto: any, status: any) => {
		modalData.id = idPengaduan
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

	let searchStr: any = "";

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
				<small>Max 500kb*</small>
				{#if files}
				{#if Number(files[0].size)/1024 > 500}
					<p style="color:red">File too big!</p>
				{/if}
				{/if}
				<input type="text" name="foto" id="foto" value={avatar} style="display: none" readonly>
				<!-- <small>We'll never share your email with anyone else.</small> -->
				<!-- Button -->
				{#if (title == undefined || isi == undefined || title == "" || isi == "" || !files)}
					<button type="submit" disabled>Submit</button>
				{:else if Number(files[0].size)/1024 > 500}
					<button type="submit" disabled>Submit</button>
				{:else}
					<button type="submit">Submit</button>
				{/if}
			</form>
		</article>
		<div class="wap">
			<div class="grid">
				<div>
          			<input type="search" id="search" name="search" placeholder="Search" bind:value={searchStr}>
				</div>
				<div>
					<select bind:value={filter}>
						<option value="NULL">BELUM DIPROSES</option>
						<option value="PROSES">SEDANG DIPROSES</option>
						<option value="SELESAI">SUDAH DITANGGAPI</option>
					</select>
				</div>
			</div>
			<div class="table-wrapper">
				<table role="grid">
					<thead>
						<tr>
							<th scope="col">Judul</th>
							<th scope="col">Tanggal</th>
							<th scope="col">Status</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
					{#if pengaduan != undefined}
					{#each pengaduan as a}
					{#if a.status === filter}
					{#if a.titlePengaduan.includes(searchStr)}
					<tr transition:fade="{{duration: 300, easing: quartOut}}">
						<td>{a.titlePengaduan}</td>
						<td>{a.tglPengaduan}</td>
						{#if a.status === "NULL"}
						<td>BELUM DIPROSES</td>
						{:else}
						<td>{a.status}</td>
						{/if}
						<td><button on:click={() => doModalThing(a.id, a.titlePengaduan, a.isiLaporan, a.tglPengaduan, a.foto, a.status)}>Cek</button></td>
					</tr>
					{/if}
					{/if}
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
					<h5>Laporan:</h5>
					<textarea style="resize: none; height: 300px; width: 100%" readonly>{modalData.isiLaporan}</textarea>
					<small>Id: {modalData.id}</small>
				</div>
				<div>
					<h5>Foto:</h5>
					<div style="display: flex; justify-content: center;">
						<img src={modalData.foto} alt="" style="max-width: 300px;max-height:300px;float:right;">
					</div>
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
						{:else if modalData.status == "PROSES"}
						<p style="float: right">Status: SEDANG DIPROSES</p>
						{:else}
						<p style="float: right">Status: SUDAH DITANGGAPI</p>
						{/if}
					</div>
				</div>
			</footer>
			
		</Modal>
	</div>
</div>
</main>

<style>
	textarea {
		height: 200px;
	}
	thead {
		position: sticky;
		top: 0px;
		background-color: var(--background-color);
	}
	.table-wrapper{
		max-height: 650px;
		overflow-y: scroll;
		
	}
	.wap {
		margin-top: 40px;
	}
</style>
