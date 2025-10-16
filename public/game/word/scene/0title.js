WG.Scene.regist(
  function title() {
    this.defaultScene = true;

  }, {
    "init": function () {
 



      G.firstStart = localStorage.getItem('firstStart');
      if (G.firstStart == undefined || G.firstStart == null || G.firstStart == NaN) {
        G.firstStart = "true";
        localStorage.setItem('firstStart', G.firstStart);
      }


      G.stage = localStorage.getItem('wordStage');
      if (G.stage == undefined || G.stage == null || G.stage == NaN) {
        G.stage = 1;
        localStorage.setItem('wordStage', parseInt(G.stage));
      }

      G.coin = localStorage.getItem('wordCoin');
      if (G.coin == undefined || G.coin == null || G.coin == NaN) {
        G.coin = 0;
        localStorage.setItem('wordCoin', parseInt(G.coin));
      }

      G.bestTime = localStorage.getItem('bestTime');
      if (G.bestTime == undefined || G.bestTime == null || G.bestTime == NaN) {
        G.bestTime = 0;
        localStorage.setItem('bestTime', G.bestTime);
      }

      G.gameWordArr = JSON.parse(localStorage.getItem('gameWordArr_' + G.lang));
      if (G.gameWordArr == undefined || G.gameWordArr == null || G.gameWordArr == NaN) {
        G.gameWordArr = 0;
        localStorage.setItem('gameWordArr_' + G.lang, G.gameWordArr);
      }

      G.noteWord = JSON.parse(localStorage.getItem('noteWord' + G.lang));
      if (G.noteWord == undefined || G.noteWord == null || G.noteWord == NaN) {
        G.noteWord = {
          "foundWord": []
        };
        localStorage.setItem('noteWord' + G.lang, JSON.stringify(G.noteWord));
      }

      G.textSize = JSON.parse(localStorage.getItem('textSize'));
      if (G.textSize == undefined || G.textSize == null || G.textSize == NaN) {
        G.textSize = 26;
        localStorage.setItem('textSize', parseInt(G.textSize));
      }

      G.adHintTime = localStorage.getItem('adHintTime');
      if (G.adHintTime == undefined || G.adHintTime == null) {
        G.adHintTime = 0;
        localStorage.setItem('adHintTime', G.adHintTime);
      }
      G.adHintTab = localStorage.getItem('adHintTab');
      if (G.adHintTab == undefined || G.adHintTab == null) {
        G.adHintTab = "false";
        localStorage.setItem('adHintTab', G.adHintTab);
      }
    

      G.words = WG.resource["words_" + G.lang + ".json"];
      delete G.words.data;
      this.isTouch = false;

      G.canDrag = false;

      this.bg = new WG.Sprite('intro.png', {
        x: WG.Screen.width / 2,
        y: WG.Screen.height / 2,
        width: "100%",
        height: "100%",
        layer: "background"
      });

      this.bg.on('pointertap', function () {
        WG.Scene.data.title.stageMode.visible = true;
        if(h5Api.data.isRank) WG.Scene.data.title.stageMode.visible = false;
        else                  WG.Scene.data.title.stageMode.visible = true;  
        WG.Scene.data.title.speedMode.visible = true;
        WG.Scene.data.title.wordNote.visible = true;
        WG.Scene.data.title.touchToStart.visible = false;
        this.isTouch = true;


        if (G.firstStart == "true") {
          G.tutorialPage = 1;
          WG.Scene.data.title.howtoPlay.texture = 'tutorial_1.png';
          WG.Scene.data.title.howtoPlayBG.visible = true;

          G.firstStart = false;
          localStorage.setItem('firstStart', G.firstStart);
        }
      });

      this.coinSprite = new WG.Sprite('game_coin.png', {
        x: this.bg.width * 0.16,
        y: -this.bg.height * 0.455,
        scale: 1,
        attach: this.bg,
      });


      this.coinText = new WG.Text(G.coin, {
        x: 25,
        y: 1,
        fontSize: 30,
        fill: '#924d4d',
        fontFamily: 'nanumBold',
        attach: this.coinSprite,
      });


      this.titleText = new WG.Sprite('main_title.png', {
        x: 0,
        y: -this.bg.height * 0.15,
        scale: 1,
        layer: "background",
        attach: this.bg,

      });

      this.stageMode = new WG.Sprite('main_score_bt.png', {
        x: 0,
        y: this.bg.height * 0.15,
        scale: 1,
        layer: "background",
        attach: this.bg,
        visible: false,
      });
      this.stageMode.on('pointertap', function () {
        G.gameMode = "stage";
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        WG.Scene.change("Ingame");

      });
      this.stageModeText = new WG.Text('단계별 풀이', {
        x: 0,
        y: -5,
        fontSize: 45,
        fill: "white",
        fontFamily: 'nanumBold',
        attach: this.stageMode
      });
      // this.stageModeText.x = this.stageMode.getGlobalPosition().x;
      // this.stageModeText.y = this.stageMode.getGlobalPosition().y -5;


      this.stageMode.on('pointerupoutside', function () {
        WG.Scene.data.title.stageModeText.alpha = 1;
        WG.Scene.data.title.stageMode.texture = "main_score_bt.png";
      });
      this.stageMode.on('pointerdown', function () {
        WG.Scene.data.title.stageModeText.alpha = 0.5;
        WG.Scene.data.title.stageMode.texture = "main_score_bt_click.png";
      });

      this.speedMode = new WG.Sprite('main_time_bt.png', {
        x: 0,
        y: this.bg.height * 0.25,
        scale: 1,
        layer: "background",
        attach: this.bg,
        visible: false,
      });
      this.speedMode.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        G.gameMode = "time";
        G.timeStage = 1;
        WG.Sound.bgmStop();
        WG.Scene.change("Ingame");
      });

      this.speedModeText = new WG.Text('빠른 풀이', {
        x: 0,
        y: -5,
        fontSize: 45,
        fill: "white",
        fontFamily: 'nanumBold',
        attach: this.speedMode
      });
      this.speedMode.on('pointerupoutside', function () {
        WG.Scene.data.title.speedModeText.alpha = 1;
        WG.Scene.data.title.speedMode.texture = "main_time_bt.png";
      });
      this.speedMode.on('pointerdown', function () {
        WG.Scene.data.title.speedModeText.alpha = 0.5;
        WG.Scene.data.title.speedMode.texture = "main_time_bt_click.png";
      });



      this.wordNote = new WG.Sprite('main_exit_bt.png', {
        x: 0,
        y: this.bg.height * 0.35,
        scale: 1,
        layer: "background",
        attach: this.bg,
        visible: false,
      });

      this.wordNote.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        WG.Sound.bgmStop();
        WG.Scene.change("wordNote");
      });

      this.wordNoteText = new WG.Text('단어장', {
        x: 0,
        y: -5,
        fontSize: 45,
        fill: "white",
        fontFamily: 'nanumBold',
        attach: this.wordNote
      });
      this.wordNote.on('pointerupoutside', function () {
        WG.Scene.data.title.wordNoteText.alpha = 1;
        WG.Scene.data.title.wordNote.texture = "main_exit_bt.png";
      });
      this.wordNote.on('pointerdown', function () {
        WG.Scene.data.title.wordNoteText.alpha = 0.5;
        WG.Scene.data.title.wordNote.texture = "main_exit_bt_click.png";
      });

      this.optionButton = new WG.Sprite('game_button_option.png', {
        x: this.bg.width * 0.435,
        y: -this.bg.height * 0.455,
        scale: 1,
        layer: "background",
        attach: this.bg,
        // share: {
        //   keyName:"coinText",

        // }
      });
      this.optionButton.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        G.isOption = G.isOption == true ? false : true;
      });
      this.optionButton.on(['pointerup', 'pointerupoutside'], function () {
        WG.Scene.data.title.optionButton.texture = "game_button_option.png";

      })
      this.optionButton.on('pointerdown', function () {
        WG.Scene.data.title.optionButton.texture = "game_button_option_click.png";
      });

      var option = UI_option.bind(this);
      option();

      WG.Sound.bgmPlay(G.gameSetting.bgm1 == true ? 'treehouse_lobby' : 'countryside_lobby');

      
      var main = document.getElementById("main");
      if (main !== null) {
        document.body.removeChild(main); //.remove();
        //최초 실행 광고
        RG.admob.interstitialShow();
      }


      this.touchToStart = new WG.Text('터치하면 시작합니다.', {
        x: 0,
        y: this.bg.height * 0.3,
        fontSize: 36,
        fill: "white",
        fontFamily: 'nanumBold',
        attach: this.bg
      });


      this.howtoPlayBG = new WG.Sprite('tutorial_5.png', {
        x: WG.Screen.width / 2,
        y: WG.Screen.height / 2,
        scale: 1,
        isTilling: true,
        width: WG.Screen.width,
        height: WG.Screen.height,
        visible: false,
      });

      this.howtoPlay = new WG.Sprite('tutorial_1.png', {
        x: 0,
        y: 0,
        scale: 1,
        isTilling: true,
        attach: this.howtoPlayBG,
      });

      this.howtoPlayClose = new WG.Sprite('tuto_exit_button.png', {
        x: WG.Screen.width * 0.42,
        y: -WG.Screen.height * 0.451,
        scale: 1,
        isTilling: true,
        attach: this.howtoPlayBG,
      });

      this.howtoPlayClose.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        WG.Scene.data.title.howtoPlayBG.visible = false;
      });



      this.howtoPlay.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        if (G.tutorialPage < 4) {
          G.tutorialPage++;
          WG.Scene.data.title.howtoPlay.texture = 'tutorial_' + G.tutorialPage + '.png';
        } else if (G.tutorialPage == 4) {
          G.tutorialPage = 1;
          WG.Scene.data.title.howtoPlayBG.visible = false;
        }

      });

      this.howtoPlayBtn = new WG.Sprite('game_button_tutorial.png', {
        x: this.bg.width * 0.34,
        y: -this.bg.height * 0.455,
        scale: 1,
        attach: this.bg,
      });

      this.howtoPlayBtn.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        G.tutorialPage = 1;
        WG.Scene.data.title.howtoPlay.texture = 'tutorial_1.png';
        WG.Scene.data.title.howtoPlayBG.visible = true;
      });
      this.howtoPlayBtn.on(['pointerup', 'pointerupoutside'], function () {
        WG.Scene.data.title.howtoPlayBtn.texture = "game_button_tutorial.png";

      })
      this.howtoPlayBtn.on('pointerdown', function () {
        WG.Scene.data.title.howtoPlayBtn.texture = "game_button_tutorial_click.png";
      });




      var langTextTitle = {
        cn: {
          touchToStart: '触摸就开始了。',
          stageModeText: '步进模式',
          speedModeText: '快速模式',
        },
        ko: {
          touchToStart: '터치하면 시작합니다.',
          stageModeText: '단계별 풀이',
          speedModeText: '빠른 풀이',
        }
      };

      WG.Scene.data.title.touchToStart.text = langTextTitle[G.lang].touchToStart;
      WG.Scene.data.title.stageModeText.text = langTextTitle[G.lang].stageModeText;
      WG.Scene.data.title.speedModeText.text = langTextTitle[G.lang].speedModeText;


    },


    "update": function () {
      optionUpdate(WG.Scene.data.title.optionBoard, G.isOption);
      if (!this.isTouch) {
        alphaChange(WG.Scene.data.title.touchToStart);

      }
      // console.log(WG.Object.animateList)

    },
    "destroy": function () {},
  }
);

