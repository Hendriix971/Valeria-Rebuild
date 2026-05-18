/* ============== DATA ============== */
const CLASSES={assassin:{id:'assassin',name:'Assassin',emoji:'🗡️',desc:'Spécialiste des attaques furtives.',bonuses:{for:1,rap:3,con:-3,mana:-1},spells:['assassin_assassinat','assassin_concentration']},epeiste:{id:'epeiste',name:'Épéiste',emoji:'⚔️',desc:'Combattant physique polyvalent.',bonuses:{for:2,rap:-3,con:2,mana:-1},spells:['epeiste_frappe_percante','epeiste_posture_taureau']},mage:{id:'mage',name:'Mage',emoji:'🔮',desc:'Utilisateur de magie destructrice.',bonuses:{for:0,rap:-1,con:-3,mana:4},spells:['mage_boule_de_feu','mage_canalisation']},sorcier:{id:'sorcier',name:'Sorcier',emoji:'🧙',desc:'Mage obscur aux sorts affaiblissants.',bonuses:{for:-4,rap:3,con:0,mana:1},spells:['sorcier_fleche_ombre','sorcier_clone_ombre']},tank:{id:'tank',name:'Tank',emoji:'🛡️',desc:'Protecteur capable d\'encaisser.',bonuses:{for:-1,rap:-2,con:4,mana:-1},spells:['tank_morsure_hydre','tank_provocation']},guerisseur:{id:'guerisseur',name:'Guérisseur',emoji:'✨',desc:'Soigneur alliant agilité et endurance.',bonuses:{for:-2,rap:2,con:2,mana:-2},spells:['guerisseur_lux','guerisseur_soin_mineur']}}
const SPELLS={assassin_assassinat:{id:'assassin_assassinat',name:'Assassinat',type:'damage',target:'enemy',cost:7,powerStat:'physicalPower',multiplier:1,guaranteedWeakCrit:true,weakCritMultiplier:1.2,normalCritMultiplier:1.5,desc:'Frappe un point vital. Au minimum critique léger (x1.2), chance vrai critique (x1.5).'},assassin_concentration:{id:'assassin_concentration',name:'Concentration',type:'self_buff',target:'self',cost:15,duration:3,effects:{critBuffPercent:20,activationDodge:true},stackable:false,desc:'Se concentre dans l\'ombre. Confère +20% CRIT pendant 3 tours et esquive automatiquement la prochaine attaque reçue pendant l\'activation.'},epeiste_frappe_percante:{id:'epeiste_frappe_percante',name:'Frappe perçante',type:'damage',target:'enemy',cost:10,powerStat:'physicalPower',multiplier:1.6,desc:'Se précipite pour frapper l\'ennemi avec puissance.'},epeiste_posture_taureau:{id:'epeiste_posture_taureau',name:'Posture du Taureau',type:'damage_self_buff',target:'enemy',cost:15,powerStat:'physicalPower',multiplier:1.4,duration:3,effects:{ppBuffPercent:20},stackable:false,desc:'Frappe l\'ennemi avec la force du taureau et augmente la PP du lanceur de 20% pendant 3 tours.'},mage_boule_de_feu:{id:'mage_boule_de_feu',name:'Boule de feu',type:'damage',target:'enemy',cost:10,powerStat:'magicPower',multiplier:1.4,effects:{poisonPercent:3,duration:3,stackable:true,maxStacks:3},desc:'Boule de feu explosive. Inflige une brûlure -3% PV/tour (cumulable 3x, 3 tours).'},sorcier_fleche_ombre:{id:'sorcier_fleche_ombre',name:'Flèche d\'ombre',type:'damage',target:'enemy',cost:8,powerStat:'magicPower',multiplier:1.2,effects:{defenseReductionPercent:40,duration:4,stackable:false},desc:'Inflige des dégâts magiques et réduit la DEF de l\'ennemi de 40% pendant 4 tours.'},mage_canalisation:{id:'mage_canalisation',name:'Canalisation',type:'self_buff',target:'self',cost:15,duration:3,effects:{pmBuffPercent:20,activationBlock:true},stackable:false,desc:'Canalise la magie. Confère +20% PM pendant 3 tours et bloque les dégâts subis pendant l\'activation.'},sorcier_clone_ombre:{id:'sorcier_clone_ombre',name:'Clone d\'ombre',type:'shadow_clone',target:'self',cost:20,duration:5,cloneHpPercent:100,effects:{activationDodge:true},stackable:false,desc:'Crée un clone d\'ombre qui encaisse les dégâts visant le Sorcier pendant 5 tours ou jusqu\'à sa destruction.'},tank_morsure_hydre:{id:'tank_morsure_hydre',name:'Morsure de l\'hydre',type:'damage',target:'enemy',cost:10,powerStats:['physicalPower','magicPower'],multiplier:.8,effects:{energyDrainPercent:20,duration:3},desc:'Hydre jaillissant du bouclier. (PP+PM)x0.8 + drain d\'énergie.'},guerisseur_lux:{id:'guerisseur_lux',name:'Lux',type:'damage',target:'enemy',cost:10,powerStat:'magicPower',multiplier:1.2,effects:{stunChance:50,duration:1},desc:'Rayon de lumière sacrée. 50% de chance d\'étourdir l\'ennemi pour le tour.'},tank_provocation:{id:'tank_provocation',name:'Provocation',type:'taunt',target:'self',cost:15,duration:3,tauntChance:90,desc:'Provoque l\'ennemi. Pendant 3 tours, le Tank a 90% de chances d\'être ciblé.'},guerisseur_soin_mineur:{id:'guerisseur_soin_mineur',name:'Soin mineur',type:'heal',target:'ally_choice',cost:20,healPercent:20,desc:'Restaure 20% des PV max d\'un allié choisi.'}}
const RESOURCES={gelée_slime:{name:'Gelée de slime',emoji:'🟢',sellPrice:5},noyau_slime:{name:'Noyau de slime',emoji:'🟡',sellPrice:8},griffe_loup:{name:'Griffe de loup',emoji:'🐺',sellPrice:6},croc_loup:{name:'Croc de loup',emoji:'🦷',sellPrice:7},fourrure_loup:{name:'Fourrure de loup',emoji:'🧶',sellPrice:5},peau_sanglier:{name:'Peau de sanglier',emoji:'🟤',sellPrice:8},défense_sanglier:{name:'Défense de sanglier',emoji:'⚪',sellPrice:10},morceau_ferraille:{name:'Morceau de ferraille',emoji:'⚙️',sellPrice:6},os_monstre:{name:'Os de monstre',emoji:'💀',sellPrice:5},soie_araignée:{name:'Soie d\'araignée',emoji:'🕸️',sellPrice:7},venin_araignée:{name:'Venin d\'araignée',emoji:'🧪',sellPrice:9},écaille_serpent:{name:'Écaille de serpent',emoji:'🟩',sellPrice:8},croc_serpent:{name:'Croc de serpent',emoji:'🗡️',sellPrice:10},bois_solide:{name:'Bois solide',emoji:'🪵',sellPrice:6},écorce_ancienne:{name:'Écorce ancienne',emoji:'🌳',sellPrice:9},lame_rouillee:{name:'Lame rouillée',emoji:'🗡️',sellPrice:14},cuir_gobelin:{name:'Cuir gobelin',emoji:'🟤',sellPrice:12},os_renforce:{name:'Os renforcé',emoji:'💀',sellPrice:13},croc_sanguinaire:{name:'Croc sanguinaire',emoji:'🦷',sellPrice:15},fourrure_epaisse:{name:'Fourrure épaisse',emoji:'🧶',sellPrice:13},griffe_aceree:{name:'Griffe acérée',emoji:'🐾',sellPrice:14},gelée_corrompue:{name:'Gelée corrompue',emoji:'🟣',sellPrice:13},noyau_corrompu:{name:'Noyau corrompu',emoji:'🟡',sellPrice:18},résidu_instable:{name:'Résidu instable',emoji:'✨',sellPrice:16},soie_noire:{name:'Soie noire',emoji:'🕸️',sellPrice:15},venin_virulent:{name:'Venin virulent',emoji:'🧪',sellPrice:18},patte_chitineuse:{name:'Patte chitineuse',emoji:'🕷️',sellPrice:13},cuir_epais:{name:'Cuir épais',emoji:'🟫',sellPrice:15},défense_massive:{name:'Défense massive',emoji:'⚪',sellPrice:20},plaque_osseuse:{name:'Plaque osseuse',emoji:'🦴',sellPrice:18},écaille_nocturne:{name:'Écaille nocturne',emoji:'🌑',sellPrice:16},croc_venimeux:{name:'Croc venimeux',emoji:'🦷',sellPrice:18},sang_froid:{name:'Sang froid',emoji:'💧',sellPrice:16},bois_ancien:{name:'Bois ancien',emoji:'🪵',sellPrice:17},écorce_runique:{name:'Écorce runique',emoji:'🌳',sellPrice:22},sève_vivante:{name:'Sève vivante',emoji:'💚',sellPrice:20},hache_ebrechee:{name:'Hache ébréchée',emoji:'🪓',sellPrice:18},cuir_renforce:{name:'Cuir renforcé',emoji:'🟤',sellPrice:17},croc_ancien:{name:'Croc ancien',emoji:'🦷',sellPrice:20},fourrure_argentee:{name:'Fourrure argentée',emoji:'🧶',sellPrice:22},coeur_ecorce:{name:'Cœur d\'écorce',emoji:'💚',sellPrice:28},bois_sacre:{name:'Bois sacré',emoji:'🪵',sellPrice:24},écaille_abyssale:{name:'Écaille abyssale',emoji:'🌌',sellPrice:24},croc_abyssal:{name:'Croc abyssal',emoji:'🦷',sellPrice:26},venin_noir:{name:'Venin noir',emoji:'⚫',sellPrice:25},insigne_gobelin:{name:'Insigne gobelin',emoji:'🏵️',sellPrice:26},lame_chef:{name:'Lame de chef',emoji:'⚔️',sellPrice:28}}
const CONSUMABLES={potion_vie:{id:'potion_vie',name:'Potion de vie',emoji:'❤️',healPercent:.3,type:'hp',buyPrice:30,sellPrice:15,desc:'Restaure 30% des PV max'},potion_energie:{id:'potion_energie',name:"Potion d'énergie",emoji:'💧',healPercent:.3,type:'pe',buyPrice:30,sellPrice:15,desc:"Restaure 30% des PE max"}}
const WEAPONS={dague_os:{id:'dague_os',name:'Dague en os',emoji:'🗡️',level:1,stats:{pp:8,crit:3},materials:{os_monstre:2,croc_loup:1},normalPrice:80,reducedPrice:40,sellPrice:20,desc:'+8 PP, +3% CRIT'},epee_ferraille:{id:'epee_ferraille',name:'Épée de ferraille',emoji:'⚔️',level:1,stats:{pp:10,def:5},materials:{morceau_ferraille:3,bois_solide:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+10 PP, +5 DEF'},bouclier_bois:{id:'bouclier_bois',name:'Bouclier en bois',emoji:'🛡️',level:1,stats:{def:8,pvMax:25},materials:{bois_solide:3,peau_sanglier:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+8 DEF, +25 PV max'},baton_bois:{id:'baton_bois',name:'Bâton de bois',emoji:'🪄',level:1,stats:{pm:10,peMax:25},materials:{bois_solide:2,noyau_slime:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+10 PM, +25 PE max'},grimoire_use:{id:'grimoire_use',name:'Grimoire usé',emoji:'📖',level:1,stats:{pm:10,crit:3},materials:{peau_sanglier:1,venin_araignée:1,soie_araignée:1},normalPrice:100,reducedPrice:50,sellPrice:25,desc:'+10 PM, +3% CRIT'},dague_sanguinaire:{id:'dague_sanguinaire',name:'Dague sanguinaire',emoji:'🗡️',level:10,stats:{pp:16,crit:4},materials:{croc_sanguinaire:2,griffe_aceree:2,cuir_gobelin:1},normalPrice:300,reducedPrice:150,sellPrice:75,desc:'+16 PP, +4% CRIT'},epee_renforcee:{id:'epee_renforcee',name:'Épée renforcée',emoji:'⚔️',level:10,stats:{pp:20,def:10},materials:{lame_rouillee:2,os_renforce:2,cuir_gobelin:1},normalPrice:320,reducedPrice:160,sellPrice:80,desc:'+20 PP, +10 DEF'},bouclier_ecorce:{id:'bouclier_ecorce',name:"Bouclier d'écorce",emoji:'🛡️',level:10,stats:{def:16,pvMax:50},materials:{bois_ancien:2,écorce_runique:1,cuir_epais:1},normalPrice:320,reducedPrice:160,sellPrice:80,desc:'+16 DEF, +50 PV max'},baton_corrompu:{id:'baton_corrompu',name:'Bâton corrompu',emoji:'🪄',level:10,stats:{pm:20,peMax:50},materials:{noyau_corrompu:2,résidu_instable:2,bois_ancien:1},normalPrice:320,reducedPrice:160,sellPrice:80,desc:'+20 PM, +50 PE max'},grimoire_noirci:{id:'grimoire_noirci',name:'Grimoire noirci',emoji:'📖',level:10,stats:{pm:20,crit:4},materials:{soie_noire:2,venin_virulent:1,résidu_instable:1},normalPrice:350,reducedPrice:175,sellPrice:88,desc:'+20 PM, +4% CRIT'}}
const ARMORS={armure_legere:{id:'armure_legere',name:'Armure légère',emoji:'🦺',level:1,stats:{def:6,esq:3},materials:{peau_sanglier:2,fourrure_loup:1},normalPrice:80,reducedPrice:40,sellPrice:20,desc:'+6 DEF, +3% ESQ'},armure_lourde:{id:'armure_lourde',name:'Armure lourde',emoji:'🛡️',level:1,stats:{def:10,pvMax:30},materials:{morceau_ferraille:3,défense_sanglier:1},normalPrice:100,reducedPrice:50,sellPrice:25,desc:'+10 DEF, +30 PV max'},robe_magique:{id:'robe_magique',name:'Robe magique',emoji:'👘',level:1,stats:{def:6,peMax:30},materials:{soie_araignée:2,noyau_slime:1},normalPrice:100,reducedPrice:50,sellPrice:25,desc:'+6 DEF, +30 PE max'},tunique:{id:'tunique',name:'Tunique',emoji:'👕',level:1,stats:{pvMax:25,peMax:25},materials:{fourrure_loup:2,peau_sanglier:1},normalPrice:90,reducedPrice:45,sellPrice:22,desc:'+25 PV max, +25 PE max'},armure_legere_renforcee:{id:'armure_legere_renforcee',name:'Armure légère renforcée',emoji:'🦺',level:10,stats:{def:12,esq:4},materials:{cuir_epais:2,fourrure_epaisse:2,patte_chitineuse:1},normalPrice:300,reducedPrice:150,sellPrice:75,desc:'+12 DEF, +4% ESQ'},armure_lourde_cuirassee:{id:'armure_lourde_cuirassee',name:'Armure lourde cuirassée',emoji:'🛡️',level:10,stats:{def:20,pvMax:60},materials:{plaque_osseuse:2,défense_massive:1,cuir_renforce:2},normalPrice:350,reducedPrice:175,sellPrice:88,desc:'+20 DEF, +60 PV max'},robe_obscure:{id:'robe_obscure',name:'Robe obscure',emoji:'👘',level:10,stats:{def:12,peMax:60},materials:{soie_noire:2,noyau_corrompu:1,écaille_nocturne:1},normalPrice:350,reducedPrice:175,sellPrice:88,desc:'+12 DEF, +60 PE max'},tunique_renforcee:{id:'tunique_renforcee',name:'Tunique renforcée',emoji:'👕',level:10,stats:{pvMax:50,peMax:50},materials:{fourrure_epaisse:2,cuir_epais:1,sang_froid:1},normalPrice:320,reducedPrice:160,sellPrice:80,desc:'+50 PV max, +50 PE max'}}
const MONSTERS={slime:{id:'slime',name:'Slime',emoji:'🟢',baseStats:{for:1,rap:1,con:4,mana:1},drops:[{id:'gelée_slime',min:1,max:2,chance:.8},{id:'noyau_slime',min:1,max:1,chance:.3}],xpReward:15},loup:{id:'loup',name:'Loup',emoji:'🐺',baseStats:{for:3,rap:4,con:2,mana:1},drops:[{id:'croc_loup',min:1,max:2,chance:.7},{id:'fourrure_loup',min:1,max:1,chance:.5},{id:'griffe_loup',min:1,max:1,chance:.4}],xpReward:18},sanglier:{id:'sanglier',name:'Sanglier',emoji:'🐗',baseStats:{for:4,rap:2,con:5,mana:1},drops:[{id:'peau_sanglier',min:1,max:2,chance:.7},{id:'défense_sanglier',min:1,max:1,chance:.4}],xpReward:22},araignee:{id:'araignee',name:'Araignée',emoji:'🕷️',baseStats:{for:2,rap:3,con:3,mana:2},drops:[{id:'soie_araignée',min:1,max:2,chance:.7},{id:'venin_araignée',min:1,max:1,chance:.4}],xpReward:20},serpent:{id:'serpent',name:'Serpent',emoji:'🐍',baseStats:{for:3,rap:4,con:2,mana:2},drops:[{id:'écaille_serpent',min:1,max:2,chance:.7},{id:'croc_serpent',min:1,max:1,chance:.4}],xpReward:24},treant:{id:'treant',name:'Tréant',emoji:'🌳',baseStats:{for:5,rap:1,con:6,mana:2},drops:[{id:'bois_solide',min:2,max:3,chance:.8},{id:'écorce_ancienne',min:1,max:1,chance:.3}],xpReward:30},gobelin_faible:{id:'gobelin_faible',name:'Gobelin',emoji:'👺',baseStats:{for:2,rap:3,con:2,mana:1},drops:[{id:'morceau_ferraille',min:1,max:2,chance:.6},{id:'os_monstre',min:1,max:1,chance:.5}],xpReward:16},loup_alpha:{id:'loup_alpha',name:'Loup alpha',emoji:'🐺',baseStats:{for:4,rap:5,con:3,mana:1},drops:[{id:'croc_loup',min:2,max:3,chance:.8},{id:'fourrure_loup',min:1,max:2,chance:.6}],xpReward:28},gobelin_eclaireur:{id:'gobelin_eclaireur',name:'Gobelin éclaireur',emoji:'👹',baseStats:{for:4,rap:5,con:3,mana:2},drops:[{id:'morceau_ferraille',min:1,max:3,chance:.7},{id:'os_monstre',min:1,max:2,chance:.6}],xpReward:26},gobelin_guerrier:{id:'gobelin_guerrier',name:'Gobelin guerrier',emoji:'👺',baseStats:{for:5,rap:4,con:4,mana:2},drops:[{id:'lame_rouillee',min:1,max:2,chance:.65},{id:'cuir_gobelin',min:1,max:2,chance:.55},{id:'os_renforce',min:1,max:1,chance:.35}],xpReward:38},loup_sanguinaire:{id:'loup_sanguinaire',name:'Loup sanguinaire',emoji:'🐺',baseStats:{for:5,rap:6,con:3,mana:1},drops:[{id:'croc_sanguinaire',min:1,max:2,chance:.7},{id:'fourrure_epaisse',min:1,max:2,chance:.6},{id:'griffe_aceree',min:1,max:1,chance:.4}],xpReward:42},slime_corrompu:{id:'slime_corrompu',name:'Slime corrompu',emoji:'🟣',baseStats:{for:3,rap:2,con:6,mana:4},drops:[{id:'gelée_corrompue',min:1,max:2,chance:.75},{id:'noyau_corrompu',min:1,max:1,chance:.4},{id:'résidu_instable',min:1,max:1,chance:.3}],xpReward:40},araignee_venimeuse:{id:'araignee_venimeuse',name:'Araignée venimeuse',emoji:'🕷️',baseStats:{for:4,rap:6,con:4,mana:4},drops:[{id:'soie_noire',min:1,max:2,chance:.7},{id:'venin_virulent',min:1,max:1,chance:.5},{id:'patte_chitineuse',min:1,max:2,chance:.45}],xpReward:48},sanglier_cuirasse:{id:'sanglier_cuirasse',name:'Sanglier cuirassé',emoji:'🐗',baseStats:{for:6,rap:3,con:7,mana:1},drops:[{id:'cuir_epais',min:1,max:2,chance:.75},{id:'défense_massive',min:1,max:1,chance:.45},{id:'plaque_osseuse',min:1,max:1,chance:.35}],xpReward:52},serpent_nocturne:{id:'serpent_nocturne',name:'Serpent nocturne',emoji:'🐍',baseStats:{for:5,rap:6,con:4,mana:4},drops:[{id:'écaille_nocturne',min:1,max:2,chance:.7},{id:'croc_venimeux',min:1,max:1,chance:.5},{id:'sang_froid',min:1,max:1,chance:.3}],xpReward:50},treant_ancien:{id:'treant_ancien',name:'Tréant ancien',emoji:'🌳',baseStats:{for:7,rap:2,con:8,mana:4},drops:[{id:'bois_ancien',min:1,max:3,chance:.8},{id:'écorce_runique',min:1,max:1,chance:.45},{id:'sève_vivante',min:1,max:1,chance:.35}],xpReward:62},gobelin_barbare:{id:'gobelin_barbare',name:'Gobelin barbare',emoji:'👹',baseStats:{for:6,rap:5,con:5,mana:1},drops:[{id:'hache_ebrechee',min:1,max:1,chance:.55},{id:'cuir_renforce',min:1,max:2,chance:.65},{id:'os_renforce',min:1,max:2,chance:.5}],xpReward:60},loup_ancien:{id:'loup_ancien',name:'Loup ancien',emoji:'🐺',baseStats:{for:6,rap:7,con:4,mana:2},drops:[{id:'croc_ancien',min:1,max:2,chance:.7},{id:'fourrure_argentee',min:1,max:1,chance:.45},{id:'griffe_aceree',min:1,max:2,chance:.5}],xpReward:64},gardien_ecorce:{id:'gardien_ecorce',name:'Gardien d\'écorce',emoji:'🌲',baseStats:{for:8,rap:3,con:9,mana:5},drops:[{id:'coeur_ecorce',min:1,max:1,chance:.5},{id:'bois_sacre',min:1,max:2,chance:.65},{id:'écorce_runique',min:1,max:2,chance:.55}],xpReward:76},serpent_abyssal:{id:'serpent_abyssal',name:'Serpent abyssal',emoji:'🐍',baseStats:{for:6,rap:7,con:5,mana:6},drops:[{id:'écaille_abyssale',min:1,max:2,chance:.7},{id:'croc_abyssal',min:1,max:1,chance:.5},{id:'venin_noir',min:1,max:1,chance:.45}],xpReward:78},chef_gobelin:{id:'chef_gobelin',name:'Chef gobelin',emoji:'👺',baseStats:{for:7,rap:6,con:6,mana:3},drops:[{id:'insigne_gobelin',min:1,max:1,chance:.45},{id:'lame_chef',min:1,max:1,chance:.35},{id:'cuir_gobelin',min:1,max:3,chance:.75}],xpReward:82}}
const FOREST_LEVELS=[{id:1,name:'Clairière',minLevel:1,pool:['slime','loup','gobelin_faible']},{id:2,name:'Sous-bois',minLevel:1,pool:['slime','loup','gobelin_faible']},{id:3,name:'Fourrés',minLevel:2,pool:['sanglier','araignee','serpent']},{id:4,name:'Taillis',minLevel:2,pool:['sanglier','araignee','serpent']},{id:5,name:'Bois sombre',minLevel:3,pool:['sanglier','araignee','serpent','loup']},{id:6,name:'Forêt profonde',minLevel:3,pool:['treant','loup_alpha','gobelin_eclaireur']},{id:7,name:'Cœur de la forêt',minLevel:4,pool:['treant','loup_alpha','gobelin_eclaireur']},{id:8,name:'Clairière ancienne',minLevel:4,pool:['treant','loup_alpha','gobelin_eclaireur','serpent']},{id:9,name:'Sanctuaire oublié',minLevel:5,pool:['treant','loup_alpha','gobelin_eclaireur']}]
const FOREST_ZONES=[
  {id:'forest_1_3',name:'Forêt des abords',label:'Niveaux 1 à 3',minLevel:1,maxLevel:3,monsterPool:['slime','loup','gobelin_faible']},
  {id:'forest_4_6',name:'Forêt profonde',label:'Niveaux 4 à 6',minLevel:4,maxLevel:6,monsterPool:['sanglier','araignee','serpent']},
  {id:'forest_7_9',name:'Cœur de la forêt',label:'Niveaux 7 à 9',minLevel:7,maxLevel:9,monsterPool:['treant','loup_alpha','gobelin_eclaireur']},
  {id:'forest_10_12',name:'Bois sauvage',label:'Niveaux 10 à 12',minLevel:10,maxLevel:12,monsterPool:['gobelin_guerrier','loup_sanguinaire','slime_corrompu']},
  {id:'forest_13_15',name:'Bois maudit',label:'Niveaux 13 à 15',minLevel:13,maxLevel:15,monsterPool:['araignee_venimeuse','sanglier_cuirasse','serpent_nocturne']},
  {id:'forest_16_18',name:'Forêt ancienne',label:'Niveaux 16 à 18',minLevel:16,maxLevel:18,monsterPool:['treant_ancien','gobelin_barbare','loup_ancien']},
  {id:'forest_19_21',name:'Sanctuaire sylvestre',label:'Niveaux 19 à 21',minLevel:19,maxLevel:21,monsterPool:['gardien_ecorce','serpent_abyssal','chef_gobelin']}
]

/* ============== AUDIO ============== */
let _actx=null
let _muted=localStorage.getItem('vr_muted')==='1'
function _ctx(){try{if(!_actx)_actx=new(window.AudioContext||window.webkitAudioContext)();if(_actx.state==='suspended')_actx.resume()}catch(e){}}
function _osc(freq,endFreq,type,dur,vol){try{_ctx();const o=_actx.createOscillator(),g=_actx.createGain();o.type=type||'sawtooth';o.frequency.setValueAtTime(freq,_actx.currentTime);if(endFreq)o.frequency.exponentialRampToValueAtTime(endFreq,_actx.currentTime+dur);g.gain.setValueAtTime(vol||.3,_actx.currentTime);g.gain.exponentialRampToValueAtTime(.001,_actx.currentTime+dur);o.connect(g);g.connect(_actx.destination);o.start();o.stop(_actx.currentTime+dur)}catch(e){}}
function _noise(dur,vol){try{_ctx();const b=_actx.createBuffer(1,_actx.sampleRate*dur,_actx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=_actx.createBufferSource(),g=_actx.createGain();s.buffer=b;g.gain.setValueAtTime(vol||.15,_actx.currentTime);g.gain.exponentialRampToValueAtTime(.001,_actx.currentTime+dur);s.connect(g);g.connect(_actx.destination);s.start()}catch(e){}}
function play(s){if(_muted)return;if(s==='hit')_osc(150,50,'sawtooth',.15,.3)
else if(s==='crit'){_osc(800,200,'sawtooth',.2,.25);setTimeout(()=>_osc(1200,300,'sine',.15,.2),50)}
else if(s==='dodge')_noise(.08,.08)
else if(s==='heal'){_osc(400,800,'sine',.25,.2);setTimeout(()=>_osc(600,1000,'sine',.2,.15),80)}
else if(s==='coin')_osc(2000,1500,'sine',.06,.15)
else if(s==='victory'){_osc(523,660,'sine',.2,.2);setTimeout(()=>_osc(659,784,'sine',.2,.2),150);setTimeout(()=>_osc(784,1047,'sine',.3,.25),300)}
else if(s==='levelup'){_osc(523,587,'sine',.15,.15);setTimeout(()=>_osc(659,740,'sine',.15,.15),120);setTimeout(()=>_osc(784,880,'sine',.2,.2),240)}
else if(s==='defeat'){_osc(300,60,'sawtooth',.5,.25);setTimeout(()=>_osc(200,40,'sawtooth',.4,.2),200)}
else if(s==='sleep'){_osc(500,600,'sine',.6,.15);setTimeout(()=>_osc(400,500,'sine',.5,.12),300)}
else if(s==='drink'){_osc(1200,800,'sine',.08,.1);setTimeout(()=>_osc(1000,700,'sine',.08,.08),60);setTimeout(()=>_osc(900,600,'sine',.08,.06),120)}
else if(s==='eat'){_osc(600,800,'sine',.1,.12);setTimeout(()=>_osc(800,1000,'sine',.12,.1),80)}
else if(s==='merchant'){_osc(180,150,'square',.12,.12);setTimeout(()=>_osc(220,180,'square',.15,.1),100)}
else if(s==='buy')_osc(2500,1800,'sine',.08,.15)
else if(s==='sell')_osc(1800,1200,'sine',.1,.12)
}
function toggleMute(){_muted=!_muted;localStorage.setItem('vr_muted',_muted?'1':'0');const e=document.getElementById('btn-mute');if(e)e.textContent=_muted?'🔇':'🔊'}

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
function initGameState(){return{slotName:'',gold:50,team:[],activeChar:0,forestLevel:1,forestExploreCount:0,selectedForestZoneId:null,inventory:{resources:{},consumables:{},weapons:[],armors:[]},logs:[],combat:{monster:null,guarding:false,enemyEffects:{},combatLog:[],charActed:[],pendingActions:[]},tavernResting:false,created:Date.now()}}
function saveSlots(){try{return JSON.parse(localStorage.getItem('vr_saves')||'[]')}catch{return[]}}
function saveSlotsWrite(arr){localStorage.setItem('vr_saves',JSON.stringify(arr))}
function getSave(slot){const s=saveSlots();return s[slot]||null}
function deleteSave(slot){const s=saveSlots();if(s[slot]){s.splice(slot,1);saveSlotsWrite(s)}}
function saveGame(){if(!G)return;const saves=saveSlots();G.slotName=G.slotName||'Partie';const idx=saves.findIndex(s=>s.slotName===G.slotName&&s.created===G.created);const data=JSON.parse(JSON.stringify(G));delete data._justLeveledUp;if(idx>=0)saves[idx]=data;else saves.push(data);saveSlotsWrite(saves)}
function loadGame(slotData){G=JSON.parse(JSON.stringify(slotData));G.combat=G.combat||{monster:null,guarding:false,enemyEffects:{},combatLog:[]};G.tavernResting=false;if(G.selectedForestZoneId===undefined)G.selectedForestZoneId=null;G.team.forEach(c=>{const cls=CLASSES[c.classId];if(cls)c.spells=cls.spells||[]});switchView('map');renderAll()}

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
  let pp=base.pp+equip.pp,def=base.def+equip.def,pm=base.pm+equip.pm,
    pvMax=base.pvMax+equip.pvMax,peMax=base.peMax+equip.peMax,
    crit=base.crit+equip.crit,esq=Math.min(40,base.esq+equip.esq),
    forStat=base.for,rap=base.rap,con=base.con,mana=base.mana
  if(char.effects?.critBuff)crit+=char.effects.critBuff.value
  if(char.effects?.ppBuff)pp=Math.floor(pp*(1+char.effects.ppBuff.value/100))
  if(char.effects?.pmBuff)pm=Math.floor(pm*(1+char.effects.pmBuff.value/100))
  return{pp,def,pm,pvMax,peMax,crit,esq,for:forStat,rap,con,mana}
}
function clampChar(char){
  const s=getFinalStats(char)
  char.currentHp=Math.min(char.currentHp,s.pvMax)
  char.currentPe=Math.min(char.currentPe,s.peMax)
}
function scaleItemStat(baseValue,statKey,itemLevel){if(itemLevel===1)return baseValue;if(['crit','esq'].includes(statKey))return Math.round(baseValue+itemLevel/10);return Math.round(baseValue*Math.pow(2,itemLevel/10))}
function scaleItemStats(baseStats,itemLevel){const r={};Object.keys(baseStats).forEach(k=>{r[k]=scaleItemStat(baseStats[k],k,itemLevel)});return r}

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
    currentHp:0,currentPe:0,weapon:null,armor:null,spells:cls.spells||[],
    statPoints:0
  }
  const s=getFinalStats(char)
  char.currentHp=s.pvMax;char.currentPe=s.peMax
  G.team.push(char)
}

/* ============== MONSTERS ============== */
function computeMonsterStats(m){
  const l=m.level,f=m.baseStats.for,r=m.baseStats.rap,c=m.baseStats.con,ma=m.baseStats.mana
  const pp=40+5*(l-1)+7*(f-1),def=40+5*(l-1)+7*(c-1),pm=40+5*(l-1)+7*(ma-1)
  const pvMax=80+10*(l-1)+12*(c-1),peMax=80+10*(l-1)+12*(ma-1),crit=r,esq=Math.min(30,Math.floor(r/2))
  return{pp,def,pm,pvMax,peMax,crit,esq,for:f,rap:r,con:c,mana:ma}
}

/* ============== COMBAT ============== */
function startCombat(){
  if(!G)return
  const m=spawnMonsterFromZone(G.selectedForestZoneId||'forest_1_3')
  const ms=computeMonsterStats(m)
  m.currentHp=ms.pvMax;m.currentPe=ms.peMax
  G.combat={monster:m,guarding:false,enemyEffects:{},combatLog:[],monsterStats:ms,defeat:false,charActed:G.team.map(()=>false),pendingActions:[]}
  const firstAlive=G.team.findIndex(c=>c.currentHp>0)
  if(firstAlive>=0)G.activeChar=firstAlive
  else G.activeChar=0
  G.combat.combatLog.push(`⚔️ Combat contre ${m.name} (Niv.${m.level}) !`)
  G.combat.combatLog.push(`👉 ${G.team[G.activeChar].name}, à toi !`)
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
function getClassTargetPriority(char){switch(char.classId){case'guerisseur':return 1;case'mage':case'sorcier':return 2;case'assassin':return 3;case'epeiste':return 4;case'tank':return 5;default:return 9}}
function getHpRatio(char){const s=getFinalStats(char);return s.pvMax>0?char.currentHp/s.pvMax:1}
function chooseMonsterTarget(){
  if(!G||!G.team)return null
  const alive=G.team.map((char,index)=>({char,index})).filter(e=>e.char.currentHp>0)
  if(alive.length===0)return null
  if(G.combat&&G.combat.taunt){const ti=G.combat.taunt.charIndex;const tt=alive.find(e=>e.index===ti);if(tt&&Math.random()<0.90){addCombatLog(`🛡️ ${tt.char.name} attire le monstre (Provocation) !`);return tt.char}}
  if(Math.random()<0.10)return alive[Math.floor(Math.random()*alive.length)].char
  alive.sort((a,b)=>{const pa=getClassTargetPriority(a.char),pb=getClassTargetPriority(b.char);if(pa!==pb)return pa-pb;return getHpRatio(a.char)-getHpRatio(b.char)})
  return alive[0].char
}
function enemyTurn(){
  if(!G||!getMonster()||getMonster().currentHp<=0)return
  const ms=getMonsterStats();if(!ms)return
  const effMs=getEffectiveMonsterStats()||ms
  processEnemyEffects()
  if(getMonster().currentHp<=0){setTimeout(victory,400);return}
  if(G.combat.enemyEffects.stun){
    addCombatLog(`💫 ${getMonster().name} est étourdi et ne peut pas attaquer !`)
    G.combat.guarding=false;renderCombat()
    G.combat.charActed=G.team.map(()=>false)
    const aliveIdx=G.team.findIndex(c=>c.currentHp>0)
    if(aliveIdx>=0)G.activeChar=aliveIdx
    addCombatLog(`--- Tour suivant ---`)
    if(G.activeChar!==undefined){addCombatLog(`👉 ${G.team[G.activeChar].name}, à toi !`)}
    renderCombat()
    return
  }
  const alive=G.team.filter(c=>c.currentHp>0)
  if(alive.length===0)return
  const m=getMonster()
  const peCost=Math.max(3,Math.floor(ms.peMax*0.1))
  if((m.currentPe||0)<peCost){
    const recover=Math.floor(ms.peMax*0.2)
    m.currentPe=Math.min(ms.peMax,(m.currentPe||0)+recover)
    addCombatLog(`💤 ${m.name} est à bout de souffle et récupère ${recover} PE`)
    G.combat.guarding=false
    renderCombat()
  }else{
    m.currentPe-=peCost
    const target=chooseMonsterTarget()
    if(!target){renderCombat();return}
    if(target.classId==='guerisseur')addCombatLog(`👁️ ${m.name} vise le soigneur !`)
    const baseDmg=Math.max(1,ms.pp+Math.floor(Math.random()*5)-2)
    const tDef=getFinalStats(target).def
    let dmg=Math.max(1,baseDmg-Math.floor(tDef/2))
    const isGuarding=G.combat.guarding
    if(isGuarding){dmg=Math.max(1,Math.floor(dmg*.5));addCombatLog(`🛡️ ${target.name} encaisse ! Dégâts réduits à ${dmg}`)}
    const critRoll=Math.random()*100
    if(critRoll<effMs.crit){dmg=Math.floor(dmg*1.5);play('crit');addCombatLog(`💥 Coup critique du monstre !`)}
    if(target.effects?.activationBlock?.active){
      delete target.effects.activationBlock
      addCombatLog(`🔮 ${target.name} maintient sa Canalisation et bloque les dégâts !`)
      renderCombat()
    }else if(target.effects?.activationDodge?.active){
      delete target.effects.activationDodge
      addCombatLog(`💨 ${target.name} disparaît dans l'ombre et esquive l'attaque !`)
      renderCombat()
    }else if(target.effects?.shadowClone){
      const clone=target.effects.shadowClone
      clone.hp-=dmg
      addCombatLog(`🌑 Le Clone d'ombre encaisse ${dmg} dégâts ! (PV restants : ${Math.max(0,clone.hp)}/${clone.maxHp})`)
      if(clone.hp<=0){delete target.effects.shadowClone;addCombatLog(`💥 Le Clone d'ombre se dissipe !`)}
      G.combat.guarding=false
      renderCombat()
    }else{
      target.currentHp=Math.max(0,target.currentHp-dmg)
      G.combat.guarding=false
      play('hit')
      addCombatLog(`💢 ${m.name} inflige ${dmg} dégâts à ${target.name}`)
      renderCombat()
    }
  }
  // réduire duration de taunt
  if(G.combat&&G.combat.taunt){G.combat.taunt.duration--;if(G.combat.taunt.duration<=0)delete G.combat.taunt}
  tickCharacterEffects()
  const result=isCombatOver()
  if(result==='victory'){setTimeout(victory,400);return}
  if(result==='defeat'){play('defeat');addCombatLog('💀 Toute l\'équipe est vaincue...');renderCombat();G.combat.defeat=true;document.getElementById('combat-defeat').classList.remove('hidden');document.querySelectorAll('#combat-buttons button').forEach(b=>b.disabled=true);document.getElementById('combat-spells').classList.add('hidden');return}
  G.combat.charActed=G.team.map(()=>false)
  const aliveIdx=G.team.findIndex(c=>c.currentHp>0)
  if(aliveIdx>=0)G.activeChar=aliveIdx
  addCombatLog(`--- Tour suivant ---`)
  if(G.activeChar!==undefined){addCombatLog(`👉 ${G.team[G.activeChar].name}, à toi !`)}
  renderCombat()
}
function queuePlayerAction(type,spellId,targetIndex){
  if(!G||!getMonster()||getMonster().currentHp<=0||G.combat.defeat)return
  const char=G.team[G.activeChar];if(!char||char.currentHp<=0)return
  document.getElementById('combat-spells').classList.add('hidden');document.getElementById('combat-buttons').classList.remove('hidden')
  if(!G.combat.charActed)G.combat.charActed=G.team.map(()=>false)
  if(G.combat.charActed[G.activeChar]){addCombatLog(`⏳ ${char.name} a déjà agi ce tour`);renderCombat();return}
  G.combat.pendingActions.push({charIndex:G.activeChar,type,spellId,targetIndex,charName:char.name})
  G.combat.charActed[G.activeChar]=true
  const actionLabel={attack:'une attaque',guard:'une garde',spell:SPELLS[spellId]?.name||'un sort'}[type]||type
  addCombatLog(`📋 ${char.name} prépare ${actionLabel}`)
  const aliveIndices=G.team.map((c,i)=>c.currentHp>0?i:-1).filter(i=>i>=0)
  const notActed=aliveIndices.filter(i=>!G.combat.charActed[i])
  if(notActed.length===0){
    addCombatLog(`=== Résolution du tour ===`)
    setTimeout(resolveTurn,400)
  }else{
    G.activeChar=notActed[0]
    addCombatLog(`👉 ${G.team[G.activeChar].name}, à toi !`)
    renderCombat()
  }
}
function combatAttack(){
  if(!G||!getMonster())return;const char=G.team[G.activeChar];if(!char||char.currentHp<=0)return
  queuePlayerAction('attack')
}
function combatSpell(spellId,targetIndex){
  if(!G||!getMonster())return;const char=G.team[G.activeChar];if(!char||char.currentHp<=0)return
  const spell=SPELLS[spellId];if(!spell)return
  if(char.currentPe<spell.cost){addCombatLog(`❌ Pas assez de PE ! (${char.currentPe}/${spell.cost})`);renderCombat();return}
  if(spell.type==='heal'&&spell.target==='ally_choice'&&targetIndex===undefined){
    showCombatAllyTargetSelector('Choisir une cible :',idx=>combatSpell(spellId,idx));return
  }
  queuePlayerAction('spell',spellId,targetIndex)
}
function showCombatAllyTargetSelector(title,callback){
  const existing=document.getElementById('popup-combat-target');if(existing)existing.remove()
  const overlay=document.createElement('div');overlay.id='popup-combat-target';overlay.className='popup-overlay'
  overlay.innerHTML=`<div class="popup popup-small"><div class="popup-header"><h3>${title}</h3><button class="popup-close" id="btn-combat-target-close">✕</button></div><div class="popup-body" style="display:flex;flex-direction:column;gap:6px" id="combat-target-body"></div></div>`
  document.body.appendChild(overlay)
  const body=document.getElementById('combat-target-body')
  G.team.forEach((c,i)=>{
    if(c.currentHp<=0)return
    const cls=CLASSES[c.classId];const s=getFinalStats(c)
    const btn=document.createElement('button');btn.className='btn-action';btn.style.textAlign='left'
    btn.innerHTML=`${cls?.emoji||'👤'} ${c.name} <span style="color:var(--text2);font-size:0.75rem">${c.currentHp}/${s.pvMax} PV</span>`
    btn.addEventListener('click',()=>{overlay.remove();callback(i)})
    body.appendChild(btn)
  })
  document.getElementById('btn-combat-target-close').addEventListener('click',()=>overlay.remove())
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove()})
}
function combatGuard(){
  if(!G||!getMonster())return;const char=G.team[G.activeChar];if(!char||char.currentHp<=0)return
  queuePlayerAction('guard')
}
function resolveTurn(){
  if(!G||!getMonster()||getMonster().currentHp<=0)return
  const actions=[...G.combat.pendingActions];G.combat.pendingActions=[]
  const ms=getMonsterStats();if(!ms)return
  const effMs=getEffectiveMonsterStats()||ms
  let effectiveDef=ms.def
  if(G.combat.enemyEffects.defRed)effectiveDef=Math.floor(effectiveDef*(1-G.combat.enemyEffects.defRed.value/100))
  for(const a of actions){
    if(getMonster().currentHp<=0)break
    const char=G.team[a.charIndex];if(!char||char.currentHp<=0)continue
    const s=getFinalStats(char);const ms=getMonsterStats();if(!ms)continue
    if(a.type==='attack'){
      let dmg=Math.max(1,s.pp-Math.floor(effectiveDef/2))
      const critRoll=Math.random()*100;let crit=false
      if(critRoll<s.crit){dmg=Math.floor(dmg*1.5);crit=true}
      const esqRoll=Math.random()*100
      if(esqRoll<effMs.esq){play('dodge');addCombatLog(`💨 ${getMonster().name} esquive l'attaque de ${char.name}!`);renderCombat();continue}
      getMonster().currentHp=Math.max(0,getMonster().currentHp-dmg)
      crit?play('crit'):play('hit')
      addCombatLog(`${crit?'💥 Critique ! ':''}⚔️ ${char.name} attaque : ${dmg} dégâts`)
      renderCombat()
      if(getMonster().currentHp<=0){setTimeout(victory,400);return}
    }else if(a.type==='spell'){
      const spell=SPELLS[a.spellId];if(!spell)continue
      if(spell.type==='damage'){
        char.currentPe-=spell.cost
        let dmg=1
        if(spell.powerStat==='physicalPower'){dmg=Math.floor(s.pp*(spell.multiplier||1))}
        else if(spell.powerStat==='magicPower'){dmg=Math.floor(s.pm*(spell.multiplier||1))}
        else if(spell.powerStats){
          let total=0;spell.powerStats.forEach(ps=>{if(ps==='physicalPower')total+=s.pp;if(ps==='magicPower')total+=s.pm})
          dmg=Math.floor(total*(spell.multiplier||1))
        }
        const esqRoll=Math.random()*100
        if(esqRoll<effMs.esq){play('dodge');addCombatLog(`💨 ${getMonster().name} esquive ${spell.name}!`);char.currentPe+=spell.cost;renderCombat();continue}
        if(spell.id==='assassin_assassinat'){
          const critRoll=Math.random()*100
          if(critRoll<s.crit){dmg=Math.floor(s.pp*1.5);play('crit');addCombatLog(`💥 Vrai critique ! x1.5`)}
          else{dmg=Math.floor(s.pp*1.2);addCombatLog(`⚡ Critique léger x1.2`)}
        }
        dmg=Math.max(1,dmg-Math.floor(effectiveDef/2))
        getMonster().currentHp=Math.max(0,getMonster().currentHp-dmg)
        play('hit')
        addCombatLog(`🔮 ${char.name} utilise ${spell.name} : ${dmg} dégâts`)
        if(spell.effects){
          if(spell.effects.defenseReductionPercent){
            G.combat.enemyEffects.defRed={value:spell.effects.defenseReductionPercent,duration:spell.effects.duration,stackable:spell.effects.stackable}
            addCombatLog(`⬇️ DEF de l'ennemi réduite de ${spell.effects.defenseReductionPercent}%`)}
          if(spell.effects.rapidityReductionPercent){
            G.combat.enemyEffects.rapRed={value:spell.effects.rapidityReductionPercent,duration:spell.effects.duration,stackable:spell.effects.stackable}
            addCombatLog(`⬇️ RAP de l'ennemi réduite de ${spell.effects.rapidityReductionPercent}%`)}
          if(spell.effects.energyDrainPercent){
            G.combat.enemyEffects.energyDrain={value:spell.effects.energyDrainPercent,duration:spell.effects.duration}
            addCombatLog(`💧 Drain d'énergie : -${spell.effects.energyDrainPercent}% PE/tour`)}
          if(spell.effects.poisonPercent){
            if(!G.combat.enemyEffects.poison)G.combat.enemyEffects.poison={stacks:0,value:spell.effects.poisonPercent,duration:spell.effects.duration}
            if(G.combat.enemyEffects.poison.stacks<(spell.effects.maxStacks||1))G.combat.enemyEffects.poison.stacks++
            G.combat.enemyEffects.poison.duration=spell.effects.duration
            addCombatLog(`🔥 Brûlure accumulée : ${G.combat.enemyEffects.poison.stacks}x`)}
          if(spell.effects.stunChance){
            if(Math.random()*100<spell.effects.stunChance){
              G.combat.enemyEffects.stun={duration:spell.effects.duration}
              addCombatLog(`💫 ${getMonster().name} est étourdi !`)}
          }
        }
        renderCombat()
        if(getMonster().currentHp<=0){setTimeout(victory,400);return}
      }else if(spell.type==='heal'){
        const target=G.team[a.targetIndex]
        if(!target||target.currentHp<=0){addCombatLog(`❌ La cible n'est plus valide.`);renderCombat();continue}
        char.currentPe-=spell.cost
        const ts=getFinalStats(target)
        const heal=Math.floor(ts.pvMax*(spell.healPercent/100))
        target.currentHp=Math.min(ts.pvMax,target.currentHp+heal)
        play('heal')
        addCombatLog(`✨ ${char.name} utilise ${spell.name} sur ${target.name} : +${heal} PV`)
        renderCombat()
      }else if(spell.type==='taunt'){
        char.currentPe-=spell.cost
        G.combat.taunt={charIndex:a.charIndex,duration:spell.duration||3}
        addCombatLog(`🛡️ ${char.name} provoque l'ennemi !`)
        renderCombat()
      }else if(spell.type==='self_buff'){
        char.currentPe-=spell.cost
        char.effects=char.effects||{}
        if(spell.effects.critBuffPercent)char.effects.critBuff={value:spell.effects.critBuffPercent,duration:spell.duration,source:spell.id}
        if(spell.effects.pmBuffPercent)char.effects.pmBuff={value:spell.effects.pmBuffPercent,duration:spell.duration,source:spell.id}
        if(spell.effects.activationDodge)char.effects.activationDodge={active:true,source:spell.id}
        if(spell.effects.activationBlock)char.effects.activationBlock={active:true,source:spell.id}
        if(spell.id==='assassin_concentration')addCombatLog(`🗡️ ${char.name} se concentre dans l'ombre !`)
        else if(spell.id==='mage_canalisation')addCombatLog(`🔮 ${char.name} canalise sa puissance magique !`)
        else addCombatLog(`🔮 ${char.name} utilise ${spell.name} !`)
        renderCombat()
      }else if(spell.type==='damage_self_buff'){
        char.currentPe-=spell.cost
        let dmg=Math.floor(s.pp*(spell.multiplier||1))
        const esqRoll=Math.random()*100
        if(esqRoll<effMs.esq){play('dodge');addCombatLog(`💨 ${getMonster().name} esquive ${spell.name}!`);char.currentPe+=spell.cost;renderCombat();continue}
        dmg=Math.max(1,dmg-Math.floor(effectiveDef/2))
        getMonster().currentHp=Math.max(0,getMonster().currentHp-dmg)
        play('hit')
        addCombatLog(`⚔️ ${char.name} utilise ${spell.name} : ${dmg} dégâts`)
        char.effects=char.effects||{}
        char.effects.ppBuff={value:spell.effects.ppBuffPercent,duration:spell.duration,source:spell.id}
        addCombatLog(`🐂 ${char.name} adopte la Posture du Taureau !`)
        renderCombat()
        if(getMonster().currentHp<=0){setTimeout(victory,400);return}
      }else if(spell.type==='shadow_clone'){
        char.currentPe-=spell.cost
        const stats=getFinalStats(char)
        const cloneMaxHp=Math.floor(stats.pvMax*(spell.cloneHpPercent/100))
        char.effects=char.effects||{}
        char.effects.shadowClone={hp:cloneMaxHp,maxHp:cloneMaxHp,duration:spell.duration,source:spell.id}
        if(spell.effects.activationDodge)char.effects.activationDodge={active:true,source:spell.id}
        addCombatLog(`🌑 ${char.name} invoque un Clone d'ombre !`)
        renderCombat()
      }
    }else if(a.type==='guard'){
      G.combat.guarding=true
      addCombatLog(`🛡️ ${char.name} se met en garde !`)
      renderCombat()
    }
  }
  if(getMonster()&&getMonster().currentHp>0){enemyTurn()}
}
function combatFlee(){
  if(!G||!getMonster())return
  const avgRap=G.team.reduce((s,c)=>s+(c.currentHp>0?c.baseStats.rap:0),0)/G.team.filter(c=>c.currentHp>0).length
  const mRap=(getEffectiveMonsterStats()||getMonsterStats()).rap
  let chance=Math.round((avgRap/mRap)*60);chance=Math.max(15,Math.min(90,chance))
  if(Math.random()*100<chance){
    addCombatLog(`🏃 Fuite réussie !`)
    G.combat=G.combat||{};G.combat.monster=null
    setTimeout(()=>{switchView('forest');renderForest()},400)
  }else{
    addCombatLog(`❌ Fuite échouée ! ${G.team[G.activeChar].name} a perdu son tour`)
    if(!G.combat.charActed)G.combat.charActed=G.team.map(()=>false)
    G.combat.charActed[G.activeChar]=true
    const aliveIndices=G.team.map((c,i)=>c.currentHp>0?i:-1).filter(i=>i>=0)
    const notActed=aliveIndices.filter(i=>!G.combat.charActed[i])
    if(notActed.length===0){addCombatLog(`=== Résolution du tour ===`);setTimeout(resolveTurn,400)}
    else{G.activeChar=notActed[0];addCombatLog(`👉 ${G.team[G.activeChar].name}, à toi !`);renderCombat()}
  }
  renderCombat()
}
function victory(){
  if(!G||!getMonster())return
  const m=getMonster();const xp=m.xpReward
  const alive=G.team.filter(c=>c.currentHp>0)
  alive.forEach(c=>{c.xp+=xp;while(c.xp>=xpForLevel(c.level)){c.xp-=xpForLevel(c.level);c.level++;c.statPoints=(c.statPoints||0)+1;const ns=getFinalStats(c);c.currentHp=ns.pvMax;c.currentPe=ns.peMax}})
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
  play('victory')
  renderAll()
}
function processEnemyEffects(){
  if(!G||!G.combat.enemyEffects)return
  const eff=G.combat.enemyEffects
  if(eff.energyDrain){const drain=Math.floor((eff.energyDrain.value/100)*getMonsterStats().peMax);getMonster().currentPe=Math.max(0,(getMonster().currentPe||100)-drain);addCombatLog(`💧 ${getMonster().name} perd ${drain} PE (drain)`);eff.energyDrain.duration--;if(eff.energyDrain.duration<=0)delete eff.energyDrain}
  if(eff.defRed){eff.defRed.duration--;if(eff.defRed.duration<=0)delete eff.defRed}
  if(eff.rapRed){eff.rapRed.duration--;if(eff.rapRed.duration<=0)delete eff.rapRed}
  if(eff.poison){const poisonDmg=Math.floor((eff.poison.value/100)*getMonsterStats().pvMax)*eff.poison.stacks;getMonster().currentHp=Math.max(0,getMonster().currentHp-poisonDmg);addCombatLog(`🔥 Brûlure : ${poisonDmg} dégâts (${eff.poison.stacks}x)`);eff.poison.duration--;if(eff.poison.duration<=0)delete eff.poison}
  if(eff.stun){eff.stun.duration--;if(eff.stun.duration<=0)delete eff.stun}
}
function getEffectiveMonsterStats(){
  const base=getMonsterStats();if(!base)return null
  const result={...base}
  if(G.combat.enemyEffects?.defRed)result.def=Math.floor(result.def*(1-G.combat.enemyEffects.defRed.value/100))
  if(G.combat.enemyEffects?.rapRed){
    result.rap=Math.floor(result.rap*(1-G.combat.enemyEffects.rapRed.value/100))
    result.crit=Math.floor(result.crit*(1-G.combat.enemyEffects.rapRed.value/100))
    result.esq=Math.floor(result.esq*(1-G.combat.enemyEffects.rapRed.value/100))
  }
  return result
}
function tickCharacterEffects(){
  G.team.forEach(char=>{
    if(!char.effects)return
    if(char.effects.critBuff){char.effects.critBuff.duration--;if(char.effects.critBuff.duration<=0)delete char.effects.critBuff}
    if(char.effects.ppBuff){char.effects.ppBuff.duration--;if(char.effects.ppBuff.duration<=0)delete char.effects.ppBuff}
    if(char.effects.pmBuff){char.effects.pmBuff.duration--;if(char.effects.pmBuff.duration<=0)delete char.effects.pmBuff}
    if(char.effects.shadowClone){char.effects.shadowClone.duration--;if(char.effects.shadowClone.duration<=0){delete char.effects.shadowClone;addCombatLog(`🌑 Le Clone d'ombre disparaît.`)}}
    if(char.effects.activationDodge)delete char.effects.activationDodge
    if(char.effects.activationBlock)delete char.effects.activationBlock
    if(Object.keys(char.effects).length===0)delete char.effects
  })
}
/* ============== FOREST ============== */
function getForestZoneById(zoneId){return FOREST_ZONES.find(z=>z.id===zoneId)||FOREST_ZONES[0]}
function randomBetween(min,max){return min+Math.floor(Math.random()*(max-min+1))}
function renderForestZoneMenu(){
  if(!G)return
  const list=document.getElementById('forest-zones-list');if(!list)return
  list.innerHTML=FOREST_ZONES.map(z=>{
    const monsterNames=z.monsterPool.map(mid=>{
      const m=MONSTERS[mid];return m?m.name:mid
    }).join(', ')
    return `<div class="forest-zone-card"><div class="forest-zone-text"><div class="forest-zone-title">🌲 ${z.name}</div><div class="forest-zone-label">${z.label}</div><div class="forest-zone-monsters">${monsterNames}</div></div><button class="forest-zone-btn" data-zone="${z.id}">Explorer</button></div>`
  }).join('')
}
function selectForestZone(zoneId){
  if(!G)return
  if(G.team.every(c=>c.currentHp<=0)){showMessage('Forêt','💀 Toute votre équipe est à terre. Reposez-vous à la taverne avant de repartir au combat.');return}
  G.selectedForestZoneId=zoneId
  switchView('forest')
  renderForest()
}
function spawnMonsterFromZone(zoneId){
  const zone=getForestZoneById(zoneId)
  const pool=zone.monsterPool
  const id=pool[Math.floor(Math.random()*pool.length)]
  const t=MONSTERS[id]
  const lvl=randomBetween(zone.minLevel,zone.maxLevel)
  const scale=1+(lvl-1)*.3
  return{
    id:t.id,name:t.name,emoji:t.emoji,level:lvl,
    baseStats:{for:Math.round((t.baseStats.for||1)*scale),rap:Math.round((t.baseStats.rap||1)*scale),con:Math.round((t.baseStats.con||1)*scale),mana:Math.round((t.baseStats.mana||1)*scale)},
    drops:t.drops,xpReward:Math.round(t.xpReward*scale),currentHp:0,currentPe:0,weapon:null,armor:null,spells:[]
  }
}
function exploreForest(){
  if(!G)return
  if(G.team.every(c=>c.currentHp<=0)){showMessage('Forêt','💀 Toute votre équipe est à terre. Reposez-vous à la taverne avant de repartir au combat.');return}
  if(!G.selectedForestZoneId){switchView('forestZones');renderForestZoneMenu();return}
  const zone=getForestZoneById(G.selectedForestZoneId)
  G.forestExploreCount=(G.forestExploreCount||0)+1
  const logEl=document.getElementById('forest-log')
  const entry=document.createElement('div');entry.className='log-entry'
  entry.textContent=`🌲 Exploration #${G.forestExploreCount} dans ${zone.name} (${zone.label})...`
  logEl.appendChild(entry);logEl.scrollTop=logEl.scrollHeight
  startCombat()
}
function renderForestLog(msg){
  const logEl=document.getElementById('forest-log')
  const entry=document.createElement('div');entry.className='log-entry'
  entry.textContent=msg;logEl.appendChild(entry);logEl.scrollTop=logEl.scrollHeight
}

/* ============== TAVERN ============== */
let tavernRestTimeout=null,tavernRestInterval=null
function cancelTavernRest(){
  if(tavernRestTimeout){clearTimeout(tavernRestTimeout);tavernRestTimeout=null}
  if(tavernRestInterval){clearInterval(tavernRestInterval);tavernRestInterval=null}
  if(G){G.tavernResting=false
    const logEl=document.getElementById('tavern-log');logEl.style.display='';logEl.innerHTML='<div class="log-entry">❌ Repos annulé.</div>'
    document.getElementById('tavern-buttons').style.display=''}
}
function tavernRest(){
  if(!G)return;if(G.tavernResting)return
  G.tavernResting=true;play('sleep')
  const logEl=document.getElementById('tavern-log');logEl.style.display=''
  logEl.innerHTML='<div class="log-entry">😴 Repos...</div><div id="rest-timer" style="text-align:center;font-size:1.5rem;font-weight:bold;color:var(--gold);padding:16px">5s</div><div id="rest-bar-bg" style="height:8px;background:#1a1a2a;border-radius:4px;overflow:hidden;margin:4px 0 8px"><div id="rest-bar" style="height:100%;width:100%;background:linear-gradient(90deg,var(--gold),#ffaa00);border-radius:4px;transition:width .3s"></div></div>'
  document.getElementById('tavern-buttons').style.display='none'
  let sec=5
  const timerEl=document.getElementById('rest-timer')
  const barEl=document.getElementById('rest-bar')
  tavernRestInterval=setInterval(()=>{sec--;if(timerEl)timerEl.textContent=sec+'s';if(barEl)barEl.style.width=(sec/5*100)+'%';if(sec<=0)clearInterval(tavernRestInterval)},1000)
  tavernRestTimeout=setTimeout(()=>{clearInterval(tavernRestInterval);tavernRestInterval=null;G.tavernResting=false;tavernRestTimeout=null
    G.team.forEach(c=>{const s=getFinalStats(c);c.currentHp=s.pvMax;c.currentPe=s.peMax})
    logEl.innerHTML='<div class="log-entry">✅ Repos terminé ! Toute l\'équipe est restaurée !</div>'
    saveGame();renderAll()
    setTimeout(()=>{logEl.innerHTML='';logEl.style.display='none';document.getElementById('tavern-buttons').style.display=''},3000)
  },5000)
}
function tavernDrink(){
  if(!G)return
  const logEl=document.getElementById('tavern-log');logEl.style.display=''
  if(G.gold<20){logEl.innerHTML=`<div class="log-entry">🍺 Moe : "20 pièces ou la porte !"</div>`;return}
  play('drink')
  G.gold-=20
  G.team.forEach(c=>{const s=getFinalStats(c);c.currentPe=s.peMax})
  logEl.innerHTML=`<div class="log-entry">🍺 Santé ! Tous les PE restaurés !</div>`
  saveGame();renderAll()
}
function tavernEat(){
  if(!G)return
  const logEl=document.getElementById('tavern-log');logEl.style.display=''
  if(G.gold<30){logEl.innerHTML=`<div class="log-entry">🍺 Moe : "Un bon repas coûte 30 pièces. T'as pas ça ?"</div>`;return}
  play('eat')
  G.gold-=30
  G.team.forEach(c=>{const s=getFinalStats(c);c.currentHp=s.pvMax})
  logEl.innerHTML=`<div class="log-entry">🍖 Délicieux ! Tous les PV restaurés !</div>`
  saveGame();renderAll()
}

/* ============== MERCHANT ============== */
let merchantEquipmentLevelFilter=1
function merchantBuy(){
  const cont=document.getElementById('merchant-content')
  let html=''
  html+='<div class="merchant-section"><h4>❤️ Consommables</h4>'
  Object.keys(CONSUMABLES).forEach(k=>{
    const c=CONSUMABLES[k];const canBuy=G.gold>=c.buyPrice
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${c.emoji} ${c.name}</div><div class="mi-mats">${c.desc}</div></div><div class="mi-price">${c.buyPrice}💰</div><button class="mi-btn${canBuy?'':' cant-buy'}" data-buy-cons="${k}">${canBuy?'Acheter':'❌'}</button></div>`
  })
  html+='</div><div class="merchant-section"><h4>⚔️ Équipements</h4><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;font-size:0.8rem;color:var(--text2)">Niveau : <select id="merchant-level-filter" style="background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:var(--radius-sm);padding:3px 6px;font-size:0.8rem">'
  const levels=[...new Set([...Object.keys(WEAPONS),...Object.keys(ARMORS)].map(k=>(WEAPONS[k]||ARMORS[k]).level||1))].sort((a,b)=>a-b)
  levels.forEach(l=>html+=`<option value="${l}"${l===merchantEquipmentLevelFilter?' selected':''}>Niv.${l}</option>`)
  html+='</select></div></div><div class="merchant-section"><h4>🗡️ Armes</h4>'
  Object.keys(WEAPONS).filter(k=>(WEAPONS[k].level||1)===merchantEquipmentLevelFilter).forEach(k=>{
    const w=WEAPONS[k];const canAfford=G.gold>=w.reducedPrice;const hasMats=w.materials?Object.keys(w.materials).every(mat=>(G.inventory.resources[mat]||0)>=w.materials[mat]):true
    const matsStr=w.materials?Object.keys(w.materials).map(m=>`${RESOURCES[m]?.emoji||''} ${RESOURCES[m]?.name||m} x${w.materials[m]}`).join(', '):''
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${w.emoji} ${w.name}</div><div class="mi-mats">${w.desc} | Mats: ${matsStr}</div></div><div class="mi-price">${w.reducedPrice}💰</div><button class="mi-btn${canAfford&&hasMats?'':' cant-buy'}" data-buy-weapon="${k}">${canAfford&&hasMats?'Acheter':'❌'}</button></div>`
  })
  html+='</div><div class="merchant-section"><h4>🛡️ Armures</h4>'
  Object.keys(ARMORS).filter(k=>(ARMORS[k].level||1)===merchantEquipmentLevelFilter).forEach(k=>{
    const a=ARMORS[k];const canAfford=G.gold>=a.reducedPrice;const hasMats=a.materials?Object.keys(a.materials).every(mat=>(G.inventory.resources[mat]||0)>=a.materials[mat]):true
    const matsStr=a.materials?Object.keys(a.materials).map(m=>`${RESOURCES[m]?.emoji||''} ${RESOURCES[m]?.name||m} x${a.materials[m]}`).join(', '):''
    html+=`<div class="merchant-item"><div class="mi-info"><div class="mi-name">${a.emoji} ${a.name}</div><div class="mi-mats">${a.desc} | Mats: ${matsStr}</div></div><div class="mi-price">${a.reducedPrice}💰</div><button class="mi-btn${canAfford&&hasMats?'':' cant-buy'}" data-buy-armor="${k}">${canAfford&&hasMats?'Acheter':'❌'}</button></div>`
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
    if(G.gold<c.buyPrice){play('merchant');showMessage('Marchand','💰 Le marchand croise les bras. "J\'aimerais bien vous aider, mais l\'or ne pousse pas dans les arbres."');return}
    G.gold-=c.buyPrice;G.inventory.consumables[id]=(G.inventory.consumables[id]||0)+1;saveGame();merchantBuy();updateGold();play('buy')
  }else if(action==='weapon'){
    const w=WEAPONS[id];if(!w)return
    if(G.gold<w.reducedPrice){play('merchant');showMessage('Marchand','💰 Le marchand croise les bras. "J\'aimerais bien vous aider, mais l\'or ne pousse pas dans les arbres."');return}
    if(w.materials&&!Object.keys(w.materials).every(mat=>(G.inventory.resources[mat]||0)>=w.materials[mat])){
      play('merchant')
      const missing=Object.keys(w.materials).filter(mat=>(G.inventory.resources[mat]||0)<w.materials[mat]).map(m=>`${RESOURCES[m]?.name||m}`).join(', ')
      showMessage('Marchand',`🤷 Le marchand se gratte la barbe. "Je n'ai plus cet article en stock. Rapportez-moi : ${Object.keys(w.materials).map(m=>`${RESOURCES[m]?.name||m} x${w.materials[m]}`).join(', ')}"`);return}
    G.gold-=w.reducedPrice
    if(w.materials)Object.keys(w.materials).forEach(mat=>{G.inventory.resources[mat]-=w.materials[mat];if(G.inventory.resources[mat]<=0)delete G.inventory.resources[mat]})
    G.inventory.weapons.push(id);saveGame();merchantBuy();updateGold();play('buy')
  }else if(action==='armor'){
    const a=ARMORS[id];if(!a)return
    if(G.gold<a.reducedPrice){play('merchant');showMessage('Marchand','💰 Le marchand croise les bras. "J\'aimerais bien vous aider, mais l\'or ne pousse pas dans les arbres."');return}
    if(a.materials&&!Object.keys(a.materials).every(mat=>(G.inventory.resources[mat]||0)>=a.materials[mat])){
      play('merchant')
      showMessage('Marchand',`🤷 Le marchand se gratte la barbe. "Je n'ai plus cet article en stock. Rapportez-moi : ${Object.keys(a.materials).map(m=>`${RESOURCES[m]?.name||m} x${a.materials[m]}`).join(', ')}"`);return}
    G.gold-=a.reducedPrice
    if(a.materials)Object.keys(a.materials).forEach(mat=>{G.inventory.resources[mat]-=a.materials[mat];if(G.inventory.resources[mat]<=0)delete G.inventory.resources[mat]})
    G.inventory.armors.push(id);saveGame();merchantBuy();updateGold();play('buy')
  }
}

/* ============== INVENTORY ============== */
function useConsumable(id,charIdx){
  if(!G)return;const c=CONSUMABLES[id];if(!c)return;const char=G.team[charIdx];if(!char)return
  const qty=G.inventory.consumables[id]||0
  if(qty<=0)return
  const s=getFinalStats(char)
  if(c.type==='hp'){const heal=Math.floor(s.pvMax*c.healPercent);char.currentHp=Math.min(s.pvMax,char.currentHp+heal);play('heal');addLog(`❤️ ${char.name} +${heal} PV`)}
  else if(c.type==='pe'){const heal=Math.floor(s.peMax*c.healPercent);char.currentPe=Math.min(s.peMax,char.currentPe+heal);play('heal');addLog(`💧 ${char.name} +${heal} PE`)}
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
  const map={map:'view-map',forest:'view-forest',forestZones:'view-forest-zones',combat:'view-combat',char:'view-char',team:'view-team',inventory:'view-inventory'}
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
    else if(id==='view-inventory')showInventoryView()
  }
}
function renderHeader(){
  if(!G)return
  document.getElementById('header-gold').textContent=`💰 ${G.gold}`
}
function updateGold(){const el=document.getElementById('header-gold');if(el&&G)el.textContent=`💰 ${G.gold}`;const mel=document.getElementById('merchant-gold');if(mel&&G)mel.textContent=`💰 ${G.gold}`}
function renderTeamBar(){
  const bar=document.getElementById('team-bar');if(!bar||!G)return
  bar.innerHTML=G.team.map((c,i)=>{
    const s=getFinalStats(c);const dead=c.currentHp<=0?'dead':'';const active=i===G.activeChar?'active':''
    const clsObj=CLASSES[c.classId]
    return `<div class="team-char ${active} ${dead}" data-char="${i}" style="font-size:0.7rem"><span class="hp-dot" style="background:${c.currentHp<=0?'var(--red)':c.currentHp<s.pvMax*0.3?'var(--orange)':'var(--green)'}"></span>${clsObj?.emoji||''} ${c.name} <span style="color:var(--text2)">Lv.${c.level}</span> <span style="color:${c.currentHp<=0?'var(--red)':'var(--green)'};font-weight:bold">${c.currentHp}/${s.pvMax}</span></div>`
  }).join('')
}
function renderMap(){/* map is static HTML */document.getElementById('header-location').textContent='— Carte'}
function renderForest(){
  if(!G)return
  const zone=G.selectedForestZoneId?getForestZoneById(G.selectedForestZoneId):null
  document.getElementById('forest-name').textContent=zone?zone.name:'Forêt'
  document.getElementById('forest-level').textContent=zone?zone.label:''
  document.getElementById('header-location').textContent=zone?`— ${zone.name}`:'— Forêt'
  renderForestInventory()
}
function renderForestInventory(){
  const el=document.getElementById('forest-quick-inventory');if(!el||!G)return
  const cons=G.inventory.consumables||{};const weaps=G.inventory.weapons||[];const arms=G.inventory.armors||[];const res=G.inventory.resources||{}
  const hasCons=Object.keys(cons).some(k=>cons[k]>0);const hasWeaps=weaps.length>0;const hasArms=arms.length>0;const hasRes=Object.keys(res).some(k=>res[k]>0)
  if(!hasCons&&!hasWeaps&&!hasArms&&!hasRes){el.innerHTML='<div class="forest-inventory-title">🎒 Inventaire partagé</div><div class="forest-inv-empty">Inventaire vide.</div>';return}
  let html='<div class="forest-inventory-title">🎒 Inventaire partagé</div>'
  if(hasCons){
    html+='<div class="forest-inv-section"><div class="forest-inv-section-title">❤️ Consommables</div>'
    Object.keys(cons).filter(k=>cons[k]>0).forEach(k=>{const c=CONSUMABLES[k];if(!c)return
      html+=`<div class="forest-inv-item"><span class="forest-inv-name">${c.emoji||''} ${c.name}</span><span class="forest-inv-count">x${cons[k]}</span><button class="forest-inv-btn" data-forest-use-cons="${k}">Utiliser</button></div>`
    })
    html+='</div>'
  }
  if(hasWeaps){
    html+='<div class="forest-inv-section"><div class="forest-inv-section-title">🗡️ Armes</div>'
    const grouped={};weaps.forEach(id=>{grouped[id]=(grouped[id]||0)+1})
    Object.keys(grouped).forEach(id=>{const w=WEAPONS[id];if(!w)return
      html+=`<div class="forest-inv-item"><span class="forest-inv-name">${w.emoji||''} ${w.name}</span><span class="forest-inv-count">x${grouped[id]}</span></div>`
    })
    html+='</div>'
  }
  if(hasArms){
    html+='<div class="forest-inv-section"><div class="forest-inv-section-title">🛡️ Armures</div>'
    const grouped={};arms.forEach(id=>{grouped[id]=(grouped[id]||0)+1})
    Object.keys(grouped).forEach(id=>{const a=ARMORS[id];if(!a)return
      html+=`<div class="forest-inv-item"><span class="forest-inv-name">${a.emoji||''} ${a.name}</span><span class="forest-inv-count">x${grouped[id]}</span></div>`
    })
    html+='</div>'
  }
  if(hasRes){
    html+='<div class="forest-inv-section"><div class="forest-inv-section-title">📦 Ressources</div>'
    Object.keys(res).filter(k=>res[k]>0).forEach(k=>{const r=RESOURCES[k];if(!r)return
      html+=`<div class="forest-inv-item"><span class="forest-inv-name">${r.emoji||''} ${r.name}</span><span class="forest-inv-count">x${res[k]}</span></div>`
    })
    html+='</div>'
  }
  el.innerHTML=html
}
function renderCombat(){
  if(!G||!getMonster())return
  renderTeamBar()
  document.getElementById('combat-defeat').classList.add('hidden')
  document.querySelectorAll('#combat-buttons button').forEach(b=>b.disabled=G.combat.defeat||false)
  const m=getMonster();const ms=getMonsterStats()
  document.getElementById('combat-enemy-emoji').textContent=m.emoji
  document.getElementById('combat-enemy-name').textContent=`${m.name} (Niv.${m.level})`
  const hpPct=Math.round((m.currentHp/ms.pvMax)*100)
  document.getElementById('combat-enemy-stats').textContent=`PV: ${m.currentHp}/${ms.pvMax} • PE: ${(m.currentPe||0)}/${ms.peMax}`
  document.getElementById('combat-enemy-hp').style.width=`${hpPct}%`
  const pePct=Math.round((m.currentPe/ms.peMax)*100)
  document.getElementById('combat-enemy-pe').style.width=`${pePct}%`
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
  const spellsList=document.getElementById('spells-list')
  if(char&&!document.getElementById('combat-spells').classList.contains('hidden')){
    spellsList.innerHTML=char.spells.map(sid=>{
      const sp=SPELLS[sid];if(!sp)return''
      const canCast=char.currentPe>=sp.cost
      return `<button class="spell-btn${canCast?'':' disabled'}" data-spell="${sid}"${canCast?'':' disabled'}>${sp.name} <span class="spell-cost">(${sp.cost} PE)</span><br><span style="font-size:0.7rem;color:var(--text2)">${sp.desc}</span></button>`
    }).join('')
  }
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
  /* Init mute button */
  const me=document.getElementById('btn-mute');if(me)me.textContent=_muted?'🔇':'🔊'
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
      document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'))
      document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'))
      btn.classList.add('active')
      const view=btn.dataset.view
      if(view==='map'){document.getElementById('view-map').classList.remove('hidden');renderMap()}
      else if(view==='team'){document.getElementById('view-team').classList.remove('hidden');showTeamView()}
      else if(view==='inventory'){document.getElementById('view-inventory').classList.remove('hidden');showInventoryView()}
    })
  })
  /* Map clicks */
  document.querySelectorAll('.map-card:not(.map-locked)').forEach(card=>{
    card.addEventListener('click',()=>{
      const loc=card.dataset.location
      if(loc==='tavern'){openTavern()}
      else if(loc==='merchant'){openMerchant()}
      else if(loc==='forest'){if(G&&G.team.every(c=>c.currentHp<=0)){showMessage('Forêt','💀 Toute votre équipe est à terre. Reposez-vous à la taverne avant de repartir au combat.');return};switchView('forestZones');renderForestZoneMenu()}
    })
  })
  /* Explore */
  document.getElementById('btn-explore').addEventListener('click',exploreForest)
  document.getElementById('btn-leave-forest').addEventListener('click',()=>{switchView('forestZones');renderForestZoneMenu()})
  document.getElementById('btn-forest-zones-back').addEventListener('click',()=>{switchView('map');renderMap()})
  document.getElementById('forest-zones-list').addEventListener('click',e=>{const btn=e.target.closest('.forest-zone-btn');if(btn)selectForestZone(btn.dataset.zone)})
  document.getElementById('forest-quick-inventory').addEventListener('click',e=>{
    const btn=e.target.closest('[data-forest-use-cons]');if(!btn)return
    showCharSelector('Utiliser sur quel personnage ?',ci=>{
      useConsumable(btn.dataset.forestUseCons,ci)
      renderForestQuickInventory()
      renderTeamBar()
    })
  })
  /* Combat buttons */
  document.getElementById('btn-cbt-attack').addEventListener('click',combatAttack)
  document.getElementById('btn-cbt-guard').addEventListener('click',combatGuard)
  document.getElementById('btn-cbt-flee').addEventListener('click',combatFlee)
  document.getElementById('btn-combat-defeat-leave').addEventListener('click',()=>{
    if(!G)return;G.combat.monster=null;G.combat.combatLog=[];G.combat.guarding=false;G.combat.enemyEffects={};G.combat.defeat=false;document.getElementById('combat-defeat').classList.add('hidden');document.querySelectorAll('#combat-buttons button').forEach(b=>b.disabled=false);saveGame();switchView('map');renderAll()
    if(G.team.every(c=>c.currentHp<=0))showResurrection()
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
    const idx=parseInt(el.dataset.char);if(G.team[idx]&&G.team[idx].currentHp>0){G.activeChar=idx;renderTeamBar();document.getElementById('combat-spells').classList.add('hidden');document.getElementById('combat-buttons').classList.remove('hidden');const combatView=document.getElementById('view-combat');if(!combatView.classList.contains('hidden'))renderCombat()}
  })
  /* Victory popup */
  document.getElementById('btn-victory-continue').addEventListener('click',()=>{
    document.getElementById('popup-victory').classList.add('hidden')
    if(G){G.combat.monster=null;G.combat.combatLog=[];G.combat.guarding=false;G.combat.enemyEffects={}
      renderAll()
      if(G.team.some(c=>c.statPoints>0)){showNextLevelUp();play('levelup')}
      else{switchView('forest');renderAll()}
    }
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
      if(qty>0){G.gold+=(r?r.sellPrice:2);play('sell');G.inventory.resources[id]--;if(G.inventory.resources[id]<=0)delete G.inventory.resources[id];saveGame();merchantSell();updateGold()}
    }else if(btn.dataset.sellWeapon){
      const idx=parseInt(btn.dataset.sellWeapon);const w=G.inventory.weapons[idx];const item=WEAPONS[w]
      if(item){G.gold+=item.sellPrice;play('sell');G.inventory.weapons.splice(idx,1);saveGame();merchantSell();updateGold()}
    }else if(btn.dataset.sellArmor){
      const idx=parseInt(btn.dataset.sellArmor);const a=G.inventory.armors[idx];const item=ARMORS[a]
      if(item){G.gold+=item.sellPrice;play('sell');G.inventory.armors.splice(idx,1);saveGame();merchantSell();updateGold()}
    }
  })
  document.getElementById('merchant-content').addEventListener('change',e=>{
    if(e.target.id==='merchant-level-filter'){merchantEquipmentLevelFilter=Number(e.target.value);merchantBuy()}
  })
  /* Popup close buttons */
  document.querySelectorAll('.popup-close,.popup-footer .btn-secondary[data-popup]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const popup=btn.dataset.popup
      if(popup==='tavern'&&G&&G.tavernResting)cancelTavernRest()
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
  const div=document.getElementById('view-team')
  if(!div)return
  if(!G){div.innerHTML='';return}
  div.innerHTML=G.team.map((c,i)=>{
    const cls=CLASSES[c.classId];const s=getFinalStats(c);const hpPct=Math.round((c.currentHp/s.pvMax)*100)
    const dead=c.currentHp<=0?'dead':''
    return `<div class="team-member-card ${dead}" data-charidx="${i}"><div class="tm-class">${cls?.emoji||'?'}</div><div class="tm-info"><div class="tm-name">${c.name} <span style="color:var(--text2);font-size:0.75rem;">Lv.${c.level} ${cls?.name||''}</span></div><div class="tm-detail">FOR:${s.for} RAP:${s.rap} CON:${s.con} MANA:${s.mana}</div><div class="tm-detail">PP:${s.pp} PM:${s.pm} DEF:${s.def} CRIT:${s.crit}% ESQ:${s.esq}%</div></div><div class="tm-hp">${c.currentHp}/${s.pvMax} ❤️</div></div>`
  }).join('')
  div.addEventListener('click',(e)=>{
    const card=e.target.closest('.team-member-card');if(!card)return
    const idx=parseInt(card.dataset.charidx);showCharacterDetail(idx)
  })
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
  const div=document.getElementById('view-inventory')
  if(!div)return
  if(!G){div.innerHTML='';return}
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
  div.addEventListener('click',(e)=>{
    const btn=e.target.closest('.inv-btn');if(!btn)return
    if(btn.dataset.use){
      showCharSelector('Utiliser sur quel personnage ?',ci=>useConsumable(btn.dataset.use,ci))
    }else if(btn.dataset.equipWeapon){
      const idx=parseInt(btn.dataset.equipWeapon);const wid=G.inventory.weapons[idx]
      showCharSelector('Équiper sur quel personnage ?',ci=>equipWeapon(wid,ci))
    }else if(btn.dataset.equipArmor){
      const idx=parseInt(btn.dataset.equipArmor);const aid=G.inventory.armors[idx]
      showCharSelector('Équiper sur quel personnage ?',ci=>equipArmor(aid,ci))
    }else if(btn.dataset.throw){
      const [section,id]=btn.dataset.throw.split(',');if(section==='weapon'||section==='armor'){if(!confirm(`Jeter ${id} ?`))return};throwItem(section,id)
    }
  })
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'))
  const btns=document.querySelectorAll('.nav-btn');if(btns[2])btns[2].classList.add('active')
  document.getElementById('header-location').textContent='— Inventaire'
}

