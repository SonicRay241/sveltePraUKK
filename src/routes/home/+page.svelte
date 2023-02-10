<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
    import type { PageData } from './$types';
	
    let files: any;
    export let data: PageData
	
	$: ({ pengaduan } = data)

	const decodeImg = (b64: string) => {
		return "data:image/png;base64, " + b64
	}

	export let avatar;
	
	const onFileSelected = (e:any) => {
  	let image = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                 avatar = e.target?.result ?? ""
            };
}
</script>

<Navbar logged={true} name = { data.user?.name ?? "" } nik = {data.user?.nik ?? ""}/>
<main class="container">
	<div class="grid">
		<article>
			<form method="POST">
				<!-- Markup example 2: input is after label -->
				<label for="titlePengaduan">Pengaduan</label>
				<input type="text" name="titlePengaduan" id="titlePengaduan" placeholder="Judul Laporan">
				<div>
					<textarea id="isiLaporan" name="isiLaporan" placeholder="Isi Laporan"/>
				</div>
				<label for="foto">Upload a picture:</label>
				<input accept="image/png, image/jpeg" bind:files on:change={(e)=>onFileSelected(e)} id="foto" name="foto" type="file" />
				<!-- <small>We'll never share your email with anyone else.</small> -->
				
				<!-- Button -->
				<button type="submit">Submit</button>
			</form>
		</article>
		<div>
			<table>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Judul</th>
						<th scope="col">Tanggal</th>
						<th scope="col">Status</th>
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
					</tr>
					{/each}
					{/if}
				</tbody>
			</table>
			<img src="" alt="">
		</div>
	</div>
</main>

<style>
	textarea {
		height: 200px;
	}
</style>
