var PickupTag = (function() {
    var search_tag_url = "http://sp.nicovideo.jp/tag/";
    var Controller = (function(){
        var StoreStagingCallback = {
            "success": function(data){
                View.toPostStagingState();
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        var StoreProductCallback = {
            "success": function(data){
                View.toPostProductState();
            },
            "error": function(data){
                alert("エラーが発生しました：" + data.error.code);
            }
        };
        var isAllTagsValid = function() {
            for (var i = 0; i < 6; i++) {
                var tag_value = $("#pickupTag" + i).val();
                if (!tag_value) {
                    alert("全フィールドに値を入力してください");
                    return false;
                }
                if (tag_value.match(/[　\s]+/)) {
                    alert("タグには全角/半角スペースを含められません\n対象：" + tag_value);
                    return false;
                }
                if (countStringLength(tag_value) > 40) {
                    alert("タグの長さは、全角文字を「1」、半角文字を「0.5」とカウントして、合計「20」以下としてください\n対象：" + tag_value);
                    return false;
                }
            }
            return true;
        };
        var countStringLength = function(str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                var c = str.charCodeAt(i);
                if ((c < 256 || (c >= 0xff61 && c <= 0xff9f))) {
                    len++;
                } else {
                    len += 2;
                }
            }
            return len;
        };
        return {
            "onCheckBtnClick": function(event) {
                event.preventDefault();
                if (isAllTagsValid()) {
                    View.toPreviewState();
                }
            },
            "onCancelBtnClick": function(event) {
                event.preventDefault();
                View.toInputState();
            },
            "onStagingBtnClick": function(event) {
                event.preventDefault();
                Model.storeStaging(StoreStagingCallback);
            },
            "onProductBtnClick": function(event) {
                event.preventDefault();
                Model.storeProduct(StoreProductCallback);
            },
            "onSearchTagBtnClick": function(event) {
                event.preventDefault();
                var key = $(this).closest(".dl-horizontal").children("input").val();
                if (key) {
                    window.open(search_tag_url + key);
                } else {
                    alert("値を入力してください");
                }
            }
        };
    })();
    
    var View = (function(){
        var setInputFieldsDisabled = function(isDisabled) {
            for (var i = 0; i < 6; i++) {
                $("#pickupTag" + i).prop("disabled", isDisabled);
            }
        };
        var copyInputValues = function() {
            var preview_frame = $("#previewFrame").contents();
            for (var i = 0; i < 6; i++) {
                var tag_value = $("#pickupTag" + i).val();
                var preview_tag = preview_frame.find("#checkPickupTag" + i);
                preview_tag.attr("href", search_tag_url + tag_value);
                preview_tag.children("p").text(tag_value);
                
                var hidden_tag = $("input[name='pickupTags[" + i + "].name']");
                hidden_tag.val(tag_value);
            }
        };
        return {
            "toInputState" : function () {
                setInputFieldsDisabled(false);
                $("#cancelBtn").hide();
                $("#checkBtn").show();
                $("#mainBottom").hide();
                $("#postStagingMsg").hide();
                $("#postProductMsg").hide();
            },
            "toPreviewState" : function () {
                setInputFieldsDisabled(true);
                copyInputValues();
                $("#checkBtn").hide();
                $("#cancelBtn").show();
                $("#stagingBtn").removeAttr("disabled");
                $("#productBtn").attr("disabled", "disabled");
                $("#mainBottom").show();
            },
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
        var store = function (url, callback){
            $("#tagsForm").ajaxSubmit({
                url: url,
                type: "post",
                success: function(data) {callback.success(data);},
                error: function(xhr) {callback.error(JSON.parse(xhr.responseText));}
            });
        };
        return {
            "storeStaging" : function(callback) {
                store("/api/pickup/tag/staging/store", callback);
            },
            "storeProduct" : function(callback) {
                store("/api/pickup/tag/product/store", callback);
            }
        };
    })();
    
    return {
        "initialize" : function() {
            $("#checkBtn").click(Controller.onCheckBtnClick);
            $("#cancelBtn").click(Controller.onCancelBtnClick);
            $("#stagingBtn").click(Controller.onStagingBtnClick);
            $("#productBtn").click(Controller.onProductBtnClick);
            $(".jsSearchTagBtn").click(Controller.onSearchTagBtnClick);
        }
    };
})();

$(function() {
    PickupTag.initialize();
});
