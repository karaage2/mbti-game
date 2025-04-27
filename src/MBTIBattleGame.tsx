import { useState, useEffect } from "react";
import { getEnemyImage, getClassImage } from "./assets/gameAssets";

/**
 * MBTI‑Battle prototype – finalized & build‑ready.
 * Place this file as `src/MBTIBattleGame.tsx`.
 *
 * インポート例 (App.tsx):
 *   import MBTIBattleGame from "./MBTIBattleGame";
 *
 * 📌 重要: ファイル名とパスが一致しないと Vite が
 *   "Failed to resolve import" を出します。Windows では
 *   大文字小文字の違いも要注意。
 */

/* ---------- Data ---------- */

export type Dichotomy = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

interface Question {
  text: string;
  options: { label: string; picks: Dichotomy }[];
}

const quiz: Question[] = [
  {
    text: "仲間といるときは？",
    options: [
      { label: "盛り上げ役が好き", picks: "E" },
      { label: "聞き役が落ち着く", picks: "I" },
    ],
  },
  {
    text: "旅の準備は？",
    options: [
      { label: "まず地図を広げて現実的に計画", picks: "S" },
      { label: "ワクワクするアイデア優先", picks: "N" },
    ],
  },
  {
    text: "決断するときは？",
    options: [
      { label: "論理で判断", picks: "T" },
      { label: "人の気持ちを重視", picks: "F" },
    ],
  },
  {
    text: "締め切りが近いと？",
    options: [
      { label: "計画通り最後までやり切る", picks: "J" },
      { label: "ギリギリで爆発的に集中", picks: "P" },
    ],
  },
];

interface Skill {
  name: string;
  dmg: number; // negative heals enemy (INFP heal)
  desc: string;
}

interface ClassInfo {
  name: string;
  baseHp: number;
  skills: Skill[];
}

// 敵キャラクターの情報を拡張
interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  dmg: number;
  type: "weak" | "normal" | "strong";
  attackName: string;
  description: string;
  image?: string;
}

const enemyList: Enemy[] = [
  {
    name: "スライム",
    hp: 60,
    maxHp: 60,
    dmg: 8,
    type: "weak",
    attackName: "体当たり",
    description: "弱い敵だが、数が多い",
  },
  {
    name: "ゴブリン",
    hp: 80,
    maxHp: 80,
    dmg: 12,
    type: "weak",
    attackName: "小刀で斬りつける",
    description: "小さな悪党",
  },
  {
    name: "オーク",
    hp: 100,
    maxHp: 100,
    dmg: 15,
    type: "normal",
    attackName: "棍棒を振り回す",
    description: "筋骨隆々とした戦士",
  },
  {
    name: "ウルフ",
    hp: 70,
    maxHp: 70,
    dmg: 18,
    type: "normal",
    attackName: "鋭い牙で噛みつく",
    description: "素早い動きで攻撃してくる",
  },
  {
    name: "骸骨兵",
    hp: 90,
    maxHp: 90,
    dmg: 14,
    type: "normal",
    attackName: "錆びた剣で斬りつける",
    description: "不死の兵士",
  },
  {
    name: "ドラゴン",
    hp: 150,
    maxHp: 150,
    dmg: 25,
    type: "strong",
    attackName: "炎の息を吐く",
    description: "強大な力を持つ伝説の生物",
  },
  {
    name: "デーモン",
    hp: 140,
    maxHp: 140,
    dmg: 22,
    type: "strong",
    attackName: "暗黒魔法",
    description: "強力な魔力を持つ魔物",
  },
];

const classes: Record<string, ClassInfo> = {
  INFP: {
    name: "精霊術師",
    baseHp: 90,
    skills: [
      { name: "ヒール", dmg: -25, desc: "仲間を癒す回復魔法" },
      { name: "フェアリースパーク", dmg: 15, desc: "精霊の光で攻撃" },
    ],
  },
  ESTJ: {
    name: "騎士団長",
    baseHp: 120,
    skills: [
      { name: "シールドバッシュ", dmg: 18, desc: "盾で一撃" },
      { name: "号令", dmg: 22, desc: "強力な一撃" },
    ],
  },
  ENFP: {
    name: "炎の呪術師",
    baseHp: 80,
    skills: [
      { name: "フレアボルト", dmg: 20, desc: "炎の矢" },
      { name: "ワイルドカード", dmg: 30, desc: "ランダムな魔法攻撃" },
    ],
  },
  ISTP: {
    name: "闇のレンジャー",
    baseHp: 95,
    skills: [
      { name: "シャドウストライク", dmg: 22, desc: "急所を突く" },
      { name: "スモークボム", dmg: 16, desc: "敵の視界を奪い攻撃" },
    ],
  },
  ENTJ: {
    name: "戦術魔導士",
    baseHp: 110,
    skills: [
      { name: "メテオ・コマンド", dmg: 24, desc: "戦術的隕石召喚" },
      { name: "デバフオーダー", dmg: 19, desc: "敵の弱点を突く" },
    ],
  },
};

