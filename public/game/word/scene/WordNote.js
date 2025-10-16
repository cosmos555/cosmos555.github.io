WG.Scene.regist(
  function wordNote() {
    this.defaultScene = false;

  }, {
    "init": function () {
      G.pointDownY;
      G.pointUpY;
      G.noteWord.foundWord.sort();
      localStorage.setItem('noteWord'+G.lang, JSON.stringify(G.noteWord));
      this.bg = new WG.Sprite('word_bg.png',{
        x: WG.Screen.width/2,
        y: WG.Screen.height/2,
        width: "100%",
        height: "100%",
        layer:"background",
        scale:1,
      });

      
      this.backScene = new WG.Sprite('game_back_bt(stage).png',{
        x: -this.bg.width *0.44,
        y: -this.bg.height*0.45,
        scale: 1,
        attach:this.bg
      });
      this.backScene.on('pointertap',function(){
        WG.Sound.sfxPlay('button'+Math.floor((Math.random() * 4)+1),false);
        WG.Scene.change("title");

      });
      this.stageText = new WG.Text('단어장',{
        x:WG.Screen.width*0.2,
        y:WG.Screen.height*0.039,
        fontSize:40,
        fill:"#fff",
        fontFamily:'nanumBold',
      })
      this.coinSprite = new WG.Sprite('game_coin.png',{
        x: this.bg.width * 0.251,
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
      this.optionButton = new WG.Sprite('game_button_option.png',{
        x: this.bg.width * 0.435,
        y: -this.bg.height * 0.455,
        scale: 1,
        attach:this.bg,
      });
      this.optionButton.on('pointertap',function(){
        WG.Sound.sfxPlay('button'+Math.floor((Math.random() * 4)+1),false);
        G.isOption = G.isOption == true ? false : true;
      });
      this.optionButton.on(['pointerup','pointerupoutside'],function(){
        WG.Scene.data.wordNote.optionButton.texture = "game_button_option.png";

      })
      this.optionButton.on('pointerdown',function(){
        WG.Scene.data.wordNote.optionButton.texture = "game_button_option_click.png";
      });
      var option = UI_option.bind(this);
      option();

      if(G.noteWord.foundWord.length === 0){
        this.noFoiundWordText = new WG.Text('찾은 단어가\n없어요 ㅠㅠ',{
          x:WG.Screen.width / 2,
          y:WG.Screen.height /2,
          fontSize:38,
          fill:"white",
          fontFamily:'nanumBold',
          align:"center",
        })
      }
      else{


        this.wordArr = [];
        this.wordBoxArr = [];
        this.touchSprite = new WG.Sprite('blank.png',{
          x:WG.Screen.width/2,
          y:WG.Screen.height * 0.61,
        });
   
        G.ct = new WG.Sprite(null,{
          x: -this.bg.width * 0.32,
          y: -this.touchSprite.height * 0.29,
          attach:this.touchSprite,
          anchorY: 0
        });
  
        this.myWrodBox = new WG.Sprite('box_my_word.png',{
          x: 0,
          y: this.bg.height * 0.15,
          attach:this.bg
        });
  
        this.myWrodBoxText = new WG.Text(G.noteWord.foundWord.length+'/'+Object.keys(G.words).length,{
          x:0,
          y:-this.myWrodBox.height * 0.415,
          fontSize:18,
          fill:"#fff",
          fontFamily:'nanumBold',
          attach:this.myWrodBox
        })
        
        
     
  
        this.heightY=0;
    
        this.slideMask = new WG.Graphics({
          attach: this.myWrodBox
        });
        this.slideMask.run("beginFill", "0xFFFFFF", 0);
        this.slideMask.run("drawRect",
          /*x*/
          -this.bg.width * 0.5,
          /*y*/
          -this.myWrodBox.height * 0.382,
          /*width*/
          800,
          /*height*/
          590
        );
        G.ct.pSprite.mask = this.slideMask;
  
        for(var i=0; i<G.noteWord.foundWord.length; i++){
          // var word = new WG.Sprite('',{
  
          // })
  
  
         var wordSprite = new WG.Sprite('word_non_select_4.png',{
            x:0,
            y:this.heightY * 75,
            alpha:0.5,
            attach:G.ct,
            scale: 1
          });
  
  
          addTapEvent(wordSprite);
  
  
          var wordText = new WG.Text(G.noteWord.foundWord[i],{
            x:0,
            y:0,
            attach:wordSprite,
            fontSize:25.64,
            fill:"#5b4c4a",
            fontFamily:'nanumBold',
          });
          if(i != 0){
            wordSprite.x += this.wordArr[i-1].x + wordSprite.width + 22;
            if(i%4==0){
              this.heightY++;
              wordSprite.x = 0;
              wordSprite.y = this.heightY * 75;
            }
          }
          this.wordArr.push(wordSprite);
        }
        if(this.heightY >= 5){
          G.canDrag = true;
        }
        else G.canDrag = false;
  
        this.scrollBack = new Scroll(G.ct, this.touchSprite.height, (this.heightY+1) * 75);
        G.minY = -156;
        G.maxY = -400 - 75 * (this.heightY - 5);
  
        // this.touchSprite.on('pointerdown', dragStart.bind(G.ct));
  
        // this.touchSprite.on(['pointerup','pointerupoutside'], dragEnd.bind(G.ct));
    
        // this.touchSprite.on('pointermove', dragMove.bind(G.ct));
  
  
        this.touchSprite.on('pointerdown', function(event){
          if(this.heightY >= 8)this.scrollBack.dragStart(event);
        }.bind(this));
  
        this.touchSprite.on(['pointerup','pointerupoutside'], function(event){
          if(this.heightY >= 8)this.scrollBack.dragEnd(event);
        }.bind(this));
    
        this.touchSprite.on('pointermove', function(event){
          if(this.heightY >= 8)this.scrollBack.dragMove(event);
        }.bind(this));
     
    
        this.quiz_mean_box = new WG.Sprite('quiz_mean_box.png',{
          x: 0,
          y: -this.bg.height * 0.21,
          scale: 1,
          attach:this.bg,
        });
  
  
        this.meaningText = new WG.Text('',{
          x: 0,
          y: -this.quiz_mean_box.height /2,
          fontSize:G.textSize,
          fill:"#5b4c4a",
          anchorY:0,
          fontFamily:'nanumBold',  
          wordWrap: true,
          wordWrapWidth: this.quiz_mean_box.width -20,
          attach:this.quiz_mean_box,
        });
        this.slideMask = new WG.Graphics({
          attach: this.bg
        });
        this.slideMask.run("beginFill", "0xFFFFFF", 1);
        this.slideMask.run("drawRect",
          /*x*/
          -this.bg.width * 0.5,
          /*y*/
          -this.bg.height * 0.263,
          /*width*/
          800,
          /*height*/
          133
        );
        this.meaningText.pSprite.mask = this.slideMask;
  
  
        this.scrollText = new Scroll(WG.Scene.data.wordNote.meaningText, WG.Scene.data.wordNote.quiz_mean_box.height - 20, WG.Scene.data.wordNote.meaningText.height);
  
        this.quiz_mean_box.on('pointerdown', function(event){
          if(G.canDrag) this.scrollText.dragStart(event);
        }.bind(this));
  
        this.quiz_mean_box.on(['pointerup','pointerupoutside'], function(event){
          if(G.canDrag) this.scrollText.dragEnd(event);
        }.bind(this));
    
        this.quiz_mean_box.on('pointermove', function(event){
          if(G.canDrag) this.scrollText.dragMove(event);
        }.bind(this));
 
        this.wordMeanNote = function(word){
  
          for(var i =0; i< word.length; i++){
            var meanWordBox = new WG.Sprite('game_nonclick.png',{
              x:0,
              y:-this.bg.height *0.33,
              scale: 0.7,
              attach:this.bg,
  
            });
  
            var meanWordBoxText = new WG.Text(word[i],{
              x:0,
              y:0,
              fontSize:110,
              fill:"#5b4c4a",
              fontFamily:'nanumBold',
              attach : meanWordBox,
    
            });
            meanWordBox.x += (i * (meanWordBox.pSprite.width + 15)) - ((meanWordBox.pSprite.width / 2 + 7.5) * (word.length - 1));
            WG.Scene.data.wordNote.wordBoxArr.push(meanWordBox);
          }
  
          WG.Scene.data.wordNote.meaningText.text = G.words[word];
  
  
          WG.Scene.data.wordNote.scrollText._height = WG.Scene.data.wordNote.meaningText.height;
  
  
          if(WG.Scene.data.wordNote.quiz_mean_box.height < WG.Scene.data.wordNote.meaningText.height){
            G.canDrag = true;
            WG.Scene.data.wordNote.meaningText.y = -WG.Scene.data.wordNote.meaningText.height/2;
          }
          else{
            G.canDrag = false;
            WG.Scene.data.wordNote.meaningText.y = -WG.Scene.data.wordNote.meaningText.height/2;
          }
        }
  
  
  
        WG.Scene.data.wordNote.wordArr[0].alpha = 1;
        WG.Scene.data.wordNote.wordArr[0].texture = 'word_select_4.png';
        WG.Scene.data.wordNote.wordMeanNote(WG.Scene.data.wordNote.wordArr[0].children[Object.keys(WG.Scene.data.wordNote.wordArr[0].children)[0]].text);
  
  

      }
     
    },
    "update": function () {
      optionUpdate(WG.Scene.data.wordNote.optionBoard, G.isOption);
      if(this.heightY >= 8){
        // checkSlide(G.ct , G.maxY , G.minY);
        this.scrollBack.update();
      }
      if(G.canDrag){
        this.scrollText.update();
      }

     
    },
    "destroy": function () {},
  }
);


function addTapEvent(sprite) {
  sprite.on("pointerup", function(e) {
    var key = Object.keys(sprite.children)[0];
    G.pointUpY = e.data.calc.y;
    for(var i=0;i< WG.Scene.data.wordNote.wordArr.length; i++){
      WG.Scene.data.wordNote.wordArr[i].alpha = 0.5;
      WG.Scene.data.wordNote.wordArr[i].texture = 'word_non_select_4.png';
    }
    if(Math.abs(G.pointUpY - G.pointDownY) <30){
      sprite.texture = 'word_select_4.png';
      sprite.alpha = 1;
      if(WG.Scene.data.wordNote.wordBoxArr.length > 0){
        for(var i =0; i<WG.Scene.data.wordNote.wordBoxArr.length; i++){
          WG.Scene.data.wordNote.wordBoxArr[i].destroy();
        }
        WG.Scene.data.wordNote.wordBoxArr = [];
      }
      WG.Scene.data.wordNote.wordMeanNote(sprite.children[Object.keys(sprite.children)[0]].text);
    }
  
  });
  sprite.on("pointerdown", function(e) {
    var key = Object.keys(sprite.children)[0];
    G.pointDownY = e.data.calc.y;


    // for(var i=0;i< WG.Scene.data.wordNote.wordArr.length; i++){
    //   WG.Scene.data.wordNote.wordArr[i].alpha = 0.5;
    //   WG.Scene.data.wordNote.wordArr[i].texture = 'word_non_select_4.png';
    // }
    // sprite.texture = 'word_click_4.png';
  });


  
  // sprite.on('pointerdown', dragStart.bind(G.ct));

  // sprite.on(['pointerup','pointerupoutside'], dragEnd.bind(G.ct));

  // sprite.on('pointermove', dragMove.bind(G.ct));


}

