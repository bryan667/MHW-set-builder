const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path')
const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3010;

app.use(express.static(path.join(__dirname, '/../build')))

app.listen(port, () => {
      console.log(`server running on port 3010`);
});

// ============================================= //
//                    AXIOS                      //
// ============================================= //

if (fs.existsSync('./server/JSON/MHW-skills.json') === false) {
      axios.get('https://mhw-db.com/skills')
            .then(Awyis => {
                  let skillData = Awyis.data
                  let tempState = [];

                  skillData.forEach((skill, keySkill) => {
                        skill.ranks.forEach((rank, key) => {
                              tempState.push({
                                    key: skillData[keySkill].ranks[key].slug,
                                    text: skillData[keySkill].ranks[key].slug,
                                    value: skillData[keySkill].ranks[key].slug,
                                    level: skillData[keySkill].ranks[key].level,
                                    name: skillData[keySkill].ranks[key].skillName,
                              });
                        });
                  });

                  fs.writeFile('./server/JSON/MHW-skills.json', JSON.stringify(tempState, null, 1),
                        err => {
                              if (err) throw err
                              console.log('MHW-skills file has been created');
                  });


            })
            .catch(err => {
                  console.log('unable to download skill json file: ', err);
            });
}

if (fs.existsSync('./server/JSON/MHW-armor.json') === false) {
      axios.get('https://mhw-db.com/armor')
            .then(Awyis => {
                  let armorData = Awyis.data
                  let tempState = [];

                  armorData.forEach((armor, keyArmor) => {
                        tempState.push({
                              name: armor.name,
                              type: armor.type,
                        });

                        tempState[keyArmor].skills = [];

                        armor.skills.forEach((skills, key) => {
                              tempState[keyArmor].skills.push({
                                    slug: skills.slug,
                                    level: skills.level,
                                    description: skills.description,
                                    skillName: skills.skillName,
                              });
                        });
                  });

                  fs.writeFile('./server/JSON/MHW-armor.json', JSON.stringify(tempState, null, 1),
                        err => {
                              if (err) throw err
                              console.log('MHW-armor file has been created');
                  })
            })                  
            .catch(err => {
                  console.log('unable to download armor json file: ', err);
            });
}

// ============================================= //
//                    ROUTER                     //
// ============================================= //

app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname+'/../build/index.html'));
});

app.get('/api/skills', (req, res) => {
      fs.readFile('./server/JSON/MHW-skills.json', (err, data) => {
            if (err) throw res.json({ error: 'cannot read skills file' });

            let skillsData = JSON.parse(data);
            return res.status(200).json(skillsData);
      });
});

app.get('/api/armor', (req, res) => {
      fs.readFile('./server/JSON/MHW-armor.json', (err, data) => {
            if (err) throw res.json({ error: 'cannot read armor file' });

            let armorData = JSON.parse(data);
            return res.status(200).json(armorData);
      });
});
