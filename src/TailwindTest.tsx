export default function TailwindTest() {
  return (
    <div className="p-6 flex flex-col items-center space-y-4">
      <h1 className="text-3xl font-bold">スタイルテスト</h1>
      <div className="flex space-x-4">
        <div className="bg-gradient-red p-4 rounded-xl text-center">赤いボックス</div>
        <div className="bg-gradient-green p-4 rounded-xl text-center">緑のボックス</div>
        <div className="bg-gradient-blue p-4 rounded-xl text-center">青いボックス</div>
      </div>
      <button className="btn btn-primary p-4 rounded-xl">
        メインボタン
      </button>
      <div className="flex space-x-4 mt-4">
        <button className="btn btn-secondary">緑ボタン</button>
        <button className="btn btn-danger">赤ボタン</button>
        <button className="btn btn-success">成功ボタン</button>
      </div>
    </div>
  );
} 