/* ============== CHAR SELECTOR POPUP ============== */
function showCharSelector(title,callback){
  const existing=document.getElementById('popup-char-selector')
  if(existing)existing.remove()
  const overlay=document.createElement('div');overlay.id='popup-char-selector';overlay.className='popup-overlay'
  overlay.innerHTML=`<div class="popup popup-small"><div class="popup-header"><h3>${title}</h3><button class="popup-close" id="btn-char-selector-close">✕</button></div><div class="popup-body" style="display:flex;flex-direction:column;gap:6px" id="char-selector-body"></div></div>`
  document.body.appendChild(overlay)
  const body=document.getElementById('char-selector-body')
  G.team.forEach((c,i)=>{
    const cls=CLASSES[c.classId];const s=getFinalStats(c)
    const btn=document.createElement('button');btn.className='btn-action';btn.style.textAlign='left'
    btn.innerHTML=`${cls?.emoji||'👤'} ${c.name} <span style="color:var(--text2);font-size:0.75rem">Lv.${c.level} · ${c.currentHp}/${s.pvMax} PV</span>`
    btn.addEventListener('click',()=>{overlay.remove();callback(i)})
    body.appendChild(btn)
  })
  document.getElementById('btn-char-selector-close').addEventListener('click',()=>overlay.remove())
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove()})
}

