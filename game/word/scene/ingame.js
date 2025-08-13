WG.Scene.regist(
  function Ingame() {
    this.defaultScene = false;

  }, {
    "init": function () {
    
      G.wordsLength = Object.keys(G.words).length -1;
      G.words2Length =[];
      G.words3Length =[];
      G.words4Length =[];
      G.boxArrIndex = [];
      G.boxArrSprite = [];
      G.animateSkip = false;
      G.isAnimate = false; 
      G.animateSkipSprite;
      G.userWordAnswerText='';
      G.hintLength = 0;
      G.meanDrag = false;
      G.canPick = true;
      var sceneData = {ans : null};

      this.pick = [];
      // G.isOption = false;
      // G.isSoundTab = true;
      // G.isVibTab = true;
      G.word = new word();
      

      if (G.gameMode == "stage") {
        WG.Sound.bgmPlay(G.gameSetting.bgm1 == true ? 'treehouse_game' : 'countryside_game');
      } else if (G.gameMode == "time") {
        WG.Sound.bgmPlay("quick");
      }

      if(G.gameMode == "time"){
        G.speedModeClear = false;
        G.gameTime = Date.now();
      }

      for(var key in G.words){
        if(key.length == 2){
          G.words2Length.push(key);
        }
        else if(key.length == 3){
          G.words3Length.push(key);
        }
       else if(key.length == 4 && key != {}){
        G.words4Length.push(key);
        }
      }

      G.wordsKey = Object.keys(G.words)
      if(G.adTime != undefined){
        G.adTime -= G.tickTime;
      }
      else {
        G.adTime = 0;
      }
      G.tickTime = new Date().getTime();

      
      G.adRun = function(run){
        G.isAdplaying = undefined;
        G.adsense.run({
          pauseGame: function () {
            if(WG.Sound.bgm !== undefined && WG.Sound.bgm.isMute === false) {
              G.isMute = true;
              WG.Sound.muteToggle("all", false);
            }
            WG.pause = true;
            G.isAdplaying = true;
          },
          resumeGame: function () {
            if(G.isMute === true) {
              WG.Sound.muteToggle("bgm", false);
              WG.Sound.muteToggle("sfx", false);
            }
            WG.pause = false;
            G.isAdplaying = false;
            G.tickTime = new Date().getTime();
          },
          success: function () {
            run();
          },
          fail: function () {
            run();
          }
        });
        if(G.isAdplaying == undefined){
          run();
        }
        G.adTime = 0;
      }







      this.bg = new WG.Sprite('game_bg('+G.gameMode+').png',{
        x: WG.Screen.width/2,
        y: WG.Screen.height/2,
        width: "100%",
        height: "100%",
        layer:"background"
      });
      // this.wordAnswerText = new WG.Text('',{
      //   x:WG.Screen.width/2,
      //   y:WG.Screen.height/5,
      //   fontSize:50,
      //   fontFamily:'nanumBold',
      // })
      

      if(G.gameMode == "stage"){
        this.stageText = new WG.Text('단계 ' + G.stage,{
          x:WG.Screen.width*0.2,
          y:WG.Screen.height*0.039,
          fontSize:40,
          fill:"#344a91",
          fontFamily:'nanumBold',
        })
      }
      if(G.gameMode == "time"){
        this.timeTopText = new WG.Text('시 간',{
          x:WG.Screen.width/2,
          y:WG.Screen.height* 0.06,
          fontSize:30,
          fill:"#924d4d",
          fontFamily:'nanumBold',
        });
        
        this.timeText = new WG.Text('',{ 
          x:WG.Screen.width/2,
          y:WG.Screen.height* 0.1,
          fontSize:50,
          fill:"black",
          fontFamily:'nanumBold',
        });



        this.timeStageBoard = new WG.Sprite('game_count_panel.png', {
          x: WG.Screen.width * 0.1385,
          y: WG.Screen.height * 0.136,
          scale:1,

        });
        this.timeStageNumber = new WG.Text('맞춘개수', {
          x: this.timeStageBoard.width *0.105,
          y: -this.timeStageBoard.height * 0.2,
          fontSize: 22,
          attach:this.timeStageBoard,
          fill:"#543c28",
          fontFamily:'nanumBold',

        });
        this.timeStageNumber = new WG.Text('1/10', {
          x: this.timeStageBoard.width *0.105,
          y: this.timeStageBoard.height * 0.2,
          fontSize: 44,
          attach:this.timeStageBoard,
          fill:"#23170d",
          fontFamily:'nanumBold',

        });
      }





      this.optionButton = new WG.Sprite('game_button_option.png',{
        x: this.bg.width * 0.435,
        y: -this.bg.height * 0.455,
        scale: 1,
        layer:"background",
        attach:this.bg,
      });
      this.optionButton.on('pointertap',function(){
        WG.Sound.sfxPlay('button'+Math.floor((Math.random() * 4)+1),false);
        
        if(G.isOption){
          G.isOption= false;
        }
        else{
          G.isOption = true;
        }
      });
      this.optionButton.on(['pointerup','pointerupoutside'],function(){
        WG.Scene.data.Ingame.optionButton.texture = "game_button_option.png";

      })
      this.optionButton.on('pointerdown',function(){
        WG.Scene.data.Ingame.optionButton.texture = "game_button_option_click.png";
      });

      var option = UI_option.bind(this);
      option();

      this.quiz_mean_box = new WG.Sprite('quiz_mean_box.png',{
        x: 0,
        y: -this.bg.height * 0.23,
        scale: 1,
        attach:this.bg,
      });


      this.meaningText = new WG.Text('', {
        x: 0,
        y: -this.quiz_mean_box.height /2 ,
        fontSize: G.textSize,
        attach: this.quiz_mean_box,
        fill: "black",
        anchorY:0,
        fontFamily:'nanumBold',
        wordWrap: true,
        wordWrapWidth: this.quiz_mean_box.width -20,
      });
      this.slideMask = new WG.Graphics({
        attach: this.bg
      });
      this.slideMask.run("beginFill", "0xFFFFFF", 1);
      this.slideMask.run("drawRect",
        /*x*/
        -this.bg.width * 0.5,
        /*y*/
        -this.bg.height * 0.282,
        /*width*/
        800,
        /*height*/
        133
      );
      this.meaningText.pSprite.mask = this.slideMask;

      
      // this.quiz_mean_box.on('pointerdown', dragStart.bind(this.meaningText));

      // this.quiz_mean_box.on(['pointerup','pointerupoutside'], dragEnd.bind(this.meaningText));
  
      // this.quiz_mean_box.on('pointermove', dragMove.bind(this.meaningText));
      // G.minY = 0;
      // G.maxY = -0;



      this.quiz_mean_box.on('pointerdown', function(event){
        if(G.canDrag) this.scrollText.dragStart(event);
      }.bind(this));

      this.quiz_mean_box.on(['pointerup','pointerupoutside'], function(event){
        if(G.canDrag) this.scrollText.dragEnd(event);
      }.bind(this));
  
      this.quiz_mean_box.on('pointermove', function(event){
        if(G.canDrag)
        this.scrollText.dragMove(event);
      }.bind(this));

     
      this.coinSprite = new WG.Sprite('game_coin.png',{
        x: this.bg.width * 0.16,
        y: -this.bg.height * 0.455,
        scale: 1,
        attach:this.bg,
      });


      this.coinText = new WG.Text(G.coin,{
        x: 25,
        y: 1,
        fontSize: 30,
        fill: '#924d4d',
        fontFamily:'nanumBold',
        attach:this.coinSprite,
      });

      this.answerText = new WG.Text('',{
        x: 0,
        y:-65,
        fontSize: 38,
        layer:"nomal",
        // fill: '#924d4d',
        wordWrap: true,
        anchorY:0,
        fontFamily:'nanumBold',
        wordWrapWidth: this.bg.width -50,
        attach:this.bg,
      });

      // this.bg.on('pointermove', function(e){
       
      //   // WG.Scene.data.Ingame.dragStart(e);
      // });
      this.bg.on('pointerdown', function(sd, e){
        // console.log(e.data.calc)
        // WG.Scene.data.Ingame.isdrag = true;
        // WG.Scene.data.Ingame.dragStart(e);
        if(G.gameMode == "stage"){
          G.word.skipAnimate.bind(this)(sd.ans, G.wordAnswerText);
        }
      }.bind(this, sceneData))
      // .on('pointerup', function(e){
      //   // WG.Scene.data.Ingame.dragend();
      // })
      // .on('pointerupoutside', function(e){
      //   // WG.Scene.data.Ingame.dragend();
      // })
      // .on('pointerout', function(e){
      //   // WG.Scene.data.Ingame.dragend();
      // })

      this.hintBox = new WG.Sprite('game_help_lock.png', {
        x: WG.Screen.width * 0.15,
        y: WG.Screen.height * 0.898,
        scale: 1,
        layer: "nomal",
      });

      this.scrollText = new Scroll(WG.Scene.data.Ingame.meaningText, WG.Scene.data.Ingame.quiz_mean_box.height -20, WG.Scene.data.Ingame.meaningText.height);

  
      this.hintText = new WG.Text('9+', {
        x: -31,
        y: -43,
        fontSize: 21,
        attach: this.hintBox,
        fill: "white",
        fontFamily:'nanumBold',
      });
      if(!h5Api.data.isRank){
        this.hintBox.texture = G.coin>=10 ? 'game_help_unlock.png' : 'game_help_lock.png';
        this.hintText.text = G.coin>=10 ? (Math.floor(G.coin/10) >= 10 ? '9+' : Math.floor(G.coin/10).toString()) : '';
      } else {
        this.hintBox.texture = 'game_help_lock.png';
        this.hintText.text = '';
      }
      
      this.hintBox.on('pointertap', function (sd, e) {
        if(!h5Api.data.isRank){
        G.word.hintFunction.bind(this, sd)();
        WG.Scene.data.Ingame.hintBox.texture = G.coin>=10 ? 'game_help_unlock.png' : 'game_help_lock.png';
        WG.Scene.data.Ingame.hintText.text = G.coin>=10 ? (Math.floor(G.coin/10) >= 10 ? '9+' : Math.floor(G.coin/10).toString()) : '';
        } else {
          WG.Scene.data.Ingame.hintBox.texture = 'game_help_lock.png';
          WG.Scene.data.Ingame.hintText.text = '';
        }

      }.bind(this, sceneData));

      this.hintBox.on('pointerupoutside',function(){
        if(!h5Api.data.isRank){
        WG.Scene.data.Ingame.hintBox.texture = G.coin>=10 ? 'game_help_unlock.png' : 'game_help_lock.png';
        } else{
          WG.Scene.data.Ingame.hintBox.texture = 'game_help_lock.png';
        }
      });
      this.hintBox.on('pointerdown',function(){
        if(!h5Api.data.isRank){
        WG.Scene.data.Ingame.hintBox.texture = G.coin>=10 ? 'game_help_unlock_click.png' : 'game_help_lock_click.png';
        } else {
          WG.Scene.data.Ingame.hintBox.texture = 'game_help_lock_click.png';
        }
      });


      // this.dragend = function(){
      //   WG.Scene.data.Ingame.isdrag = false;

      //   if(G.word.isCorrect(G.userWordAnswerText, G.answerWord)){
      //     WG.Sound.sfxPlay('correct'+Math.floor((Math.random() * 6)+1) ,false);
      //     G.hintLength=0;
      //     if(G.noteWord.foundWord.indexOf(G.answerWord) == -1){
      //       G.noteWord.foundWord.push(G.answerWord);
      //       localStorage.setItem('noteWord'+G.lang, JSON.stringify(G.noteWord));
      //     }
          
      //     var wordAnswerText = G.userWordAnswerText.replace(/ /gi, "");
      //     G.wordAnswerText = wordAnswerText;
      //     for(var i=0;i<G.answerWord.length;i++){
      //       G.word.answerBoxArr[i*2 +1].text=wordAnswerText[i];
      //     }
      //     if(G.gameMode == "time"){
      //       G.timeStage++;
      //       if(G.timeStage <= 10){
      //         WG.Scene.data.Ingame.timeStageNumber.text=G.timeStage + '/10';
      //       }
  
      //     }
      //     else if(G.gameMode == "stage"){
      //       G.stage++;
      //       localStorage.setItem('wordStage', parseInt(G.stage));
      //     }
          
      //     G.coin++;
      //     if(WG.Scene.data.Ingame.hintBox != undefined){
      //       WG.Scene.data.Ingame.hintBox.texture = G.coin>=10 ? 'game_help_unlock.png' : 'game_help_lock.png';
      //       WG.Scene.data.Ingame.hintText.text = G.coin>=10 ? (Math.floor(G.coin/10) >= 10 ? '9+' : Math.floor(G.coin/10).toString()) : '';
      //     }
      //     localStorage.setItem('wordCoin', parseInt(G.coin));
      //     WG.Scene.data.Ingame.coinText.text = G.coin;
      //     G.gameWordArr = 0;
      //     localStorage.setItem('gameWordArr_'+G.lang,0);
      //     WG.Scene.data.Ingame.meaningText.text = '';
      //     WG.Scene.data.Ingame.quiz_mean_box.visible = false;
      //     G.word.stageClear(G.boxArrIndex, G.boxArrSprite, wordAnswerText);
       
      //   }
        
      //   else if(G.userWordAnswerText.length > 0 && !G.word.isCorrect(G.userWordAnswerText, G.answerWord)){
      //     WG.Sound.sfxPlay('wrong'+Math.floor((Math.random() * 3)+1),false);
      //     if( /Android/i.test(navigator.userAgent) && G.isVibTab) {
      //       window.navigator.vibrate(200);
      //     }
      //     if(G.word.boxArr.length !=0){
      //       for(var i=0; i<G.word.wordAnswerTextIndex.length; i++){
      //         G.word.boxArr[G.word.wordAnswerTextIndex[i]-1].alpha=1;
      //       }
      //     }
         
      //   }
      //   else{
         
      //     if(G.word.boxArr.length !=0){
      //       for(var i=0; i<G.word.wordAnswerTextIndex.length; i++){
      //         G.word.boxArr[G.word.wordAnswerTextIndex[i]-1].alpha=1;
      //       }
      //     }
      //   }
      //   G.boxArrIndex=[];
      //   G.boxArrSprite =[];
      //   G.userWordAnswerText = "";
      //   if(G.word.answerBoxArr.length != 0){
      //     for(var i=0; i<G.answerWord.length;i++){
      //       if(G.hintLength-1 < i){
      //         G.word.answerBoxArr[i+i+1].text = "";
      //       }
           
      //     }
      //   }
  
       
     
      //   G.word.wordAnswerTextIndex = [];


     
      // }
      // this.dragStart = function(e){
        
      //   if(WG.Scene.data.Ingame.isdrag && !G.meanDrag){
      
      //     for(var i = 1; i<G.word.boxArr.length; i+=2){
      //       if(G.answerWord.length > G.userWordAnswerText.length){
      //         if(e.data.calc.x > G.word.boxArr[i].getGlobalPosition().x - (G.word.boxArr[i].width * G.word.boxArr[i-1].scale.x -35) && e.data.calc.x < G.word.boxArr[i].getGlobalPosition().x + G.word.boxArr[i].width * G.word.boxArr[i-1].scale.x -35){
      //           if(e.data.calc.y > G.word.boxArr[i].getGlobalPosition().y - (G.word.boxArr[i].height * G.word.boxArr[i-1].scale.y -35) && e.data.calc.y < G.word.boxArr[i].getGlobalPosition().y + G.word.boxArr[i].height * G.word.boxArr[i-1].scale.y -35){
      //             // console.log(e.data.calc)
      //             // console.log(G.word.boxArr[i].text)
                 
      //             if(G.word.wordAnswerTextIndex.indexOf(i) === -1){
      //               if(G.word.wordAnswerTextIndex.length != 0){
      //                 var nextX = G.word.boxArr[G.word.wordAnswerTextIndex[G.word.wordAnswerTextIndex.length-1]].index.x - G.word.boxArr[i].index.x
      //                 var nextY = G.word.boxArr[G.word.wordAnswerTextIndex[G.word.wordAnswerTextIndex.length-1]].index.y - G.word.boxArr[i].index.y
                    
      //                 if(nextX >= -1 && nextX <= 1 && nextY >= -1 && nextY <= 1){
      //                   WG.Sound.sfxPlay('move'+Math.floor((Math.random() * 4)+1),false);
      //                   G.word.boxArr[i-1].alpha = 0.5;
      //                   G.word.wordAnswerTextIndex.push(i);
      //                   G.userWordAnswerText+=G.word.boxArr[i].text;
      //                   if(G.hintLength < G.userWordAnswerText.length){
      //                     G.word.answerBoxArr[G.userWordAnswerText.length + G.userWordAnswerText.length -1].text = G.word.boxArr[i].text
      //                   }
                       
      //                 }
  
      //               }
      //               else{
      //                 WG.Sound.sfxPlay('move'+Math.floor((Math.random() * 4)+1),false);
      //                 G.word.boxArr[i-1].alpha = 0.5;
      //                 G.word.wordAnswerTextIndex.push(i);
      //                 G.userWordAnswerText+=G.word.boxArr[i].text;

      //                 if(G.hintLength < G.userWordAnswerText.length){
      //                   G.word.answerBoxArr[G.userWordAnswerText.length + G.userWordAnswerText.length -1].text = G.word.boxArr[i].text
      //                 }
  
      //               }
      //               G.boxArrIndex.push(i);
      //               G.boxArrSprite.push(G.word.boxArr[i-1]);
      //             }
                  
      //           }
      //         }
      //       }
   
      //     }
       
      //   }
      // }

      this.backScene = new WG.Sprite('game_back_bt('+G.gameMode+').png',{
        x: -this.bg.width *0.44,
        y: -this.bg.height*0.45,
        scale: 1,
        layer:"background",
        attach:this.bg
      });
      if(h5Api.data.isRank) this.backScene.visible = false;

      this.backScene.on('pointertap',function(){
        WG.Sound.sfxPlay('button'+Math.floor((Math.random() * 4)+1),false);
        G.adTime = Date.now();
        WG.Scene.change("title");

      });

      this.nextStage = new WG.Sprite('restart_button.png', {
        x: WG.Screen.width / 2,
        y: WG.Screen.height * 0.715,
        visible: false,
      });

      this.nextStageText = new WG.Text(G.lang == "ko" ? '다음 단계' : "下一步", {
        x: 0,
        y: -5,
        fontSize:34,
        fill:"white",
        fontFamily:'nanumBold',
        attach:this.nextStage
      });
      this.nextStage.on('pointertap',function (sd, e){
        if(G.gameMode == "stage"){
          G.word.skipNextStage.bind(this, sd)();
        }
      }.bind(this, sceneData));
      this.nextStage.on(['pointerupoutside','pointerup'], function () {
        WG.Scene.data.Ingame.nextStage.texture = "restart_button.png"
      });
      this.nextStage.on('pointerdown', function () {
        WG.Scene.data.Ingame.nextStage.texture = "restart_button_click.png"
      });


      this.kakaoLink = new WG.Sprite('kakao_button.png', {
        x: WG.Screen.width / 2,
        y: WG.Screen.height * 0.715,
        visible: false,
      });

      this.kakaoLinkText = new WG.Text('공유하기', {
        x: this.kakaoLink.width *0.1,
        y: -5,
        fontSize:34,
        fill:"#381b1e",
        fontFamily:'nanumBold',
        attach:  this.kakaoLink
      });
  
      this.kakaoLink.on('pointertap', function (e) {
        sendLink(G.gameMode == "stage" ? "단계별 풀이 " + G.stage+"단계 돌파!!" : "빠른 풀이 "+WG.Scene.data.Ingame.timeText.text + "초 기록!!");
      });
  
      this.kakaoLink.on(['pointerupoutside','pointerup'], function () {
        WG.Scene.data.Ingame.kakaoLink.texture = "kakao_button.png"
      });
      this.kakaoLink.on('pointerdown', function () {
        WG.Scene.data.Ingame.kakaoLink.texture = "kakao_button_click.png"
      });


      this.adHint = new WG.Sprite('ad_normal.png', {
        x: WG.Screen.width * 0.88,
        y: WG.Screen.height * 0.9,
      });

   

      this.adHint.on('pointertap', function (sd, e) {
        if (sd.ans.length > G.word.hintWordArr.length && G.word.canHint == true && G.canPick == true && G.adHintTab == "false") {
        G.isAdplaying = undefined;
        window.RG.admob.setOnEarnedReward(function (){
          WG.Sound.sfxPlay('hint' + Math.floor((Math.random() * 3) + 1), false);
              G.word.hintWordArr[G.word.hintWordArr.length] = sd.ans[G.word.hintWordArr.length];
              G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2 + 1].text = G.word.hintWordArr[G.word.hintWordArr.length - 1];
              G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2].texture = 'game_answer(' + G.gameMode + ').png';
              G.hintLength++;
              G.adHintTab = "true";
              localStorage.setItem('adHintTab', G.adHintTab);
              G.adHintTime = Date.now() + 60000;
              localStorage.setItem('adHintTime', G.adHintTime);
              WG.Scene.data.Ingame.adHintTimeText.visible = true;
        }.bind(sd));
        RG.admob.rewardedShow();
        // h5Api.run({
        //   type: "reward",
        //   pauseGame: function () {
        //     if (WG.Sound.bgm !== undefined && WG.Sound.bgm.isMute === false) {
        //       G.isMute = true;
        //       WG.Sound.muteToggle("all", false);
        //     }
        //     WG.pause = true;
        //     G.isAdplaying = true;
        //   },
        //   resumeGame: function () {
        //     if (G.isMute === true) {
        //       WG.Sound.muteToggle("bgm", false);
        //       WG.Sound.muteToggle("sfx", false);
        //     }
        //     WG.pause = false;
        //     G.isAdplaying = false;
        //   },
        //   success: function () {
        //     WG.Sound.sfxPlay('hint' + Math.floor((Math.random() * 3) + 1), false);
        //     G.word.hintWordArr[G.word.hintWordArr.length] = sd.ans[G.word.hintWordArr.length];
        //     G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2 + 1].text = G.word.hintWordArr[G.word.hintWordArr.length - 1];
        //     G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2].texture = 'game_answer(' + G.gameMode + ').png';
        //     G.hintLength++;
        //     G.adHintTab = "true";
        //     localStorage.setItem('adHintTab', G.adHintTab);
        //     G.adHintTime = Date.now() + 60000;
        //     localStorage.setItem('adHintTime', G.adHintTime);
        //     WG.Scene.data.Ingame.adHintTimeText.visible = true;
        //   },
        //   fail: function () {
        //     WG.Sound.sfxPlay('hint' + Math.floor((Math.random() * 3) + 1), false);
        //     G.word.hintWordArr[G.word.hintWordArr.length] = sd.ans[G.word.hintWordArr.length];
        //     G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2 + 1].text = G.word.hintWordArr[G.word.hintWordArr.length - 1];
        //     G.word.answerBoxArr[(G.word.hintWordArr.length - 1) * 2].texture = 'game_answer(' + G.gameMode + ').png';
        //     G.hintLength++;
        //     G.adHintTab = "true";
        //     localStorage.setItem('adHintTab', G.adHintTab);
        //     G.adHintTime = Date.now() + 60000;
        //     localStorage.setItem('adHintTime', G.adHintTime);
        //     WG.Scene.data.Ingame.adHintTimeText.visible = true;
        //   }
        // });
      }
      }.bind(this, sceneData));
  
      this.adHint.on(['pointerupoutside','pointerup'], function () {
        WG.Scene.data.Ingame.adHint.texture = "ad_normal.png"
      });
      this.adHint.on('pointerdown', function () {
        WG.Scene.data.Ingame.adHint.texture = "ad_click.png"
      });

      this.adHintBar = new WG.Sprite('ad_click.png', {
        x: WG.Screen.width * 0.88,
        y: WG.Screen.height * 0.9,
      });


      this.adHintMask = new WG.Graphics({
        attach: this.adHintBar
      });
      this.adHintMask.run("beginFill", "0xFFFFFF", 1);
      this.adHintMask.run("drawRect",
        /*x*/
        -this.adHint.width / 2,
        /*y*/
        -this.adHint.height / 2,
        /*width*/
        this.adHint.width,
        /*height*/
        this.adHint.height
      );
      // 나중에 고치자
      this.adHintMask.scale.x = 1;
      this.adHintMask.scale.y = 1;
      this.adHintMask.y += this.adHint.height;
      this.adHintBar.pSprite.mask = this.adHintMask;
    
      this.adHintMaskPosition = this.adHintMask.y;
    

      this.adHintTimeText = new WG.Text('',{
        x: WG.Screen.width * 0.88,
        y: WG.Screen.height * 0.9,
        fontSize:30,
        fill:"#ffffff",
        fontFamily:'nanumBold',
        zOrder : -9
      })

      this.adHintTimeFunc = function () {
        var time = 60000 - (G.adHintTime - Date.now());
        if (time >= 60000 || time < 0) {
          G.adHintTab = "false";
          localStorage.setItem('adHintTab', G.adHintTab);
         WG.Scene.data.Ingame.adHintMask.y =WG.Scene.data.Ingame.adHintMaskPosition;
          G.adHintTime = 0;
          localStorage.setItem('adHintTime', G.adHintTime);
          WG.Scene.data.Ingame.adHintTimeText.text = " ";
        } else
         WG.Scene.data.Ingame.adHintMask.y =WG.Scene.data.Ingame.adHintMaskPosition -WG.Scene.data.Ingame.adHintMask.height / 60000 * time;
         WG.Scene.data.Ingame.adHintTimeText.text = 60 - Math.floor(time/1000);
      }
      

      this.howtoPlayBG = new WG.Sprite('tutorial_5.png', {
        x: WG.Screen.width / 2,
        y: WG.Screen.height / 2,
        scale: 1,
        isTilling: true,
        width : WG.Screen.width,
        height : WG.Screen.height,
        visible: false,
        zOrder: -2,
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
        y: - WG.Screen.height * 0.451,
        scale: 1,
        isTilling: true,
        attach: this.howtoPlayBG,
      });

      this.howtoPlayClose.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        WG.Scene.data.Ingame.howtoPlayBG.visible = false;
      });



      this.howtoPlay.on('pointertap', function () {
        WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
        if(G.tutorialPage < 4){
          G.tutorialPage++;
          WG.Scene.data.Ingame.howtoPlay.texture = 'tutorial_'+G.tutorialPage+'.png';
        }

        else if(G.tutorialPage == 4){
          G.tutorialPage = 1;
          WG.Scene.data.Ingame.howtoPlayBG.visible = false;
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
        WG.Scene.data.Ingame.howtoPlay.texture = 'tutorial_1.png';
        WG.Scene.data.Ingame.howtoPlayBG.visible = true;
      });
      this.howtoPlayBtn.on(['pointerup', 'pointerupoutside'], function () {
        WG.Scene.data.Ingame.howtoPlayBtn.texture = "game_button_tutorial.png";

      })
      this.howtoPlayBtn.on('pointerdown', function () {
        WG.Scene.data.Ingame.howtoPlayBtn.texture = "game_button_tutorial_click.png";
      });





G.word.stageModeStart.bind(this, sceneData)();
    },


    "update": function () {
      if(G.gameTime != undefined && !G.speedModeClear){
        var scoreTime =  (Date.now()-G.gameTime) /10;
        var timeA = Math.floor(scoreTime/100);
        var timeB = Math.floor(scoreTime%100);
        G.speedModeTime = timeA +"."+timeB;
        WG.Scene.data.Ingame.timeText.text = timeA;
      }
      optionUpdate(WG.Scene.data.Ingame.optionBoard, G.isOption);
      if(G.canDrag){
        // checkSlide(this.meaningText , G.maxY , G.minY);
        this.scrollText.update();
      }
        if(G.adHintTab =="false"){
          WG.Scene.data.Ingame.adHint.texture = "ad_normal.png";
          WG.Scene.data.Ingame.adHint.tint = 0xFFFFFF;
          WG.Scene.data.Ingame.adHintTimeText.text = "";
          WG.Scene.data.Ingame.adHintTimeText.visible = false;
        }
        else if(G.adHintTab =="true"){
          WG.Scene.data.Ingame.adHint.texture = "ad_click.png";
          WG.Scene.data.Ingame.adHint.tint = 0x333333;

        }
      
      if(G.adHintTime !== 0){
        WG.Scene.data.Ingame.adHintTimeFunc();
      }

    
    },
    "destroy": function () {},
  }
);