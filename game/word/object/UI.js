function optionUpdate(board, control) {
  if (control) {
    board.visible = true;
    // WG.Scene.data[WG.Scene.currentName].bg.pSprite.interactive = false;
    WG.Scene.data[WG.Scene.currentName].optionBoardBG.visible = true;
    
    if (board.scale.x < 1) {
      board.scale.x = board.scale.y += 0.05;
    } else {
      board.scale.x = board.scale.y = 1;
    }
  } else {
    if (board.scale.x > 0.2) {
      board.scale.x = board.scale.y -= 0.05;
    } else {
      board.visible = false;
      // WG.Scene.data[WG.Scene.currentName].bg.pSprite.interactive = true;
      WG.Scene.data[WG.Scene.currentName].optionBoardBG.visible = false;
      board.scale.x = board.scale.y = 0.2;
    }
  }
}


function UI_option() {
  G.isOption = false;
  G.isSoundTab = true;
  G.isVibTab = true;

  var sound = localStorage.getItem('GD_picker_gameSetting');
  G.gameSetting = JSON.parse(sound);
  if (G.gameSetting == null) {
    G.gameSetting = {
      "bgmMute": false,
      "sfxMute": false,
      "bgm": 1,
      "sfx": 1,
      "vib": true,
      "bgm1": true
    };
    localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
  }
  // if(WG.Scene.currentName == "title"){
  //   WG.Sound.bgmPlay("treehouse_lobby");
  //   console.log(11)
  // }

  // if(WG.Scene.currentName == "Ingame"){
  // if(G.gameMode == "stage"){
  //   WG.Sound.bgmPlay("treehouse_game");
  // }
  // else if(G.gameMode == "time"){
  //   WG.Sound.bgmPlay("quick");
  // }

  // }


  if (G.gameSetting.bgmMute === true) {
    WG.Sound.setVolume(0, 'bgm');
  } else {
    WG.Sound.setVolume(G.gameSetting.bgm, 'bgm');
  }
  if (G.gameSetting.sfxMute === true) {
    WG.Sound.setVolume(0, 'sfx');
  } else {
    WG.Sound.setVolume(G.gameSetting.sfx, 'sfx');
  }
  if (G.gameSetting.vib === true) {
    G.isVibTab = true;
  } else {
    G.isVibTab = false;
  }

  this.optionBoardBG = new WG.Sprite('blank.png', {
    x: WG.Screen.width/2,
    y: WG.Screen.height/2,
    scale: 1,
    zOrder: -1,
    width: "100%",
    height: "100%",
    visible: false,
  });
  this.optionBoardBG.on('pointertap',function(){})

  this.optionBoard = new WG.Sprite('option_popup.png', {
    x: WG.Screen.width / 2,
    y: WG.Screen.height / 2,
    scale: 1,
    zOrder: -2,
    // attach:this.optionBoardBG,
    visible: false,
  });


  this.optionBoardClose = new WG.Sprite('popup_close.png', {
    x: 273.2,
    y: -219.32,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });


  this.optionBoardClose.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
    G.isOption = G.isOption == true ? false : true;
  });

  this.optionBoardClose.on(['pointerup', 'pointerupoutside'], function () {
    WG.Scene.data[WG.Scene.currentName].optionBoardClose.texture = "popup_close.png";
  });
  this.optionBoardClose.on('pointerdown', function () {
    WG.Scene.data[WG.Scene.currentName].optionBoardClose.texture = "popup_close_hold.png";
  });


  this.optionBoardInfoTab = new WG.Sprite('info_button_dark.png', {
    x: this.optionBoard.width * 0.141,
    y: this.optionBoard.height * -0.338,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });

  // this.optionBoard.pSprite.interactive = true;
  // this.bg.pSprite.interactive = false;

  this.optionBoardInfoTab.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
    optionTabFunc();
  });
  // this.optionBoardInfoTab.on(['pointerup','pointerupoutside'],function(){
  //   WG.Scene.data.Ingame.optionBoardInfoTab.texture = "info_button_light.png";

  // })
  // this.optionBoardInfoTab.on('pointerdown',function(){
  //   WG.Scene.data.Ingame.optionBoardInfoTab.texture = "info_button_dark.png";
  // });



  this.optionBoardSoundTab = new WG.Sprite('sound_button_light.png', {
    x: this.optionBoard.width * -0.141,
    y: this.optionBoard.height * -0.338,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });

  this.optionBoardSoundTab.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
    optionTabFunc();
  });





  this.bgmBtn = new WG.Sprite(G.gameSetting.bgmMute ? 'bgm_button_hold.png' : 'bgm_button.png', {
    x: this.optionBoard.width * -0.288,
    y: this.optionBoard.height * -0.115 -37,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });

  this.bgmText = new WG.Text('배경음악', {
    x: this.optionBoard.width * -0.19,
    y: this.optionBoard.height * -0.16 -37,
    zOrder: -1,
    fontSize: 20,
    anchorX: 0,
    fill: "#493e2e",
    fontFamily: 'nanumBold',
    attach: this.optionBoard
  });


  this.bgmSlide = new WG.Sprite('sound_bar_bottom.png', {
    x: this.optionBoard.width * -0.16,
    y: this.optionBoard.height * -0.082 -37,
    anchorX: 0,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });
  this.bgmSlide.label = "bgm";

  this.bgmBar = new WG.Sprite('sound_bar_top.png', {
    x: 0,
    y: 0,
    scale: 1,
    anchorX: 0,
    zOrder: -1,
    attach: this.bgmSlide
  });
  this.bgmBar.width = G.gameSetting.bgmMute ? 0 : this.bgmSlide.texture.width * G.gameSetting.bgm;
  this.bgmControl = new WG.Sprite('sound_bar_button.png', {
    x: G.gameSetting.bgmMute ? 0 : this.bgmSlide.texture.width * G.gameSetting.bgm,
    y: 0,
    scale: 1,
    zOrder: -1,
    attach: this.bgmSlide
  });

  this.bgmSlide.on('pointerdown', function (event) {
    var mouseX = event.data.calc.x; // stage상 절대 위치.
    G.gameSetting.bgm = (mouseX - this.bgmSlide.getGlobalPosition().x) / this.bgmSlide.width / this.optionBoard.scale.x;
    G.gameSetting.bgmMute = false;
    this.bgmBtn.texture = 'bgm_button.png';
    this.bgmBar.width = this.bgmSlide.texture.width * G.gameSetting.bgm;
    this.bgmControl.x = this.bgmSlide.texture.width * G.gameSetting.bgm;
    WG.Sound.setVolume(G.gameSetting.bgm, 'bgm');
    localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
  }.bind(this));

  this.bgmControl.base = this.bgmSlide;
  this.bgmControl.target = this.bgmBar;
  this.bgmControl.icon = this.bgmBtn;
  this.bgmControl
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragBgm);


  this.bgmBtn.on("pointerdown", function (event) {

    if (G.gameSetting.bgmMute == true) { //뮤트풀기
      this.bgmBtn.texture = 'bgm_button.png';
      G.gameSetting.bgmMute = false;
      WG.Sound.setVolume(G.gameSetting.bgm, 'bgm');
      localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
      this.bgmControl.x = this.bgmSlide.texture.width * G.gameSetting.bgm;
      this.bgmBar.width = this.bgmSlide.texture.width * G.gameSetting.bgm;
    } else { //뮤트
      this.bgmBtn.texture = 'bgm_button_hold.png';
      G.gameSetting.bgmMute = true;
      this.bgmBar.width = 0;
      this.bgmControl.x = 0;
      WG.Sound.setVolume(0, 'bgm');
      localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
    }
  }.bind(this));








  this.sfxBtn = new WG.Sprite('sfx_button.png', {
    x: this.optionBoard.width * -0.288,
    y: this.optionBoard.height * 0.08 -47,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });

  this.sfxText = new WG.Text('효과음', {
    x: this.optionBoard.width * -0.19,
    y: this.optionBoard.height * 0.04 -47,
    zOrder: -1,
    fontSize: 20,
    anchorX: 0,
    fill: "#493e2e",
    fontFamily: 'nanumBold',
    attach: this.optionBoard
  });



  this.sfxSlide = new WG.Sprite('sound_bar_bottom.png', {
    x: this.optionBoard.width * -0.16,
    y: this.optionBoard.height * 0.12 -47,
    anchorX: 0,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });
  this.sfxSlide.label = "sfx";

  this.sfxBar = new WG.Sprite('sound_bar_top.png', {
    x: 0,
    y: 0,
    scale: 1,
    anchorX: 0,
    zOrder: -1,
    attach: this.sfxSlide
  });
  this.sfxBar.width = G.gameSetting.sfxMute ? 0 : this.sfxSlide.texture.width * G.gameSetting.sfx;
  this.sfxControl = new WG.Sprite('sound_bar_button.png', {
    x: G.gameSetting.sfxMute ? 0 : this.sfxSlide.texture.width * G.gameSetting.sfx,
    y: 0,
    scale: 1,
    zOrder: -1,
    attach: this.sfxSlide
  });

  this.sfxSlide.on('pointerdown', function (event) {
    var mouseX = event.data.calc.x; // stage상 절대 위치.
    G.gameSetting.sfx = (mouseX - this.sfxSlide.getGlobalPosition().x) / this.sfxSlide.width / this.optionBoard.scale.x;
    G.gameSetting.sfxMute = false;
    this.sfxBtn.texture = 'sfx_button.png';
    this.sfxBar.width = this.sfxSlide.texture.width * G.gameSetting.sfx;
    this.sfxControl.x = this.sfxSlide.texture.width * G.gameSetting.sfx;
    WG.Sound.setVolume(G.gameSetting.sfx, 'sfx');
    localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
  }.bind(this));

  this.sfxControl.base = this.sfxSlide;
  this.sfxControl.target = this.sfxBar;
  this.sfxControl.icon = this.sfxBtn;
  this.sfxControl
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragSfx);


  this.sfxBtn.on("pointerdown", function (event) {

    if (G.gameSetting.sfxMute == true) { //뮤트풀기
      this.sfxBtn.texture = 'sfx_button.png';
      G.gameSetting.sfxMute = false;
      WG.Sound.setVolume(G.gameSetting.sfx, 'sfx');
      localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
      this.sfxControl.x = this.sfxSlide.texture.width * G.gameSetting.sfx;
      this.sfxBar.width = this.sfxSlide.texture.width * G.gameSetting.sfx;
    } else { //뮤트
      this.sfxBtn.texture = 'sfx_button_hold.png';
      G.gameSetting.sfxMute = true;
      this.sfxBar.width = 0;
      this.sfxControl.x = 0;
      WG.Sound.setVolume(0, 'sfx');
      localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
    }
  }.bind(this));







  if (/Android/i.test(navigator.userAgent)) {



    this.vibBtn = new WG.Sprite('vibrate_button.png', {
      x: this.optionBoard.width * -0.288,
      y: this.optionBoard.height * 0.28 +28,
      scale: 1,
      zOrder: -1,
      attach: this.optionBoard
    });
  
    this.vibText = new WG.Text('진동', {
      x: this.optionBoard.width * -0.19,
      y: this.optionBoard.height * 0.23 +28,
      zOrder: -1,
      fontSize: 20,
      anchorX: 0,
      fill: "#493e2e",
      fontFamily: 'nanumBold',
      attach: this.optionBoard
    });
  
  
    this.vibOnoff = new WG.Sprite('vibrate_onoff_dark.png', {
      x: this.optionBoard.width * 0.09,
      y: this.optionBoard.height * 0.31 +28,
      scale: 1,
      zOrder: -1,
      attach: this.optionBoard
    });
  
    this.vibOnoff.on('pointertap', function () {
      WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
      optionVibFunc();
    });
  
    this.vibOn = new WG.Sprite('vibrate_on_light.png', {
      x: this.vibOnoff.width * -0.25,
      y: 0,
      scale: 1,
      zOrder: -1,
      attach: this.vibOnoff,
      visible: G.isVibTab == true ? true : false
    });
    this.vibOn.on('pointertap', function () {
      WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
     optionVibFunc();
    });
  
    this.vibOff = new WG.Sprite('vibrate_off_light.png', {
      x: this.vibOnoff.width * 0.25,
      y: 0,
      scale: 1,
      zOrder: -1,
      attach: this.vibOnoff,
      visible: G.isVibTab == true ? false : true
    });
    this.vibOff.on('pointertap', function () {
      WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
      optionVibFunc();
    });
  }


  this.textSizeBtn = new WG.Sprite('font_button.png', {
    x: this.optionBoard.width * -0.288,
    y: this.optionBoard.height * 0.28 -63,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });

  this.textSizeText = new WG.Text('폰트 크기', {
    x: this.optionBoard.width * -0.19,
    y: this.optionBoard.height * 0.23 -63,
    zOrder: -1,
    fontSize: 20,
    anchorX: 0,
    fill: "#493e2e",
    fontFamily: 'nanumBold',
    attach: this.optionBoard
  });


  this.textSizeOnoff = new WG.Sprite('font_size_dark.png', {
    x: this.optionBoard.width * 0.09,
    y: this.optionBoard.height * 0.31 -63,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard
  });

  this.textSizeOnoff.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
    fontSizeChange();
  });

  this.textSizeOn = new WG.Sprite('font_big_light.png', {
    x: this.textSizeOnoff.width * -0.25,
    y: 0,
    scale: 1,
    zOrder: -1,
    attach: this.textSizeOnoff,
    visible: G.textSize == 26 ? false : true
  });
  this.textSizeOn.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
   fontSizeChange();

  });

  this.textSizeOff = new WG.Sprite('font_small_light.png', {
    x: this.textSizeOnoff.width * 0.25,
    y: 0,
    scale: 1,
    zOrder: -1,
    attach: this.textSizeOnoff,
    visible: G.textSize == 26 ? true : false
  });
  this.textSizeOff.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
    fontSizeChange();

  });






  this.bgm1 = new WG.Sprite(G.gameSetting.bgm1 == true ? 'select_music.png' : 'non_select_music.png', {
    x: this.optionBoard.width * -0.01,
    y: this.optionBoard.height * -0.16 -37,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard,
  });
  this.bgm1.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
    bgmChange();
  });


  this.bgm1Text = new WG.Text('노래1', {
    x: this.optionBoard.width * 0.08,
    y: this.optionBoard.height * -0.16 -37,
    fontSize: 18,
    fontFamily: 'nanumBold',
    zOrder: -1,
    fill: "#847f7b",
    attach: this.optionBoard,
  });


  this.bgm2 = new WG.Sprite(G.gameSetting.bgm1 == true ? 'non_select_music.png' : 'select_music.png', {
    x: this.optionBoard.width * 0.19,
    y: this.optionBoard.height * -0.16 -37,
    scale: 1,
    zOrder: -1,
    attach: this.optionBoard,
  });

  this.bgm2.on('pointertap', function () {
    WG.Sound.sfxPlay('button' + Math.floor((Math.random() * 4) + 1), false);
    bgmChange();
  });

  this.bgm2Text = new WG.Text('노래2', {
    x: this.optionBoard.width * 0.28,
    y: this.optionBoard.height * -0.16 -37,
    fontSize: 18,
    fontFamily: 'nanumBold',
    zOrder: -1,
    fill: "#847f7b",
    attach: this.optionBoard,
  });










  this.creditImg = new WG.Sprite('main_title.png', {
    x: this.optionBoard.width * -0.19,
    y: this.optionBoard.height * 0.06 - 20,
    scale: 0.5,
    zOrder: -1,
    attach: this.optionBoard,
    visible: false
  });

  this.wordFromText = new WG.Text('단어 출처 : ', {
    x: this.optionBoard.width * -0.4,
    y: this.optionBoard.height * 0.38,
    fontSize: 20,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    fill: "#847f7b",
    attach: this.optionBoard,
    visible: false
  });

  this.wordFromSprite = new WG.Sprite('logo_dic.png', {
    x: this.optionBoard.width * -0.12,
    y: this.optionBoard.height * 0.38,
    scale: 0.5,
    zOrder: -1,
    attach: this.optionBoard,
    visible: false
  });

  this.creditDirector = new WG.Text('감독', {
    x: this.optionBoard.width * 0.158  - 25,
    y: this.optionBoard.height * -0.135,
    fontSize: 20,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    fill: "#847f7b",
    attach: this.optionBoard,
    visible: false
  });
  this.creditDirectorText = new WG.Text('권오현', {
    x: this.optionBoard.width * 0.32  - 25,
    y: this.optionBoard.height * -0.135,
    fontSize: 26,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    attach: this.optionBoard,
    visible: false
  });

  this.creditLeadProgramer = new WG.Text('프로그래머', {
    x: this.optionBoard.width * 0.158  - 25,
    y: this.optionBoard.height * 0.03,
    fontSize: 20,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    fill: "#847f7b",
    attach: this.optionBoard,
    visible: false
  });

  this.creditLeadProgramerText = new WG.Text('천슬별', {
    x: this.optionBoard.width * 0.32  - 25,
    y: this.optionBoard.height * 0.03,
    fontSize: 26,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    attach: this.optionBoard,
    visible: false
  });

  this.creditLeadDesigner = new WG.Text('디자이너', {
    x: this.optionBoard.width * 0.158  - 25,
    y: this.optionBoard.height * 0.2,
    fontSize: 20,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    fill: "#847f7b",
    attach: this.optionBoard,
    visible: false
  });
  this.creditLeadDesignerText = new WG.Text('한승연', {
    x: this.optionBoard.width * 0.32  - 25,
    y: this.optionBoard.height * 0.2,
    fontSize: 26,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    attach: this.optionBoard,
    visible: false
  });

  this.creditZiplabText = new WG.Text('(주)집연구소 만듦', {
    x: this.optionBoard.width * 0.17 - 25,
    y: this.optionBoard.height * 0.38,
    fontSize: 20,
    fontFamily: 'nanumBold',
    zOrder: -1,
    anchorX: 0,
    fill: "#847f7b",
    attach: this.optionBoard,
    visible: false
  });
}

