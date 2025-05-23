/**
 * @Description: render interface name, copy name and url
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2023/11/16 12:13
 */
window.onload = function () {
    // 构造插件dom
    renderExtensionDiv()
    // 监听 location 变化
    let lastUrl = window.location.href
    
    // 监听 location 变化
    const locationObserver = setInterval(function() {
        const currentUrl = window.location.href
        if (currentUrl !== lastUrl) {
            console.log('location 发生变化:', currentUrl)
            lastUrl = currentUrl
            // 重新执行 start 函数
            start()
        }
    }, 1000)
    // 开始程序
    function start () {
        const isNewWeb = location.host.includes('apipost.net')
        const apiUl = isNewWeb ? '.preview-url-link' : 'ul.apipost-doc-wrap-base-para'
        // const targetDom = isNewWeb ? '.ant-tree-node-content-wrapper' : '.ant-tree-node-content-wrapper'
        // 兼容旧版apipost网页执行逻辑
        // 延时500ms，防止接口未返回res，网页还未加载对应url
        setTimeout(() => {
            if ($(apiUl).length) {
                apiNameReset()
                main(isNewWeb)
            }
        }, 500)
    }
    // 主函数
    function main (isNewWeb) {
        let initialUrl = ''
        if (isNewWeb) {
            initialUrl = $('.preview-url-link').text()
        } else {
            initialUrl = $('ul.apipost-doc-wrap-base-para').eq(0).children('li').eq(1).find('span.apipost-cursor').text()
        }
        // 替换协议头
        const dropProtocol = initialUrl.replace(/htt(p|ps):\/\//i, '')
        // 丢弃？后参数
        const dealQuestionMark = dropParams(dropProtocol)
        // 分割目录url
        const directoryArr = dealDirectoryToArr(dealQuestionMark)
        // 丢弃域名部分
        directoryArr.shift()
        // 合成新目录路径
        const newDirectoryUrl = '/' + directoryArr.join('/')
        // 合成字符串命名
        const html = dealDirectoryToStrName(directoryArr)
        writeApiName(html, newDirectoryUrl)
    }
    function renderExtensionDiv () {
        const html = `<div class="exten-wrap panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">
                    插件生成api接口命名
                </h3>
            </div>
            <div class="panel-body body-1">
                <button type="button" class="btn btn-primary render btn-default">点击复制</button>
            </div>
            <div class="panel-body body-2">
            </div>
        </div>`
        $('body').append(html)
    }
    // 写入api命名
    function writeApiName (html, newDirectoryUrl) {
        const dom = `<div class="well well-sm well-1"></div>
            <div class="well well-sm well-2"></div>`
        $('.exten-wrap .panel-body.body-2').append(dom)
        $('.panel-body .well-1').text(html)
        $('.panel-body .well-2').text(newDirectoryUrl)
        $('button.render').click(() => {
            copyPageUrl(html, newDirectoryUrl)
        })
    }
    // dom reset
    function apiNameReset () {
        $('.exten-wrap .panel-body.body-2').empty()
    }
    // 写入剪贴板
    async function copyPageUrl(html, newDirectoryUrl) {
        try {
            const text = `${html} : '${newDirectoryUrl}'`
            await navigator.clipboard.writeText(text)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
      }
    // 分割目录url
    function dealDirectoryToArr (url) {
        return url.split('/')
    }
    // 首字母大写
    function firstLetterToUpperCase (str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
    }
    // 目录url转成数组，合并成字符串命名
    function dealDirectoryToStrName (urlArr) {
        let html = ''
        const urlLen = urlArr.length
        for (let i = 0; i < urlLen; i++) {
            const item = urlArr[i]
            html += i > 0 ? firstLetterToUpperCase(item) : item
        }
        return html
    }
    // 丢弃字符串后的参数
    function dropParams (str) {
        return str.split('?')[0]
    }
}
