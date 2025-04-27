// import { playSound } from './assets/gameAssets';

// Skill interface
export interface Skill {
  name: string;
  damage: number;
  description: string;
  mpCost: number;
  cooldown: number;
  type: 'physical' | 'magical' | 'healing' | 'buff' | 'debuff';
  areaOfEffect?: boolean;
}

// Character class interface
export interface ClassInfo {
  name: string;
  baseHP: number;
  baseMP: number;
  skills: Skill[];
  passiveEffect?: string;
  imageUrl: string;
  description: string;
}

// Enemy interface
export interface Enemy {
  name: string;
  hp: number;
  damage: number;
  type: string;
  attackName: string;
  description: string;
  expReward: number;
  weaknesses?: string[];
  resistances?: string[];
  skills?: Skill[];
  imageUrl: string;
}

// Quiz question interface
export interface Question {
  id: number;
  text: string;
  options: {
    a: string;
    b: string;
  };
  dichotomy: Dichotomy;
}

// MBTI related types
export type Dichotomy = 'EI' | 'SN' | 'TF' | 'JP';
export type MBTIType = 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ' | 'ISTP' | 'ISFP' | 'INFP' | 'INTP' | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP' | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ';

// Game constants
export const CRITICAL_CHANCE = 0.15;
export const CRITICAL_MULTIPLIER = 1.5;
export const BASE_DEFENSE_REDUCTION = 0.3;
export const EVASION_BASE_CHANCE = 0.05;

// Item effects
export const ITEM_EFFECTS = {
  HEALTH_POTION: 50,
  MANA_POTION: 30,
  ATTACK_BOOST: 1.3,
  DEFENSE_BOOST: 1.25,
};

// Items
export const ITEMS = {
  healthPotion: {
    name: "Health Potion",
    description: "Restores 50 HP",
    effect: () => ({ type: 'heal', amount: ITEM_EFFECTS.HEALTH_POTION }),
    quantity: 3
  },
  manaPotion: {
    name: "Mana Potion",
    description: "Restores 30 MP",
    effect: () => ({ type: 'mana', amount: ITEM_EFFECTS.MANA_POTION }),
    quantity: 3
  },
  attackBoost: {
    name: "Attack Elixir",
    description: "Increases attack by 30% for 3 turns",
    effect: () => ({ type: 'buff', stat: 'attack', multiplier: ITEM_EFFECTS.ATTACK_BOOST, duration: 3 }),
    quantity: 1
  },
  defenseBoost: {
    name: "Defense Tonic",
    description: "Increases defense by 25% for 3 turns",
    effect: () => ({ type: 'buff', stat: 'defense', multiplier: ITEM_EFFECTS.DEFENSE_BOOST, duration: 3 }),
    quantity: 1
  }
};

// Player buff interface
export interface PlayerBuffs {
  attack?: { multiplier: number, turnsLeft: number };
  defense?: { multiplier: number, turnsLeft: number };
  speed?: { multiplier: number, turnsLeft: number };
}