function offObjEvent(obj) {
  for (var i = 0; i < obj.length; i++) {
    obj[i].off("pointerdown");
  }
}

function onDragStart(event) {
  this.startX = event.data.calc.x;
  this.alpha = 0.5;
  this.dragging = true;


}

function onDragEnd() {
  this.alpha = 1;
  if (this.x >= this.base.texture.width) {
    this.x = this.base.texture.width;
    this.target.width = this.x;
  }
  if (this.x <= 0) {
    this.x = 0;
    this.target.width = 0;
  }
  if (this.base.label == "bgm") {
    if (G.gameSetting.bgm > 1) {
      G.gameSetting.bgm = 1;
    }
    if (G.gameSetting.bgm < 0) {
      G.gameSetting.bgm = 0;
      G.gameSetting.bgmMute = true;
      this.icon.texture = 'bgm_button_hold.png';
    }
    WG.Sound.setVolume(G.gameSetting.bgm, 'bgm');
    localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
  }
  if (this.base.label == "sfx") {
    if (G.gameSetting.sfx > 1) {
      G.gameSetting.sfx = 1;
    }
    if (G.gameSetting.sfx < 0) {
      G.gameSetting.sfx = 0;
      G.gameSetting.sfxMute = true;
      // this.icon.texture = 'Soundeffects_02.png';
    }
    WG.Sound.setVolume(G.gameSetting.sfx, 'sfx');
    localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
  }
  this.dragging = false;
  // set the interaction data to null
  this.data = null;

}

