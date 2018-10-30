const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const fs = require('fs')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.listen(3010, ()=> {
        console.log(`server running on port 3010`)
})

// ============================================= //
//                    AXIOS                      //
// ============================================= //


if (fs.existsSync('./server/JSON/MHW-skills.txt') === false) {
    axios.get('https://mhw-db.com/skills').then((Awyis) => {        
        fs.writeFile('./server/JSON/MHW-skills.txt', JSON.stringify(Awyis.data, null, 2), (err) => {
            if (err) return res.json({error: 'cannot write MHW-skills file'})
            console.log("MHW-skills file has been created")
        })
    }).catch((err)=> {
    return res.json({error: err})
    })  
}

if (fs.existsSync('./server/JSON/MHW-armor.txt') === false) {
    axios.get('https://mhw-db.com/armor').then((Awyis) => {
        fs.writeFile('./server/JSON/MHW-armor.txt', JSON.stringify(Awyis.data, null, 2), (err) => {
            if (err) return res.json({error: 'cannot write MHW-armor file'})
            console.log("MHW-armor file has been created")
        })
    }).catch((err)=> {
        return res.json({error: err})
    })
}

// ============================================= //
//                    ROUTER                     //
// ============================================= //

app.get('/api/skills', (req, res)=> {
    fs.readFile('./server/JSON/MHW-skills.txt', (err, data) => {
        if (err) throw res.json({error: 'cannot read skills file'});
        
        let skillsData = JSON.parse(data)
        return res.status(200).json(skillsData)
    });
})

app.get('/api/armor', (req, res)=> {
    fs.readFile('./server/JSON/MHW-armor.txt', (err, data) => {
        if (err) throw res.json({error: 'cannot read armor file'});
        
        let armorData = JSON.parse(data)
        return res.status(200).json(armorData)
    });
})