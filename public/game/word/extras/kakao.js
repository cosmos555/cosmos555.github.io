//<![CDATA[
// // 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('d7367c0834461bedc4eb6da0f61fada4');
// // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
function sendLink(share) {
  if (/Android/i.test(navigator.userAgent) && window.location.origin == "https://app.5gamedom.com") {
    window.gamedomShare.kakaoShare(JSON.stringify({
      objectType: '낱말은 새가 듣고',
      content: {
        title: '낱말은 새가 듣고',
        description: share,
        imageUrl: 'https://app.5gamedom.com/data/word/img/icon.jpg',
        link: {
          mobileWebUrl: '"https://app.5gamedom.com/play/mobile?gn=108"',
          webUrl: '"https://app.5gamedom.com/play/mobile?gn=108"'
        }
      },
      social: {
        commentCount: 1,
        viewCount: 1
      },
      buttons: [{
        title: '게임하러가기',
        link: {
          mobileWebUrl: '"https://app.5gamedom.com/play/mobile?gn=108"',
          webUrl: '"https://app.5gamedom.com/play/mobile?gn=108"'
        }
      }]
    }))
  } 
  else if(window.location.origin == "https://hifivegame.com"){
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '낱말은 새가 듣고',
        description: share,
        imageUrl: 'https://hifivegame.com/data/word/img/icon.jpg',
        link: {
          mobileWebUrl: 'https://hifivegame.com/gameinfo?gn=108',
          webUrl: 'https://hifivegame.com/gameinfo?gn=108'
        }
      },

      buttons: [{
        title: '게임하러 가기',
        link: {
          mobileWebUrl: 'https://hifivegame.com/gameinfo?gn=108',
          webUrl: 'https://hifivegame.com/gameinfo?gn=108'
        }
      }]
    });
  }
  else {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '낱말은 새가 듣고',
        description: share,
        imageUrl: 'http://dev.zip-lab.co.kr/test/sb/word/src/img/kakaotalk.png',
        link: {
          mobileWebUrl: 'https://pf.kakao.com/_xcGSQC',
          webUrl: 'https://pf.kakao.com/_xcGSQC'
        }
      },

      buttons: [{
        title: '게임하러 가기',
        link: {
          mobileWebUrl: 'https://pf.kakao.com/_xcGSQC',
          webUrl: 'https://pf.kakao.com/_xcGSQC'
        }
      }]
    });

  }
}
//]]>