const {Client} = require('pg')

const client = new Client ({
	user:"iqzrzazsdxbmbw",
	password: "ad7beb25841c01cdee822e2fe5521e4405fefdfdc6cb0f3624157ab6f100d204",
	host: "ec2-54-197-239-115.compute-1.amazonaws.com",
	port: 5432,			
	database: "dcd20rka0b0q59",
	ssl:true
})

execute()

async function execute() {
	try {

	await client.connect()
	await client.query("BEGIN")
	await client.query("insert into famille values ($1, $2)", ["Emmrick Louis", "Frere"])
	console.log("Nouvelle ligne insérée")
	await client.query("COMMIT")
	} catch (ex) {
		console.log(`Échec ${ex}`)
		await client.query("ROLLBACK")
	} finally {
		await client.end()
		console.log("Fermé")
	}
}