function word() {

  this.boxArr = [];
  this.answerBoxArr = [];
  this.wordAnswerTextIndex = [];
  this.hintWordArr = [];
  this.popBox = [];
  this.canHint = true;
  this.stageClearPick = true;

  this.wordXY = function (value, answerWord) {
    // var gameWordArr;
    // var answerIndex = [];
    // var ableIndex = [];
    // var boxLength = Math.pow(value, 2);
    // var rx = Math.floor((Math.random() * value));
    // var ry = Math.floor((Math.random() * value));
    // ableIndex.push({
    //   x: rx,
    //   y: ry
    // })
    // var stickCheck = [];
    // var isStick = false;

    // for (var i = 1; i < answerWord.length; i++) {
    //   rx = ableIndex[i - 1].x == 0 ? ableIndex[i - 1].x + Math.floor((Math.random() * 2)) : ableIndex[i - 1].x == value - 1 ? ableIndex[i - 1].x + Math.floor((Math.random() * 2) - 1) : ableIndex[i - 1].x + Math.floor((Math.random() * 3) - 1);
    //   ry = ableIndex[i - 1].y == 0 ? ableIndex[i - 1].y + Math.floor((Math.random() * 2)) : ableIndex[i - 1].y == value - 1 ? ableIndex[i - 1].y + Math.floor((Math.random() * 2) - 1) : ableIndex[i - 1].y + Math.floor((Math.random() * 3) - 1);
    //   if (i != 0) {
    //     if (!this.isAble(ableIndex, rx, ry)) {
    //       --i;
    //       continue;
    //     }
    //     if (i > 1) {
    //       if (stickCheck[i - 2].x == ableIndex[i - 1].x - rx && stickCheck[i - 2].y == ableIndex[i - 1].y - ry) {
    //         --i;
    //         continue;
    //       }

    //     }
    //   }
    //   ableIndex.push({
    //     x: rx,
    //     y: ry
    //   });
    //   stickCheck.push({
    //     x: ableIndex[i - 1].x - rx,
    //     y: ableIndex[i - 1].y - ry
    //   });

    // }
    // var boxWordArr = Array(Math.pow(value, 2))
    // for (var i = 0; i < ableIndex.length; i++) {
    //   boxWordArr[ableIndex[i].x + ableIndex[i].y * value] = answerWord[i];
    // }
    // for (var i = 0; i < boxWordArr.length; i++) {
    //   if (boxWordArr[i] == undefined) {
    // var radnWord = Object.keys(G.words)[Math.floor((Math.random() * G.wordsLength))];

    // radnWord = radnWord[Math.floor((Math.random() * radnWord.length))];


    // boxWordArr[i] = radnWord;
    //   }
    // }

    var boxWordArr = [];

    for (var i = 0; i < answerWord.length; i++) {
      boxWordArr[i] = answerWord[i];
    }
    for (var i = answerWord.length; i < Math.pow(value, 2); i++) {
      var radnWord = Object.keys(G.words)[Math.floor((Math.random() * G.wordsLength))];
      radnWord = radnWord[Math.floor((Math.random() * radnWord.length))];
      boxWordArr[i] = radnWord;
    }
    var temp;
    for (var i = boxWordArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      // [boxWordArr[i], boxWordArr[j]] = [boxWordArr[j], boxWordArr[i]];
      temp = boxWordArr[i]; 
      boxWordArr[i] = boxWordArr[j]; 
      boxWordArr[j] = temp; 
    }
    return boxWordArr;
  }

  this.isAble = function (arr, rx, ry) {
    var r = true;
    for (var i = 0; i < arr.length; i++) {
      if (JSON.stringify(arr[i]) === JSON.stringify({
          x: rx,
          y: ry
        })) {
        r = false;
        return r;
      }
    }
    return r;
  }

  this.make4word = function (value, wordLength, sceneData) {
    var gameWordArr;
    var answerIndex = [];
    var boxLength = Math.pow(value, 2);
    if(sceneData == undefined){ 
      sceneData = {ans : null};
    }
    if (G.gameWordArr != 0 && G.gameMode == "stage") {
      value = G.gameWordArr.value;
      gameWordArr = G.gameWordArr.gameWord;
      sceneData.ans = G.gameWordArr.answerWord;
    } else {
      if (wordLength === 2) {
        sceneData.ans = G.words2Length[Math.floor((Math.random() * G.words2Length.length))]
      } else if (wordLength === 3) {
        sceneData.ans = G.words3Length[Math.floor((Math.random() * G.words3Length.length))]
      } else if (wordLength === 4) {
        sceneData.ans = G.words4Length[Math.floor((Math.random() * G.words4Length.length))]
      }
      gameWordArr = G.word.wordXY(value, sceneData.ans);
    }

    WG.Scene.data.Ingame.meaningText.text = G.words[sceneData.ans];

    WG.Scene.data.Ingame.scrollText._height = WG.Scene.data.Ingame.meaningText.height;
    if (WG.Scene.data.Ingame.quiz_mean_box.height < WG.Scene.data.Ingame.meaningText.height) {
      G.canDrag = true;
    } else {
      WG.Scene.data.Ingame.meaningText.y = -WG.Scene.data.Ingame.meaningText.height / 2;
      G.canDrag = false;
    }



    WG.Scene.data.Ingame.quiz_mean_box.visible = true;

    for (var i = 0; i < value; i++) {
      for (var j = 0; j < value; j++) {


        var box = new WG.Sprite('game_nonclick.png', {
          x: WG.Screen.width / 2,
          y: WG.Screen.height * 0.58 - (value == 3 ? 28 : value == 4 ? 14 : 14),
          scale: (value == 3 ? 1 : value == 4 ? 0.84 : 0.65),
        });
        box.x += (i * (box.width + (value == 3 ? 14 : value == 4 ? -22 : -53))) - (((box.width / 2)) * (value - 1)) - (value == 3 ? 14 : value == 4 ? -32 : -104);

        box.y += (j * (box.height + (value == 3 ? 14 : value == 4 ? -22 : -53))) - (((box.height / 2)) * (value - 1)) - (value == 3 ? 14 : value == 4 ? -22 : -95);

        addPickEvent(box, sceneData)
        this.boxArr.push(box);


        var boxWord = new WG.Text(gameWordArr[(i * value) + j], {
          x: 0,
          y: 0,
          fontSize: 100,
          attach: box,
          fill: "black",
          fontFamily: 'nanumBold',
        });
        
        boxWord.index = {};
        boxWord.index.x = j;
        boxWord.index.y = i;
        boxWord.index.i = (i * value) + j;
        this.boxArr.push(boxWord);
        
      }
    }
    if (G.gameMode == "stage") {
      localStorage.setItem('gameWordArr_' + G.lang, JSON.stringify({
        gameWord: gameWordArr,
        answerWord: sceneData.ans,
        value: value
      }));
    }

    for (var i = 0; i < sceneData.ans.length; i++) {
      var box = new WG.Sprite('game_blank_' + G.gameMode + '.png', {
        x: WG.Screen.width / 2,
        y: WG.Screen.height * 0.165,
        scale: 1,
      });
      box.x += (i * (box.width + 4)) - ((box.width / 2 - 2) * (sceneData.ans.length - 1));
      this.answerBoxArr.push(box);
      var boxWord = new WG.Text('', {
        x: 0,
        y: 0,
        fontSize: 42,
        attach: box,
        fill: "white",
        fontFamily: 'nanumBold',
      });
      this.answerBoxArr.push(boxWord);
    }

    WG.Scene.data.Ingame.kakaoLink.visible = false;
    WG.Scene.data.Ingame.nextStage.visible = false;
    G.canPick = true;
    G.word.stageClearPick = true;
    G.word.canHint = true;
  }

  this.isCorrect = function (answer, correct) {
    answer = answer.replace(/ /gi, "");

    if (answer == correct) {
      return true;
    }

    return false;
  }

  this.stageClear = function (boxArrIndex, answerSprite, answer, sceneData) {
    if (G.gameMode == "stage") {
      G.word.stageClearPick = false;
      WG.Scene.data.Ingame.hintBox.visible = false;
      WG.Scene.data.Ingame.adHint.visible = false;
      WG.Scene.data.Ingame.adHintBar.visible = false;
      WG.Scene.data.Ingame.adHintTimeText.visible = false;
      for (var i = 1; i < G.word.boxArr.length; i += 2) {
        if (boxArrIndex.indexOf(i) == -1) {
          // G.word.boxArr[i].destroy();
          var popBox = new WG.AnimationSprite('game_pop(stage).png', {
            sizeX: 173,
            sizeY: 173,
            x: G.word.boxArr[i - 1].x,
            y: G.word.boxArr[i - 1].y,
            speed: 300,
            loop: false,
            // callback: i == 1 ? function(){
            //   for (var i = 0; i < answerSprite.length; i++) {

            //     G.animateSkip = true;
            //     G.isAnimate = true;
            //       WG.effect.animate(answerSprite[i], {
            //         duration: 450,
            //         scaleX: 1,
            //         scaleY: 1,
            //         x: WG.Screen.width / 2 + (i * answerSprite[i].width) - ((answerSprite[i].width / 2) * (answerSprite.length - 1)),
            //         y: WG.Screen.height / 2 - 28,
            //         callback: i == 0 ?  function() {
            //           G.animateSkip = false;
            //           G.animateObjNumber+=answerSprite.length;

            //           WG.Scene.data.Ingame.stageText.text = '단계 ' + G.stage;
            //           WG.Scene.data.Ingame.answerText.text = G.words[answer];
            //         } : function() {}
            //       });


            //   }
            // } : function(){}
          });
          G.word.popBox.push(popBox);
          G.word.boxArr[i - 1].destroy();

        } else {
          G.word.boxArr[i - 1].alpha = 1;
        }
      }
      setTimeout(function() {

        for (var i = 0; i < answerSprite.length; i++) {

          G.animateSkip = true;
          G.isAnimate = true;
          WG.effect.animate(answerSprite[i], {
            duration: 450,
            scaleX: 1,
            scaleY: 1,
            x: WG.Screen.width / 2 + (i * answerSprite[i].width) - ((answerSprite[i].width / 2) * (answerSprite.length - 1)),
            y: WG.Screen.height * 0.35,
            callback: i == 0 ? function () {
              G.animateSkip = false;
              G.animateObjNumber += answerSprite.length;


              WG.Scene.data.Ingame.answerText.text = G.words[answer];
              WG.Scene.data.Ingame.kakaoLink.visible = true;
              WG.Scene.data.Ingame.kakaoLink.y = WG.Screen.height * 0.6 + WG.Scene.data.Ingame.answerText.height;
              WG.Scene.data.Ingame.nextStage.visible = true;
              WG.Scene.data.Ingame.nextStage.y = WG.Scene.data.Ingame.kakaoLink.y + 100;
            } : function () {}
          });


        }
      }, 300);


      for (var i = 0; i < G.word.answerBoxArr.length; i += 2) {
        G.word.answerBoxArr[i].destroy();
      }
      G.word.boxArr = [];
      G.word.answerBoxArr = [];
      G.word.hintWordArr = [];
      G.animateSkipSprite = answerSprite;

    } else {

      for (var i = 1; i < G.word.boxArr.length; i += 2) {
        if (boxArrIndex.indexOf(i) == -1) {
          var popBox = new WG.AnimationSprite('game_pop(time).png', {
            sizeX: 173,
            sizeY: 173,
            x: G.word.boxArr[i - 1].x,
            y: G.word.boxArr[i - 1].y,
            speed: 300,
            loop: false
          });
          G.word.popBox.push(popBox);
          G.word.boxArr[i - 1].destroy();

        } else {
          G.word.boxArr[i - 1].alpha = 1;
        }
      }


      setTimeout(function() {
        for (var i = 1; i < G.word.boxArr.length; i += 2) {
          G.word.boxArr[i - 1].destroy();
        }


        for (var i = 0; i < G.word.answerBoxArr.length; i += 2) {
          G.word.answerBoxArr[i].destroy();
        }
        G.word.boxArr = [];
        G.word.answerBoxArr = [];
        G.word.hintWordArr = [];
        G.word.stageModeStart(sceneData);
      }, 300);



    }


    if (G.gameMode == "stage") {
      // WG.Scene.data.Ingame.stageText.text = '단계 ' + G.stage;
      // WG.Scene.data.Ingame.answerText.text = G.words[answer];

    } else {
      // G.word.stageModeStart();
    }
  }

  this.stageModeStart = function (sceneData) {
    G.animateSkip = false;
    if (G.gameMode == "stage") {

      if (G.stage >= 1 && G.stage <= 10) {
        G.word.make4word(3, 2, sceneData);
      } else if (G.stage >= 11 && G.stage <= 50) {
        G.word.make4word(3, Math.floor((Math.random() * 2) + 2), sceneData);
      } else if (G.stage >= 51 && G.stage <= 100) {
        G.word.make4word(Math.floor((Math.random() * 2) + 3), 3, sceneData);
      } else if (G.stage >= 101 && G.stage <= 150) {
        G.word.make4word(4, Math.floor((Math.random() * 2) + 3), sceneData);
      } else if (G.stage >= 151 && G.stage <= 200) {
        G.word.make4word(4, 4, sceneData);
      } else if (G.stage >= 201) {
        G.word.make4word(5, Math.floor((Math.random() * 2) + 3), sceneData);
      }
    } else if (G.gameMode == "time") {
      if (G.timeStage > 10) {
        G.speedModeClear = true;
        if (parseFloat(G.bestTime) > parseFloat(G.speedModeTime) || G.bestTime == 0) {
          localStorage.setItem('bestTime', parseFloat(G.speedModeTime));
          G.bestTime = G.speedModeTime;
          WG.Sound.sfxPlay('best' + Math.floor((Math.random() * 2) + 1), false);
          G.word.timeModeClear(true);
          return;
        }
        G.word.timeModeClear(false);
        return;
      }
      G.word.make4word(3, Math.floor((Math.random() * 2) + 2), sceneData);
      // G.word.make4word(5, Math.floor((Math.random() * 2) + 2));
    }



  }

  this.hintFunction = function (sd) {
    if (G.coin >= 10 && !h5Api.data.isRank) {
      if (sd.ans.length > G.word.hintWordArr.length) {
        WG.Sound.sfxPlay('hint' + Math.floor((Math.random() * 3) + 1), false);
        G.word.hintWordArr[G.word.hintWordArr.length] = sd.ans[G.word.hintWordArr.length];
        G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2 + 1].text = G.word.hintWordArr[G.word.hintWordArr.length - 1];
        G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2].texture = 'game_answer(' + G.gameMode + ').png';
        G.coin -= 10;
        G.hintLength++;
        if (WG.Scene.data.Ingame.hintBox != undefined) {
          WG.Scene.data.Ingame.hintBox.texture = G.coin >= 10 ? 'game_help_unlock.png' : 'game_help_lock.png';
          WG.Scene.data.Ingame.hintText.text = G.coin >= 10 ? (Math.floor(G.coin / 10) >= 10 ? '9+' : Math.floor(G.coin / 10).toString()) : '';
        }
        WG.Scene.data.Ingame.coinText.text = G.coin;
        localStorage.setItem('wordCoin', parseInt(G.coin));
      }
    }
  }

  this.skipAnimate = function (value, answer) {
    if (G.animateSkip) {
      G.animateSkip = false;

      var i = 0;
      for (var key in WG.Object.animateList) {
        var destination = {
          x: WG.Object.animateList[key].init_x,
          y: WG.Object.animateList[key].init_y,
          scaleX: WG.Object.animateList[key].init_scaleX,
          scaleY: WG.Object.animateList[key].init_scaleY,
          callback: WG.Object.animateList[key].callback
        };

        WG.Object.animateList[key]._state = "stop";
        G.animateSkipSprite[i].x = destination.x;
        G.animateSkipSprite[i].y = destination.y;
        G.animateSkipSprite[i].scale = destination.scaleX;
        i++;
      }


      G.animateObjNumber += value;
      WG.Scene.data.Ingame.answerText.text = G.words[answer];
      WG.Scene.data.Ingame.kakaoLink.visible = true;
      WG.Scene.data.Ingame.kakaoLink.y = WG.Screen.height * 0.6 + WG.Scene.data.Ingame.answerText.height;
      WG.Scene.data.Ingame.nextStage.visible = true;
      WG.Scene.data.Ingame.nextStage.y = WG.Scene.data.Ingame.kakaoLink.y + 100;


    }
  }

  this.skipNextStage = function (sd) {
    // zxc.v = "12";
    if (G.isAnimate && !G.animateSkip) {
      for (var i = 0; i < G.animateSkipSprite.length; i++) {
        G.animateSkipSprite[i].destroy();
      }
      WG.Scene.data.Ingame.answerText.text = '';
      G.isAnimate = false;
      WG.Scene.data.Ingame.hintBox.visible = true;
      WG.Scene.data.Ingame.adHint.visible = true;
      WG.Scene.data.Ingame.adHintBar.visible = true;
      WG.Scene.data.Ingame.adHintTimeText.visible = true;

      G.isAdplaying = undefined;
      WG.Scene.data.Ingame.stageText.text = '단계 ' + G.stage;
      if ((G.stage - 1) % 5 == 0) {
        //   if ((G.stage - 1) % 5 == 0 && G.tickTime + 100000 - G.adTime < Date.now())
        // G.adRun(function () {
        //   G.word.stageModeStart();
        // });
        RG.admob.interstitialShow(function() {
          G.word.stageModeStart(sd);
        });
      } else {
        G.word.stageModeStart(sd);
      }
    }
  }
  this.timeModeClear = function (isBest) {
    WG.Scene.data.Ingame.timeStageNumber.destroy();
    WG.Scene.data.Ingame.timeText.text = G.speedModeTime;
    WG.effect.animate(WG.Scene.data.Ingame.timeText, {
      duration: 300,
      x: WG.Screen.width / 2,
      y: WG.Screen.height * 0.445,
      scaleX: 1.8,
      scaleY: 1.8,
      callback: function () {
        G.word.timeModeClearSprite(isBest)
      }
    });
    console.assert("true",G.speedModeTime);
    WG.Scene.data.Ingame.hintBox.destroy();
    WG.Scene.data.Ingame.adHint.visible = false;
    WG.Scene.data.Ingame.adHintBar.visible = false;
    WG.Scene.data.Ingame.adHintTimeText.visible = false;
  }

  this.timeModeClearSprite = function (isBest) {
    WG.Scene.data.Ingame.timeText.style.fill = '#772cce';
    WG.Scene.data.Ingame.timeStageBoard.destroy();

    if (isBest) {
      this.new_record = new WG.Sprite('new_record.png', {
        x: WG.Screen.width * 0.35,
        y: WG.Screen.height * 0.333,

      });
    }

    this.thisTimeText = new WG.Text('현재 기록', {
      x: WG.Screen.width / 2,
      y: WG.Screen.height * 0.38,
      fontSize: 45,
      fontFamily: 'nanumBold',
    });
    this.bestTimeSprite = new WG.Sprite('best_record_bar.png', {
      x: WG.Screen.width / 2,
      y: WG.Screen.height * 0.513,

    });

    WG.Scene.data.Ingame.kakaoLink.visible = true;
    WG.Scene.data.Ingame.kakaoLink.y = WG.Screen.height * 0.715;



    this.bestText = new WG.Text('최고 기록', {
      x: this.bestTimeSprite.width * -0.18,
      y: 0,
      fontSize: 28,

      fontFamily: 'nanumBold',
      attach: this.bestTimeSprite
    });


    this.bestTimeText = new WG.Text(G.bestTime + '초', {
      x: this.bestTimeSprite.width * 0.25,
      y: 0,
      fontSize: 28,
      fill: isBest == true ? '#be2211' : '#666666',
      fontFamily: 'nanumBold',
      attach: this.bestTimeSprite
    });


    this.toHome = new WG.Sprite('restart_button.png', {
      x: WG.Screen.width / 2,
      y: WG.Screen.height * 0.625,
    });

    this.toHome.on('pointertap', function (e) {
      // if (G.tickTime + 100000 - G.adTime < Date.now()) {
      //   // G.adRun(function () {
      //   //   G.adTime = Date.now();
      //   //   WG.Scene.change("title");
      //   // });
      if(h5Api.data.isRank){
        G.adTime = Date.now();
        WG.Scene.change("title");
      }
      RG.admob.interstitialShow(function() {
        G.adTime = Date.now();
        WG.Scene.change("title");
      });
    });

    this.toHomeText = new WG.Text('돌아가기', {
      x: 0,
      y: 0,
      fontSize: 35,
      fill: 'white',
      fontFamily: 'nanumBold',
      attach: this.toHome
    });

    this.toHome.on('pointerupoutside', function () {
      G.word.toHomeText.alpha = 1;
      G.word.toHome.texture = "restart_button.png";
    });
    this.toHome.on('pointerdown', function () {
      G.word.toHomeText.alpha = 0.5;
      G.word.toHome.texture = "restart_button_click.png";
    });
  }







}


