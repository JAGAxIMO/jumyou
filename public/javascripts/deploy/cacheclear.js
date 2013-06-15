var CacheClear = (function() {
    var Controller = (function(){
        var ApcCallback = {
            "success": function(data){
                View.succeeApiCacheClear(data);
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        var SmartyCallback = {
            "success": function(data){
                View.succeeSmartyCacheClear(data);
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        return {
            "onClickApcCacheClear": function(event) {
                event.preventDefault();
                Model.deploy(ApcCallback, $("#jsApcCacheClearApiUrl").val());
            },
            "onClickSmartyCacheClear": function(event) {
                event.preventDefault();
                Model.deploy(SmartyCallback, $("#jsSmartyCacheClearApiUrl").val());
            }
        };
    })();

    var View = (function(){
        return {
            "succeeApiCacheClear" : function (data) {
                $("#jsApcCacheClearButton").attr("disabled", "disabled");
                $("#jsApcCacheClearResult").text(data).show();
            },
            "succeeSmartyCacheClear" : function (data) {
                $("#jsSmartyCacheClearButton").attr("disabled", "disabled");
                $("#jsSmartyCacheClearResult").text(data).show();
            }
        };
    })();

    var Model = (function(){
        return {
            "deploy" : function(callback, url) {
                $.ajax({
                    "url": url,
                    "type": "post",
                    "success": function(data) {callback.success(data);},
                    "error": function(xhr) {callback.error(JSON.parse(xhr.responseText));}
                });
            }
        };
    })();

    return {
        "initialize" : function() {
            $("#jsApcCacheClearButton").click(Controller.onClickApcCacheClear);
            $("#jsSmartyCacheClearButton").click(Controller.onClickSmartyCacheClear);
        }
    };
})();

$(function() {
    CacheClear.initialize();
});
