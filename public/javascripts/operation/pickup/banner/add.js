var PickupBanner = (function() {
    var Controller = (function() {
        var StoreCallback = {
            "success": function(data) {
                alert("保存しました");
                location.href = "/operation/pickup/banner";
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code + "/" + data.error.message);
            }
        };
        
        return {
            "onStoreBtnClick": function(event) {
                event.preventDefault();
                Model.store(StoreCallback);
            }
        };
    })();
    
    var Model = (function() {
        var storeApi = function (url, callback) {
            $("#bannerForm").ajaxSubmit({
                url: url,
                type: "post",
                success: function(data) {callback.success(data);},
                error: function(xhr) {callback.error(JSON.parse(xhr.responseText));}
            });
        };
        return {
            "store" : function(callback) {
                storeApi("/api/pickup/banner/add", callback);
            }
        };
    })();
    
    return {
        "initialize" : function() {
            $("#storeBtn").click(Controller.onStoreBtnClick);
        }
    };
})();

$(function() {
    PickupBanner.initialize();
});
