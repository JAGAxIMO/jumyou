var SiteTopInformation = (function() {
    var Controller = (function() {
        var StoreCallback = {
            "success": function(data) {
                alert("保存しました");
                location.href = "/operation/information";
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code + "/" + data.error.message);
            }
        };
        
        return {
            "onCheckBtnClick": function(event) {
                event.preventDefault();
                View.toPreviewState();
            },
            "onCancelBtnClick": function(event) {
                event.preventDefault();
                View.toInputState();
            },
            "onStoreBtnClick": function(event) {
                event.preventDefault();
                Model.store(StoreCallback);
            }
        };
    })();
    
    var View = (function() {
        var setInputFieldsDisabled = function(isDisabled) {
            $("input").prop("disabled", isDisabled);
            $("select").prop("disabled", isDisabled);
        };
        var setupPreview = function() {
            var preview_frame = $("#previewFrame").contents();
            
            preview_frame.find("p.contentsTxtInfo").text($("#text_line").val());
            
            var url = $("#url").val();
            var a = preview_frame.find("a");
            if (url) {
                a.attr("href", url);
            } else {
                a.removeAttr("href");
            }
        };
        return {
            "toInputState" : function () {
//                setInputFieldsDisabled(false);
                $("#checkBtn").show();
                $("#cancelBtn").hide();
                $("#mainBottom").hide();
            },
            "toPreviewState" : function () {
//                setInputFieldsDisabled(true);
                setupPreview();
                $("#checkBtn").hide();
                $("#cancelBtn").show();
                $("#mainBottom").show();
            }
        };
    })();
    
    var Model = (function() {
        var storeApi = function (url, callback) {
            $("#selectionForm").ajaxSubmit({
                url: url,
                type: "post",
                success: function(data) {callback.success(data);},
                error: function(xhr) {callback.error(JSON.parse(xhr.responseText));}
            });
        };
        return {
            "store" : function(callback) {
                storeApi("/api/information/update", callback);
            }
        };
    })();
    
    return {
        "initialize" : function() {
            $("#checkBtn").click(Controller.onCheckBtnClick);
            $("#cancelBtn").click(Controller.onCancelBtnClick);
            $("#storeBtn").click(Controller.onStoreBtnClick);
        }
    };
})();

$(function() {
    SiteTopInformation.initialize();
});
