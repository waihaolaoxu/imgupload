/* 
  @ Name:图片上传依赖jquery.form
  @ Author:前端老徐
  @ Github：http://github.com/waihaolaoxu/imgupload
  @ date:2016-8-29
  @ example:
    $('.imgUpload').imgUpload({
        url:'http://172.0.0.1:8000',
        data:{},
        before:function(e){      //e:当前对象
            alert('上传开始...');
            // return false //如果返回false则不进行上传,可以实现一些图片上传数量限制操作
        },
        success:function(e,data){   //e:当前对象,data:返回的完整数据
            alert('上传完毕...');
        },
        error:function(e){      //e:当前对象
            alert('接口异常！');
        }
    });
*/
(function($) {
    $.fn.imgUpload = function(opt) {
        var $this = $(this),
            $form = null;
        if (!$form) {
            $form = $('<form method="post" enctype="multipart/form-data"><input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="file"></form>');
        }
        $this.click(function(event) {
            var _self=$(this);
            if(_self.hasClass('disabled')){
                return;
            }
            $form.find(':file').one('change', function() {
                _self.addClass('disabled');
                // 加载开始执行回调
                if (typeof opt.before == 'function') {
                    if(opt.before($this)===false){
                        return;
                    }
                }
                //上传中
                var options = {
                    url: opt.url,
                    dataType: "json",
                    data: opt.data ? opt.data : {},
                    success: function(data) {
                        //成功上传执行回调
                        opt.success($this,data);
                        _self.removeClass('disabled');
                    },
                    error: function(e) {
                        //接口异常执行回调
                        if (typeof opt.error == 'function') {
                            opt.error($this);
                        }
                        _self.removeClass('disabled');
                    }
                }
                $form.ajaxSubmit(options);
            }).trigger('click');
        });
    }
})(jQuery);