// Character classes mapped to MBTI types
export const classes: Record<MBTIType, ClassInfo> = {
  INTJ: {
    name: "Strategist",
    baseHP: 85,
    baseMP: 120,
    skills: [
      { name: "Tactical Strike", damage: 35, description: "A calculated attack targeting weak points", mpCost: 10, cooldown: 1, type: "physical" },
      { name: "Mind Blast", damage: 50, description: "A focused mental attack", mpCost: 25, cooldown: 3, type: "magical" },
      { name: "Strategic Planning", damage: 0, description: "Increases defense for 3 turns", mpCost: 20, cooldown: 5, type: "buff" }
    ],
    passiveEffect: "Analysis: Increases critical hit chance by 10%",
    imageUrl: "/assets/images/classes/strategist.png",
    description: "Masters of planning and strategic thinking. They excel at finding weaknesses and exploiting them."
  },
  INTP: {
    name: "Sage",
    baseHP: 75,
    baseMP: 130,
    skills: [
      { name: "Logic Beam", damage: 40, description: "A beam of pure logical energy", mpCost: 15, cooldown: 1, type: "magical" },
      { name: "Theory Crafting", damage: 0, description: "Increases magical damage for 3 turns", mpCost: 25, cooldown: 4, type: "buff" },
      { name: "Knowledge Burst", damage: 70, description: "Unleashes accumulated knowledge", mpCost: 40, cooldown: 5, type: "magical", areaOfEffect: true }
    ],
    passiveEffect: "Deep Thinking: 20% chance to cast spells without MP cost",
    imageUrl: "/assets/images/classes/sage.png",
    description: "Theoretical thinkers who understand the fundamental laws of the universe and bend them to their will."
  },
  ENTJ: {
    name: "Commander",
    baseHP: 100,
    baseMP: 90,
    skills: [
      { name: "Authority Strike", damage: 45, description: "A commanding blow", mpCost: 15, cooldown: 1, type: "physical" },
      { name: "Rally Troops", damage: 0, description: "Increases attack and defense for 2 turns", mpCost: 30, cooldown: 4, type: "buff" },
      { name: "Executive Order", damage: 80, description: "A powerful decree that must be obeyed", mpCost: 50, cooldown: 6, type: "physical" }
    ],
    passiveEffect: "Leadership: Team members gain 10% more experience",
    imageUrl: "/assets/images/classes/commander.png",
    description: "Natural leaders who inspire allies and intimidate enemies with their authoritative presence."
  },
  ENTP: {
    name: "Inventor",
    baseHP: 85,
    baseMP: 100,
    skills: [
      { name: "Gadget Throw", damage: 30, description: "Throws a random invention", mpCost: 10, cooldown: 1, type: "physical" },
      { name: "Experimental Ray", damage: 55, description: "An unstable but powerful beam", mpCost: 25, cooldown: 2, type: "magical" },
      { name: "Eureka Moment", damage: 0, description: "A brilliant idea that increases all stats for 2 turns", mpCost: 35, cooldown: 5, type: "buff" }
    ],
    passiveEffect: "Innovation: 15% chance to improvise a free additional action",
    imageUrl: "/assets/images/classes/inventor.png",
    description: "Creative problem-solvers who always have a trick up their sleeve."
  },
  INFJ: {
    name: "Mystic",
    baseHP: 80,
    baseMP: 125,
    skills: [
      { name: "Insight Strike", damage: 35, description: "An intuitive attack that bypasses defenses", mpCost: 15, cooldown: 1, type: "magical" },
      { name: "Soul Connection", damage: 30, description: "Heals self while damaging enemy", mpCost: 25, cooldown: 3, type: "healing" },
      { name: "Prophetic Vision", damage: 0, description: "Foresees and prevents next enemy attack", mpCost: 40, cooldown: 5, type: "buff" }
    ],
    passiveEffect: "Empathy: Can sense enemy weaknesses, increasing damage by 15%",
    imageUrl: "/assets/images/classes/mystic.png",
    description: "Intuitive healers with a deep connection to the spiritual realm."
  },
  INFP: {
    name: "Dreamer",
    baseHP: 70,
    baseMP: 120,
    skills: [
      { name: "Imaginary Strike", damage: 25, description: "An attack from the realm of imagination", mpCost: 10, cooldown: 1, type: "magical" },
      { name: "Healing Poem", damage: -45, description: "A beautiful poem that heals wounds", mpCost: 20, cooldown: 2, type: "healing" },
      { name: "Dream Realm", damage: 0, description: "Temporarily transports to another realm, avoiding damage", mpCost: 35, cooldown: 4, type: "buff" }
    ],
    passiveEffect: "Idealism: When HP drops below 30%, healing effectiveness increases by 50%",
    imageUrl: "/assets/images/classes/dreamer.png",
    description: "Idealistic healers who draw power from their rich inner world."
  },
  ENFJ: {
    name: "Mentor",
    baseHP: 95,
    baseMP: 100,
    skills: [
      { name: "Inspiring Word", damage: 0, description: "Heals an ally and increases their attack", mpCost: 20, cooldown: 2, type: "healing" },
      { name: "Motivational Speech", damage: 0, description: "Boosts all allies' defense for 3 turns", mpCost: 30, cooldown: 4, type: "buff" },
      { name: "Righteous Fury", damage: 60, description: "Channels passion into a powerful attack", mpCost: 40, cooldown: 5, type: "physical" }
    ],
    passiveEffect: "Charisma: 20% chance to prevent enemy attacks through persuasion",
    imageUrl: "/assets/images/classes/mentor.png",
    description: "Natural leaders who inspire and empower their allies."
  },
  ENFP: {
    name: "Bard",
    baseHP: 80,
    baseMP: 110,
    skills: [
      { name: "Creative Spark", damage: 30, description: "An unpredictable burst of energy", mpCost: 15, cooldown: 1, type: "magical" },
      { name: "Inspiring Performance", damage: 0, description: "Restores MP to all allies", mpCost: 25, cooldown: 3, type: "buff" },
      { name: "Passionate Outburst", damage: 65, description: "Channels enthusiasm into a powerful attack", mpCost: 40, cooldown: 5, type: "magical" }
    ],
    passiveEffect: "Enthusiasm: Each turn has a 15% chance to regain 10 MP",
    imageUrl: "/assets/images/classes/bard.png",
    description: "Energetic performers who bolster allies with their contagious enthusiasm."
  },
  ISTJ: {
    name: "Guardian",
    baseHP: 110,
    baseMP: 70,
    skills: [
      { name: "Duty Bound", damage: 35, description: "A reliable strike fueled by responsibility", mpCost: 10, cooldown: 1, type: "physical" },
      { name: "Steadfast Defense", damage: 0, description: "Significantly increases defense for 2 turns", mpCost: 20, cooldown: 3, type: "buff" },
      { name: "Methodical Strike", damage: 50, description: "A precisely executed attack", mpCost: 30, cooldown: 4, type: "physical" }
    ],
    passiveEffect: "Reliability: Takes 15% less damage when defending allies",
    imageUrl: "/assets/images/classes/guardian.png",
    description: "Dependable protectors who excel at defensive tactics."
  },
  ISFJ: {
    name: "Protector",
    baseHP: 105,
    baseMP: 80,
    skills: [
      { name: "Nurturing Touch", damage: -40, description: "A gentle healing touch", mpCost: 15, cooldown: 1, type: "healing" },
      { name: "Defensive Stance", damage: 0, description: "Takes damage instead of an ally for 2 turns", mpCost: 25, cooldown: 3, type: "buff" },
      { name: "Protective Strike", damage: 40, description: "An attack that also creates a protective barrier", mpCost: 30, cooldown: 4, type: "physical" }
    ],
    passiveEffect: "Caretaking: Healing spells are 25% more effective",
    imageUrl: "/assets/images/classes/protector.png",
    description: "Selfless defenders who prioritize the wellbeing of their allies."
  },
  ESTJ: {
    name: "Overseer",
    baseHP: 100,
    baseMP: 80,
    skills: [
      { name: "Authoritative Strike", damage: 40, description: "A powerful blow from a position of authority", mpCost: 15, cooldown: 1, type: "physical" },
      { name: "Organize Ranks", damage: 0, description: "Increases all allies' efficiency, boosting attack", mpCost: 30, cooldown: 4, type: "buff" },
      { name: "Final Judgment", damage: 75, description: "A devastating attack against those who break the rules", mpCost: 45, cooldown: 6, type: "physical" }
    ],
    passiveEffect: "Efficiency: 20% chance to reduce skill cooldowns by 1 turn",
    imageUrl: "/assets/images/classes/overseer.png",
    description: "Pragmatic leaders who maintain order and efficiency in battle."
  },
  ESFJ: {
    name: "Supporter",
    baseHP: 90,
    baseMP: 95,
    skills: [
      { name: "Harmonizing Strike", damage: 25, description: "An attack that also slightly heals allies", mpCost: 15, cooldown: 1, type: "physical" },
      { name: "Group Harmony", damage: -35, description: "Heals all allies", mpCost: 30, cooldown: 3, type: "healing", areaOfEffect: true },
      { name: "Morale Boost", damage: 0, description: "Increases all stats for the party briefly", mpCost: 40, cooldown: 5, type: "buff", areaOfEffect: true }
    ],
    passiveEffect: "Harmony: When an ally is healed, they also gain a small defense boost",
    imageUrl: "/assets/images/classes/supporter.png",
    description: "Social harmonizers who strengthen the entire party with their supportive presence."
  },
  ISTP: {
    name: "Craftsman",
    baseHP: 95,
    baseMP: 85,
    skills: [
      { name: "Precision Strike", damage: 45, description: "A mechanically perfect attack", mpCost: 15, cooldown: 1, type: "physical" },
      { name: "Weapon Mastery", damage: 0, description: "Increases critical hit chance for 3 turns", mpCost: 25, cooldown: 4, type: "buff" },
      { name: "Mechanical Trap", damage: 55, description: "Sets a trap that damages and slows the enemy", mpCost: 35, cooldown: 5, type: "physical" }
    ],
    passiveEffect: "Adaptability: 20% chance to counter-attack when hit",
    imageUrl: "/assets/images/classes/craftsman.png",
    description: "Resourceful tinkerers who can improvise solutions to any problem."
  },
  ISFP: {
    name: "Artist",
    baseHP: 80,
    baseMP: 100,
    skills: [
      { name: "Artistic Expression", damage: 35, description: "An attack infused with creative energy", mpCost: 15, cooldown: 1, type: "magical" },
      { name: "Aesthetic Healing", damage: -50, description: "A beautiful display that heals wounds", mpCost: 25, cooldown: 3, type: "healing" },
      { name: "Masterpiece", damage: 70, description: "A devastating attack representing the artist's finest work", mpCost: 45, cooldown: 6, type: "magical" }
    ],
    passiveEffect: "Aesthetics: Magical attacks have a 15% chance to enchant enemies, reducing their attack",
    imageUrl: "/assets/images/classes/artist.png",
    description: "Creative souls who channel their artistic sensitivity into beautiful and deadly attacks."
  },
  ESTP: {
    name: "Daredevil",
    baseHP: 95,
    baseMP: 80,
    skills: [
      { name: "Reckless Attack", damage: 50, description: "A powerful but slightly self-damaging attack", mpCost: 15, cooldown: 1, type: "physical" },
      { name: "Thrill Seeker", damage: 0, description: "Temporarily increases speed and evasion", mpCost: 25, cooldown: 3, type: "buff" },
      { name: "Calculated Risk", damage: 80, description: "A high-risk, high-reward attack with chance to miss", mpCost: 40, cooldown: 5, type: "physical" }
    ],
    passiveEffect: "Adrenaline: Damage increases by 20% when below 50% HP",
    imageUrl: "/assets/images/classes/daredevil.png",
    description: "Thrill-seekers who gain power from taking risks in battle."
  },
  ESFP: {
    name: "Performer",
    baseHP: 85,
    baseMP: 90,
    skills: [
      { name: "Showstopper", damage: 35, description: "A flashy attack that distracts enemies", mpCost: 15, cooldown: 1, type: "physical" },
      { name: "Center Stage", damage: 0, description: "Draws all enemy attention, increasing evasion", mpCost: 25, cooldown: 3, type: "buff" },
      { name: "Grand Finale", damage: 65, description: "A spectacular attack that dazzles enemies", mpCost: 40, cooldown: 5, type: "magical", areaOfEffect: true }
    ],
    passiveEffect: "Spotlight: 20% chance to dodge attacks",
    imageUrl: "/assets/images/classes/performer.png",
    description: "Born entertainers who dazzle enemies with their flamboyant fighting style."
  }
};

