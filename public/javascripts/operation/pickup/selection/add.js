var PickupSelection = (function() {
    var Controller = (function() {
        var StoreCallback = {
            "success": function(data) {
                alert("保存しました");
                location.href = "/operation/pickup/selection";
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code + "/" + data.error.message);
            }
        };
        var isAllParamsValid = function() {
            for (var i = 0; i < 3; i++) {
                var text_line_value = $("#text_line"+i).val();
                if (text_line_value.length > 16) {
                    alert(""+(i+1)+"行目が16文字を超えています\n対象：" + text_line_value);
                    return false;
                }
            }
            return true;
        };
        
        return {
            "onCheckBtnClick": function(event) {
                event.preventDefault();
                if (isAllParamsValid()) {
                    View.toPreviewState();
                }
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
            
            var first_text = $("#text_line0").val();
            
            var a = preview_frame.find("a");
            a.attr("href", $("#url").val());
            a.attr("title", first_text);
            
            var table = preview_frame.find("table");
            table.attr("style", $("#style").val());
            
            var img = preview_frame.find("img");
            img.attr("src", $("#img_url").val());
            img.attr("alt", first_text);
            
            var text_dom = preview_frame.find("td.contents2TxtBlue2");
            text_dom.empty();
            for(var i = 0; i < 3; i++){
                var text = $("#text_line" + i).val();
                var style = $("#style_line" + i).val();
                if (text) {
                    if (style){
                        text = "<span style='" + style + "'>" + text + "</span>";
                    }
                    text_dom.append(text);
                }
                text_dom.append("<br/>");
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
                storeApi("/api/pickup/selection/add", callback);
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
    PickupSelection.initialize();
});
