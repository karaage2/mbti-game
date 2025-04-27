// 戦闘に関する計算や効果を扱うユーティリティ関数

// クリティカルヒットの確率 (0.0 〜 1.0)
const CRITICAL_CHANCE = 0.15;
// クリティカルヒットの倍率
const CRITICAL_MULTIPLIER = 1.5;

// 防御による軽減率
const DEFENSE_REDUCTION = 0.5;

// アイテム効果の定義
export const ITEMS = {
  healingPotion: {
    name: "回復ポーション",
    description: "HPを30回復する",
    effect: (currentHp: number, maxHp: number) => Math.min(currentHp + 30, maxHp),
    type: "healing"
  },
  attackBoost: {
    name: "力の秘薬",
    description: "次の攻撃のダメージが50%増加",
    effect: (damage: number) => Math.floor(damage * 1.5),
    type: "buff"
  },
  smokeBomb: {
    name: "煙玉",
    description: "敵の次の攻撃を回避する確率が高くなる",
    effect: () => true,
    type: "defense"
  },
  bombStone: {
    name: "爆裂石",
    description: "敵全体に15ダメージ",
    effect: () => 15,
    type: "attack"
  }
};

// アイテムタイプ
export type ItemType = keyof typeof ITEMS;

// プレイヤーのステータスバフ
export interface PlayerBuffs {
  attackBoost: boolean;
  defenseUp: boolean;
  evasion: boolean;
}

// ダメージ計算（クリティカルヒットの可能性あり）
export const calculateDamage = (baseDamage: number, isDefending: boolean = false): { damage: number; isCritical: boolean } => {
  // クリティカルヒット判定
  const isCritical = Math.random() < CRITICAL_CHANCE;
  
  // 基本ダメージ計算
  let calculatedDamage = baseDamage;
  
  // クリティカルの場合はダメージ増加
  if (isCritical) {
    calculatedDamage = Math.floor(calculatedDamage * CRITICAL_MULTIPLIER);
  }
  
  // 防御中の場合はダメージ軽減
  if (isDefending) {
    calculatedDamage = Math.floor(calculatedDamage * DEFENSE_REDUCTION);
  }
  
  return {
    damage: calculatedDamage,
    isCritical
  };
};

// 回避判定
export const checkEvasion = (evasionActive: boolean): boolean => {
  // 通常の回避率は10%
  const baseEvasionChance = 0.1;
  
  // 回避バフがあれば50%
  const evasionChance = evasionActive ? 0.5 : baseEvasionChance;
  
  return Math.random() < evasionChance;
};

// 経験値からレベルを計算
export const calculateLevel = (experience: number): number => {
  // シンプルなレベル計算式: レベル = sqrt(経験値 / 10)
  return Math.floor(Math.sqrt(experience / 10)) + 1;
};

// 次のレベルアップに必要な経験値
export const experienceForNextLevel = (currentLevel: number): number => {
  return (currentLevel * currentLevel) * 10;
};

// MBTIタイプに基づいた強みと弱みを取得
export const getMbtiTraits = (mbtiType: string): { strengths: string[]; weaknesses: string[] } => {
  const traits = {
    INFP: {
      strengths: ["回復力", "直感力"],
      weaknesses: ["物理防御"]
    },
    ESTJ: {
      strengths: ["物理防御", "リーダーシップ"],
      weaknesses: ["魔法防御"]
    },
    ENFP: {
      strengths: ["魔法攻撃", "適応力"],
      weaknesses: ["持続力"]
    },
    ISTP: {
      strengths: ["回避力", "戦術眼"],
      weaknesses: ["回復力"]
    },
    ENTJ: {
      strengths: ["戦略", "攻撃力"],
      weaknesses: ["防御力"]
    }
  };
  
  // 該当するMBTIタイプがない場合はデフォルト値を返す
  return traits[mbtiType as keyof typeof traits] || {
    strengths: ["バランス"],
    weaknesses: ["専門性"]
  };
}; 