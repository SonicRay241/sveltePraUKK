<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import type { PageData } from "./$types";
    import Modal from "$lib/components/Modal.svelte";
	import { fade, slide } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';
	import { utils, write } from "xlsx";
	import saveAs from "file-saver";
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";

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

    const doModalThing = (
		idPengaduan:any, 
		titlePengaduan: any, 
		isiLaporan: any, 
		tglPengaduan: any, 
		foto: any, 
		status: any, 
		tanggapan: any, 
		statusTanggapan: any
		) => {
  		modalData.id = idPengaduan
  		modalData.titlePengaduan = titlePengaduan
  		modalData.isiLaporan = isiLaporan
  		modalData.tglPengaduan = tglPengaduan
  		modalData.foto = foto
  		modalData.status = status

		tanggapanInp = tanggapan
		selected = statusTanggapan
      
  		modal.toggle()
  	}

	let pengaduanPage = true

	const showPengaduan = () => { pengaduanPage = true; toggle() }

	const showPetugas = () => { pengaduanPage = false; toggle() }

    let filter: any;
    let searchStr = "";

	let filterUser: any;
    let userSearchStr = "";

	let name: any;
  	let username: any;
  	let password: any;
  	let phone: any;
  	let nik: any;

	let registerRole: any;


    $: ({ pengaduan, user, tanggapan, userData } = data)

	onMount(() => {
		pengaduan?.reverse()
	})

	const generateLaporan = () => {	
		const laporanInput = pengaduan
		if (laporanInput)
		for ( var i = 0; i<laporanInput.length; i++ ) {
			delete laporanInput[i]["foto"]
		}

		const date = new Date()
		const ws = utils.json_to_sheet(laporanInput as any)
		const ws2 = utils.json_to_sheet(tanggapan as any)
		const wb = utils.book_new()
		wb.Props = {
			Title: "Laporan " + date.toDateString,
			Subject: "Laporan Pengaduan",
			Author: user?.name,
			CreatedDate: date
		}
		wb.SheetNames.push("Laporan Pengaduan")
		wb.SheetNames.push("Laporan Tanggapan")
		wb.Sheets["Laporan Pengaduan"] = ws
		wb.Sheets["Laporan Tanggapan"] = ws2

		const wbout = write(wb, {bookType: 'xlsx', type: 'binary'})

		//magic codes, if it works, it works
		let buf = new ArrayBuffer(wbout.length)
		const view = new Uint8Array(buf)
		for (let i=0; i<wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF
		const blob = new Blob([buf as BlobPart], {type:"application/octet-stream"})

		return blob
	}

	const dispatch = createEventDispatcher()

	const toggleUrutan = () => {
		dispatch("click",
		{ pengaduan }
		)
	}

	let table: HTMLTableElement, rows, switching, i, x, y, shouldSwitch: any, dir, switchcount = 0;
	function sortTable(n:any) {
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
</script>

<Navbar logged={true} name = { user?.name ?? "" } nik = {user?.nik ?? ""} admin={true} role={user?.level} telp = {user?.telepon}>
{#if user?.level === "ADMIN"}
<span style="margin:10px;cursor:pointer;" on:click={toggle} on:keypress={toggle}>
  <svg style="color:white" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="16px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg></span>
{/if}
</Navbar>
<main class="container" transition:slide="{{duration: 300, easing: quartOut}}">
	{#if showSidebar}
	<div class="sidebar" transition:slide="{{duration: 300, easing: quartOut}}">
		<div style="margin-bottom: 50px">
			<span class="close" on:click={ () => toggle() } on:keypress={ () => toggle() } style="float:right;margin:10px;margin-right:20px;cursor:pointer;color:white;"><h4>&times;</h4></span>
		</div>
		<div>
			<a href="/home/admin" on:click={showPengaduan} role="button"><h5 style="color:white">Pengaduan</h5></a><br>
			<a href="/home/admin" on:click={showPetugas} role="button"><h5 style="color:white">Registrasi</h5></a>
		</div>
	</div>
	{/if}
	{#if pengaduanPage}
  <div class="grid" transition:slide="{{duration: 300, easing: quartOut}}">
    <div class="wap">
			<div class="grid">
				<div>
          			<input type="search" id="search" name="search" placeholder="Search" bind:value={searchStr}>
				</div>
				{#if user?.level === "ADMIN"}
				<div class="grid">
					<select bind:value={filter}>
						<option value="NULL">BELUM DIPROSES</option>
						<option value="PROSES">SEDANG DIPROSES</option>
						<option value="SELESAI">SUDAH DITANGGAPI</option>
					</select>
					<button on:click={() => {saveAs(generateLaporan(), 'Laporan.xlsx')}}>Generate Laporan</button>
					<button on:click={() => sortTable(0)}>A</button>
				</div>
				{:else}
				<select bind:value={filter}>
					<option value="NULL">BELUM DIPROSES</option>
					<option value="PROSES">SEDANG DIPROSES</option>
					<option value="SELESAI">SUDAH DITANGGAPI</option>
				</select>
				{/if}
			</div>
			<div class="table-wrapper">
				<table role="grid" bind:this={table}>
					<thead>
						<tr>
							<th scope="col">Judul</th>
							<th scope="col">Tanggal</th>
							<th scope="col">Status</th>
							<th scope="col" on:click={() => location.reload()} style="cursor:pointer">
								<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16" style="color: #f4511e; float:right;">
									<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
									<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
								  </svg>
							</th>
						</tr>
					</thead>
					<tbody>
					{#if pengaduan != undefined}
					{#each pengaduan as a}
					{#if a.status === filter}
					{#if a.titlePengaduan.toLowerCase().includes(searchStr.toLowerCase())}
					<tr transition:fade="{{duration: 300, easing: quartOut}}">
						<td>{a.titlePengaduan}</td>
						<td>{a.tglPengaduan}</td>
						{#if a.status === "NULL"}
						<td>BELUM DIPROSES</td>
						{:else if a.status === "PROSES"}
						<td>SEDANG DIPROSES</td>
						{:else if a.status === "SELESAI"}
						<td>SUDAH DITANGGAPI</td>
						{/if}

						{#if tanggapan != undefined}
						{#each tanggapan as b}
						{#if b.idPengaduan === a.id}
						<td><button on:click={() => doModalThing(a.id, a.titlePengaduan, a.isiLaporan, a.tglPengaduan, a.foto, a.status, b.tanggapan, a.status)}><small>Tanggapi</small></button></td>
						{/if}
						{/each}
						{#if a.status === "NULL"}
							<td><button on:click={() => doModalThing(a.id, a.titlePengaduan, a.isiLaporan, a.tglPengaduan, a.foto, a.status, "", "NULL")}><small>Tanggapi</small></button></td>
						{/if}
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
			<div>
				<div class="grid">
					<div>
						<h5>Foto:</h5>
						<div style="display: flex; justify-content: center;">
							<img src={modalData.foto} alt="" style="max-width: 100%;max-height:300px;float:right;">
						</div>
						<br>
					</div>
					<div>
						<h5>Laporan:</h5>
						<textarea style="resize: none; height: 300px; width: 100%" readonly>{modalData.isiLaporan}</textarea>
						<small>Id: {modalData.id}</small>
					</div>
				</div>
				<div>
					<form method="POST">
						<h5>Tanggapan:</h5>
						{#if modalData.status !== "SELESAI"}
						<textarea name="isiTanggapan" id="isiTanggapan" style="resize: none; height: 300px; width: 100%" bind:value={tanggapanInp}></textarea>
						{:else}
						<textarea name="isiTanggapan" id="isiTanggapan" style="resize: none; height: 300px; width: 100%" bind:value={tanggapanInp} readonly></textarea>
						{/if}
						<div class="grid">
							<div></div>
							<div>
								<input type="text" name="pengaduanId" id="pengaduanId" style="display:none;" value={modalData.id}>
							</div>
							<div>
								{#if modalData.status !== "SELESAI"}
								<select name="selectedStatus" id="selectedStatus" bind:value={selected}>
									<option value="NULL" disabled>BELUM DIPROSES</option>
									<option value="PROSES">SEDANG DIPROSES</option>
									<option value="SELESAI">SUDAH DITANGGAPI</option>
								</select>
								{:else}
								<select name="selectedStatus" id="selectedStatus" bind:value={selected} disabled>
									<option value="NULL" disabled>BELUM DIPROSES</option>
									<option value="PROSES">SEDANG DIPROSES</option>
									<option value="SELESAI">SUDAH DITANGGAPI</option>
								</select>
								{/if}
							</div>
							{#if modalData.status !== "SELESAI"}
							<div>
								{#if tanggapan === undefined || tanggapanInp === "" || selected === "NULL"}
								<button type="submit" disabled>Submit</button>
								{:else if modalData.status === "PROSES"}
								<button formaction="?/updateTanggapan" type="submit">Submit</button>
								{:else}
								<button formaction="?/beriTanggapan" type="submit">Submit</button>
								{/if}
							</div>
							{/if}
						</div>
						
					</form>
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
{:else}
<!-- ------------------------------------------------------------------------------------------ -->
<div class="grid" transition:slide="{{duration: 300, easing: quartOut}}">
	<article class="grid" transition:slide="{{duration: 300, easing: quartOut}}">
		<div>
			<hgroup>
				<h1>Register</h1>
				<h2>Register a new account</h2>
			</hgroup>
			<form method="POST">
				<input type="text" name="name" bind:value={name} placeholder="Nama" aria-label="Nama" autocomplete="nickname" required>
				<input type="text" name="username" bind:value={username} placeholder="Username" aria-label="Username" autocomplete="nickname" required>
				<input type="password" name="password" bind:value={password} placeholder="Password" aria-label="Password" autocomplete="current-password" required>
				<input type="number" name="telepon" bind:value={phone} placeholder="Telepon" aria-label="Telepon" autocomplete="phone" required>
				{#if registerRole === "MASYARAKAT"}
				<input type="number" name="nik" bind:value={nik} placeholder="NIK" aria-label="NIK">
				{:else}
				<input type="number" name="nik" placeholder="NIK" aria-label="NIK" disabled>
				{/if}
				<select bind:value={registerRole}>
					<option value="MASYARAKAT">MASYARAKAT</option>
					<option value="PETUGAS">PETUGAS</option>
					<option value="ADMIN">ADMIN</option>
				</select>
				<input type="text" name="role" bind:value={registerRole} style="display: none;">
		<fieldset>
			<slot/>
		</fieldset>
		{#if registerRole === "MASYARAKAT"}
		{#if name == undefined || name == "" || username == undefined || username == "" || password == undefined || password == "" || phone == undefined || phone == "" || nik == undefined || nik == ""}
		<button type="submit" class="contrast" disabled>Register</button>
		{:else}
		<button formaction="?/register" type="submit" class="contrast">Register</button>
		{/if}
		{:else}
		{#if name == undefined || name == "" || username == undefined || username == "" || password == undefined || password == "" || phone == undefined || phone == ""}
		<button type="submit" class="contrast" disabled>Register</button>
		{:else}
		<button formaction="?/register" type="submit" class="contrast">Register</button>
		{/if}
		{/if}
	</form>
</div>
</article>
<div>
	<br>
	<div class="grid" transition:slide="{{duration: 300, easing: quartOut}}">
		<div>
			  <input type="search" id="search" name="search" placeholder="Search" bind:value={userSearchStr}>
		</div>
		<select bind:value={filterUser}>
			<option value="MASYARAKAT">MASYARAKAT</option>
			<option value="PETUGAS">PETUGAS</option>
			<option value="ADMIN">ADMIN</option>
		</select>
	</div>
	<div class="table-wrapper">
		<table role="grid">
			<thead>
			<tr>
				{#if filterUser === "MASYARAKAT"}
				<th scope="col">NIK</th>
				{:else}
				<th scope="col">ID</th>
				{/if}
				<th scope="col">Nama</th>
				<th scope="col">Level</th>
			</tr>
		</thead>
		<tbody>
		{#if userData != undefined}
		{#each userData as a}
		{#if a.level === filterUser}
		{#if a.name.toLowerCase().includes(userSearchStr.toLowerCase()) || a.nik.includes(userSearchStr)}
		<tr transition:fade="{{duration: 300, easing: quartOut}}">
			<td>{a.nik}</td>
			<td>{a.name}</td>
			<td>{a.level}</td>
			
		</tr>
		{/if}
		{/if}
		{/each}
		{/if}
		
	</tbody>
</table>
</div>
</div>

</div>

{/if}
</main>

<style>
	.sidebar{
		position: fixed;
		top:0;
		left:0;
		background-color: var(--primary);
		height: 100%;
		width: 100%;
		z-index: 1;
	}
	.sidebar a {
		width: 100%;
	}

	@media (min-width: 576px) {
		.sidebar {
			width: 25%;
			max-width: 300px;
		}
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

  