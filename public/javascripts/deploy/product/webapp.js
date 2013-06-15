var DeployWebapp = (function() {
    var Controller = (function(){
        var Callback = {
            "success": function(data){
                View.toPostDeployState(data);
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        return {
            "onDeployBtnClick": function(event) {
                event.preventDefault();
                Model.deploy(Callback);
            }
        };
    })();

    var View = (function(){
        return {
            "toPostDeployState" : function (data) {
                $("#jsDeployBtn").attr("disabled", "disabled");
                $("#jsPostDeployMsg").show();
                $("#jsDeployResult").text(data.result);
                $("#jsDeployResult").show();
            }
        };
    })();

    var Model = (function(){
        return {
            "deploy" : function(callback) {
                $("#deployForm").ajaxSubmit({
                    type: "post",
                    success: function(data) {callback.success(data);},
                    error: function(xhr) {callback.error(JSON.parse(xhr.responseText));}
                });
            }
        };
    })();

    return {
        "initialize" : function() {
            $("#jsDeployBtn").click(Controller.onDeployBtnClick);
        }
    };
})();

$(function() {
    DeployWebapp.initialize();
});