function addPickEvent(sprite ,sceneData) {

  sprite.on(["pointerup"], function (e) {
    

    G.canPick = true;
    if (sprite.alpha == 0.5){
        if (G.userWordAnswerText.length === sceneData.ans.length) {

          if(G.pickSprite == sprite.children[Object.keys(sprite.children)[0]].index.i){
      
         
          if (G.word.isCorrect(G.userWordAnswerText, sceneData.ans)) {
            G.word.canHint = false;
            WG.Sound.sfxPlay('correct' + Math.floor((Math.random() * 6) + 1), false);

            G.hintLength = 0;
            if (G.noteWord.foundWord.indexOf(sceneData.ans) == -1) {
              G.noteWord.foundWord.push(sceneData.ans);
              localStorage.setItem('noteWord' + G.lang, JSON.stringify(G.noteWord));
            }

            var wordAnswerText = G.userWordAnswerText.replace(/ /gi, "");
            G.wordAnswerText = wordAnswerText;
            for (var i = 0; i < sceneData.ans.length; i++) {
              G.word.answerBoxArr[i * 2 + 1].text = wordAnswerText[i];
            }
            if (G.gameMode == "time") {
              G.timeStage++;
              if (G.timeStage <= 10) {
                WG.Scene.data.Ingame.timeStageNumber.text = G.timeStage + '/10';
              }

            } else if (G.gameMode == "stage") {
              G.stage++;
              localStorage.setItem('wordStage', parseInt(G.stage));
            }

            G.coin++;
            if (WG.Scene.data.Ingame.hintBox != undefined) {
              if(!h5Api.data.isRank){
                WG.Scene.data.Ingame.hintBox.texture = G.coin >= 10 ? 'game_help_unlock.png' : 'game_help_lock.png';
                WG.Scene.data.Ingame.hintText.text = G.coin >= 10 ? (Math.floor(G.coin / 10) >= 10 ? '9+' : Math.floor(G.coin / 10).toString()) : '';
              } else {
                 WG.Scene.data.Ingame.hintBox.texture = 'game_help_lock.png';
                 WG.Scene.data.Ingame.hintText.text = '';
              }
           
            }
            localStorage.setItem('wordCoin', parseInt(G.coin));
            WG.Scene.data.Ingame.coinText.text = G.coin;
            G.gameWordArr = 0;
            localStorage.setItem('gameWordArr_'+G.lang, 0);
            WG.Scene.data.Ingame.meaningText.text = '';
            WG.Scene.data.Ingame.quiz_mean_box.visible = false;
   
            G.word.stageClear(G.boxArrIndex, G.boxArrSprite, wordAnswerText, sceneData);
            
          } else if (G.userWordAnswerText.length > 0 && !G.word.isCorrect(G.userWordAnswerText, sceneData.ans)) {
            WG.Sound.sfxPlay('wrong' + Math.floor((Math.random() * 3) + 1), false);
            if (/Android/i.test(navigator.userAgent) && G.isVibTab) {
              window.navigator.vibrate(200);
            }
            if (G.word.boxArr.length != 0) {
              // for (var i = 0; i < G.word.wordAnswerTextIndex.length; i++) {
              //   G.word.boxArr[G.word.wordAnswerTextIndex[i] - 1].alpha = 1;
              // }
              for(var i = 0; i <  G.word.boxArr.length; i+=2){
                G.word.boxArr[i].alpha = 1;
              }
            }
          } else {
            if (G.word.boxArr.length != 0) {
              // for (var i = 0; i < G.word.wordAnswerTextIndex.length; i++) {
              //   G.word.boxArr[G.word.wordAnswerTextIndex[i] - 1].alpha = 1;
              // }
              for(var i = 0; i <  G.word.boxArr.length; i+=2){
                G.word.boxArr[i].alpha = 1;
              }
            }

          }
          G.boxArrIndex = [];
          G.boxArrSprite = [];
          G.userWordAnswerText = "";
          if (G.word.answerBoxArr.length != 0) {
            for (var i = 0; i < sceneData.ans.length; i++) {
              if (G.hintLength - 1 < i) {
                G.word.answerBoxArr[i + i + 1].text = "";
              }

            }
          }
          G.word.wordAnswerTextIndex = [];
        }
        else{
          //누른 스프라이트가 다를 때
          G.word.wordAnswerTextIndex.splice(G.word.wordAnswerTextIndex.length - 1 ,1);
          G.boxArrIndex.splice(G.boxArrIndex.length - 1 ,1);
          G.boxArrSprite.splice(G.boxArrSprite.length - 1 ,1);
          if (G.hintLength < G.userWordAnswerText.length) {
            G.word.answerBoxArr[G.userWordAnswerText.length-1 + G.userWordAnswerText.length].text = "";
          }
          sprite.alpha = 1;
      
          G.userWordAnswerText = G.userWordAnswerText.replace(G.userWordAnswerText[G.userWordAnswerText.length-1],"");
          
        }

        }
      
    }
   
    
  });
  sprite.on("pointerdown", function (e) {
    if (sprite.alpha == 1 && G.canPick == true && G.word.stageClearPick == true) {
      G.canPick = false;
      sprite.alpha = 0.5;
      G.pickSprite = sprite.children[Object.keys(sprite.children)[0]].index.i;

      WG.Sound.sfxPlay('move' + Math.floor((Math.random() * 4) + 1), false);
      G.word.wordAnswerTextIndex.push(sprite.children[Object.keys(sprite.children)[0]].index.i * 2 + 1);
      G.boxArrIndex.push(sprite.children[Object.keys(sprite.children)[0]].index.i * 2 + 1);
      G.boxArrSprite.push(G.word.boxArr[sprite.children[Object.keys(sprite.children)[0]].index.i * 2 + 1 - 1]);

      G.userWordAnswerText += sprite.children[Object.keys(sprite.children)[0]].text;
      if (G.hintLength < G.userWordAnswerText.length) {
        G.word.answerBoxArr[G.userWordAnswerText.length + G.userWordAnswerText.length - 1].text = sprite.children[Object.keys(sprite.children)[0]].text;
      }
    }


  });

  sprite.on(["pointerupoutside"], function (e) {
    G.canPick = true;
    G.word.wordAnswerTextIndex.splice(G.word.wordAnswerTextIndex.length - 1 ,1);
    G.boxArrIndex.splice(G.boxArrIndex.length - 1 ,1);
    G.boxArrSprite.splice(G.boxArrSprite.length - 1 ,1);
    if (G.hintLength < G.userWordAnswerText.length) {
      G.word.answerBoxArr[G.userWordAnswerText.length-1 + G.userWordAnswerText.length].text = "";
    }
    sprite.alpha = 1;

    G.userWordAnswerText = G.userWordAnswerText.replace(G.userWordAnswerText[G.userWordAnswerText.length-1],"");
    
  });

}