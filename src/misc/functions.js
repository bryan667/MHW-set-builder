import { ItemDescription } from 'semantic-ui-react';

export const searchFunction = selectedValues => {
   console.log(selectedValues);

   let awyis = ['hunger-resistance-rank-1'];

   const fetchedArmor = fetchArmor();

   const searchResults = fetchedArmor.then(armor => {
      let filteredResults = armor.filter(item => {
         awyis
            .map(val => {
               if (item.skills.length !== 0) {
                  // console.log('aw', item.skills[0].slug.indexOf(val));
                  return item.skills[0].slug.indexOf(val);
               } else {
                  return item.skills.indexOf(val);
               }
            })
            .map(val => (val > -1 ? true : false))
            .reduce((acc, cum) => acc && cum);
      });
      return filteredResults;
   });

   searchResults.then(result => {
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
                  level: data[keySkill].ranks[key].level,
                  name: data[keySkill].ranks[key].skillName
               });
            });
         });

         return tempState;
      });
   return fetchedSkills;
};
