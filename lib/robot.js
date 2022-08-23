$(function () {
    //封装用户输入函数getnews()
    function getnews() {
        //获取用户输入的值(两端去除空格)
        let text = $(".userInput").val().trim();
        //判断输入值是否为空
        if (text.length <= 0) {
            return $(".userInput").val("");
        } else {
            //不为空追加数据
            $(".neirong").append(`
            <ul class="right-news">
                <li class="two-li">${text}</li>
                <li class="one-li">
                    <img src="../images/m.png">
                </li>
            </ul>
            `);
            // 清空输入框
            $(".userInput").val("");
            // 调用getnews()函数
            getMsg(text);
        }
    }


    //绑定点击事件
    $("button").on("click", function () {
        getnews();
    })
    //绑定回车键盘事件
    $(document).on('keyup', function (event) {
        if (event.key === 'Enter') {
            getnews();
        }
    })

    //获取聊天机器人的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res);
                if (res.message === 'success') {
                    let msg = res.data.info.text;
                    $(".neirong").append(`
                    <ul class="left-news">
                        <li class="one-li">
                            <img src="../images/r.png" />
                        </li>
                        <li class="two-li">${msg}</li>
                    </ul>
                    `);
                    // 调用文字转音频方法getVoice()
                    getVoice(msg);
                }
            }
        })
        //文字转音频
        function getVoice(msg) {
            $.ajax({
                method: 'GET',
                url: 'http://www.liulongbin.top:3006/api/synthesize',
                data: { text: msg },
                success: function (res) {
                    console.log('请求成功' + res);
                    if (res.status === 200) {
                        $("#voice").attr('src', res.voiceUrl);
                    }
                }
            })
        }
    }
    
})