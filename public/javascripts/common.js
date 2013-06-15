var Common = (function() {
    var Controller = (function(){
        var Callback = {
            "success": function(data){
                location.href = "/authenticate/login";
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        return {
            "onLogoutBtnClick": function(event) {
                event.preventDefault();
                Model.logout(Callback);
            }
        };
    })();
    
    var Model = (function(){
        return {
            "logout" : function(callback) {
                jQuery.ajax({
                    type: "get",
                    url: "/api/authenticate/logout",
                    success: function(data) {callback.success(data);},
                    error: function(xhr) {callback.error(JSON.parse(xhr.responseText));}
                });
            }
        };
    })();
    
    return {
        "initialize" : function() {
            $("#jsSidemenu a[href='" + location.pathname + "']").closest("li").addClass("active");
            $("#jsLogoutBtn").click(Controller.onLogoutBtnClick);
        }
    };
})();

$(function(){
	Common.initialize();
});