/* ---------- Helper ---------- */

export function computeMbti(ans: Dichotomy[]): string {
  const counts: Record<Dichotomy, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };
  ans.forEach((p) => counts[p]++);
  const type = `${counts["E"] >= counts["I"] ? "E" : "I"}${counts["S"] >= counts["N"] ? "S" : "N"}${counts["T"] >= counts["F"] ? "T" : "F"}${counts["J"] >= counts["P"] ? "J" : "P"}`;
  return classes[type] ? type : "INFP";
}

// ランダムな敵を選択する関数
function getRandomEnemy(type?: "weak" | "normal" | "strong"): Enemy {
  const filteredEnemies = type 
    ? enemyList.filter(enemy => enemy.type === type)
    : enemyList;
  
  const randomIndex = Math.floor(Math.random() * filteredEnemies.length);
  const enemy = { ...filteredEnemies[randomIndex] }; // コピーを作成
  
  return enemy;
}

/* ---------- Component ---------- */

export default function MBTIBattleGame() {
  const [phase, setPhase] = useState<"quiz" | "result" | "battle" | "victory" | "gameover">("quiz");
  const [answers, setAnswers] = useState<Dichotomy[]>([]);
  const [mbti, setMbti] = useState("");
  const [battleCount, setBattleCount] = useState(0);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  // 音声プリロードの代わりに空のuseEffectにする
  useEffect(() => {
    // サウンド機能を削除
  }, []);

  const resetGame = () => {
    setPhase("quiz");
    setAnswers([]);
    setMbti("");
    setBattleCount(0);
  };

  /* ---------- Quiz ---------- */
  const handlePick = (pick: Dichotomy) => {
    // 音声効果を削除
    const next = [...answers, pick];
    setAnswers(next);
    if (next.length === quiz.length) {
      setMbti(computeMbti(next));
      setPhase("result");
    }
  };

  /* ---------- Battle ---------- */
  const startBattle = () => {
    // 音声効果を削除
    
    // バトル回数に応じて敵の強さを調整
    let enemyType: "weak" | "normal" | "strong" = "weak";
    if (battleCount >= 5) {
      enemyType = "strong";
    } else if (battleCount >= 2) {
      enemyType = "normal";
    }
    
    // ランダムな敵を選択
    const enemy = getRandomEnemy(enemyType);
    
    setPlayerHp(classes[mbti].baseHp);
    setCurrentEnemy(enemy);
    setBattleLog([`${enemy.name}が現れた！`]);
    setIsPlayerTurn(true);
    setPhase("battle");
  };

  // 敵の攻撃ターン
  useEffect(() => {
    if (phase === "battle" && !isPlayerTurn && currentEnemy) {
      // 少し遅延を入れて敵の攻撃を実行
      const timer = setTimeout(() => {
        // プレイヤーへのダメージ計算
        const newPlayerHp = Math.max(0, playerHp - currentEnemy.dmg);
        setPlayerHp(newPlayerHp);
        
        // 音声効果を削除
        
        // バトルログに敵の攻撃を追加
        setBattleLog(prev => [...prev, `${currentEnemy.name}の${currentEnemy.attackName}！ ${currentEnemy.dmg}ダメージ！`]);
        
        // プレイヤーのHP確認
        if (newPlayerHp <= 0) {
          setPhase("gameover");
        } else {
          // プレイヤーのターンに戻す
          setIsPlayerTurn(true);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [phase, isPlayerTurn, currentEnemy, playerHp]);

  const useSkill = (skill: Skill) => {
    if (!currentEnemy || !isPlayerTurn) return;
    
    // ダメージ計算
    const damage = skill.dmg;
    let newEnemy = { ...currentEnemy };
    let logMessage = "";
    
    // 音声効果を削除
    
    if (damage < 0) {
      // 回復の場合
      const healAmount = Math.abs(damage);
      const newPlayerHp = Math.min(classes[mbti].baseHp, playerHp + healAmount);
      setPlayerHp(newPlayerHp);
      logMessage = `${skill.name}を使った！ ${healAmount}回復！`;
    } else {
      // 攻撃の場合
      newEnemy.hp = Math.max(0, newEnemy.hp - damage);
      logMessage = `${skill.name}を使った！ ${damage}ダメージ！`;
    }
    
    // バトルログに追加
    setBattleLog(prev => [...prev, logMessage]);
    
    // 敵のHPを更新
    setCurrentEnemy(newEnemy);
    
    // 敵のHPが0になった場合
    if (newEnemy.hp <= 0) {
      setBattleCount(prev => prev + 1);
      setPhase("victory");
      return;
    }
    
    // 敵のターンに切り替え
    setIsPlayerTurn(false);
  };

  /* ---------- RENDER ---------- */
  if (phase === "quiz") {
    const q = quiz[answers.length];
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-purple animated-bg">
        <div className="card p-6 max-w-md w-full space-y-6">
          <h1 className="text-3xl font-bold text-center">MBTI スピリット診断</h1>
          <p className="text-xl text-center">{q.text}</p>
          <div className="grid grid-cols-1 gap-4 w-full">
            {q.options.map((o) => (
              <button 
                key={o.label} 
                onClick={() => handlePick(o.picks)} 
                className="btn btn-primary rounded-xl"
              >
                {o.label}
              </button>
            ))}
          </div>
          <p className="text-center mt-4">
            <span className="text-sm uppercase tracking-wide opacity-70">質問</span>
            <span className="text-xl ml-2">{answers.length + 1} / {quiz.length}</span>
          </p>
        </div>
      </div>
    );
  }

  if (phase === "result") {
    const cls = classes[mbti];
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-blue animated-bg">
        <div className="card p-6 max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center">診断結果</h2>
          <div className="p-4 bg-gradient-dark rounded-2xl">
            <h3 className="text-2xl font-semibold text-center">{mbti} / {cls.name}</h3>
          </div>
          <div className="space-y-4">
            <p className="text-xl">あなたは「{cls.name}」タイプです！</p>
            <p>HP: <span className="font-semibold">{cls.baseHp}</span></p>
            <p>スキル:</p>
            <ul className="space-y-2">
              {cls.skills.map(s => (
                <li key={s.name} className="ml-4">・{s.name} - {s.desc}</li>
              ))}
            </ul>
          </div>
          <button onClick={startBattle} className="btn btn-success w-full rounded-xl">
            冒険へ出発！
          </button>
        </div>
      </div>
    );
  }

  if (phase === "battle" && currentEnemy) {
    const cls = classes[mbti];
    const playerHpPercent = (playerHp / cls.baseHp) * 100;
    const enemyHpPercent = (currentEnemy.hp / currentEnemy.maxHp) * 100;
    return (
      <div className="p-8 min-h-screen bg-gradient-dark animated-bg flex flex-col items-center">
        <div className="card p-6 max-w-xl w-full space-y-6">
          <h2 className="text-2xl font-bold text-center mb-4">バトル！</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="card p-4">
              <h3 className="text-xl font-semibold">{mbti} / {cls.name}</h3>
              <div className="health-bar mt-4">
                <div 
                  className="health-bar-fill player" 
                  style={{ width: `${playerHpPercent}%` }}
                ></div>
              </div>
              <p className="mt-2 text-center">
                <span className={playerHpPercent < 30 ? "text-danger" : ""}>
                  HP: {playerHp} / {cls.baseHp}
                </span>
              </p>
            </div>
            
            <div className="card p-4">
              <h3 className="text-xl font-semibold">{currentEnemy.name}</h3>
              <div className="health-bar mt-4">
                <div 
                  className="health-bar-fill enemy" 
                  style={{ width: `${enemyHpPercent}%` }}
                ></div>
              </div>
              <p className="mt-2 text-center">
                HP: {currentEnemy.hp} / {currentEnemy.maxHp}
              </p>
              <p className="text-sm text-center opacity-70 mt-1">{currentEnemy.description}</p>
            </div>
          </div>
          
          {/* バトルログ */}
          <div className="card p-4 bg-gradient-dark max-h-32 overflow-y-auto">
            <div className="space-y-1">
              {battleLog.map((log, index) => (
                <p key={index} className="text-sm">{log}</p>
              ))}
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-center text-sm mb-2">
              {isPlayerTurn ? "アクション選択" : `${currentEnemy.name}のターン...`}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {isPlayerTurn && cls.skills.map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => useSkill(skill)}
                  className={`btn ${skill.dmg < 0 ? 'btn-secondary' : 'btn-danger'} rounded-lg`}
                  disabled={!isPlayerTurn}
                >
                  {skill.name}
                  <span className="block text-sm opacity-70 mt-1">
                    {skill.dmg < 0 ? "回復" : "攻撃"} {Math.abs(skill.dmg)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <p className="text-center text-sm mt-2">
            戦闘回数: {battleCount}
          </p>
        </div>
      </div>
    );
  }

  if (phase === "gameover" && currentEnemy) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-dark animated-bg">
        <div className="card p-6 max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-danger">敗北...</h2>
          <p className="text-xl">{currentEnemy.name}に倒された...</p>
          <p>バトル回数: {battleCount}</p>
          <button onClick={resetGame} className="btn btn-primary w-full rounded-xl">
            MBTI診断からやり直す
          </button>
        </div>
      </div>
    );
  }

  if (phase === "victory" && currentEnemy) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gradient-blue animated-bg">
        <div className="card p-6 max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center">勝利！</h2>
          <p className="text-xl">{currentEnemy.name}を倒した！</p>
          <p>バトル回数: {battleCount}</p>
          <button onClick={startBattle} className="btn btn-success w-full rounded-xl">
            次の敵と戦う
          </button>
          <button onClick={resetGame} className="btn btn-outline w-full rounded-xl">
            MBTI診断からやり直す
          </button>
        </div>
      </div>
    );
  }

  return null;
} 