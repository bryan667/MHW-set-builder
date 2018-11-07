export const searchFunction = selectedValues => {
   const fetchedArmor = fetchArmor();
   
   const searchResults = fetchedArmor.then(armor => {

      const filteredResults = []

      for (let searchVal of selectedValues) {
            armor.forEach((armor)=> {
                  armor.skills.forEach((armorSkills)=> {
                        if (searchVal.name === armorSkills.skillName) {
                              filteredResults.push({
                                    name: armor.name,
                                    type: armor.type,
                                    skills: armor.skills
                              })
                        }
                  })
            })
      }
      return filteredResults
   });

   const assembledArmorResults = assembleArmor(searchResults, selectedValues)
   return assembledArmorResults
};

const assembleArmor = (searchResults, selectedValues) => {

      const passedArmor = searchResults.then((searchResults) => {
            const classifiedArmor = classifyArmor(searchResults)

            let passedArmor = []

              classifiedArmor.waist.forEach((headArmor)=> {
                  classifiedArmor.chest.forEach((chestArmor)=> {
                        classifiedArmor.gloves.forEach((glovesArmor)=> {
                              classifiedArmor.waist.forEach((waistArmor)=> {                              
                                    classifiedArmor.legs.forEach((legsArmor)=> {
                                          let assembledArmor = {
                                                headArmor,
                                                chestArmor,
                                                glovesArmor,
                                                waistArmor,
                                                legsArmor
                                          }
                                          const goodArmor = compareIfPassed(assembledArmor, selectedValues)
                                          if (goodArmor !== null) {
                                                passedArmor.push(goodArmor)
                                          }
                                    })                                             
                              })
                        })
                  })
            })
            return passedArmor
      })

      return passedArmor

}

const classifyArmor = (searchResults) => {

      let classifiedArmor = {
            head:[{name: "Any Armor", type: "head", skills: ["Any Skill"]}],
            chest:[{name: "Any Armor", type: "chest", skills: ["Any Skill"]}],
            gloves:[{name: "Any Armor", type: "gloves", skills: ["Any Skill"]}],
            waist:[{name: "Any Armor", type: "waist", skills: ["Any Skill"]}],
            legs:[{name: "Any Armor", type: "legs", skills: ["Any Skill"]}]
      }
            searchResults.forEach((armor, key)=> {
                  switch(armor.type) {
                        case 'head':
                              classifiedArmor.head.push(armor)
                              break
                        case 'chest':
                              classifiedArmor.chest.push(armor)
                              break
                        case 'gloves':
                              classifiedArmor.gloves.push(armor)
                              break
                        case 'waist':
                              classifiedArmor.waist.push(armor)
                              break
                        case 'legs':
                              classifiedArmor.legs.push(armor)
                              break
                        default:
                              break
                  }
            })

      return classifiedArmor
}

const compareIfPassed = (assembledArmor, selectedValues) => {

      let armorSkillTotal = {}

      //get total skill of armor set
      for (let key in assembledArmor) {            
            assembledArmor[key].skills.forEach((skills)=> {
                  if (skills !== 'Any Skill') {
                        if (armorSkillTotal.hasOwnProperty(skills.skillName) === true) {
                              armorSkillTotal[skills.skillName].skillName = skills.skillName
                              armorSkillTotal[skills.skillName].points = armorSkillTotal[skills.skillName].points + skills.level
                        }
                        else {
                              armorSkillTotal[skills.skillName] = {
                                    skillName: skills.skillName,
                                    points: skills.level
                              }
                        }
                  } else {
                  }
            })
      }

      let passed = true

      if (Object.keys(armorSkillTotal).length > 0) {
            selectedValues.forEach((selected, index)=> {
                  if (armorSkillTotal.hasOwnProperty(selected.name) === true ) {
                        for (let key in armorSkillTotal) {
                              if (selected.name === key) {
                                    if (armorSkillTotal[key].points < selected.level) {
                                          passed = false
                                    }
                              }
                        }
                  }
                  else {
                        passed = false
                  }            
            })
      } else {
            passed = false
      }


      if (passed === true) {
            return assembledArmor
      } else {
            return null
      }
}

export const fetchArmor = () => {
   const fetchedArmor = fetch('http://localhost:3010/api/armor')
      .then(res => res.json())
      .then(data => {
         let tempState = [];

         data.forEach((armor, keyArmor) => {
            tempState.push({ 
                  name: armor.name, 
                  type: armor.type
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

         return tempState;
      });

   return fetchedArmor;
};

export const fetchSkills = () => {
   const fetchedSkills = fetch('http://localhost:3010/api/skills')
      .then(res => res.json())
      .then(data => {
         let tempState = [];

         data.forEach((skill, keySkill) => {
            skill.ranks.forEach((rank, key) => {
               tempState.push({
                  key: data[keySkill].ranks[key].slug,
                  text: data[keySkill].ranks[key].slug,
                  value: data[keySkill].ranks[key].slug,
                  level: data[keySkill].ranks[key].level,
                  name: data[keySkill].ranks[key].skillName
               });
            });
         });

         return tempState;
      });
   return fetchedSkills;
};
