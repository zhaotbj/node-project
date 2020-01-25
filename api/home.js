const Router = require("koa-router")
let router = new Router()

const fs = require('fs')
router.get("/", async (ctx) => {
	try{
		const result= await readFile_promise("./data_json/home.json");
		ctx.body={
			code:200,
			data:JSON.parse(result)
		}
	}catch(e){
		//TODO handle the exception
		ctx.body={
			code:500,
			data:''
		}
	}
	
	
})

function readFile_promise(path){
	return new Promise((resolve, reject)=>{
				fs.readFile(path, 'utf8', (err, data) => {
					if(data){
						resolve(data);
					} else {
						reject(err)
					}
		})
	})
}



module.exports = router;
