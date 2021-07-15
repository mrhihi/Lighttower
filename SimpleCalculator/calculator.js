(function(){
    $(document).ready(function(){
            // 滑鼠點擊按鍵
            $("button").click(function(a){
                    var btnVal = $(this).text();
                    ButtonClick(btnVal);
            });
            // 鍵盤按下 倒退鍵
          $(document).keyup(function(event){
                if (event.which == 8) ButtonClick("←");
                else if ( event.which == 13 ) ButtonClick("=");
            });
            // 鍵盤按下 數字鍵 、 + - * / C 及 小數點
            $(document).keypress(function(event){
                    if (event.which >= 48 && event.which <= 57)
                            ButtonClick(event.which - 48);
                    else if (event.which == 43) ButtonClick("+");
                    else if (event.which == 45) ButtonClick("-");
                    else if (event.which == 42) ButtonClick("*");
                    else if (event.which == 47) ButtonClick("/");
                    else if (event.which == 99) ButtonClick("C");
                    else if (event.which == 67) ButtonClick("C");
                    else if (event.which == 61) ButtonClick("=");
                    else if (event.which == 46) ButtonClick(".");
            });
    });
    
    // 數字顯示區
    var dspPanel = $(".dspPanel");
    var operators;
    var operands;
    var currentInput;
    var finalResult;
    
    Clear();
    
    /**
     * 清除並回復原始狀態
     */
    function Clear()
    {
            operators = "";
            operands = [];
            finalResult = 0.0;
            currentInput = "";
            dspPanel.text("0");        
    }
    
    /**
     * 處理按下到退鍵
     */
    function Backspace()
    {
            var tmp = dspPanel.text();
            tmp = tmp.slice(0, -1);
            currentInput = tmp;
            if (tmp == "") tmp = "0";
            dspPanel.text(tmp);
    }

    /**
     * 處理按下各種按鈕
     */
    function ButtonClick(btnVal)
    {
            if (btnVal == "←") {
                    Backspace();

            } else if (btnVal == "C") {
                    Clear();

            } else if (btnVal == "+" 
                             || btnVal == "-" 
                             || btnVal == "*" 
                             || btnVal == "/"
                             || btnVal == "=") {
                    //var tmp = dspPanel.text();
                    var tmpNum = parseFloat(currentInput||0, 10);
                    if (operators == "") {
                            operators = btnVal;
                            operands.push(tmpNum);
                            //tmp = "";
                    } else {
                            if (currentInput == "" && btnVal != "=") {
                                    operators = btnVal;
                            } else {
                                    var preNum = operands.pop();        // 取出上次暫存的數字出來計算
                                    if (operators == "+") {
                                            finalResult = preNum + tmpNum;
                                            operands.push(finalResult);
                                    } else if (operators == "-") {
                                            finalResult = preNum - tmpNum;
                                            operands.push(finalResult);                                                
                                    } else if (operators == "*") {
                                            finalResult = preNum * tmpNum;
                                            operands.push(finalResult);                                                
                                    } else if (operators == "/") {
                                            finalResult = preNum / tmpNum;
                                            operands.push(finalResult);
                                    }
                                    operators = btnVal;                 // 紀錄這次的運算符號
                            }
                    }
                  if (btnVal == "=") {
                            dspPanel.text(finalResult);
                            operators = "";
                            operands = [];
                    }
                    currentInput = "";
            }
            else
            {
                    if (currentInput == "") dspPanel.text("0"); // 前面的數字已經暫存過，讓顯示區可以輸入下一組數字
                    var tmp = dspPanel.text();
                    if (tmp == "0") {                // 避免輸入一堆 0
                            if (isNaN(btnVal)) {         // 考慮輸入非數值的情況，如果輸入的是小數點，仍然要可以輸入
                                    if (btnVal == ".") {
                                            tmp = "0.";
                                    }
                            } else {                     // 如果顯示區是 0 直到輸入數值的時候才允許輸入
                                    tmp = btnVal;                    
                            }
                    } else {
                            if (btnVal == "." && tmp.indexOf(".")>=0 ) {  // 避免輸入一堆 小數點
                            } else {
                                tmp = tmp + btnVal;               // 其他情況一律把數字串接起來1+2+3==ff
                            }
                    }
                    dspPanel.text(tmp);              // 結果顯示於顯示區
                    currentInput = tmp;
            }
            $("#debugArea").html("<pre>\n" +
                                                     "operators:" + operators + "\n" +
                                                     "operands:" + JSON.stringify(operands) + "\n" +
                                                     "currentInput:" + currentInput + "\n" +
                                                     "finalResult:" + finalResult + "\n" +
                                                     "</pre>");
    }    
})();








