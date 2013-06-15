var StagingDeploy = (function() {
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
            "onClickDeployBtn": function(event) {
                event.preventDefault();
                Model.deploy(Callback);
            }
        };
    })();

    var View = (function(){
        return {
            "toPostDeployState" : function (data) {
                $("#jsDeployButton").attr("disabled", "disabled");
                $("#jsPostDeployMsg").show();
                $("#jsDeployResult").text(data).show();
            }
        };
    })();

    var Model = (function(){
        return {
            "deploy" : function(callback) {
                $.ajax({
                    "url": $("#jsAjaxUrl").val(),
                    "type": "post",
                    "success": function(data) {callback.success(data);},
                    "error": function(xhr) {callback.error(JSON.parse(xhr.responseText));}
                });
            }
        };
    })();

    return {
        "initialize" : function() {
            $("#jsDeployButton").click(Controller.onClickDeployBtn);
        }
    };
})();

$(function() {
    StagingDeploy.initialize();
});
