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
済）-- 効果音
済）-- 効果音が鳴ってる間は連打防止
- 本当に閉じていいですか？
済）- レスポンシブ（一応）

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

  // 離脱前の確認
  var elementClicked = false; // 適当なフラグ
  $(window).on("beforeunload", function() {
    if (!elementClicked) {
      return "本当に遷移しちゃう？";
    }
  });
  $(document).on("click", "a, button, input[type=submit]", function() {
    elementClicked = true;
    setTimeout(function() {
      elementClicked = false;
    }, 100);
  });


  if (isStart === false) {
    $('.btn').text('START');
  }


  $('.btn').on('click', function() {
    // 4秒間は連打防止
    if (cancelFlag == 0) {
      cancelFlag = 1;
      console.log("まだ処理中です!!");
      $('.btn').css('pointer-events', 'none').fadeOut();

      getNumber();

      setTimeout(function() {
        cancelFlag = 0;
        $('.btn').css('pointer-events', 'auto').text('NEXT (n)').fadeIn();
        console.log("準備完了!!");
        console.log('---');
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

    // ゲーム終了時
    if (numbers.length === 0) {
      // 注）SweetAlert依存
      Swal.fire({
        title: 'ゲーム終了!!',
        text: "お疲れさまでした。",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      });

      $('.btn').css('pointer-events', 'none').fadeOut();
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
    console.log(`残り => ${numbers}`);
    console.log(`既出 => ${mentioned}`);

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
    console.log('---');
  }


  function sound() {
    $('#drumroll')[0].play();
  }

});
