/*
- スタートボタン
- 本当に閉じていいですか？
- 選ばれた数字は別配列に格納 => 以降そいつは除外
- ボタン押下で再度番号取得
- 今まで出た数字を表示
- 全部の数字を出し終わったら「次いってみよう」ボタンは押せなくする


- UX上のギミック
  - フォント
  - 背景画像
  - スロットマシーン的な数字 https://codepen.io/mo4_9/pen/ayRPaq

- 景品 : 8個
*/


$(function() {

  var numbers = Array.from(Array(75).keys(), x => x + 1);
  var isStart = false;
  var isEnd = false;
  var mentioned = [];
  // console.log(numbers);

  if (isStart === false) {
    $('.btn').text('スタート!!');
  }

  $('.btn').on('click', function() {
    getNumber();
    // console.log('next!!');
  });

  function getNumber() {
    // console.log('【関数実行】getNumber!!');

    if (numbers.length === 0) {
      alert('終了!!');
      return;
    }

    isStart = true;
    $('.btn').text('次行ってみよう!!');

    var choice = numbers.splice(Math.floor(Math.random() * numbers.length), 1); // 1個選んで削除
    var num = choice; // 選んだ数字
    // console.log(choice);
    console.log(num);
    // console.log(numbers);

    $('#result').text(num);

    mentioned.push(num); // 末尾に追加
    console.log(`numbers.length => ${numbers.length}, mentioned.length => ${mentioned.length}`);
    // console.log(mentioned);

    var txt = "";
    for (var i = 0; i < mentioned.length; i++) {
      txt += '<span>' + mentioned[i] + '</span>';
    }
    $('#mentioned_nums').html(txt);
    // console.log(`既出 => ${mentioned}`);
    // console.log(`既出 => ${txt}`);

  }



});
