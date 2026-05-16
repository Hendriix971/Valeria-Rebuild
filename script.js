/* ============== DATA ============== */
const CLASSES={assassin:{id:'assassin',name:'Assassin',emoji:'🗡️',desc:'Spécialiste des attaques furtives.',bonuses:{for:1,rap:3,con:-3,mana:-1},spells:['assassin_assassinat']},epeiste:{id:'epeiste',name:'Épéiste',emoji:'⚔️',desc:'Combattant physique polyvalent.',bonuses:{for:2,rap:-3,con:2,mana:-1},spells:['epeiste_frappe_percante']},mage:{id:'mage',name:'Mage',emoji:'🔮',desc:'Utilisateur de magie destructrice.',bonuses:{for:0,rap:-1,con:-3,mana:4},spells:['mage_boule_de_feu']},sorcier:{id:'sorcier',name:'Sorcier',emoji:'🧙',desc:'Mage obscur aux sorts affaiblissants.',bonuses:{for:-4,rap:3,con:0,mana:1},spells:['sorcier_fleche_ombre']},tank:{id:'tank',name:'Tank',emoji:'🛡️',desc:'Protecteur capable d\'encaisser.',bonuses:{for:-1,rap:-2,con:4,mana:-1},spells:['tank_morsure_hydre']},guerisseur:{id:'guerisseur',name:'Guérisseur',emoji:'✨',desc:'Soigneur alliant agilité et endurance.',bonuses:{for:-2,rap:2,con:2,mana:-2},spells:['guerisseur_lux']}}
const SPELLS={assassin_assassinat:{id:'assassin_assassinat',name:'Assassinat',type:'damage',target:'enemy',cost:7,powerStat:'physicalPower',multiplier:1,guaranteedWeakCrit:true,weakCritMultiplier:1.2,normalCritMultiplier:1.5,desc:'Frappe un point vital. Au minimum critique léger (x1.2), chance vrai critique (x1.5).'},epeiste_frappe_percante:{id:'epeiste_frappe_percante',name:'Frappe perçante',type:'damage',target:'enemy',cost:10,powerStat:'physicalPower',multiplier:1.4,desc:'Se précipite pour frapper l\'ennemi avec puissance.'},mage_boule_de_feu:{id:'mage_boule_de_feu',name:'Boule de feu',type:'damage',target:'enemy',cost:5,powerStat:'magicPower',multiplier:1,desc:'Boule de feu explosive.'},sorcier_fleche_ombre:{id:'sorcier_fleche_ombre',name:'Flèche d\'ombre',type:'damage',target:'enemy',cost:5,powerStat:'magicPower',multiplier:1,effects:{defenseReductionPercent:10,duration:3,stackable:false},desc:'Inflige -10% DEF à l\'ennemi pendant 3 tours.'},tank_morsure_hydre:{id:'tank_morsure_hydre',name:'Morsure de l\'hydre',type:'damage',target:'enemy',cost:10,powerStats:['physicalPower','magicPower'],multiplier:.8,effects:{energyDrainPercent:10,duration:3},desc:'Hydre jaillissant du bouclier. (PP+PM)x0.8 + drain d\'énergie.'},guerisseur_lux:{id:'guerisseur_lux',name:'Lux',type:'damage',target:'enemy',cost:5,powerStat:'magicPower',multiplier:1.2,desc:'Rayon de lumière sacrée transperçant la cible.'}}
const RESOURCES={gelée_slime:{name:'Gelée de slime',emoji:'🟢',sellPrice:5},noyau_slime:{name:'Noyau de slime',emoji:'🟡',sellPrice:8},griffe_loup:{name:'Griffe de loup',emoji:'🐺',sellPrice:6},croc_loup:{name:'Croc de loup',emoji:'🦷',sellPrice:7},fourrure_loup:{name:'Fourrure de loup',emoji:'🧶',sellPrice:5},peau_sanglier:{name:'Peau de sanglier',emoji:'🟤',sellPrice:8},défense_sanglier:{name:'Défense de sanglier',emoji:'⚪',sellPrice:10},morceau_ferraille:{name:'Morceau de ferraille',emoji:'⚙️',sellPrice:6},os_monstre:{name:'Os de monstre',emoji:'💀',sellPrice:5},soie_araignée:{name:'Soie d\'araignée',emoji:'🕸️',sellPrice:7},venin_araignée:{name:'Venin d\'araignée',emoji:'🧪',sellPrice:9},écaille_serpent:{name:'Écaille de serpent',emoji:'🟩',sellPrice:8},croc_serpent:{name:'Croc de serpent',emoji:'🗡️',sellPrice:10},bois_solide:{name:'Bois solide',emoji:'🪵',sellPrice:6},écorce_ancienne:{name:'Écorce ancienne',emoji:'🌳',sellPrice:9}}
const CONSUMABLES={potion_vie:{id:'potion_vie',name:'Potion de vie',emoji:'❤️',healPercent:.3,type:'hp',buyPrice:30,sellPrice:15,desc:'Restaure 30% des PV max'},potion_energie:{id:'potion_energie',name:"Potion d'énergie",emoji:'💧',healPercent:.3,type:'pe',buyPrice:30,sellPrice:15,desc:"Restaure 30% des PE max"}}
const WEAPONS={dague_os:{id:'dague_os',name:'Dague en os',emoji:'🗡️',level:1,stats:{pp:8,crit:3},materials:{os_monstre:2,croc_loup:1},normalPrice:80,reducedPrice:40,sellPrice:20,desc:'+8 PP, +3% CRIT'},epee_ferraille:{id:'epee_ferraille',name:'Épée de ferraille',emoji:'⚔️',level:1,stats:{pp:10,def:5},materials:{morceau_ferraille:3,bois_solide:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+10 PP, +5 DEF'},bouclier_bois:{id:'bouclier_bois',name:'Bouclier en bois',emoji:'🛡️',level:1,stats:{def:8,pvMax:25},materials:{bois_solide:3,peau_sanglier:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+8 DEF, +25 PV max'},baton_bois:{id:'baton_bois',name:'Bâton de bois',emoji:'🪄',level:1,stats:{pm:10,peMax:25},materials:{bois_solide:2,noyau_slime:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+10 PM, +25 PE max'},grimoire_use:{id:'grimoire_use',name:'Grimoire usé',emoji:'📖',level:1,stats:{pm:10,crit:3},materials:{peau_sanglier:1,venin_araignée:1,soie_araignée:1},normalPrice:100,reducedPrice:50,sellPrice:25,desc:'+10 PM, +3% CRIT'}}
const ARMORS={armure_legere:{id:'armure_legere',name:'Armure légère',emoji:'🦺',level:1,stats:{def:6,esq:3},materials:{peau_sanglier:2,fourrure_loup:1},normalPrice:80,reducedPrice:40,sellPrice:20,desc:'+6 DEF, +3% ESQ'},armure_lourde:{id:'armure_lourde',name:'Armure lourde',emoji:'🛡️',level:1,stats:{def:10,pvMax:30},materials:{morceau_ferraille:3,défense_sanglier:1},normalPrice:100,reducedPrice:50,sellPrice:25,desc:'+10 DEF, +30 PV max'},robe_magique:{id:'robe_magique',name:'Robe magique',emoji:'👘',level:1,stats:{def:6,peMax:30},materials:{soie_araignée:2,noyau_slime:1},normalPrice:100,reducedPrice:50,sellPrice:25,desc:'+6 DEF, +30 PE max'},tunique:{id:'tunique',name:'Tunique',emoji:'👕',level:1,stats:{pvMax:25,peMax:25},materials:{fourrure_loup:2,peau_sanglier:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+25 PV max, +25 PE max'}}
const MONSTERS={slime:{id:'slime',name:'Slime',emoji:'🟢',baseStats:{for:1,rap:1,con:4,mana:1},drops:[{id:'gelée_slime',min:1,max:2,chance:.8},{id:'noyau_slime',min:1,max:1,chance:.3}],xpReward:15},loup:{id:'loup',name:'Loup',emoji:'🐺',baseStats:{for:3,rap:4,con:2,mana:1},drops:[{id:'croc_loup',min:1,max:2,chance:.7},{id:'fourrure_loup',min:1,max:1,chance:.5},{id:'griffe_loup',min:1,max:1,chance:.4}],xpReward:18},sanglier:{id:'sanglier',name:'Sanglier',emoji:'🐗',baseStats:{for:4,rap:2,con:5,mana:1},drops:[{id:'peau_sanglier',min:1,max:2,chance:.7},{id:'défense_sanglier',min:1,max:1,chance:.4}],xpReward:22},araignee:{id:'araignee',name:'Araignée',emoji:'🕷️',baseStats:{for:2,rap:3,con:3,mana:2},drops:[{id:'soie_araignée',min:1,max:2,chance:.7},{id:'venin_araignée',min:1,max:1,chance:.4}],xpReward:20},serpent:{id:'serpent',name:'Serpent',emoji:'🐍',baseStats:{for:3,rap:4,con:2,mana:2},drops:[{id:'écaille_serpent',min:1,max:2,chance:.7},{id:'croc_serpent',min:1,max:1,chance:.4}],xpReward:24},treant:{id:'treant',name:'Tréant',emoji:'🌳',baseStats:{for:5,rap:1,con:6,mana:2},drops:[{id:'bois_solide',min:2,max:3,chance:.8},{id:'écorce_ancienne',min:1,max:1,chance:.3}],xpReward:30},gobelin_faible:{id:'gobelin_faible',name:'Gobelin',emoji:'👺',baseStats:{for:2,rap:3,con:2,mana:1},drops:[{id:'morceau_ferraille',min:1,max:2,chance:.6},{id:'os_monstre',min:1,max:1,chance:.5}],xpReward:16},loup_alpha:{id:'loup_alpha',name:'Loup alpha',emoji:'🐺',baseStats:{for:5,rap:5,con:3,mana:1},drops:[{id:'croc_loup',min:2,max:3,chance:.8},{id:'fourrure_loup',min:1,max:2,chance:.6}],xpReward:28},gobelin_eclaireur:{id:'gobelin_eclaireur',name:'Gobelin éclaireur',emoji:'👹',baseStats:{for:3,rap:4,con:3,mana:2},drops:[{id:'morceau_ferraille',min:1,max:3,chance:.7},{id:'os_monstre',min:1,max:2,chance:.6}],xpReward:26}}
const FOREST_LEVELS=[{id:1,name:'Clairière',minLevel:1,pool:['slime','loup','gobelin_faible']},{id:2,name:'Sous-bois',minLevel:1,pool:['slime','loup','gobelin_faible']},{id:3,name:'Fourrés',minLevel:2,pool:['sanglier','araignee','serpent']},{id:4,name:'Taillis',minLevel:2,pool:['sanglier','araignee','serpent']},{id:5,name:'Bois sombre',minLevel:3,pool:['sanglier','araignee','serpent','loup']},{id:6,name:'Forêt profonde',minLevel:3,pool:['treant','loup_alpha','gobelin_eclaireur']},{id:7,name:'Cœur de la forêt',minLevel:4,pool:['treant','loup_alpha','gobelin_eclaireur']},{id:8,name:'Clairière ancienne',minLevel:4,pool:['treant','loup_alpha','gobelin_eclaireur','serpent']},{id:9,name:'Sanctuaire oublié',minLevel:5,pool:['treant','loup_alpha','gobelin_eclaireur']}]

/* ============== STATE ============== */
let G=null
let _cd={name:'',classId:'epeiste',stats:{for:0,rap:0,con:0,mana:0},points:10}
function st(stat,dir){
  if(!_cd)return
  const current=_cd.stats[stat]||0
  if(dir>0&&_cd.points<=0)return
  if(dir<0&&current<=0)return
  _cd.stats[stat]=current+dir;_cd.points-=dir
  document.getElementById('create-points').textContent=_cd.points
  document.getElementById('stat-'+stat).textContent=1+_cd.stats[stat]
}
function initGameState(){return{slotName:'',gold:50,team:[],activeChar:0,forestLevel:1,forestExploreCount:0,inventory:{resources:{},consumables:{},weapons:[],armors:[]},logs:[],combat:{monster:null,guarding:false,enemyEffects:{},combatLog:[]},tavernResting:false,created:Date.now()}}
function saveSlots(){try{return JSON.parse(localStorage.getItem('vr_saves')||'[]')}catch{return[]}}
function saveSlotsWrite(arr){localStorage.setItem('vr_saves',JSON.stringify(arr))}
function getSave(slot){const s=saveSlots();return s[slot]||null}
function deleteSave(slot){const s=saveSlots();if(s[slot]){s.splice(slot,1);saveSlotsWrite(s)}}
function saveGame(){if(!G)return;const saves=saveSlots();G.slotName=G.slotName||'Partie';const idx=saves.findIndex(s=>s.slotName===G.slotName&&s.created===G.created);const data=JSON.parse(JSON.stringify(G));delete data._justLeveledUp;if(idx>=0)saves[idx]=data;else saves.push(data);saveSlotsWrite(saves)}
function loadGame(slotData){G=JSON.parse(JSON.stringify(slotData));G.combat=G.combat||{monster:null,guarding:false,enemyEffects:{},combatLog:[]};G.tavernResting=false;switchView('map');renderAll()}

/* ============== STATS ============== */
function computeDerivedStats(char){
  const l=char.level||1,f=char.baseStats.for||1,r=char.baseStats.rap||1,c=char.baseStats.con||1,m=char.baseStats.mana||1
  const pp=50+5*(l-1)+7*(f-1),def=50+5*(l-1)+7*(c-1),pm=50+5*(l-1)+7*(m-1)
  const pvMax=100+10*(l-1)+12*(c-1),peMax=100+10*(l-1)+12*(m-1),crit=r,esq=Math.min(40,Math.floor(r/2))
  return{pp,def,pm,pvMax,peMax,crit,esq,for:f,rap:r,con:c,mana:m}
}
function computeEquipStats(char){
  const res={pp:0,def:0,pm:0,pvMax:0,peMax:0,crit:0,esq:0}
  const add=(s)=>{if(s.pp)res.pp+=s.pp;if(s.def)res.def+=s.def;if(s.pm)res.pm+=s.pm;if(s.pvMax)res.pvMax+=s.pvMax;if(s.peMax)res.peMax+=s.peMax;if(s.crit)res.crit+=s.crit;if(s.esq)res.esq+=s.esq}
  if(char.weapon&&WEAPONS[char.weapon])add(WEAPONS[char.weapon].stats)
  if(char.armor&&ARMORS[char.armor])add(ARMORS[char.armor].stats)
  return res
}
function getFinalStats(char){
  const base=computeDerivedStats(char),equip=computeEquipStats(char)
  return{
    pp:base.pp+equip.pp,def:base.def+equip.def,pm:base.pm+equip.pm,
    pvMax:base.pvMax+equip.pvMax,peMax:base.peMax+equip.peMax,
    crit:base.crit+equip.crit,esq:Math.min(40,base.esq+equip.esq),
    for:base.for,rap:base.rap,con:base.con,mana:base.mana
  }
}
function clampChar(char){
  const s=getFinalStats(char)
  char.currentHp=Math.min(char.currentHp,s.pvMax)
  char.currentPe=Math.min(char.currentPe,s.peMax)
}

/* ============== XP ============== */
function xpForLevel(l){return Math.floor(80*Math.pow(1.25,l-1))}

/* ============== TEAM ============== */
function addCharacter(name,classId,distStats){
  if(!G)return
  const cls=CLASSES[classId]
  const baseStats={for:1,rap:1,con:1,mana:1}
  baseStats.for+=distStats.for||0;baseStats.rap+=distStats.rap||0;baseStats.con+=distStats.con||0;baseStats.mana+=distStats.mana||0
  baseStats.for=Math.max(1,baseStats.for+(cls.bonuses.for||0))
  baseStats.rap=Math.max(1,baseStats.rap+(cls.bonuses.rap||0))
  baseStats.con=Math.max(1,baseStats.con+(cls.bonuses.con||0))
  baseStats.mana=Math.max(1,baseStats.mana+(cls.bonuses.mana||0))
  const char={
    name:name||'Héros',classId,level:1,xp:0,baseStats,
    currentHp:0,currentPe:0,weapon:null,armor:null,spells:cls.spells||[]
  }
  const s=getFinalStats(char)
  char.currentHp=s.pvMax;char.currentPe=s.peMax
  G.team.push(char)
}

/* ============== MONSTERS ============== */
function spawnMonster(forestLvl){
  const fl=FOREST_LEVELS.find(f=>f.id===forestLvl)||FOREST_LEVELS[0]
  const pool=fl.pool
  const id=pool[Math.floor(Math.random()*pool.length)]
  const t=MONSTERS[id]
  const scale=1+(forestLvl-1)*.3
  return{
    id:t.id,name:t.name,emoji:t.emoji,level:forestLvl,
    baseStats:{for:Math.round((t.baseStats.for||1)*scale),rap:Math.round((t.baseStats.rap||1)*scale),con:Math.round((t.baseStats.con||1)*scale),mana:Math.round((t.baseStats.mana||1)*scale)},
    drops:t.drops,xpReward:Math.round(t.xpReward*scale),currentHp:0,currentPe:0,weapon:null,armor:null,spells:[]
  }
}
function computeMonsterStats(m){
  const l=m.level,f=m.baseStats.for,r=m.baseStats.rap,c=m.baseStats.con,ma=m.baseStats.mana
  const pp=40+5*(l-1)+7*(f-1),def=40+5*(l-1)+7*(c-1),pm=40+5*(l-1)+7*(ma-1)
  const pvMax=80+10*(l-1)+12*(c-1),peMax=80+10*(l-1)+12*(ma-1),crit=r,esq=Math.min(30,Math.floor(r/2))
  return{pp,def,pm,pvMax,peMax,crit,esq,for:f,rap:r,con:c,mana:ma}
}

/* ============== COMBAT ============== */
function startCombat(){
  if(!G)return
  const fl=G.forestLevel
  const m=spawnMonster(fl)
  const ms=computeMonsterStats(m)
  m.currentHp=ms.pvMax;m.currentPe=ms.peMax
  G.combat={monster:m,guarding:false,enemyEffects:{},combatLog:[],monsterStats:ms,defeat:false}
  G.combat.combatLog.push(`⚔️ Combat contre ${m.name} (Niv.${fl}) !`)
  switchView('combat')
  renderCombat()
}
function getMonsterStats(){return G?.combat?.monsterStats||null}
function getMonster(){return G?.combat?.monster||null}
function isCombatOver(){
  const m=getMonster()
  if(m&&m.currentHp<=0)return'victory'
  const alive=G.team.filter(c=>c.currentHp>0)
  if(alive.length===0)return'defeat'
  return null
}
function addCombatLog(msg){if(G){G.combat.combatLog.push(msg);renderCombatLog()}}
function enemyTurn(){
  if(!G||!getMonster()||getMonster().currentHp<=0)return
  const ms=getMonsterStats();if(!ms)return
  processEnemyEffects()
  const alive=G.team.filter(c=>c.currentHp>0)
  if(alive.length===0)return
  const target=alive[Math.floor(Math.random()*alive.length)]
  const baseDmg=Math.max(1,ms.pp+Math.floor(Math.random()*5)-2)
  const tDef=getFinalStats(target).def
  let dmg=Math.max(1,baseDmg-Math.floor(tDef/2))
  const isGuarding=G.combat.guarding
  if(isGuarding){dmg=Math.max(1,Math.floor(dmg*.5));addCombatLog(`🛡️ ${target.name} encaisse ! Dégâts réduits à ${dmg}`)}
  const critRoll=Math.random()*100
  if(critRoll<ms.crit){dmg=Math.floor(dmg*1.5);addCombatLog(`💥 Coup critique du monstre !`)}
  target.currentHp=Math.max(0,target.currentHp-dmg)
  G.combat.guarding=false
  addCombatLog(`💢 ${getMonster().name} inflige ${dmg} dégâts à ${target.name}`)
  renderCombat()
  const result=isCombatOver()
  if(result==='defeat'){addCombatLog('💀 Toute l\'équipe est vaincue...');renderCombat();G.combat.defeat=true;document.getElementById('combat-defeat').classList.remove('hidden');document.querySelectorAll('#combat-buttons button').forEach(b=>b.disabled=true);document.getElementById('combat-spells').classList.add('hidden')}
}
function combatAttack(){
  if(!G||!getMonster())return;const char=G.team[G.activeChar];if(!char||char.currentHp<=0)return
  const s=getFinalStats(char);const ms=getMonsterStats();if(!ms)return
  let dmg=Math.max(1,s.pp-Math.floor(ms.def/2))
  const critRoll=Math.random()*100
  let crit=false
  if(critRoll<s.crit){dmg=Math.floor(dmg*1.5);crit=true}
  const esqRoll=Math.random()*100
  if(esqRoll<ms.esq){addCombatLog(`💨 ${getMonster().name} esquive l'attaque de ${char.name}!`);renderCombat();setTimeout(enemyTurn,500);return}
  getMonster().currentHp=Math.max(0,getMonster().currentHp-dmg)
  addCombatLog(`${crit?'💥 Critique ! ':''}⚔️ ${char.name} attaque : ${dmg} dégâts`)
  renderCombat()
  const result=isCombatOver()
  if(result==='victory'){setTimeout(victory,400);return}
  setTimeout(enemyTurn,600)
}
function combatSpell(spellId){
  if(!G||!getMonster())return;const char=G.team[G.activeChar];if(!char||char.currentHp<=0)return
  const spell=SPELLS[spellId];if(!spell)return
  const s=getFinalStats(char);const ms=getMonsterStats();if(!ms)return
  if(char.currentPe<spell.cost){addCombatLog(`❌ Pas assez de PE ! (${char.currentPe}/${spell.cost})`);renderCombat();return}
  char.currentPe-=spell.cost
  let dmg=1
  if(spell.powerStat==='physicalPower'){dmg=Math.floor(s.pp*(spell.multiplier||1))}
  else if(spell.powerStat==='magicPower'){dmg=Math.floor(s.pm*(spell.multiplier||1))}
  else if(spell.powerStats){
    let total=0;spell.powerStats.forEach(ps=>{if(ps==='physicalPower')total+=s.pp;if(ps==='magicPower')total+=s.pm})
    dmg=Math.floor(total*(spell.multiplier||1))
  }
  const esqRoll=Math.random()*100
  if(esqRoll<ms.esq){addCombatLog(`💨 ${getMonster().name} esquive ${spell.name}!`);char.currentPe+=spell.cost;renderCombat();setTimeout(enemyTurn,500);return}
  if(spell.id==='assassin_assassinat'){
    const critRoll=Math.random()*100
    if(critRoll<s.crit){dmg=Math.floor(s.pp*1.5);addCombatLog(`💥 Vrai critique ! x1.5`) }
    else {dmg=Math.floor(s.pp*1.2);addCombatLog(`⚡ Critique léger x1.2`)}
  }
  dmg=Math.max(1,dmg-Math.floor(ms.def/2))
  getMonster().currentHp=Math.max(0,getMonster().currentHp-dmg)
  addCombatLog(`🔮 ${char.name} utilise ${spell.name} : ${dmg} dégâts`)
  if(spell.effects){
    if(spell.effects.defenseReductionPercent){
      G.combat.enemyEffects.defRed={value:spell.effects.defenseReductionPercent,duration:spell.effects.duration,stackable:spell.effects.stackable}
      addCombatLog(`⬇️ DEF de l'ennemi réduite de ${spell.effects.defenseReductionPercent}%`)}
    if(spell.effects.energyDrainPercent){
      G.combat.enemyEffects.energyDrain={value:spell.effects.energyDrainPercent,duration:spell.effects.duration}
      addCombatLog(`💧 Drain d'énergie : -${spell.effects.energyDrainPercent}% PE/tour`)}
  }
  renderCombat()
  const result=isCombatOver()
  if(result==='victory'){setTimeout(victory,400);return}
  setTimeout(enemyTurn,600)
}
function combatGuard(){
  if(!G||!getMonster())return;const char=G.team[G.activeChar];if(!char||char.currentHp<=0)return
  G.combat.guarding=true
  addCombatLog(`🛡️ ${char.name} se met en garde !`)
  renderCombat()
  setTimeout(enemyTurn,600)
}
function combatFlee(){
  if(!G||!getMonster())return
  const avgRap=G.team.reduce((s,c)=>s+(c.currentHp>0?c.baseStats.rap:0),0)/G.team.filter(c=>c.currentHp>0).length
  const mRap=getMonsterStats().rap
  let chance=Math.round((avgRap/mRap)*60);chance=Math.max(15,Math.min(90,chance))
  if(Math.random()*100<chance){
    addCombatLog(`🏃 Fuite réussie !`)
    G.combat=G.combat||{};G.combat.monster=null
    setTimeout(()=>{switchView('forest');renderForest()},400)
  }else{
    addCombatLog(`❌ Fuite échouée !`)
    setTimeout(enemyTurn,600)
  }
  renderCombat()
}
function victory(){
  if(!G||!getMonster())return
  const m=getMonster();const xp=m.xpReward
  const alive=G.team.filter(c=>c.currentHp>0)
  G._justLeveledUp=[]
  alive.forEach(c=>{const oldLv=c.level;c.xp+=xp;while(c.xp>=xpForLevel(c.level)){c.xp-=xpForLevel(c.level);c.level++;clampChar(c)};if(c.level>oldLv)G._justLeveledUp.push({name:c.name,emoji:CLASSES[c.classId]?.emoji||'',oldLv,newLv:c.level})})
  const drops=[]
  m.drops.forEach(d=>{if(Math.random()<d.chance){const q=d.min+Math.floor(Math.random()*(d.max-d.min+1));drops.push({id:d.id,qty:q})}})
  drops.forEach(d=>{G.inventory.resources[d.id]=(G.inventory.resources[d.id]||0)+d.qty})
  saveGame()
  const dropText=drops.map(d=>`${RESOURCES[d.id]?.emoji||''} ${RESOURCES[d.id]?.name||d.id} x${d.qty}`).join(', ')
  document.getElementById('victory-body').innerHTML=
    `<p>🏆 ${m.name} vaincu !</p>
     <p>✨ ${xp} XP (pour tous les survivants)</p>
     ${drops.length?`<p>🎁 ${dropText}</p>`:'<p>Aucune ressource obtenue.</p>'}`
  document.getElementById('popup-victory').classList.remove('hidden')
  renderAll()
}
function processEnemyEffects(){
  if(!G||!G.combat.enemyEffects)return
  const eff=G.combat.enemyEffects
  if(eff.energyDrain){const drain=Math.floor((eff.energyDrain.value/100)*getMonsterStats().peMax);getMonster().currentPe=Math.max(0,(getMonster().currentPe||100)-drain);addCombatLog(`💧 ${getMonster().name} perd ${drain} PE (drain)`);eff.energyDrain.duration--;if(eff.energyDrain.duration<=0)delete eff.energyDrain}
}

/* ============== FOREST ============== */
function exploreForest(){
  if(!G)return
  const fl=FOREST_LEVELS.find(f=>f.id===G.forestLevel)||FOREST_LEVELS[0]
  G.forestExploreCount=(G.forestExploreCount||0)+1
  const logEl=document.getElementById('forest-log')
  const entry=document.createElement('div');entry.className='log-entry'
  entry.textContent=`🌲 Exploration #${G.forestExploreCount} dans ${fl.name}...`
  logEl.appendChild(entry);logEl.scrollTop=logEl.scrollHeight
  startCombat()
}
function renderForestLog(msg){
  const logEl=document.getElementById('forest-log')
  const entry=document.createElement('div');entry.className='log-entry'
  entry.textContent=msg;logEl.appendChild(entry);logEl.scrollTop=logEl.scrollHeight
}

/* ============== TAVERN ============== */
function tavernRest(){
  if(!G)return;if(G.tavernResting)return
  G.tavernResting=true
  const logEl=document.getElementById('tavern-log')
  logEl.innerHTML='<div class="log-entry">😴 Repos...</div><div id="rest-timer" style="text-align:center;font-size:1.5rem;font-weight:bold;color:var(--gold);padding:16px">60s</div><div id="rest-bar-bg" style="height:8px;background:#1a1a2a;border-radius:4px;overflow:hidden;margin:4px 0 8px"><div id="rest-bar" style="height:100%;width:100%;background:linear-gradient(90deg,var(--gold),#ffaa00);border-radius:4px;transition:width .3s"></div></div>'
  document.getElementById('btn-tavern-rest').disabled=true
  let sec=60
  const timerEl=document.getElementById('rest-timer')
  const barEl=document.getElementById('rest-bar')
  const interval=setInterval(()=>{sec--;if(timerEl)timerEl.textContent=sec+'s';if(barEl)barEl.style.width=(sec/60*100)+'%';if(sec<=0)clearInterval(interval)},1000)
  setTimeout(()=>{clearInterval(interval);G.tavernResting=false
    G.team.forEach(c=>{const s=getFinalStats(c);c.currentHp=s.pvMax;c.currentPe=s.peMax})
    logEl.innerHTML='<div class="log-entry">✅ Repos terminé ! Toute l\'équipe est restaurée !</div>'
    document.getElementById('btn-tavern-rest').disabled=false
    saveGame();renderAll()},60000)
}
function tavernDrink(){
  if(!G)return
  if(G.gold<20){document.getElementById('tavern-log').innerHTML=`<div class="log-entry">🍺 Moe : "20 pièces ou la porte !"</div>`;return}
  G.gold-=20
  G.team.forEach(c=>{const s=getFinalStats(c);c.currentPe=s.peMax})
  document.getElementById('tavern-log').innerHTML=`<div class="log-entry">🍺 Santé ! Tous les PE restaurés !</div>`
  saveGame();renderAll()
}
function tavernEat(){
  if(!G)return
  if(G.gold<30){document.getElementById('tavern-log').innerHTML=`<div class="log-entry">🍺 Moe : "Un bon repas coûte 30 pièces. T'as pas ça ?"</div>`;return}
  G.gold-=30
  G.team.forEach(c=>{const s=getFinalStats(c);c.currentHp=s.pvMax})
  document.getElementById('tavern-log').innerHTML=`<div class="log-entry">🍖 Délicieux ! Tous les PV restaurés !</div>`
  saveGame();renderAll()
}

/* ============== MERCHANT ============== */
function merchantBuy(){
  const cont=document.getElementById('merchant-content')
  let html=''
  html+='<div class="merchant-section"><h4>❤️ Consommables</h4>'
  Object.keys(CONSUMABLES).forEach(k=>{
    const c=CONSUMABLES[k];const canBuy=G.gold>=c.buyPrice
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${c.emoji} ${c.name}</div><div class="mi-mats">${c.desc}</div></div><div class="mi-price">${c.buyPrice}💰</div><button class="mi-btn${canBuy?'':' cant-buy'}" data-buy-cons="${k}">${canBuy?'Acheter':'❌'}</button></div>`
  })
  html+='</div><div class="merchant-section"><h4>🗡️ Armes</h4>'
  Object.keys(WEAPONS).forEach(k=>{
    const w=WEAPONS[k];const canAfford=G.gold>=w.reducedPrice;const hasMats=w.materials?Object.keys(w.materials).every(mat=>(G.inventory.resources[mat]||0)>=w.materials[mat]):true
    const matsStr=w.materials?Object.keys(w.materials).map(m=>`${RESOURCES[m]?.emoji||''} ${RESOURCES[m]?.name||m} x${w.materials[m]}`).join(', '):''
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${w.emoji} ${w.name}</div><div class="mi-mats">${w.desc} | Mats: ${matsStr}</div></div><div class="mi-price">${w.reducedPrice}💰</div><button class="mi-btn${canAfford&&hasMats?'':' cant-buy'}" data-buy-weapon="${k}">${canAfford&&hasMats?'Acheter':'❌'}</button></div>`
  })
  html+='</div><div class="merchant-section"><h4>🛡️ Armures</h4>'
  Object.keys(ARMORS).forEach(k=>{
    const a=ARMORS[k];const canAfford=G.gold>=a.reducedPrice;const hasMats=a.materials?Object.keys(a.materials).every(mat=>(G.inventory.resources[mat]||0)>=a.materials[mat]):true
    const matsStr=a.materials?Object.keys(a.materials).map(m=>`${RESOURCES[m]?.emoji||''} ${RESOURCES[m]?.name||m} x${a.materials[m]}`).join(', '):''
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${a.emoji} ${a.name}</div><div class="mi-mats">${a.desc} | Mats: ${matsStr}</div></div><div class="mi-price">${a.reducedPrice}💰</button><button class="mi-btn${canAfford&&hasMats?'':' cant-buy'}" data-buy-armor="${k}">${canAfford&&hasMats?'Acheter':'❌'}</button></div>`
  })
  html+='</div>'
  cont.innerHTML=html
}
function merchantSell(){
  const cont=document.getElementById('merchant-content')
  let html='<div class="merchant-section"><h4>📤 Vendre des ressources</h4>'
  const resources=G.inventory.resources||{}
  let hasRes=false
  Object.keys(resources).forEach(k=>{
    if(resources[k]<=0)return;hasRes=true
    const r=RESOURCES[k];const price=r?r.sellPrice:2
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${r?.emoji||''} ${r?.name||k}</div></div><div class="mi-count">x${resources[k]}</div><div class="mi-price">${price}💰</div><button class="mi-btn" data-sell-res="${k}">Vendre 1</button></div>`
  })
  if(!hasRes)html+='<div class="inv-empty">Aucune ressource à vendre.</div>'
  html+='</div><div class="merchant-section"><h4>📤 Vendre des armes</h4>'
  const weapons=G.inventory.weapons||[]
  weapons.forEach((w,i)=>{
    const item=WEAPONS[w];if(!item)return
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${item.emoji} ${item.name}</div></div><div class="mi-price">${item.sellPrice}💰</div><button class="mi-btn" data-sell-weapon="${i}">Vendre</button></div>`
  })
  if(weapons.length===0)html+='<div class="inv-empty">Aucune arme à vendre.</div>'
  html+='</div><div class="merchant-section"><h4>📤 Vendre des armures</h4>'
  const armors=G.inventory.armors||[]
  armors.forEach((a,i)=>{
    const item=ARMORS[a];if(!item)return
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${item.emoji} ${item.name}</div></div><div class="mi-price">${item.sellPrice}💰</div><button class="mi-btn" data-sell-armor="${i}">Vendre</button></div>`
  })
  if(armors.length===0)html+='<div class="inv-empty">Aucune armure à vendre.</div>'
  html+='</div>'
  cont.innerHTML=html
}
function processBuy(action,id){
  if(!G)return
  if(action==='cons'){
    const c=CONSUMABLES[id];if(!c)return
    if(G.gold<c.buyPrice){showMessage('Marchand','💰 Le marchand croise les bras. "J\'aimerais bien vous aider, mais l\'or ne pousse pas dans les arbres."');return}
    G.gold-=c.buyPrice;G.inventory.consumables[id]=(G.inventory.consumables[id]||0)+1;saveGame();merchantBuy();updateGold()
  }else if(action==='weapon'){
    const w=WEAPONS[id];if(!w)return
    if(G.gold<w.reducedPrice){showMessage('Marchand','💰 Le marchand croise les bras. "J\'aimerais bien vous aider, mais l\'or ne pousse pas dans les arbres."');return}
    if(w.materials&&!Object.keys(w.materials).every(mat=>(G.inventory.resources[mat]||0)>=w.materials[mat])){
      const missing=Object.keys(w.materials).filter(mat=>(G.inventory.resources[mat]||0)<w.materials[mat]).map(m=>`${RESOURCES[m]?.name||m}`).join(', ')
      showMessage('Marchand',`🤷 Le marchand se gratte la barbe. "Je n'ai plus cet article en stock. Rapportez-moi : ${Object.keys(w.materials).map(m=>`${RESOURCES[m]?.name||m} x${w.materials[m]}`).join(', ')}"`);return}
    G.gold-=w.reducedPrice
    if(w.materials)Object.keys(w.materials).forEach(mat=>{G.inventory.resources[mat]-=w.materials[mat];if(G.inventory.resources[mat]<=0)delete G.inventory.resources[mat]})
    G.inventory.weapons.push(id);saveGame();merchantBuy();updateGold()
  }else if(action==='armor'){
    const a=ARMORS[id];if(!a)return
    if(G.gold<a.reducedPrice){showMessage('Marchand','💰 Le marchand croise les bras. "J\'aimerais bien vous aider, mais l\'or ne pousse pas dans les arbres."');return}
    if(a.materials&&!Object.keys(a.materials).every(mat=>(G.inventory.resources[mat]||0)>=a.materials[mat])){
      showMessage('Marchand',`🤷 Le marchand se gratte la barbe. "Je n'ai plus cet article en stock. Rapportez-moi : ${Object.keys(a.materials).map(m=>`${RESOURCES[m]?.name||m} x${a.materials[m]}`).join(', ')}"`);return}
    G.gold-=a.reducedPrice
    if(a.materials)Object.keys(a.materials).forEach(mat=>{G.inventory.resources[mat]-=a.materials[mat];if(G.inventory.resources[mat]<=0)delete G.inventory.resources[mat]})
    G.inventory.armors.push(id);saveGame();merchantBuy();updateGold()
  }
}

/* ============== INVENTORY ============== */
function useConsumable(id,charIdx){
  if(!G)return;const c=CONSUMABLES[id];if(!c)return;const char=G.team[charIdx];if(!char)return
  const qty=G.inventory.consumables[id]||0
  if(qty<=0)return
  const s=getFinalStats(char)
  if(c.type==='hp'){const heal=Math.floor(s.pvMax*c.healPercent);char.currentHp=Math.min(s.pvMax,char.currentHp+heal);addLog(`❤️ ${char.name} +${heal} PV`)}
  else if(c.type==='pe'){const heal=Math.floor(s.peMax*c.healPercent);char.currentPe=Math.min(s.peMax,char.currentPe+heal);addLog(`💧 ${char.name} +${heal} PE`)}
  G.inventory.consumables[id]--
  if(G.inventory.consumables[id]<=0)delete G.inventory.consumables[id]
  saveGame();renderAll()
}
function equipWeapon(weaponId,charIdx){
  if(!G)return;const char=G.team[charIdx];if(!char)return
  const idx=G.inventory.weapons.indexOf(weaponId)
  if(idx<0)return
  G.inventory.weapons.splice(idx,1)
  if(char.weapon)G.inventory.weapons.push(char.weapon)
  char.weapon=weaponId
  clampChar(char);saveGame();renderAll()
}
function equipArmor(armorId,charIdx){
  if(!G)return;const char=G.team[charIdx];if(!char)return
  const idx=G.inventory.armors.indexOf(armorId)
  if(idx<0)return
  G.inventory.armors.splice(idx,1)
  if(char.armor)G.inventory.armors.push(char.armor)
  char.armor=armorId
  clampChar(char);saveGame();renderAll()
}
function unequipItem(charIdx,slot){
  if(!G)return;const char=G.team[charIdx];if(!char)return
  if(slot==='weapon'&&char.weapon){G.inventory.weapons.push(char.weapon);char.weapon=null}
  else if(slot==='armor'&&char.armor){G.inventory.armors.push(char.armor);char.armor=null}
  clampChar(char);saveGame();renderAll()
}
function throwItem(section,id){
  if(!G)return
  if(section==='weapon'){const idx=G.inventory.weapons.indexOf(id);if(idx>=0)G.inventory.weapons.splice(idx,1)}
  else if(section==='armor'){const idx=G.inventory.armors.indexOf(id);if(idx>=0)G.inventory.armors.splice(idx,1)}
  else if(section==='consumable'){delete G.inventory.consumables[id]}
  else if(section==='resource'){delete G.inventory.resources[id]}
  saveGame();renderAll()
}

/* ============== LOGS ============== */
function addLog(msg){if(!G)return;G.logs.push(msg);const el=document.getElementById('forest-log');if(el){const e=document.createElement('div');e.className='log-entry';e.textContent=msg;el.appendChild(e);el.scrollTop=el.scrollHeight}}

/* ============== UI ============== */
function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));const el=document.getElementById(id);if(el)el.classList.remove('hidden')}
function switchView(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'))
  const map={map:'view-map',forest:'view-forest',combat:'view-combat',char:'view-char',team:'view-team',inventory:'view-inventory'}
  const id=map[view]
  if(id){const el=document.getElementById(id);if(el)el.classList.remove('hidden')}
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'))
  const navMap={map:0,team:1,inventory:2};const idx=navMap[view];if(idx!==undefined){const btns=document.querySelectorAll('.nav-btn');if(btns[idx])btns[idx].classList.add('active')}
}
function renderMain(){showScreen('screen-main');renderAll();saveGame()}
function renderAll(){
  if(!G||document.getElementById('screen-main').classList.contains('hidden'))return
  renderHeader();renderTeamBar();updateGold()
  const activeView=document.querySelector('.view:not(.hidden)')
  if(activeView){const id=activeView.id
    if(id==='view-map')renderMap()
    else if(id==='view-forest')renderForest()
    else if(id==='view-combat')renderCombat()
    else if(id==='view-char'){}
  }
}
function renderHeader(){
  if(!G)return
  const fl=FOREST_LEVELS.find(f=>f.id===G.forestLevel)||FOREST_LEVELS[0]
  document.getElementById('header-gold').textContent=`💰 ${G.gold}`
  document.getElementById('header-floor').textContent=`🌲 Niv.${G.forestLevel}`
}
function updateGold(){const el=document.getElementById('header-gold');if(el&&G)el.textContent=`💰 ${G.gold}`;const mel=document.getElementById('merchant-gold');if(mel&&G)mel.textContent=`💰 ${G.gold}`}
function renderTeamBar(){
  const bar=document.getElementById('team-bar');if(!bar||!G)return
  bar.innerHTML=G.team.map((c,i)=>{
    const s=getFinalStats(c);const hpPct=c.currentHp>0?Math.round((c.currentHp/s.pvMax)*100):0
    const clsObj=CLASSES[c.classId];const active=i===G.activeChar?'active':''
    const dead=c.currentHp<=0?'dead':''
    const hpDot=hpPct<30?'hp-dot low':'hp-dot'
    return `<div class="team-char ${active} ${dead}" data-char="${i}"><span class="${hpDot}"></span>${clsObj?.emoji||''} ${c.name} <span style="font-size:0.65rem;color:var(--text2)">Lv.${c.level}</span></div>`
  }).join('')
}
function renderMap(){/* map is static HTML */document.getElementById('header-location').textContent='— Carte'}
function renderForest(){
  if(!G)return
  const fl=FOREST_LEVELS.find(f=>f.id===G.forestLevel)||FOREST_LEVELS[0]
  document.getElementById('forest-name').textContent=fl.name
  document.getElementById('forest-level').textContent=`Niveau ${G.forestLevel}`
  document.getElementById('header-location').textContent=`— ${fl.name}`
}
function renderCombat(){
  if(!G||!getMonster())return
  document.getElementById('combat-defeat').classList.add('hidden')
  document.querySelectorAll('#combat-buttons button').forEach(b=>b.disabled=G.combat.defeat||false)
  const m=getMonster();const ms=getMonsterStats()
  document.getElementById('combat-enemy-emoji').textContent=m.emoji
  document.getElementById('combat-enemy-name').textContent=`${m.name} (Niv.${m.level})`
  const hpPct=Math.round((m.currentHp/ms.pvMax)*100)
  document.getElementById('combat-enemy-stats').textContent=`PV: ${m.currentHp}/${ms.pvMax}`
  document.getElementById('combat-enemy-hp').style.width=`${hpPct}%`
  const char=G.team[G.activeChar]
  if(char){
    const cls=CLASSES[char.classId]
    const s=getFinalStats(char)
    document.getElementById('combat-ally-emoji').textContent=cls?.emoji||'⚔️'
    document.getElementById('combat-ally-name').textContent=`${char.name} Lv.${char.level}`
    document.getElementById('combat-ally-stats').textContent=`PV: ${char.currentHp}/${s.pvMax} • PE: ${char.currentPe}/${s.peMax}`
    document.getElementById('combat-ally-hp').style.width=`${Math.round((char.currentHp/s.pvMax)*100)}%`
    document.getElementById('combat-ally-pe').style.width=`${Math.round((char.currentPe/s.peMax)*100)}%`
  }
  const guardEl=document.getElementById('combat-guard-indicator')
  if(G.combat.guarding)guardEl.classList.remove('hidden');else guardEl.classList.add('hidden')
  renderCombatLog()
}
function renderCombatLog(){
  const el=document.getElementById('combat-log');if(!el||!G)return
  el.innerHTML=(G.combat.combatLog||[]).map(msg=>`<div class="log-entry">${msg}</div>`).join('')
  el.scrollTop=el.scrollHeight
}
function showMessage(title,msg,cb){
  document.getElementById('msg-title').textContent=title
  document.getElementById('msg-body').innerHTML=`<p>${msg}</p>`
  document.getElementById('popup-message').classList.remove('hidden')
  document.getElementById('btn-msg-ok').onclick=()=>{document.getElementById('popup-message').classList.add('hidden');if(cb)cb()}
}

/* ============== SAVES UI ============== */
function renderSaves(){
  const list=document.getElementById('saves-list');const saves=saveSlots()
  if(saves.length===0){list.innerHTML='<div class="save-empty">Aucune sauvegarde existante.<br>Créez une nouvelle partie !</div>';return}
  list.innerHTML=saves.map((s,i)=>{
    const d=new Date(s.created);const dateStr=`${d.getDate().toString().padStart(2,'0')}/${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getFullYear()}`
    return `<div class="save-card" data-slot="${i}"><div class="save-info"><div class="save-name">${s.slotName||'Partie'}</div><div class="save-detail">${s.team.length} persos • Niv.${s.forestLevel} • ${dateStr} • ${s.gold}💰</div></div><button class="save-delete" data-del="${i}">🗑️</button></div>`
  }).join('')
}

/* ============== INIT ============== */
function init(){
  /* Saves screen */
  renderSaves()
  document.getElementById('btn-new-game').addEventListener('click',()=>{
    G=initGameState();_cd={name:'',classId:'epeiste',stats:{for:0,rap:0,con:0,mana:0},points:10};showScreen('screen-create');renderCreateTeam()
  })
  document.getElementById('saves-list').addEventListener('click',(e)=>{
    const card=e.target.closest('.save-card')
    if(!card||e.target.closest('.save-delete'))return
    const slot=parseInt(card.dataset.slot);const saves=saveSlots()
    if(saves[slot]){loadGame(saves[slot]);renderMain()}
  })
  document.getElementById('saves-list').addEventListener('click',(e)=>{
    const del=e.target.closest('.save-delete');if(!del)return
    const slot=parseInt(del.dataset.del);deleteSave(slot);renderSaves()
  })
  /* Create team screen */
  function renderCreateTeam(){
    document.getElementById('create-team-preview').innerHTML=G.team.map(c=>{
      const cls=CLASSES[c.classId]
      return `<span class="create-chara-tag">${cls?.emoji||''} ${c.name} (${cls?.name||c.classId})</span>`
    }).join('')
    document.getElementById('btn-start-game').disabled=G.team.length===0
    renderClassSelection()
    renderStatPoints()
  }
  function renderClassSelection(){
    const cont=document.getElementById('create-classes')
    cont.innerHTML=Object.keys(CLASSES).map(k=>{
      const cls=CLASSES[k];const sel=_cd.classId===k?'selected':''
      return `<div class="class-card ${sel}" data-class="${k}"><div class="class-emoji">${cls.emoji}</div><div class="class-name">${cls.name}</div><div class="class-desc">${cls.desc}</div></div>`
    }).join('')
  }
  function renderStatPoints(){
    document.getElementById('create-points').textContent=_cd.points
    ;['for','rap','con','mana'].forEach(s=>{
      const el=document.getElementById(`stat-${s}`)
      if(el)el.textContent=1+(_cd.stats[s]||0)
    })
  }
  document.getElementById('create-classes').addEventListener('click',(e)=>{
    const card=e.target.closest('.class-card');if(!card)return
    _cd.classId=card.dataset.class;renderClassSelection()
  })
  document.getElementById('btn-add-character').addEventListener('click',()=>{
    const name=document.getElementById('create-name').value.trim()||`Héros ${G.team.length+1}`
    if(G.team.length>=6){showMessage('Équipe complète','Votre équipe a déjà 6 membres !');return}
    if(!_cd.classId){showMessage('Choix','Choisissez une classe.');return}
    addCharacter(name,_cd.classId,_cd.stats)
    _cd.stats={for:0,rap:0,con:0,mana:0};_cd.points=10;_cd.name=''
    document.getElementById('create-name').value=''
    renderCreateTeam()
  })
  document.getElementById('btn-start-game').addEventListener('click',()=>{
    if(G.team.length===0)return
    saveGame();renderMain();switchView('map')
  })
  /* Main screen nav */
  document.querySelectorAll('.nav-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(G&&getMonster()&&getMonster().currentHp>0){showMessage('Combat','⚔️ Vous êtes en combat !');return}
      const view=btn.dataset.view
      if(view==='map'){switchView('map');renderMap()}
      else if(view==='team'){showTeamView()}
      else if(view==='inventory'){showInventoryView()}
    })
  })
  /* Map clicks */
  document.querySelectorAll('.map-card:not(.map-locked)').forEach(card=>{
    card.addEventListener('click',()=>{
      const loc=card.dataset.location
      if(loc==='tavern'){openTavern()}
      else if(loc==='merchant'){openMerchant()}
      else if(loc==='forest'){switchView('forest');renderForest()}
    })
  })
  /* Explore */
  document.getElementById('btn-explore').addEventListener('click',exploreForest)
  document.getElementById('btn-leave-forest').addEventListener('click',()=>{switchView('map');renderMap()})
  /* Combat buttons */
  document.getElementById('btn-cbt-attack').addEventListener('click',combatAttack)
  document.getElementById('btn-cbt-guard').addEventListener('click',combatGuard)
  document.getElementById('btn-cbt-flee').addEventListener('click',combatFlee)
  document.getElementById('btn-combat-defeat-leave').addEventListener('click',()=>{
    if(!G)return;G.combat.monster=null;G.combat.combatLog=[];G.combat.guarding=false;G.combat.enemyEffects={};G.combat.defeat=false;document.getElementById('combat-defeat').classList.add('hidden');document.querySelectorAll('#combat-buttons button').forEach(b=>b.disabled=false);saveGame();switchView('map');renderMap()
  })
  document.getElementById('btn-cbt-spells').addEventListener('click',()=>{
    const spellView=document.getElementById('combat-spells');const mainBtns=document.getElementById('combat-buttons')
    if(spellView.classList.contains('hidden')){
      spellView.classList.remove('hidden');mainBtns.classList.add('hidden')
      const char=G.team[G.activeChar];const spells=char?char.spells:[]
      document.getElementById('spells-list').innerHTML=spells.map(sid=>{
        const sp=SPELLS[sid];if(!sp)return''
        const canCast=char.currentPe>=sp.cost
        return `<button class="spell-btn${canCast?'':' disabled'}" data-spell="${sid}"${canCast?'':' disabled'}>${sp.name} <span class="spell-cost">(${sp.cost} PE)</span><br><span style="font-size:0.7rem;color:var(--text2)">${sp.desc}</span></button>`
      }).join('')
    }else{spellView.classList.add('hidden');mainBtns.classList.remove('hidden')}
  })
  document.getElementById('spells-list').addEventListener('click',(e)=>{
    const btn=e.target.closest('.spell-btn');if(!btn||btn.disabled)return
    const sid=btn.dataset.spell;combatSpell(sid)
    document.getElementById('combat-spells').classList.add('hidden');document.getElementById('combat-buttons').classList.remove('hidden')
  })
  document.getElementById('btn-cbt-back').addEventListener('click',()=>{
    document.getElementById('combat-spells').classList.add('hidden');document.getElementById('combat-buttons').classList.remove('hidden')
  })
  /* Team bar clicks */
  document.getElementById('team-bar').addEventListener('click',(e)=>{
    const el=e.target.closest('.team-char');if(!el)return
    const idx=parseInt(el.dataset.char);if(G.team[idx]&&G.team[idx].currentHp>0){G.activeChar=idx;renderTeamBar();const combatView=document.getElementById('view-combat');if(!combatView.classList.contains('hidden'))renderCombat()}
  })
  /* Victory popup */
  document.getElementById('btn-victory-continue').addEventListener('click',()=>{
    document.getElementById('popup-victory').classList.add('hidden')
    if(G){G.combat.monster=null;G.combat.combatLog=[];G.combat.guarding=false;G.combat.enemyEffects={}
      G.forestLevel=Math.min(9,G.forestLevel+1)
      renderAll()
      if(G._justLeveledUp&&G._justLeveledUp.length>0){
        const names=G._justLeveledUp.map(c=>`${c.emoji} ${c.name} → Niveau ${c.newLv}`).join('<br>')
        document.getElementById('levelup-body').innerHTML=`<p>⬆️ Niveau supérieur !</p><p>${names}</p>`
        document.getElementById('popup-levelup').classList.remove('hidden')
        G._justLeveledUp=[]
      }else{switchView('map');renderMap()}
    }
  })
  document.getElementById('btn-levelup-ok').addEventListener('click',()=>{
    document.getElementById('popup-levelup').classList.add('hidden')
    switchView('map');renderMap()
  })
  /* Tavern */
  document.getElementById('btn-tavern-rest').addEventListener('click',tavernRest)
  document.getElementById('btn-tavern-drink').addEventListener('click',tavernDrink)
  document.getElementById('btn-tavern-eat').addEventListener('click',tavernEat)
  /* Merchant tabs */
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'))
      btn.classList.add('active')
      if(btn.dataset.tab==='buy')merchantBuy()
      else merchantSell()
    })
  })
  /* Merchant content clicks */
  document.getElementById('merchant-content').addEventListener('click',(e)=>{
    const btn=e.target.closest('.mi-btn');if(!btn)return
    if(btn.dataset.buyCons)processBuy('cons',btn.dataset.buyCons)
    else if(btn.dataset.buyWeapon)processBuy('weapon',btn.dataset.buyWeapon)
    else if(btn.dataset.buyArmor)processBuy('armor',btn.dataset.buyArmor)
    else if(btn.dataset.sellRes){
      const id=btn.dataset.sellRes;const r=RESOURCES[id];const qty=G.inventory.resources[id]||0
      if(qty>0){G.gold+=(r?r.sellPrice:2);G.inventory.resources[id]--;if(G.inventory.resources[id]<=0)delete G.inventory.resources[id];saveGame();merchantSell();updateGold()}
    }else if(btn.dataset.sellWeapon){
      const idx=parseInt(btn.dataset.sellWeapon);const w=G.inventory.weapons[idx];const item=WEAPONS[w]
      if(item){G.gold+=item.sellPrice;G.inventory.weapons.splice(idx,1);saveGame();merchantSell();updateGold()}
    }else if(btn.dataset.sellArmor){
      const idx=parseInt(btn.dataset.sellArmor);const a=G.inventory.armors[idx];const item=ARMORS[a]
      if(item){G.gold+=item.sellPrice;G.inventory.armors.splice(idx,1);saveGame();merchantSell();updateGold()}
    }
  })
  /* Popup close buttons */
  document.querySelectorAll('.popup-close,.popup-footer .btn-secondary[data-popup]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const popup=btn.dataset.popup
      if(popup)document.getElementById(`popup-${popup}`).classList.add('hidden')
    })
  })
  /* Inventory view content */
  /* Show initial screen */
  showScreen('screen-saves')
}

