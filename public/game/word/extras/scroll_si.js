function Scroll(target, seeing_height, height) {
    this._target = target;
    this.anchor = this._target.pSprite.anchor.y;
    this._height = height;
    this._seeing_height = seeing_height;
    this.originY = target.y;
    this.isScrollToTop = false;
    this.isScrollToBottom = false;
    this._startTime = Date.now();
}

Scroll.prototype.dragStart = function(event) {
    this.isScrollTop = false;
    this.isScrollBottom = false;
    this._startTime = Date.now();
    this.data = event.data;
    this._startY = event.data.global.y;
    this._target.alpha = 0.8;
    this.dragging = true;
    this.isSlide = false;
}

Scroll.prototype.dragEnd = function(event) {
    this._target.alpha = 1;
    this.dragging = false;
    this.isSlide = true;
    var anchor = this._target.pSprite.anchor.y;
    if(this._target.pSprite.anchor.y == 0){
        if (this._target.y > this.originY) {
            this.isScrollToTop = true;
        } else if (this._target.y + this._height < this.originY + this._seeing_height) {
            this.isScrollToBottom = true;
        }
    }
}

Scroll.prototype.dragMove = function(event) {
    if(this.dragging) {
        this._endY = event.data.global.y;
        this._target.y += (this._endY - this._startY) / WG.Screen._scaleRatio.height / WG.stage.scale.y;
        this.vector = (this.endY - this.startY) / ((Date.now() - this._startTime) * 1 / 5);
    }
    this._startY = event.data.global.y;
    this._startTime = Date.now();
}

Scroll.prototype.update = function() {
    if(this._target == null || this._target == undefined) return;
    if (this.isScrollToTop === true) {
        if (this._target.y - this.originY > 150) {
            this.vector = 0;
            this.isSlide = false;
            var velo = 20;
        } else if (this._target.y - this.originY >= 50) {
            var velo = 10;
        } else
            var velo = 3;
        this._target.y -= velo;
    }

    if (this.isScrollToBottom === true) {
        if (this.originY + this._seeing_height - (this._target.y + this._height) > 150) {
            this.vector = 0;
            this.isSlide = false;
            var velo = 20;
        } else if (this.originY + this._seeing_height - (this._target.y + this._height) >= 50) {
            var velo = 10;
        } else
            var velo = 3;
        this._target.y += velo;
    }

    if (this._target.y - this.originY <= 0 && this.isScrollToTop== true) {
        this._target.y = this.originY;
        this.isScrollToTop = false;
    }

    if (this.originY + this._seeing_height - (this._target.y + this._height) <= 0 && this.isScrollToBottom== true) {
        this._target.y = this.originY - this._height + this._seeing_height;
        this.isScrollToBottom = false;
    }
}