// Enemy list
export const enemyList: Enemy[] = [
  {
    name: "Shadow Wraith",
    hp: 80,
    damage: 15,
    type: "undead",
    attackName: "Soul Drain",
    description: "A spectral entity that feeds on fear and despair.",
    expReward: 50,
    weaknesses: ["light", "magical"],
    resistances: ["physical", "poison"],
    skills: [
      { name: "Terrifying Howl", damage: 0, description: "Reduces target's attack for 2 turns", mpCost: 10, cooldown: 3, type: "debuff" },
      { name: "Phase Shift", damage: 0, description: "Becomes untargetable for 1 turn", mpCost: 15, cooldown: 4, type: "buff" }
    ],
    imageUrl: "/assets/images/enemies/shadow_wraith.png"
  },
  {
    name: "Stone Golem",
    hp: 150,
    damage: 20,
    type: "construct",
    attackName: "Boulder Fist",
    description: "A massive construct of animated stone and ancient magic.",
    expReward: 70,
    weaknesses: ["magical", "lightning"],
    resistances: ["physical", "earth"],
    skills: [
      { name: "Ground Pound", damage: 30, description: "A powerful area attack that shakes the ground", mpCost: 20, cooldown: 3, type: "physical", areaOfEffect: true },
      { name: "Stone Skin", damage: 0, description: "Increases defense for 3 turns", mpCost: 15, cooldown: 4, type: "buff" }
    ],
    imageUrl: "/assets/images/enemies/stone_golem.png"
  },
  {
    name: "Frost Wolf",
    hp: 65,
    damage: 25,
    type: "beast",
    attackName: "Ice Fang",
    description: "A ferocious wolf with fur as white as snow and breath that freezes.",
    expReward: 40,
    weaknesses: ["fire", "physical"],
    resistances: ["ice", "water"],
    skills: [
      { name: "Freezing Howl", damage: 15, description: "Deals ice damage and reduces target's speed", mpCost: 10, cooldown: 2, type: "magical" },
      { name: "Pack Tactics", damage: 0, description: "Increases critical hit chance for 2 turns", mpCost: 15, cooldown: 4, type: "buff" }
    ],
    imageUrl: "/assets/images/enemies/frost_wolf.png"
  },
  {
    name: "Flame Imp",
    hp: 50,
    damage: 15,
    type: "elemental",
    attackName: "Fiery Touch",
    description: "A mischievous fire spirit that delights in burning things.",
    expReward: 30,
    weaknesses: ["water", "ice"],
    resistances: ["fire", "physical"],
    skills: [
      { name: "Fireball", damage: 25, description: "Hurls a ball of concentrated flame", mpCost: 15, cooldown: 2, type: "magical" },
      { name: "Smoke Screen", damage: 0, description: "Creates a cloud of smoke, increasing evasion", mpCost: 10, cooldown: 3, type: "buff" }
    ],
    imageUrl: "/assets/images/enemies/flame_imp.png"
  },
  {
    name: "Ancient Lich",
    hp: 120,
    damage: 30,
    type: "undead",
    attackName: "Death Touch",
    description: "A powerful undead sorcerer who has cheated death for centuries.",
    expReward: 100,
    weaknesses: ["light", "holy"],
    resistances: ["dark", "poison", "ice"],
    skills: [
      { name: "Drain Life", damage: 25, description: "Damages the target and heals the Lich", mpCost: 20, cooldown: 3, type: "magical" },
      { name: "Summon Skeleton", damage: 0, description: "Summons a skeleton minion to fight", mpCost: 30, cooldown: 5, type: "magical" },
      { name: "Dark Nova", damage: 40, description: "Unleashes dark energy in all directions", mpCost: 40, cooldown: 6, type: "magical", areaOfEffect: true }
    ],
    imageUrl: "/assets/images/enemies/ancient_lich.png"
  },
  {
    name: "Thunder Drake",
    hp: 100,
    damage: 25,
    type: "dragon",
    attackName: "Lightning Claw",
    description: "A young dragon with scales that crackle with electricity.",
    expReward: 80,
    weaknesses: ["earth", "ice"],
    resistances: ["lightning", "wind"],
    skills: [
      { name: "Thunderbolt", damage: 35, description: "Calls down a bolt of lightning", mpCost: 25, cooldown: 3, type: "magical" },
      { name: "Static Field", damage: 15, description: "Creates an electric field that damages all enemies", mpCost: 30, cooldown: 4, type: "magical", areaOfEffect: true }
    ],
    imageUrl: "/assets/images/enemies/thunder_drake.png"
  },
  {
    name: "Mind Flayer",
    hp: 70,
    damage: 20,
    type: "aberration",
    attackName: "Psychic Probe",
    description: "A tentacled horror that feeds on the thoughts and minds of intelligent creatures.",
    expReward: 60,
    weaknesses: ["physical", "light"],
    resistances: ["psychic", "magical"],
    skills: [
      { name: "Mind Blast", damage: 30, description: "A devastating psychic attack", mpCost: 20, cooldown: 3, type: "magical" },
      { name: "Confusion", damage: 0, description: "Confuses the target, making them attack randomly", mpCost: 25, cooldown: 4, type: "debuff" },
      { name: "Thought Leech", damage: 20, description: "Drains MP from the target", mpCost: 15, cooldown: 3, type: "magical" }
    ],
    imageUrl: "/assets/images/enemies/mind_flayer.png"
  },
  {
    name: "Toxic Slime",
    hp: 60,
    damage: 10,
    type: "ooze",
    attackName: "Acidic Touch",
    description: "A bubbling mass of corrosive goo that dissolves everything it touches.",
    expReward: 35,
    weaknesses: ["fire", "light"],
    resistances: ["physical", "poison", "water"],
    skills: [
      { name: "Poison Spray", damage: 15, description: "Sprays toxic fluid that does damage over time", mpCost: 15, cooldown: 2, type: "magical" },
      { name: "Split", damage: 0, description: "Divides into two smaller slimes", mpCost: 30, cooldown: 5, type: "buff" }
    ],
    imageUrl: "/assets/images/enemies/toxic_slime.png"
  }
];