/* ============== LEVEL UP STAT ALLOCATION ============== */
function showNextLevelUp(){
  const char=G.team.find(c=>c.statPoints>0)
  if(!char){saveGame();document.getElementById('popup-levelup').classList.add('hidden');switchView('forest');renderAll();return}
  const s=getFinalStats(char);const cls=CLASSES[char.classId]
  document.getElementById('levelup-title').textContent=`${(CLASSES[char.classId]?.emoji)||'⬆️'} ${char.name} — Niveau ${char.level}`
  const pts=char.statPoints
  document.getElementById('levelup-body').innerHTML=
    `<p style="text-align:center;margin-bottom:12px;color:var(--gold);font-weight:bold">${pts} point${pts>1?'s':''} à attribuer</p>
     <div style="display:flex;flex-direction:column;gap:8px">
       <div style="display:flex;justify-content:space-between;color:var(--text2);font-size:0.8rem;padding:0 4px">
         <span>FOR: ${char.baseStats.for}</span>
         <span>RAP: ${char.baseStats.rap}</span>
         <span>CON: ${char.baseStats.con}</span>
         <span>MANA: ${char.baseStats.mana}</span>
       </div>
     </div>`
  const footer=document.getElementById('levelup-footer')
  footer.innerHTML=
    `<button class="btn-primary" onclick="allocateStatPoint('for')" style="flex:1">💪 FOR</button>
     <button class="btn-primary" onclick="allocateStatPoint('rap')" style="flex:1">⚡ RAP</button>
     <button class="btn-primary" onclick="allocateStatPoint('con')" style="flex:1">🛡️ CON</button>
     <button class="btn-primary" onclick="allocateStatPoint('mana')" style="flex:1">🔮 MANA</button>`
  document.getElementById('popup-levelup').classList.remove('hidden')
}
function allocateStatPoint(stat){
  const char=G.team.find(c=>c.statPoints>0)
  if(!char)return
  char.baseStats[stat]++
  char.statPoints--
  clampChar(char)
  saveGame()
  showNextLevelUp()
  renderAll()
}

/* ============== RESURRECTION ============== */
function showResurrection(){
  if(!G)return
  document.getElementById('popup-resurrection').classList.remove('hidden')
  document.getElementById('resurrection-timer').textContent='5'
  document.getElementById('resurrection-bar').style.width='0%'
  let remaining=5
  const interval=setInterval(()=>{
    remaining--
    document.getElementById('resurrection-timer').textContent=remaining
    document.getElementById('resurrection-bar').style.width=`${((5-remaining)/5)*100}%`
    if(remaining<=0){
      clearInterval(interval)
      G.team.forEach(c=>{if(c.currentHp<=0){const s=getFinalStats(c);c.currentHp=Math.max(1,Math.floor(s.pvMax*0.1))}})
      saveGame()
      document.getElementById('popup-resurrection').classList.add('hidden')
      renderAll()
    }
  },1000)
}

/* ============== BOOT ============== */
document.addEventListener('DOMContentLoaded',init)
