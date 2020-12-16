/*
済）- スタートボタン
済）- 選ばれた数字は別配列に格納 => 以降そいつは除外
済）- ボタン押下で再度番号取得
済）- 今まで出た数字を表示
- 全部の数字を出し終わったら「次いってみよう」ボタンは押せなくする
- 数字は文字列に変換して1桁は0埋め
- 「次いってみよう」ボタン => 最下部固定
- 「次いってみよう」ボタン => キーアサイン
- 本当に閉じていいですか？
- サウンド
- レスポンシブ（一応）

- UX上のギミック
  - フォント
  - 背景画像
  - スロットマシーン的な数字 https://codepen.io/mo4_9/pen/ayRPaq

- 景品 : 8個
*/


$(function() {

  var numbers = Array.from(Array(75).keys(), x => x + 1);
  var isStart = false;
  var mentioned = [];
  // console.log(numbers);

  if (isStart === false) {
    $('.btn').text('スタート!!');
  }

  $('.btn').on('click', function() {
    getNumber();
    // console.log('next!!');
  });

  $(window).keyup(function(e) {
    console.log(e.key);
    console.log(typeof e.key);
    if (e.key === "n") {
      $('.btn').click();
    }
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
    if (choice < 10) {
      console.log(`${choice}は10より小さい`);
      choice = String('0' + choice);
    } else {
      console.log(`${choice}は10より大きい`);
    }
    var num = choice; // 選んだ数字
    // console.log(choice, num, numbers);

    $('#result').addClass('result_num').text(num);

    mentioned.push(num); // 末尾に追加
    console.log(`numbers.length => ${numbers.length}, mentioned.length => ${mentioned.length}`);
    // console.log(mentioned);

    var txt = "";
    for (var i = 0; i < mentioned.length; i++) {
      if (i === mentioned.length - 1) {
        txt += '<span class="latest">' + mentioned[i] + '</span>';
      } else {
        txt += '<span>' + mentioned[i] + '</span>';
      }
    }
    $('#mentioned_nums').html(txt);
    $('.latest').fadeIn();
    // console.log(`既出 => ${mentioned}`);
    // console.log(`既出 => ${txt}`);

  }



});
