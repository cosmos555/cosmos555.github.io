class RorGame {
    constructor() {
        this.score = score => this._send(`score.${score}`);

        /* isRank */
        this._isRankValue = -1;
        this.isRank = () =>
            this._isRankValue === -1 ?
            new Promise(resolve => {
                this._send("isRank");
                this._isRankResolve = resolve;
            }) :
            this._isRankValue;
        /* isRank */

        this.admob = {
            interstitialShow: fn => {
                this._send("interstitial.show");
                this.admob._finishCustom = fn || Function();
            },
            rewardedShow: fn => {
                this._send("rewarded.show");
                this.admob._finishCustom = fn || Function();
            },
            _show: Function(),
            _finish: Function(),
            _earnedReward: Function(),
            _finishCustom: Function(),
            setOnShow: fn => (this.admob._show = fn),
            setOnFinish: fn => (this.admob._finish = fn),
            setOnEarnedReward: fn => (this.admob._earnedReward = fn)
        };

        window.addEventListener("message", message => {
            switch (message.data) {
                case "ror.admob.show":
                    this.admob._show();
                    break;
                case "ror.admob.finish":
                    this.admob._finish();
                    this.admob._finishCustom();
                    break;
                case "ror.admob.earnedReward":
                    this.admob._earnedReward();
                    break;
                default:
                    if (message.data.constructor === String) {
                        if (message.data.includes("isRank")) {
                            const isRank = message.data.split("/")[1] === "true";
                            if (this._isRankResolve) {
                                this._isRankResolve(isRank);
                                this._isRankResolve = false;
                            }
                            this._isRankValue = isRank;
                        }
                    }
                    break;
            }
        });
    }

    _send(message) {
        window.parent.postMessage(message, "*");
    }
}

window.RG = new RorGame();

console.asssert = console.assert;
console.assert = (a, b) => {
    if (a === "true") {
        window.RG.score(parseFloat(b));
    } else {
        console.asssert(arguments[0], arguments[1]);
    }
};