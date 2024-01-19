const fs = require('fs');

fs.readdir('./music', (err, data) =>{
    if(err){
        console.log(err)
    }

   
    fs.writeFile('./tracks.txt', data.toString(), ()=>{
        console.log('data has been updated')
    })
})
