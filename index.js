const Client = require('pg').Client 
//ou écrire: const {Client} = require('pg')  C LA MEME CHOSE
const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000




const client = new Client({
	user:"iqzrzazsdxbmbw",
	password: "ad7beb25841c01cdee822e2fe5521e4405fefdfdc6cb0f3624157ab6f100d204",
	host: "ec2-54-197-239-115.compute-1.amazonaws.com",
	port: 5432,			
	database: "dcd20rka0b0q59",
	ssl:true
})


app.get("/membres", async (req, res) => {
	const rows = await readMembres();
	res.send(JSON.stringify(rows))
	
})
app.listen(PORT, () => console.log(`Web server listening on port ${PORT}`))

start()

async function start() {
	await connect();
	/**
	const membres = await readMembres();
	console.log(membres)
	
	const succesCreate = await createMembres("Felix Louis", "Pere")
	console.log(`Ajout membre est ${succesCreate}`)
	
	const succesDelete = await deleteMembres("Emmrick Louis")
	console.log(`Suppression est ${succesDelete}`)
	*/
	
	async function connect() {
		try {
			await client.connect();
		} catch(e) {
			console.error(`Erreur de connexion ${e}`)
		}
	}
	
	async function readMembres() {
		try {
			const results = await client.query("select * from famille")
			return results.rows
		} catch(e) {
			return [];
		}
	}
	
	async function createMembres(nom, lien) {
		try {
	
		await client.query("insert into famille values ($1, $2)", [nom, lien]);
		return true
		} catch(e){
			return false;
		}
		
	}
	
	async function deleteMembres(nom) {
		try {
			await client.query("delete from famille where nom = $1", [nom])
			return true
		} catch(e) {
			return false;
		}
	}
	
}

