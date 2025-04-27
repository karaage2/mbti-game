# MBTI Battle Game

MBTI 性格診断に基づいたシンプルなRPGバトルゲームです。自分のMBTIタイプを診断し、その結果に応じたキャラクタークラスでモンスターと戦うことができます。

## 機能

- MBTIタイプを決定する4つの質問
- タイプに基づいた5種類のキャラクタークラス
- 独自のスキルセットを持つキャラクター
- モンスターとのターン制バトル
- サウンドエフェクト
- アニメーション付きのUI

## インストール方法

```bash
# リポジトリをクローン
git clone <リポジトリURL>

# プロジェクトディレクトリに移動
cd mbti-battle-game

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## サウンドファイルについて

ゲームには以下のサウンドエフェクトが使われています：

1. `attack.mp3` - 攻撃スキル使用時
2. `heal.mp3` - 回復スキル使用時
3. `victory.mp3` - 戦闘勝利時
4. `defeat.mp3` - 戦闘敗北時
5. `enemy-appear.mp3` - 敵出現時
6. `player-damage.mp3` - プレイヤーがダメージを受けた時
7. `enemy-damage.mp3` - 敵がダメージを受けた時
8. `critical.mp3` - クリティカルヒット時
9. `button.mp3` - ボタンクリック時
10. `level-up.mp3` - レベルアップ時

現在、これらのファイルは `src/assets/sounds/` ディレクトリにプレースホルダとして配置されています。実際のサウンドファイルは以下の方法で入手できます：

1. [OpenGameArt.org](https://opengameart.org/) - CC0ライセンスのサウンドエフェクトを探す
2. [Kenney's RPG Sounds](https://opengameart.org/content/50-rpg-sound-effects) - CC0ライセンス下の50種類のRPGサウンドエフェクト集
3. [Battle Sound Effects](https://opengameart.org/content/battle-sound-effects) - 戦闘関連のサウンド

ダウンロードしたサウンドファイルを `src/assets/sounds/` ディレクトリに配置し、適切な名前に変更してください。

## 開発情報

このプロジェクトは以下の技術を使用しています：

- React + TypeScript
- Vite
- CSS アニメーション

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