function onDragBgm(event) {
  if (this.dragging) {
    this.endX = event.data.calc.x;
    this.x += (this.endX - this.startX);

    var volume = this.x / this.base.texture.width;
    G.gameSetting.bgm = volume;

    WG.Sound.setVolume(G.gameSetting.bgm, 'bgm');
    localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));

    this.icon.texture = 'bgm_button.png';
    G.gameSetting.bgmMute = false;
    this.target.width = this.x;

    if (this.x <= 0) {
      this.x = 0;
      this.icon.texture = 'bgm_button_hold.png';
      G.gameSetting.bgmMute = true;
      G.gameSetting.bgm = 0;
      this.target.width = 0;
    }
    if (this.x >= this.base.texture.width) {
      this.x = this.base.texture.width;
      this.target.width = this.x;
      G.gameSetting.bgm = 1;
    }
    this.startX = this.endX;
  }
}


function onDragSfx(event) {
  if (this.dragging) {
    this.endX = event.data.calc.x;
    this.x += (this.endX - this.startX);

    var volume = this.x / this.base.texture.width;
    G.gameSetting.sfx = volume;

    WG.Sound.setVolume(G.gameSetting.sfx, 'sfx');
    localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));

    this.icon.texture = 'sfx_button.png';
    G.gameSetting.sfxMute = false;
    this.target.width = this.x;
    if (this.x <= 0) {
      this.x = 0;
      this.icon.texture = 'sfx_button_hold.png';
      G.gameSetting.sfxMute = true;
      G.gameSetting.sfx = 0;
      this.target.width = 0;
    }
    if (this.x >= this.base.texture.width) {
      this.x = this.base.texture.width;
      this.target.width = this.x;
      G.gameSetting.sfx = 1;
    }
    this.startX = this.endX;
  }
}


