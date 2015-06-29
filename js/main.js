/**
 * Created by Baochang Li on 2015/4/29 0029.
 */
var addId,aId,bId,userAnswer,userAnswerDesc;
//==========获取统计数据===============
$(function(){
    function analytics(type,data){
        var map = {
            share: '/analytics/act/dream/share',
            nextPage: '/analytics/act/dream/next-page',
            select:'/analytics/act/dream/select'
        };
        var url = map[type];
        if(url){
            $.get(url,data||{});
        }
    }
    //============点击下一页=========
    function nextPage(){
        $.fn.fullpage.moveSectionDown();
        analytics('nextPage');
    }
    $("#wrap").css('display','block');
    //=========切屏效果===============
    $('#wrap').fullpage({
        anchors: ['page1', 'page2', 'page3', 'page4','page5'],
        normalScrollElements:'.options',
        recordHistory:false
    });
    //========1,4页点击================
    $(".next1,.next4").click(function(){
        nextPage();
    });
    $(".next1").click(function(){
        $(".next1-btn").css('display','none');
        $(".next1-btn-hover").css('display','block');
    })
    $(".next4").click(function(){
        $(".next4-btn").css('display','none');
        $(".next4-btn-hover").css('display','block');
    })
    var $ap = $(".option1 p");
    var $bp = $(".option2 p");
    //==========改变选项点击后的样式==========
    $ap.click(function(){
        $(this).css('background','#7B5AD6').siblings().css('background','');
        $('.pleaseChoice1').css('display','none');
        $('.next2-btn').css('display','block');
        aId = this.id;
    })
    $bp.click(function(){
        $(this).css('background','#7B5AD6').siblings().css('background','');
        $('.pleaseChoice2').css('display','none');
        $('.next3-btn').css('display','block');
        bId = this.id;
    })
    //=========2页判断是否已经做出选择===========
    $('.next2').click(function(){
        if(aId){
            nextPage();
            $(".next2-btn").css('display','none');
            $(".next2-btn-hover").css('display','block');
        }
    })
    //========3页判断========================
    $('.next3').click(function(){
        if(!bId){
            return false;
        }else{
            //========根据回答，查询显示结果=======
            $(".next3-btn").css('display','none');
            $(".next3-btn-hover").css('display','block');
            nextPage();
            addId = aId + bId;
            userAnswer = addId;
            userAnswerDesc = solution[userAnswer];
            var score = 0;
            var src = "";
            var title = "";
            if(userAnswerDesc){
                switch (userAnswerDesc){
                    case 1:
                        score = getRdm(1,10);
                        src = "img/ans1.png";
                        title = "我的梦想与现实的分差为"+score+"分，已经走上人生巅峰，你要来测测吗？";
                        break;
                    case 2:
                        score = getRdm(11,100);
                        src = "img/ans2.png";
                        title = "我的梦想与现实的分差为"+score+"分，只差一步之遥，你要来测测吗？";
                        break;
                    case 3:
                        score = getRdm(101,500);
                        src = "img/ans3.png";
                        title = "我的梦想与现实的分差为"+score+"分，要加把劲实现了呢，你要来测测吗？";
                        break;
                    case 4:
                        score = getRdm(501,1000);
                        src = "img/ans4.png";
                        title ="我的梦想与现实的分差为"+score+"分，只能拿梦想吹牛逼了，你要来测测吗？";
                        break;
                    //default :
                    //    alert("111");
                    //    score = getRdm(1001,5000);
                    //    src = window.configImg.special_root+"img/ans5.png";
                    //    title = "我的梦想与现实的分差为"+score+"分，不说了搬砖去了，你要来测测吗？";
                }
            }
            else{
                score = getRdm(1001,5000);
                src = "img/ans5.png";
                title = "我的梦想与现实的分差为"+score+"分，不说了搬砖去了，你要来测测吗？"
            }
            $('.grade p').text(score);              //显示分数
            $('.answer img').attr("src",src);      //显示文案
            $(document).attr('title',title)        //改变分享title
            analytics('select',{answer:userAnswer});
        }
    })
    //=========分享梦想btn============
    $('.share-dream').click(function(){
        $(".fullbg").css('display','block');
        $(".share-dream").css("display","none");
        $(".share-dream1").css('display','block');
        analytics('share');
    })
    //=========关闭===============
    $('.fullbg').click(function(){
        $(this).css('display','none');
        $(".share-dream").css("display","block");
        $(".share-dream1").css('display','none');
    })
    //=========开始逐梦btn============
    $(".start-dream").click(function(){
        $(".start-dream").css('display','none');
        $(".start-dream1").css('display','block');
    })
    //=========生成随机数==========
    function getRdm(from,to){
        return parseInt(Math.random()*(to-from+1)+from);
    }
    //=========这是结果啊=======
    var solution = {
        "a4b6":1,      //1-10
        "a5b12":1,
        "a11b2":1,
        "a1b7":2,      //10-100
        "a5b9":2,
        "a9b4":2,
        "a9b5":2,
        "a12b10":2,
        "a1b6":3,      //100-200
        "a2b7":3,
        "a4b7":3,
        "a5b8":3,
        "a6b3":3,
        "a6b4":3,
        "a6b7":3,
        "a7b4":3,
        "a7b7":3,
        "a9b2":3,
        "a9b8":3,
        "a9b10":3,
        "a11b1":3,
        "a13b10":3,
        "a1b1":4,       //500-1000
        "a1b2":4,
        "a1b3":4,
        "a1b4":4,
        "a1b5":4,
        "a1b8":4,
        "a1b9":4,
        "a1b10":4,
        "a1b11":4,
        "a1b12":4,
        "a1b13":4,
        "a1b14":4,
        "a2b1":4,
        "a2b2":4,
        "a2b3":4,
        "a2b4":4,
        "a2b5":4,
        "a2b6":4,
        "a2b8":4,
        "a2b9":4,
        "a2b10":4,
        "a2b11":4,
        "a2b12":4,
        "a2b13":4,
        "a2b14":4,
        "a3b1":4,
        "a3b2":4,
        "a3b3":4,
        "a3b4":4,
        "a3b5":4,
        "a3b6":4,
        "a3b7":4,
        "a3b8":4,
        "a3b9":4,
        "a3b10":4,
        "a3b11":4,
        "a3b12":4,
        "a3b13":4,
        "a3b14":4,
        "a5b1":4,
        "a5b2":4,
        "a5b3":4,
        "a5b4":4,
        "a5b5":4,
        "a5b6":4,
        "a5b7":4,
        "a5b10":4,
        "a5b11":4,
        "a5b13":4,
        "a5b14":4,
        "a11b3":4,
        "a11b4":4,
        "a11b5":4,
        "a11b6":4,
        "a11b7":4,
        "a11b8":4,
        "a11b9":4,
        "a11b10":4,
        "a11b11":4,
        "a11b12":4,
        "a11b13":4,
        "a11b14":4
    }
})
