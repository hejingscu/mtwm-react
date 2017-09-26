import React from 'react'

const Main=React.createClass({
  componentDidMount(){
    //解决底部有fixed元素时在微信浏览器中露出灰色底背景
    //滑动到底部时移除touchmove事件
    var $document = $(document);
    var $window = $(window);
    $window.scroll(function(){
        var preHandler = function(e){e.preventDefault();}
        if ($document.scrollTop() + $window.height() + 1 >= $document.height()) {
            //此时到达底部，prevent touchmove事件
            document.addEventListener('touchmove', preHandler, false);
        } else {
            document.removeEventListener('touchmove', preHandler, false);
        }
    });
  },
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

export default Main;
