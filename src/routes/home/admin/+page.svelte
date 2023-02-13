<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { PageData } from "./$types";
    import Modal from "$lib/components/Modal.svelte";
	import { fade, slide } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';

    let modal: any;
	  let modalData  = {
		    id: "",
		    titlePengaduan: "",
		    isiLaporan: "",
		    tglPengaduan: "",
		    foto: "",
		    status: "",

			tanggapan: "",
			statusTanggapan: ""
	  }

    export let data: PageData

    let showSidebar = false

	let tanggapanInp = "";
	let selected: any;

    const toggle = () => { showSidebar = (showSidebar === false) ? true : false }

    const doModalThing = (idPengaduan:any, titlePengaduan: any, isiLaporan: any, tglPengaduan: any, foto: any, status: any, tanggapan: any, statusTanggapan: any) => {
  		modalData.id = idPengaduan
  		modalData.titlePengaduan = titlePengaduan
  		modalData.isiLaporan = isiLaporan
  		modalData.tglPengaduan = tglPengaduan
  		modalData.foto = foto
  		modalData.status = status

		modalData.tanggapan = tanggapan
		modalData.statusTanggapan = statusTanggapan

		tanggapanInp = "";
		selected = "NULL"
      
  		modal.toggle()
  	}

    let filter: any;
    let searchStr = "";


    $: ({ pengaduan, user, tanggapan } = data)

</script>

<Navbar logged={true} name = { user.name ?? "" } nik = {user.nik ?? ""} admin={true} role={user.level} telp = {user.telepon}>
<span style="margin:10px;cursor:pointer;" on:click={toggle} on:keypress={toggle}>
  <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg></span>
</Navbar>
<main class="container">
	{#if showSidebar}
	<div class="sidebar" transition:slide="{{duration: 300, easing: quartOut}}">
			<span class="close" on:click={ () => toggle() } on:keypress={ () => toggle() } style="float:right;margin:10px;margin-right:20px;cursor:pointer;"><h4>&times;</h4></span>
	</div>
	{/if}
  <div class="grid">
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

						{#if tanggapan != undefined}
						{#each tanggapan as b}
						{#if b.idPengaduan === a.id}
						<td><button on:click={() => doModalThing(a.id, a.titlePengaduan, a.isiLaporan, a.tglPengaduan, a.foto, a.status, b.tanggapan, a.status)}>Tanggapi</button></td>
						{/if}
						{:else}
						<td><button on:click={() => doModalThing(a.id, a.titlePengaduan, a.isiLaporan, a.tglPengaduan, a.foto, a.status, "", "NULL")}>Tanggapi</button></td>
						{/each}
						{/if}
						
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
			<div>
				<form method="POST">
					<h5>Tanggapan:</h5>
					<textarea name="isiTanggapan" id="isiTanggapan" style="resize: none; height: 300px; width: 100%" bind:value={tanggapan}></textarea>
					<div class="grid">
						<div></div>
						<div>
							<select name="selectedStatus" id="selectedStatus" bind:value={selected}>
								<option value="NULL" disabled>BELUM DIPROSES</option>
								<option value="PROSES">SEDANG DIPROSES</option>
								<option value="SELESAI">SUDAH DITANGGAPI</option>
							</select>
						</div>
						<div>
							{#if tanggapan === undefined || tanggapanInp === "" || selected === "NULL"}
							<button type="submit" disabled>Submit</button>
							{:else}
							<button type="submit">Submit</button>
							{/if}
						</div>
					</div>
					
				</form>
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
	.sidebar{
		position: fixed;
		top:0;
		left:0;
		background-color: var(--primary);
		height: 100%;
		width: 20%;
		z-index: 1;
	}
	textarea {
		height: 200px;
	}
	thead {
		position: sticky;
		top: 0px;

		backdrop-filter: blur(5px);
	}
	.table-wrapper{
		max-height: 650px;
		overflow-y: scroll;
		
	}
	.wap {
		margin-top: 40px;
	}
</style>

  