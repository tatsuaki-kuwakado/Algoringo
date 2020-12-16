/*
■仕様
済）- スタートボタン
済）- 選ばれた数字は別配列に格納 => 以降そいつは除外
済）- ボタン押下で再度番号取得
済）- 今まで出た数字を表示
済）- 数字は文字列に変換して1桁は0埋め
済）- 「次いってみよう」ボタン => 最下部固定
済）- 「次いってみよう」ボタン => キーアサイン
済）- 全部の数字を出し終わったら「次いってみよう」ボタンは押せなくする
済）-- サウンド
済）-- 連打防止
- 本当に閉じていいですか？

- レスポンシブ（一応）

■UX上のギミック
済）- フォント
済）- 背景画像
済）- スロットマシーン的な数字 https://codepen.io/mo4_9/pen/ayRPaq

*/


$(function() {

  var numbers = Array.from(Array(75).keys(), x => x + 1);
  var isStart = false;
  var mentioned = [];
  var cancelFlag = 0;
  // console.log(numbers);

  if (isStart === false) {
    $('.btn').text('START');
  }


  $('.btn').on('click', function() {
    // 連打防止（4秒）
    if (cancelFlag == 0) {
      cancelFlag = 1;
      console.log("まだ処理中です!!");
      $('.btn').css('pointer-events', 'none').fadeOut();

      getNumber();

      setTimeout(function() {
        cancelFlag = 0;
        $('.btn').css('pointer-events', 'auto').text('NEXT').fadeIn();
        console.log("準備完了!!");
      }, 4000);
    }
  });

  $(window).keyup(function(e) {
    if (e.key === "n" || e.key === "N") {
      $('.btn').click();
    }
  });


  function getNumber() {
    // 初回だけ
    if (mentioned.length === 0) {
      isStart = true;
      $('h1#initial').slideUp();
      // $('.btn').text('次行ってみよう!!');
    }

    // 終了後
    if (numbers.length === 0) {
      alert('終了!!');
      return;
    }

    sound();

    var choice = numbers.splice(Math.floor(Math.random() * numbers.length), 1); // 1個選んで削除
    if (choice < 10) {
      choice = String('0' + choice);
    }
    var num = choice; // 選んだ数字
    // console.log(choice, num, numbers);

    $('#result').addClass('result_num').text(num);

    mentioned.push(num); // 末尾に追加
    console.log(`numbers.length => ${numbers.length}, mentioned.length => ${mentioned.length}`);
    console.log(`mentioned => ${mentioned}`);

    var txt = "";
    for (var i = 0; i < mentioned.length; i++) {
      if (i === mentioned.length - 1) {
        txt += '<span class="latest">' + mentioned[i] + '</span>';
      } else if (i === mentioned.length - 2) {
        txt += '<span class="second-to-last">' + mentioned[i] + '</span>';
      } else {
        txt += '<span>' + mentioned[i] + '</span>';
      }
    }
    $('#mentioned_nums').html(txt);
    $('.second-to-last').fadeIn();
  }


  function sound() {
    console.log('drum!!');

    $('#drumroll')[0].play();
  }

});
