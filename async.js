const Client = require('pg').Client 
//ou écrire: const {Client} = require('pg')  C LA MEME CHOSE
const client = new Client({
	user:"iqzrzazsdxbmbw",
	password: "ad7beb25841c01cdee822e2fe5521e4405fefdfdc6cb0f3624157ab6f100d204",
	host: "ec2-54-197-239-115.compute-1.amazonaws.com",
	port: 5432,			
	database: "dcd20rka0b0q59",
	ssl:true
})

execute()

async function execute(){
	try {
		
		await client.connect()
		console.log("Connexion résussie")
		const results = await client.query("select * from famille")
		console.table(results.rows)	
	}
	catch (ex) {
		console.log(`Échec ${ex}`)
	} finally {
		await client.end()
		console.log("Déconnexion réussie") 
	}
}

