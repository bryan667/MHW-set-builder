
export const searchFunction = selectedValues => {
   const fetchedArmor = fetchArmor();
   
   const searchResults = fetchedArmor.then(armor => {

      const filteredResults = []

      for (let searchVal of selectedValues) {
            armor.forEach((armor, key)=> {
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

   searchResults.then(result => {
      console.log('result: ', result);
   });
};

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
