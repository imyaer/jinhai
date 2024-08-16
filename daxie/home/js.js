function convertCurrency(currencyDigits) { 
// Constants: 
    var MAXIMUM_NUMBER = 99999999999.99; 
    // Predefine the radix characters and currency symbols for output: 
    var CN_ZERO = "零"; 
    var CN_ONE = "壹"; 
    var CN_TWO = "贰"; 
    var CN_THREE = "叁"; 
    var CN_FOUR = "肆"; 
    var CN_FIVE = "伍"; 
    var CN_SIX = "陆"; 
    var CN_SEVEN = "柒"; 
    var CN_EIGHT = "捌"; 
    var CN_NINE = "玖"; 
    var CN_TEN = "拾"; 
    var CN_HUNDRED = "佰"; 
    var CN_THOUSAND = "仟"; 
    var CN_TEN_THOUSAND = "万"; 
    var CN_HUNDRED_MILLION = "亿"; 
    var CN_SYMBOL = ""; 
    var CN_DOLLAR = "元"; 
    var CN_TEN_CENT = "角"; 
    var CN_CENT = "分"; 
    var CN_INTEGER = "整"; 
     
// Variables: 
    var integral;    // Represent integral part of digit number. 
    var decimal;    // Represent decimal part of digit number. 
    var outputCharacters;    // The output result. 
    var parts; 
    var digits, radices, bigRadices, decimals; 
    var zeroCount; 
    var i, p, d,ds; 
    var quotient, modulus; 
     
// Validate input string: 
    currencyDigits = currencyDigits.toString(); 
    if (currencyDigits == "") { 
        alert("不能为空 请输入数字金额!如：123.23"); 
        return ""; 
    } 
    if (currencyDigits.match(/[^,.\d]/) != null) { 
        alert("输入字符串中的字符无效!"); 
        return ""; 
    } 
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) { 
        alert("请输入正确的数字金额!"); 
        return ""; 
    } 
     
// Normalize the format of input digits: 
    currencyDigits = currencyDigits.replace(/,/g, "");    // Remove comma delimiters. 
    currencyDigits = currencyDigits.replace(/^0+/, "");    // Trim zeros at the beginning. 
    // Assert the number is not greater than the maximum number. 
    if (Number(currencyDigits) > MAXIMUM_NUMBER) { 
        alert("数值太大无法转换!"); 
        return ""; 
    } 
     
// Process the coversion from currency digits to characters: 
    // Separate integral and decimal parts before processing coversion: 
    parts = currencyDigits.split("."); 
    if (parts.length > 1) { 
        integral = parts[0]; 
        decimal = parts[1]; 
        // Cut down redundant decimal digits that are after the second. 
        decimal = decimal.substr(0, 2); 
    } 
    else { 
        integral = parts[0]; 
        decimal = ""; 
    } 
    // Prepare the characters corresponding to the digits: 
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE); 
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND); 
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION); 
    decimals = new Array(CN_TEN_CENT, CN_CENT); 
    // Start processing: 
    outputCharacters = ""; 
    // Process integral part if it is larger than 0: 
    if (Number(integral) > 0) { 
        zeroCount = 0; 
        for (i = 0; i < integral.length; i++) { 
            p = integral.length - i - 1; 
            d = integral.substr(i, 1); 
            quotient = p / 4; 
            modulus = p % 4; 
            if (d == "0") { 
                zeroCount++; 
            } 
            else { 
                if (zeroCount > 0) 
                { 
                    outputCharacters += digits[0]; 
                } 
                zeroCount = 0; 
                outputCharacters += digits[Number(d)] + radices[modulus]; 
            } 
            if (modulus == 0 && zeroCount < 4) { 
                outputCharacters += bigRadices[quotient]; 
            } 
        } 
        outputCharacters += CN_DOLLAR; 
    } 
    // Process decimal part if there is: 
    if (decimal != "") { 
        for (i = 0; i < decimal.length; i++) { 
            d = decimal.substr(i, 1); 
            ds=decimal.substr(-1, 1);
			if(d==0){
				if(ds==0){
					outputCharacters += "";
					}
				else{
				outputCharacters += digits[Number(d)];
				}
				}
			else{
				
			outputCharacters += digits[Number(d)] + decimals[i];
			
			}
        } 
    } 
    // Confirm and return the final output string: 
    if (outputCharacters == "") { 
        outputCharacters = CN_ZERO + CN_DOLLAR; 
    } 
    if (decimal == "") { 
        outputCharacters += CN_INTEGER; 
    } 
    outputCharacters = CN_SYMBOL + outputCharacters; 
    return outputCharacters; 
}
function CopyText() {  
	var Url2=document.getElementById("Result");//要复制文字的节点
	if (Url2.value) {
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {//区分iPhone设备
			var el = document.createElement('input');
			el.value = Url2.value;//要复制的内容
			el.style.opacity = '0';
			document.body.appendChild(el);
			var editable = el.contentEditable;
			var readOnly = el.readOnly;
			el.contentEditable = true;
			el.readOnly = false;
			const range = document.createRange();
			range.selectNodeContents(el);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
			el.setSelectionRange(0, 999999);
			el.contentEditable = editable;
			el.readOnly = readOnly;
			var ret = document.execCommand('copy');
			el.blur();
			if(ret){
				alert("复制成功")
			}else{
				alert("复制失败，请手动复制") 
			}
		}else{
			Url2.select(); // 选择对象
			//document.execCommand("Copy"); // 执行浏览器复制命令
			Url2.blur();
			if(document.execCommand('copy', false, null)){
				var successful = document.execCommand('copy');// 执行浏览器复制命令
				alert("复制成功")
			}else{
				alert("复制失败，请手动复制")
			};
		}
	} else {
		alert("内容不能为空");
	}
}

// 设置为首页
function setHome(obj,vrl){
    try{
        obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
    }
    catch(e){
		console.log(e);
        if(window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',vrl);
        }else{
            alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。");
        }
    }
};

// 加入收藏 兼容360和IE6
function shoucang(sTitle,sURL) {
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
		console.log(e);
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

