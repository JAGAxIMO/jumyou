var Login = (function() {
    var Controller = (function(){
        var Callback = {
            "success": function(data){
                location.href = "/";
            },
            "error": function(data){
                switch (data.error.code) {
                    case "unauthenticated":
                        alert("認証に失敗しました");
                        break;
                    default:
                        alert("エラーが発生しました：" + data.error.code);
                        break;
                }
            }
        };
        return {
            "onLoginBtnClick": function(event) {
                event.preventDefault();
                Model.login(Callback);
            }
        };
    })();
    
    var Model = (function(){
        return {
            "login" : function(callback) {
                $("#jsLoginForm").ajaxSubmit({
                    url: "/api/authenticate/login",
                    type: "post",
                    success: function(data) {callback.success(data);},
                    error: function(xhr) {callback.error(JSON.parse(xhr.responseText));}
                });
            }
        };
    })();
    
    return {
        "initialize" : function() {
            $("#jsLoginBtn").click(Controller.onLoginBtnClick);
        }
    };
})();

$(function() {
    Login.initialize();
});
