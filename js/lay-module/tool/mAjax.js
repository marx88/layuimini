/**
 * date:2020.09.22
 * author:Marx
 * version:2.0
 * description:jquery的ajax封装
 */
layui.define(["jquery"], function (exports) {
    var $ = layui.$, mAjax, done_hook;

    mAjax = {
        setDoneHook: function (fn) {
            done_hook = fn;
        }
        /**
         * 基本请求
         * @param options 同ajax的option
         */
        , base: function (options) {
            var deferred_obj = $.ajax(options);

            // 正常响应的异步钩子
            if ('function' === typeof done_hook) {
                deferred_obj.done(done_hook);
            }

            // 打印json请求的响应日志
            if (options.dataType === 'json' && layui.cache.version === true) {
                deferred_obj.always(function (resp) {
                    console.log(resp);
                });
            }

            return deferred_obj;
        }
        /**
         * GET请求
         * @param url 接口地址
         * @param data 接口参数
         * @param done 接口成功回调
         * @param opt 同ajax的option
         */
        , get: function (url, data, done, opt) {
            opt = $.extend({}, opt || {}, {url: url, data: data, type: 'GET'});

            return mAjax.base(opt).done('function' === typeof done ? done : function () {});
        }
        /**
         * POST请求
         * @param url
         * @param data
         * @param done
         * @param opt 同ajax的option
         */
        , post: function (url, data, done, opt) {
            opt = $.extend({}, opt || {}, {url: url, data: data, type: 'POST'});

            return mAjax.base(opt).done('function' === typeof done ? done : function () {});
        }
        /**
         * getJSON
         * @param url
         * @param data
         * @param check_login
         */
        , getJSON: function (url, data, done) {
            return mAjax.get(url, data, done, {dataType: 'json'});
        }
        /**
         * 下载文件
         * @param url
         * @param data
         * @param method
         */
        , downFile: function (url, data, method) {
            var $form = $('<form target="_self"></form>');

            $form.attr({action: url, method: method || 'get'});

            if (data) {
                data = typeof data === 'string' ? data : $.param(data); // 把参数组装成 form的 input
                $.each(data.split('&'), function(index, item){
                    var pair = item.split('='), $input;

                    $input = $('<input type="hidden">')
                        .attr('name', decodeURI(pair[0]))
                        .val(void 0 === pair[1] ? '' : decodeURI(pair[1]));

                    $form.append($input);
                });
            }
            $form.append($('<input type="hidden">').attr('name', '_v').val((new Date()).getTime()));

            $form.appendTo('body').submit().remove();
        }
    };


    exports("mAjax", mAjax);
});