// MBTI quiz questions
export const quiz: Question[] = [
  {
    id: 1,
    text: "When at a social gathering, you:",
    options: {
      a: "Feel energized and enjoy meeting new people",
      b: "Prefer deeper conversations with a few close friends"
    },
    dichotomy: "EI"
  },
  {
    id: 2,
    text: "You tend to focus more on:",
    options: {
      a: "Current realities and concrete information",
      b: "Possibilities and what might happen in the future"
    },
    dichotomy: "SN"
  },
  {
    id: 3,
    text: "When making decisions, you typically:",
    options: {
      a: "Consider logic and consistency first",
      b: "Consider people and circumstances first"
    },
    dichotomy: "TF"
  },
  {
    id: 4,
    text: "You prefer when things are:",
    options: {
      a: "Planned, organized, and scheduled",
      b: "Spontaneous, flexible, and adaptable"
    },
    dichotomy: "JP"
  },
  {
    id: 5,
    text: "Your work style is more:",
    options: {
      a: "Working steadily with a realistic approach",
      b: "Following inspirations and bursts of energy"
    },
    dichotomy: "SN"
  },
  {
    id: 6,
    text: "In conversations, you're more likely to:",
    options: {
      a: "Speak up and initiate discussions",
      b: "Listen and respond when addressed"
    },
    dichotomy: "EI"
  },
  {
    id: 7,
    text: "You find it easier to:",
    options: {
      a: "See the logical flaws in an argument",
      b: "Understand how people feel and what they value"
    },
    dichotomy: "TF"
  },
  {
    id: 8,
    text: "You prefer environments that are:",
    options: {
      a: "Structured with clear expectations",
      b: "Open-ended with room for creativity"
    },
    dichotomy: "JP"
  }
];