/* ============== POPUP OPENS ============== */
function openTavern(){
  document.getElementById('popup-tavern').classList.remove('hidden')
  document.getElementById('tavern-log').innerHTML=''
}
function openMerchant(){
  document.getElementById('popup-merchant').classList.remove('hidden')
  document.getElementById('merchant-gold').textContent=G?`💰 ${G.gold}`:'💰 0'
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'))
  document.querySelector('.tab-btn[data-tab="buy"]')?.classList.add('active')
  merchantBuy()
}

/* ============== TEAM & INVENTORY VIEWS ============== */
function showTeamView(){
  const area=document.getElementById('content-area')
  document.querySelectorAll('.view').forEach(v=>{if(v.id!=='view-forest'&&v.id!=='view-map'&&v.id!=='view-combat')v.classList.add('hidden')})
  const existing=document.getElementById('view-team')
  if(existing)existing.remove()
  const div=document.createElement('div');div.id='view-team';div.className='view'
  if(!G){div.innerHTML='';area.appendChild(div);return}
  div.innerHTML=G.team.map((c,i)=>{
    const cls=CLASSES[c.classId];const s=getFinalStats(c);const hpPct=Math.round((c.currentHp/s.pvMax)*100)
    const dead=c.currentHp<=0?'dead':''
    return `<div class="team-member-card ${dead}" data-charidx="${i}"><div class="tm-class">${cls?.emoji||'?'}</div><div class="tm-info"><div class="tm-name">${c.name} <span style="color:var(--text2);font-size:0.75rem;">Lv.${c.level} ${cls?.name||''}</span></div><div class="tm-detail">FOR:${s.for} RAP:${s.rap} CON:${s.con} MANA:${s.mana}</div><div class="tm-detail">PP:${s.pp} PM:${s.pm} DEF:${s.def} CRIT:${s.crit}% ESQ:${s.esq}%</div></div><div class="tm-hp">${c.currentHp}/${s.pvMax} ❤️</div></div>`
  }).join('')
  area.appendChild(div)
  div.addEventListener('click',(e)=>{
    const card=e.target.closest('.team-member-card');if(!card)return
    const idx=parseInt(card.dataset.charidx);showCharacterDetail(idx)
  })
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'))
  const btns=document.querySelectorAll('.nav-btn');if(btns[1])btns[1].classList.add('active')
  document.getElementById('header-location').textContent='— Équipe'
}
function showCharacterDetail(idx){
  const area=document.getElementById('content-area')
  const existing=document.getElementById('view-char')
  const c=G?.team[idx];if(!c)return
  existing.classList.remove('hidden')
  document.querySelectorAll('.view').forEach(v=>{if(v.id!=='view-char')v.classList.add('hidden')})
  const cls=CLASSES[c.classId];const s=getFinalStats(c)
  let html=`<div class="char-detail-card"><div class="char-detail-name">${cls?.emoji||''} ${c.name}</div><div class="char-detail-class">${cls?.name||''} • Niveau ${c.level} • ${c.xp}/${xpForLevel(c.level)} XP</div>`
  html+=`<div style="margin-bottom:6px"><div style="font-size:0.75rem;color:var(--text2)">PV: ${c.currentHp}/${s.pvMax}</div><div class="hp-bar-bg"><div class="hp-bar hp-ally" style="width:${Math.round((c.currentHp/s.pvMax)*100)}%"></div></div><div style="font-size:0.75rem;color:var(--text2);margin-top:4px">PE: ${c.currentPe}/${s.peMax}</div><div class="hp-bar-bg"><div class="hp-bar pe-bar" style="width:${Math.round((c.currentPe/s.peMax)*100)}%"></div></div></div>`
  html+=`<div class="char-stats-grid"><span>FOR ${s.for}</span><span>RAP ${s.rap}</span><span>CON ${s.con}</span><span>MANA ${s.mana}</span><span>PP ${s.pp}</span><span>PM ${s.pm}</span><span>DEF ${s.def}</span><span>CRIT ${s.crit}%</span><span>ESQ ${s.esq}%</span></div>`
  html+=`<div style="margin-bottom:8px"><div style="font-size:0.8rem;color:var(--gold);font-weight:bold;margin-bottom:4px">🎒 Équipement</div>`
  html+=`<div class="equip-slot"><span class="equip-slot-label">⚔️ Arme</span>${c.weapon?`<span class="equip-slot-item">${WEAPONS[c.weapon]?.emoji||''} ${WEAPONS[c.weapon]?.name||c.weapon}</span><button class="equip-btn" data-unequip="${idx},weapon">Déséquiper</button>`:'<span class="equip-slot-empty">— Vide —</span>'}</div>`
  html+=`<div class="equip-slot"><span class="equip-slot-label">🛡️ Armure</span>${c.armor?`<span class="equip-slot-item">${ARMORS[c.armor]?.emoji||''} ${ARMORS[c.armor]?.name||c.armor}</span><button class="equip-btn" data-unequip="${idx},armor">Déséquiper</button>`:'<span class="equip-slot-empty">— Vide —</span>'}</div></div>`
  if(c.spells&&c.spells.length>0){
    html+=`<div style="margin-bottom:8px"><div style="font-size:0.8rem;color:var(--purple);font-weight:bold;margin-bottom:4px">🔮 Sorts</div>`
    c.spells.forEach(sid=>{const sp=SPELLS[sid];if(sp)html+=`<div style="font-size:0.75rem;padding:3px 6px;background:var(--surface);border-radius:4px;margin-bottom:2px"><b>${sp.name}</b> (${sp.cost} PE) — ${sp.desc}</div>`})
    html+=`</div>`
  }
  html+=`<button class="btn-secondary" onclick="switchView('team');showTeamView()">← Retour à l'équipe</button></div>`
  existing.innerHTML=html
  existing.querySelector('[data-unequip]')?.addEventListener('click',(e)=>{
    const [ci,slot]=e.target.dataset.unequip.split(',');unequipItem(parseInt(ci),slot);showCharacterDetail(parseInt(ci))
  })
}
function showInventoryView(){
  const area=document.getElementById('content-area')
  document.querySelectorAll('.view').forEach(v=>{if(v.id!=='view-forest'&&v.id!=='view-map'&&v.id!=='view-combat')v.classList.add('hidden')})
  const existing=document.getElementById('view-inventory')
  if(existing)existing.remove()
  const div=document.createElement('div');div.id='view-inventory';div.className='view'
  if(!G){div.innerHTML='';area.appendChild(div);return}
  let html=''
  const cons=G.inventory.consumables||{}
  if(Object.keys(cons).length>0){
    html+=`<div class="inv-section"><div class="inv-section-title">❤️ Consommables</div>`
    Object.keys(cons).forEach(k=>{
      const c=CONSUMABLES[k];const qty=cons[k]
      html+=`<div class="inv-item"><span class="inv-name">${c?.emoji||''} ${c?.name||k}</span><span class="inv-count">x${qty}</span><div class="inv-actions"><button class="inv-btn inv-btn-use" data-use="${k}">Utiliser</button><button class="inv-btn inv-btn-throw" data-throw="consumable,${k}">Jeter</button></div></div>`
    })
    html+=`</div>`
  }
  const weaps=G.inventory.weapons||[]
  if(weaps.length>0){
    html+=`<div class="inv-section"><div class="inv-section-title">🗡️ Armes</div>`
    weaps.forEach((w,i)=>{
      const item=WEAPONS[w]
      if(item)html+=`<div class="inv-item"><span class="inv-name">${item.emoji} ${item.name}</span><span class="inv-count"></span><div class="inv-actions"><button class="inv-btn inv-btn-equip" data-equip-weapon="${i}">Équiper</button><button class="inv-btn inv-btn-throw" data-throw="weapon,${w}">Jeter</button></div></div>`
    })
    html+=`</div>`
  }
  const arms=G.inventory.armors||[]
  if(arms.length>0){
    html+=`<div class="inv-section"><div class="inv-section-title">🛡️ Armures</div>`
    arms.forEach((a,i)=>{
      const item=ARMORS[a]
      if(item)html+=`<div class="inv-item"><span class="inv-name">${item.emoji} ${item.name}</span><span class="inv-count"></span><div class="inv-actions"><button class="inv-btn inv-btn-equip" data-equip-armor="${i}">Équiper</button><button class="inv-btn inv-btn-throw" data-throw="armor,${a}">Jeter</button></div></div>`
    })
    html+=`</div>`
  }
  const res=G.inventory.resources||{}
  if(Object.keys(res).length>0){
    html+=`<div class="inv-section"><div class="inv-section-title">📦 Ressources</div>`
    Object.keys(res).forEach(k=>{
      if(res[k]<=0)return;const r=RESOURCES[k]
      html+=`<div class="inv-item"><span class="inv-name">${r?.emoji||''} ${r?.name||k}</span><span class="inv-count">x${res[k]}</span><div class="inv-actions"><button class="inv-btn inv-btn-throw" data-throw="resource,${k}">Jeter</button></div></div>`
    })
    html+=`</div>`
  }
  if(!html)html='<div class="inv-empty">🎒 Inventaire vide.</div>'
  div.innerHTML=html
  area.appendChild(div)
  div.addEventListener('click',(e)=>{
    const btn=e.target.closest('.inv-btn');if(!btn)return
    if(btn.dataset.use){
      const charIdx=prompt(`Sur quel personnage (0-${G.team.length-1}) ?`)||'0'
      const ci=parseInt(charIdx);if(isNaN(ci)||ci<0||ci>=G.team.length)return
      useConsumable(btn.dataset.use,ci)
    }else if(btn.dataset.equipWeapon){
      const idx=parseInt(btn.dataset.equipWeapon);const wid=G.inventory.weapons[idx]
      const charIdx=prompt(`Équiper sur quel personnage (0-${G.team.length-1}) ?`)||'0'
      const ci=parseInt(charIdx);if(isNaN(ci)||ci<0||ci>=G.team.length)return
      equipWeapon(wid,ci)
    }else if(btn.dataset.equipArmor){
      const idx=parseInt(btn.dataset.equipArmor);const aid=G.inventory.armors[idx]
      const charIdx=prompt(`Équiper sur quel personnage (0-${G.team.length-1}) ?`)||'0'
      const ci=parseInt(charIdx);if(isNaN(ci)||ci<0||ci>=G.team.length)return
      equipArmor(aid,ci)
    }else if(btn.dataset.throw){
      const [section,id]=btn.dataset.throw.split(',');if(section==='weapon'||section==='armor'){if(!confirm(`Jeter ${id} ?`))return};throwItem(section,id)
    }
  })
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'))
  const btns=document.querySelectorAll('.nav-btn');if(btns[2])btns[2].classList.add('active')
  document.getElementById('header-location').textContent='— Inventaire'
}

/* ============== BOOT ============== */
document.addEventListener('DOMContentLoaded',init)