function optionTabFunc() {
  if (G.isSoundTab) {
    G.isSoundTab = false;
    WG.Scene.data[WG.Scene.currentName].optionBoardInfoTab.texture = 'info_button_light.png';
    WG.Scene.data[WG.Scene.currentName].optionBoardSoundTab.texture = 'sound_button_dark.png';
    WG.Scene.data[WG.Scene.currentName].sfxBar.visible = false;
    WG.Scene.data[WG.Scene.currentName].sfxBtn.visible = false;
    WG.Scene.data[WG.Scene.currentName].sfxControl.visible = false;
    WG.Scene.data[WG.Scene.currentName].sfxSlide.visible = false;
    WG.Scene.data[WG.Scene.currentName].sfxText.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgmBar.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgmBtn.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgmControl.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgmSlide.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgmText.visible = false;
    if (/Android/i.test(navigator.userAgent)) {
      WG.Scene.data[WG.Scene.currentName].vibBtn.visible = false;
      WG.Scene.data[WG.Scene.currentName].vibText.visible = false;
      WG.Scene.data[WG.Scene.currentName].vibOnoff.visible = false;
      WG.Scene.data[WG.Scene.currentName].vibOn.visible = false;
      WG.Scene.data[WG.Scene.currentName].vibOff.visible = false;
    }
    WG.Scene.data[WG.Scene.currentName].textSizeBtn.visible = false;
    WG.Scene.data[WG.Scene.currentName].textSizeText.visible = false;
    WG.Scene.data[WG.Scene.currentName].textSizeOnoff.visible = false;
    
    if (G.textSize != 26) {
      WG.Scene.data[WG.Scene.currentName].textSizeOn.visible = false;
    } else {
      WG.Scene.data[WG.Scene.currentName].textSizeOff.visible = false;
    }



    
    WG.Scene.data[WG.Scene.currentName].bgm1.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgm1Text.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgm2.visible = false;
    WG.Scene.data[WG.Scene.currentName].bgm2Text.visible = false;








    WG.Scene.data[WG.Scene.currentName].creditImg.visible = true;
    WG.Scene.data[WG.Scene.currentName].creditDirector.visible = true;
    WG.Scene.data[WG.Scene.currentName].creditDirectorText.visible = true;
    WG.Scene.data[WG.Scene.currentName].creditLeadProgramer.visible = true;
    WG.Scene.data[WG.Scene.currentName].creditLeadProgramerText.visible = true;
    WG.Scene.data[WG.Scene.currentName].creditLeadDesigner.visible = true;
    WG.Scene.data[WG.Scene.currentName].creditLeadDesignerText.visible = true;
    WG.Scene.data[WG.Scene.currentName].creditZiplabText.visible = true;
    WG.Scene.data[WG.Scene.currentName].wordFromSprite.visible = true;
    WG.Scene.data[WG.Scene.currentName].wordFromText.visible = true;

    
    
    return;



  } else {
    G.isSoundTab = true;
    WG.Scene.data[WG.Scene.currentName].optionBoardInfoTab.texture = 'info_button_dark.png';
    WG.Scene.data[WG.Scene.currentName].optionBoardSoundTab.texture = 'sound_button_light.png';


    WG.Scene.data[WG.Scene.currentName].sfxBar.visible = true;
    WG.Scene.data[WG.Scene.currentName].sfxBtn.visible = true;
    WG.Scene.data[WG.Scene.currentName].sfxControl.visible = true;
    WG.Scene.data[WG.Scene.currentName].sfxSlide.visible = true;
    WG.Scene.data[WG.Scene.currentName].sfxText.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgmBar.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgmBtn.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgmControl.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgmSlide.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgmText.visible = true;
    if (/Android/i.test(navigator.userAgent)) {
      WG.Scene.data[WG.Scene.currentName].vibBtn.visible = true;
      WG.Scene.data[WG.Scene.currentName].vibText.visible = true;
      WG.Scene.data[WG.Scene.currentName].vibOnoff.visible = true;
      if (G.isVibTab) {
        WG.Scene.data[WG.Scene.currentName].vibOn.visible = true;
      } else {
        WG.Scene.data[WG.Scene.currentName].vibOff.visible = true;
      }
    }

    WG.Scene.data[WG.Scene.currentName].textSizeBtn.visible = true;
    WG.Scene.data[WG.Scene.currentName].textSizeText.visible = true;
    WG.Scene.data[WG.Scene.currentName].textSizeOnoff.visible = true;
 
    
    if (G.textSize != 26) {
      WG.Scene.data[WG.Scene.currentName].textSizeOn.visible = true;
    } else {
      WG.Scene.data[WG.Scene.currentName].textSizeOff.visible = true;
    }




    WG.Scene.data[WG.Scene.currentName].bgm1.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgm1Text.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgm2.visible = true;
    WG.Scene.data[WG.Scene.currentName].bgm2Text.visible = true;

    WG.Scene.data[WG.Scene.currentName].creditImg.visible = false;
    WG.Scene.data[WG.Scene.currentName].creditDirector.visible = false;
    WG.Scene.data[WG.Scene.currentName].creditDirectorText.visible = false;
    WG.Scene.data[WG.Scene.currentName].creditLeadProgramer.visible = false;
    WG.Scene.data[WG.Scene.currentName].creditLeadProgramerText.visible = false;
    WG.Scene.data[WG.Scene.currentName].creditLeadDesigner.visible = false;
    WG.Scene.data[WG.Scene.currentName].creditLeadDesignerText.visible = false;
    WG.Scene.data[WG.Scene.currentName].creditZiplabText.visible = false;
    WG.Scene.data[WG.Scene.currentName].wordFromSprite.visible = false;
    WG.Scene.data[WG.Scene.currentName].wordFromText.visible = false;
    return;
  }

}