// Compute MBTI type based on answers
export function computeMbti(answers: string[]): MBTIType {
  const counts: Record<string, number> = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
  };
  
  // Count responses
  answers.forEach((answer, index) => {
    const question = quiz[index];
    if (!question) return;
    
    const dichotomy = question.dichotomy;
    if (answer === "a") {
      counts[dichotomy[0]]++;
    } else if (answer === "b") {
      counts[dichotomy[1]]++;
    }
  });
  
  // Determine type
  const type = [
    counts.E >= counts.I ? "E" : "I",
    counts.S >= counts.N ? "S" : "N",
    counts.T >= counts.F ? "T" : "F",
    counts.J >= counts.P ? "J" : "P"
  ].join("") as MBTIType;
  
  return type;
}

// Function to get a random enemy
export function getRandomEnemy(type?: string): Enemy {
  const filteredEnemies = type 
    ? enemyList.filter(enemy => enemy.type === type)
    : enemyList;
  
  const randomIndex = Math.floor(Math.random() * filteredEnemies.length);
  return filteredEnemies[randomIndex];
}

// Function to check for critical hit
export function isCriticalHit(critChance = CRITICAL_CHANCE): boolean {
  return Math.random() < critChance;
}

// Function to calculate damage with critical hits and defense
export function calculateDamage(baseDamage: number, defenseValue = 0, critChance = CRITICAL_CHANCE): { damage: number, isCritical: boolean } {
  const critical = isCriticalHit(critChance);
  let damage = baseDamage;
  
  if (critical) {
    damage *= CRITICAL_MULTIPLIER;
    // サウンド再生機能を無効化
    // playSound('critical');
  }
  
  // Apply defense reduction
  const damageReduction = defenseValue * BASE_DEFENSE_REDUCTION;
  damage = Math.max(1, damage - damageReduction); // Ensure at least 1 damage
  
  return {
    damage: Math.round(damage),
    isCritical: critical
  };
}

// Function to check for evasion
export function checkEvasion(evasionChance = EVASION_BASE_CHANCE): boolean {
  return Math.random() < evasionChance;
}

// Function to calculate level based on experience
export function calculateLevel(experience: number): number {
  // Simple level calculation: every 100 exp = 1 level
  return Math.floor(experience / 100) + 1;
}

// Get MBTI trait descriptions
export function getMbtiTraits(type: MBTIType): Record<string, string> {
  const traits: Record<string, string> = {
    E: "Extraverted: Gains energy from social interactions",
    I: "Introverted: Gains energy from solitary activities",
    S: "Sensing: Focuses on concrete details and practical matters",
    N: "Intuitive: Focuses on patterns, possibilities and the big picture",
    T: "Thinking: Makes decisions based on logic and objective analysis",
    F: "Feeling: Makes decisions based on values and how actions affect others",
    J: "Judging: Prefers structure, plans, and organization",
    P: "Perceiving: Prefers flexibility, spontaneity, and adaptability"
  };
  
  return {
    first: traits[type[0]],
    second: traits[type[1]],
    third: traits[type[2]],
    fourth: traits[type[3]]
  };
} 