function alphaChange(text) {

  if (text.alpha == 0) {
    WG.effect.animate(text, {
      duration: 1000,
      alpha: 1,
      callback: function () {
        G.animateObjNumber += 1;
      }
    });
  } else if (text.alpha == 1) {
    WG.effect.animate(text, {
      duration: 1000,
      alpha: 0,
      callback: function () {
        G.animateObjNumber += 1;
      }
    });
  }
}




this.fontSizeChange = function () {

  G.textSize = G.textSize == 26 ? 38 : 26;
  localStorage.setItem('textSize', parseInt(G.textSize));


  if (G.textSize == 26) {
    WG.Scene.data[WG.Scene.currentName].textSizeOn.visible = false
    WG.Scene.data[WG.Scene.currentName].textSizeOff.visible = true;
  } else {
    WG.Scene.data[WG.Scene.currentName].textSizeOn.visible = true;
    WG.Scene.data[WG.Scene.currentName].textSizeOff.visible = false;
  }

  if (G.noteWord.foundWord.length === 0 && WG.Scene.currentName == "wordNote") {
    return;
  }
  if (WG.Scene.currentName != "title") {
    WG.Scene.data[WG.Scene.currentName].meaningText.style.fontSize = G.textSize;
    WG.Scene.data[WG.Scene.currentName].scrollText._height = WG.Scene.data[WG.Scene.currentName].meaningText.height;
    if (WG.Scene.data[WG.Scene.currentName].quiz_mean_box.height < WG.Scene.data[WG.Scene.currentName].meaningText.height) {
      G.canDrag = true;
    } else {
      WG.Scene.data[WG.Scene.currentName].meaningText.y = -WG.Scene.data[WG.Scene.currentName].meaningText.height / 2;
      G.canDrag = false;
    }

  }


}