function optionVibFunc() {
  if (G.isVibTab) {
    G.isVibTab = false;
    WG.Scene.data[WG.Scene.currentName].vibOn.visible = false
    WG.Scene.data[WG.Scene.currentName].vibOff.visible = true;
    G.gameSetting.vib = false;
  } else {
    G.isVibTab = true;
    WG.Scene.data[WG.Scene.currentName].vibOn.visible = true;
    WG.Scene.data[WG.Scene.currentName].vibOff.visible = false;
    G.gameSetting.vib = true;
  }
  localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
}

function bgmChange() {

  G.gameSetting.bgm1 = G.gameSetting.bgm1 == true ? false : true;
  WG.Scene.data[WG.Scene.currentName].bgm1.texture = G.gameSetting.bgm1 == true ? 'select_music.png' : 'non_select_music.png';
  WG.Scene.data[WG.Scene.currentName].bgm2.texture = G.gameSetting.bgm1 == true ? 'non_select_music.png' : 'select_music.png';
  localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));
  WG.Sound.bgmStop();
  if (WG.Scene.currentName == "title") {
    WG.Sound.bgmPlay(G.gameSetting.bgm1 == true ? 'treehouse_lobby' : 'countryside_lobby');
  }

  if (WG.Scene.currentName == "Ingame") {
    if (G.gameMode == "stage") {
      WG.Sound.bgmPlay(G.gameSetting.bgm1 == true ? 'treehouse_game' : 'countryside_game');
    } else if (G.gameMode == "time") {
      WG.Sound.bgmPlay("quick");
    }

  }

}



// function onDragSfx(event) {
//   if (this.dragging) {
//       this.endX = event.data.calc.x;
//       this.x += (this.endX - this.startX);

//       var volume = this.x / this.base.texture.width;
//       G.gameSetting.sfx = volume;

//       WG.Sound.setVolume(G.gameSetting.sfx, 'sfx');
//       localStorage.setItem('GD_picker_gameSetting', JSON.stringify(G.gameSetting));

//       // this.icon.texture = 'Soundeffects_01.png';
//       G.gameSetting.sfxMute = false;
//       this.target.width = this.x;
//       if (this.x <= 0) {
//           this.x = 0;
//           // this.icon.texture = 'Soundeffects_02.png';
//           G.gameSetting.sfxMute = true;
//           G.gameSetting.sfx = 0;
//           this.target.width = 0;
//       }
//       if (this.x >= this.base.texture.width) {
//           this.x = this.base.texture.width;
//           this.target.width = this.x;
//           G.gameSetting.sfx = 1;
//       }
//       this.startX = this.endX;
//   }
// }