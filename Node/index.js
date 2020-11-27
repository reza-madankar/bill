var express = require("express");
var app = express();
var cors = require('cors')
const csvjson = require('csvjson');
const readFile = require('fs').readFile;

app.listen(8081, () => {
app.use(cors())

app.get("/bill", (req, res, next) => {
	let type = req.query.type.toLowerCase();
	var tempData = [];
	
	readFile(`./data/${type}_bill_data.csv`, 'utf-8', (err, items) => {
			if(err) {
				return res.status(400).json({status: 400, message: err})
			}
			else{
				csvjson.toObject(items).map( x =>{
					
					var index = tempData.map(function(e) { return e.date; }).indexOf(`${x.year}-${x.month}`);	
					if(index >= 0 ){
						tempData[index].value +=  (type === 'water' ?  parseInt(x.m_3_consumption) : 
															          (type === 'gas' ? parseInt(x.g_j_consumption) : parseInt(x.k_wh_consumption)));
					}
					else {
					  var hist = { "date" :`${x.year}-${x.month}`,
								   "datetime" : (new Date(x.year, x.month, 1)).toISOString().split('T')[0],
								   "datetime2" : new Date(x.year, x.month, 1),
								   "year" :parseInt(x.year),
								   "month" : parseInt(x.month),
								   "value" : (type === 'water' ?  parseInt(x.m_3_consumption) : 
															    (type === 'gas' ? parseInt(x.g_j_consumption) : parseInt(x.k_wh_consumption)))
								};
					  tempData.push( hist);
					}
			 });
			}	
	
			res.json(tempData.sort((a,b) => (a.datetime > b.datetime) ? 1 : ((b.datetime > a.datetime) ? -1 : 0)));
			
		});
	
	});
});
