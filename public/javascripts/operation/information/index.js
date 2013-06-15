var SiteTopInformation = (function() {
    var Controller = (function(){
        var DeployStagingCallback = {
            "success": function(data){
                View.toPostStagingState();
                Model.reload(ReloadCallback);
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        var DeployProductCallback = {
            "success": function(data){
                View.toPostProductState();
                Model.reload(ReloadCallback);
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        var ReloadCallback = {
            "success": function(data){
                var wrapped_data = $('<div />').html(data);
                $("#table").html($(wrapped_data).find("#table").html());
            },
            "error": function(data){
                alert("画面リロード時にエラーが発生しました");
            }
        };
        return {
            "onStagingBtnClick": function(event) {
                event.preventDefault();
                Model.deployStaging(DeployStagingCallback);
            },
            "onProductBtnClick": function(event) {
                event.preventDefault();
                Model.deployProduct(DeployProductCallback);
            }
        };
    })();
    
    var View = (function(){
        return {
            "toPostStagingState" : function () {
                $("#postStagingMsg").show();
                $("#stagingBtn").attr("disabled", "disabled");
                $("#productBtn").removeAttr("disabled");
            },
            "toPostProductState" : function () {
                $("#postProductMsg").show();
                $("#productBtn").attr("disabled", "disabled");
            }
        };
    })();
    
    var Model = (function(){
        var deploy = function (url, callback){
            $.ajax({
                    type: "post",
                    url: url,
                    success: function(data) {callback.success(data);},
                    error: function(xhr) {callback.error(JSON.parse(xhr.responseText));}
            });
        };
        return {
            "deployStaging" : function(callback) {
                deploy("/api/information/staging/deploy", callback);
            },
            "deployProduct" : function(callback) {
                deploy("/api/information/product/deploy", callback);
            },
            "reload" : function(callback) {
                var current_parameter = location.search;
                var parameter_to_add = parseInt((new Date)/1000, 10);
                if (current_parameter) {
                    parameter_to_add = current_parameter + "&" + parameter_to_add;
                } else {
                    parameter_to_add = "?" + parameter_to_add;
                }
                
                $.ajax({
                    type: "get",
                    url: "/operation/information" + parameter_to_add,
                    success: function(data) {callback.success(data);},
                    error: function(xhr) {callback.error(xhr.responseText);}
                });
            }
        };
    })();
    
    return {
        "initialize" : function() {
            $("#stagingBtn").click(Controller.onStagingBtnClick);
            $("#productBtn").click(Controller.onProductBtnClick);
        }
    };
})();

$(function() {
    SiteTopInformation.initialize();
});
