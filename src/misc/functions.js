export const searchFunction = selectedValues => {
   console.log(selectedValues);

   let awyis = 'hunger-resistance-rank-1';

   const fetchedArmor = fetchArmor();

   const results = fetchedArmor.then(armor => {
      let filteredResults = armor.filter(armor => {
         if (armor.skills.length !== 0) {
            return armor.skills[0].slug === awyis;
         }
      });

      return filteredResults;
   });

   results.then(result => {
      console.log(result);
   });
};

export const fetchArmor = () => {
   const fetchedArmor = fetch('http://localhost:3010/api/armor')
      .then(res => res.json())
      .then(data => {
         let tempState = [];

         data.forEach((armor, keyArmor) => {
            tempState.push({ name: armor.name });

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
               });
            });
         });

         return tempState;
      });
   return fetchedSkills;
};
