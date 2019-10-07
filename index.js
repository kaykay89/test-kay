const Pool = require('pg').Pool 
//ou écrire: const {Client} = require('pg')  C LA MEME CHOSE
const express = require("express")
const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())

const path = require('path')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const pool = new Pool ({
	connectionString: process.env.DATABASE_URL,
	ssl:true
})

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))

app.get('/membres', async (req, res) => {	
	const rows = await readMembres();
	res.setHeader("content-type", "application/json")
	res.send(JSON.stringify(rows))
	
})

app.post('/membres', async (req, res) => {
	let result = {}

	try{
	
		const reqJson = req.body;
		await createMembres(reqJson.nom, reqJson.lien);
		result.success = true;
		
	} catch (e) {
		result.success = false;
	} finally {
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(result))
	}
	
})

app.delete('/membres', async (req, res) => {
	let result = {}

	try{	
		const reqJson = req.body;
		await deleteMembres(reqJson.nom);
		result.success = true;
		
	} catch (e) {
		result.success = false;
	} finally {
		res.setHeader("content-type", "application/json")
		res.send(JSON.stringify(result))
	}
	
})

app.listen(PORT, () => console.log(`Web server listening on port ${PORT}`))

// start()

const client = await pool.connect();

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
	
	const membres = await deleteNull();
	
	
}	
	
/**	
async function connect() {
	try {
		const client = await pool.connect();
	} catch(e) {
		console.error(`Erreur de connexion ${e}`)
	}
}
*//
	
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

async function deleteNull() {
	try {
		await client.query("delete from famille where nom is null")
		return true
	} catch(e) {
		return false;
		console.log("Incapable de supprimer les NULL")
	}
}

	


