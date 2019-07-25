(function(window){
    
    function Player($audio){
        return new Player.prototype.init($audio);
    }
    
    Player.prototype={
        constructor:Player,
        init:function($audio){
            this.$audio=$audio;
            this.audio=$audio.get(0);
        },//函数原型
        index:null,
        update:false,
        // 正在播放的歌曲索引
        playMusic:function(url,key,time,timeText){
            if(key){
                this.$audio.attr("src",url);
                this.audio.play();
            }else{
                this.audio.pause();
            }
        },
        // 控制时间和进度条的播放
        timeBarUpdate:function(){
            var $this=this;
            var $time=$(".time");
            var $timeBarIn=$(".timeBar-in");
            var $timePoint=$(".timePoint");
            this.$audio.on("timeupdate",function(){
                if($this.update) return;
                var duration=$this.audio.duration;
                // 获取总的时间
                var current=$this.audio.currentTime;
                // 获取当前的播放时间
                var durationMin=parseInt(duration/60);
                var durationSecond=parseInt(duration%60);
                var currentMin=parseInt(current/60);
                var currentSecond=parseInt(current%60);
                var timeStr="00:00/00:00";
                var value=current/duration*100;
                $timeBarIn.css("width",value+"%");
                $timePoint.css("left",value+"%");
                if(durationMin<10){
                    durationMin="0"+durationMin;
                }
                if(durationSecond<10){
                    durationSecond="0"+durationSecond;
                }
                if(currentMin<10){
                    currentMin="0"+currentMin;
                }
                if(currentSecond<10){
                    currentSecond="0"+currentSecond;
                }
                timeStr=currentMin+":"+currentSecond+"/"+durationMin+":"+durationSecond;
                $time.text(timeStr);
            });
        }
    };
    Player.prototype.init.prototype=Player.prototype;
    window.Player=Player;
})(window)