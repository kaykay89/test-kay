const Client = require('pg').Client 
//ou écrire: const {Client} = require('pg')  C LA MEME CHOSE
const client = new Client({
	user:"iqzrzazsdxbmbw",
	password: "ad7beb25841c01cdee822e2fe5521e4405fefdfdc6cb0f3624157ab6f100d204",
	host: "ec2-54-197-239-115.compute-1.amazonaws.com",
	port: "process.env.PORT" || 5432,			
	database: "dcd20rka0b0q59",
	ssl:true
})

client.connect()
.then(() => console.log("Connexion réussie"))
//.then(() => client.query("create table if not exists famille (nom varchar (100), lien varchar (100))"))
//.then(() => client.query("insert into famille values ($1, $2)", ["Carline Michel", "Mere"]))
.then(() => client.query("select * from famille"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())