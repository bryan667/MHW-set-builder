export const searchFunction = (selectedValues, options, armorList) => {
      const selectedValuesObject = [];

      options.forEach((item, key) => {
            for (let key of selectedValues) {
                  if (key === item.value) {
                        selectedValuesObject.push({
                              key: item.key,
                              name: item.name,
                              level: item.level,
                        });
                  }
            }
      });

      const selectedValuesFiltered = [];
      selectedValuesObject.forEach((skill, key) => {
            let dupCheck = false
            for (let i = 0; i < selectedValuesFiltered.length; i++) {
                  if (selectedValuesFiltered[i].name === skill.name) {
                        if (skill.level > selectedValuesFiltered[i].level) {
                              selectedValuesFiltered[i] = skill
                              dupCheck = true
                        }
                  }
            }
            if(dupCheck === false) {
                  selectedValuesFiltered.push(skill)
            }
      });

      const filteredArmorResults = [];

      for (let searchVal of selectedValuesFiltered) {
            armorList.forEach(armor => {
                  armor.skills.forEach(armorSkills => {
                        if (searchVal.name === armorSkills.skillName) {
                              filteredArmorResults.push({
                                    name: armor.name,
                                    type: armor.type,
                                    skills: armor.skills,
                              });
                        }
                  });
            });
      }

      console.log('select', selectedValuesFiltered)
      console.log('awyi', filteredArmorResults)

      const assembledArmorResults = assembleArmor(filteredArmorResults,selectedValuesFiltered)

      return assembledArmorResults;
};

const assembleArmor = (filteredArmorResults, selectedValuesFiltered) => {

      const classifiedArmor = classifyArmor(filteredArmorResults);

      let passedArmor = [];
      let count = 0;

      classifiedArmor.head.forEach(headArmor => {
            classifiedArmor.chest.forEach(chestArmor => {
                  classifiedArmor.gloves.forEach(glovesArmor => {
                        classifiedArmor.waist.forEach(waistArmor => {
                              classifiedArmor.legs.forEach(legsArmor => {
                                    let assembledArmor = {
                                          headArmor,
                                          chestArmor,
                                          glovesArmor,
                                          waistArmor,
                                          legsArmor,
                                    };
                                    count = count + 1
                                    const goodArmor = compareIfPassed(assembledArmor,selectedValuesFiltered);
                                    if (goodArmor === true) {
                                          passedArmor.push(assembledArmor);
                                    }
                              });
                        });
                  });
            });
      });

      console.log('count:', count)
      console.log(
            'head:', classifiedArmor.head.length,
            'chest:', classifiedArmor.chest.length,            
            'gloves:', classifiedArmor.gloves.length,           
            'waist:', classifiedArmor.waist.length,
            'legs:', classifiedArmor.legs.length,
      )
      return passedArmor;
};

const classifyArmor = searchResults => {
      let classifiedArmor = {
            head: [{ name: 'Any Armor', type: 'head', skills: ['Any Skill'] }],
            chest: [
                  { name: 'Any Armor', type: 'chest', skills: ['Any Skill'] },
            ],
            gloves: [
                  { name: 'Any Armor', type: 'gloves', skills: ['Any Skill'] },
            ],
            waist: [
                  { name: 'Any Armor', type: 'waist', skills: ['Any Skill'] },
            ],
            legs: [{ name: 'Any Armor', type: 'legs', skills: ['Any Skill'] }],
      };
      searchResults.forEach((armor, key) => {
            switch (armor.type) {
                  case 'head':
                        classifiedArmor.head.push(armor);
                        break;
                  case 'chest':
                        classifiedArmor.chest.push(armor);
                        break;
                  case 'gloves':
                        classifiedArmor.gloves.push(armor);
                        break;
                  case 'waist':
                        classifiedArmor.waist.push(armor);
                        break;
                  case 'legs':
                        classifiedArmor.legs.push(armor);
                        break;
                  default:
                        break;
            }
      });

      return classifiedArmor;
};

const compareIfPassed = (assembledArmor, selectedValues) => {
      let armorSkillTotal = {};

      for (let key in assembledArmor) {
            assembledArmor[key].skills.forEach(skills => {
                  if (skills !== 'Any Skill') {
                        if (armorSkillTotal.hasOwnProperty(skills.skillName) === true) {
                              armorSkillTotal[skills.skillName].skillName = skills.skillName;
                              armorSkillTotal[skills.skillName].points = armorSkillTotal[skills.skillName].points + skills.level;
                        } else {
                              armorSkillTotal[skills.skillName] = {skillName: skills.skillName, points: skills.level};
                        }
                  }
            });
      }

      let passed = true;

      if (Object.keys(armorSkillTotal).length > 0) {
            selectedValues.forEach((selected, index) => {
                  if (armorSkillTotal.hasOwnProperty(selected.name) === true) {
                        for (let key in armorSkillTotal) {
                              if (selected.name === key) {
                                    if (
                                          armorSkillTotal[key].points < selected.level
                                    ) {
                                          passed = false;
                                    }
                              }
                        }
                  } else {
                        passed = false;
                  }
            });
      } else {
            passed = false;
      }

      return passed
};

export const convertReadable = results => {
      let stringResults = `Combinations Found: ${results.length} \n\n`;

      if (results.length > 400) {
            stringResults += `*showing only the first 400, please refine your search* \n\n`;
      }

      results.forEach((result, key) => {
            if (key <= 400) {
                  for (let key in result) {
                        stringResults += `${result[key].type}: ${
                              result[key].name
                        } - `;
                              for (let keySkill of result[key].skills) {
                                    if (keySkill !== 'Any Skill') {
                                          stringResults += `${keySkill.skillName} ${
                                                keySkill.level
                                          }, `;
                                    } else {
                                          stringResults += `Any Skill`;
                                    }
                              }
                        stringResults += `\n`;
                  }
                  stringResults += `\n`;
            }
      });
      return stringResults;
};

export const fetchArmor = () => {
      const fetchedArmor = fetch('/api/armor')
            .then(res => res.json())
            .then(data => {
                  return data;
            });
      return fetchedArmor;
};

export const fetchSkills = () => {
      const fetchedSkills = fetch('/api/skills')
            .then(res => res.json())
            .then(data => {
                  return data;
            });
      return fetchedSkills;
};