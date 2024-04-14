/**
 * @Description: flatted.js将dealCrypt处理过function的js对象转成字符串
 * @Author: MuYi086
 * @Email: 1258947325@qq.com
 * @Blog: https://github.com/MuYi086/blog
 * @Date: 2019/07/03 09:26
 */
$(function () {
  //给页面增加一个固定定位的按钮
  let fixedStr='<div style="position: fixed;bottom:50px;right:60px;height:50px;z-index:10000;" class="fixedButton">' +
  '<input type="text" id="playListId" placeholder="输入歌单id" />'+
  '<button id="getListInfo" style="width:80px;height:25px;font-size:10px;">下载歌单</button>'+
  // '<button id="getSongInfo" style="width:80px;height:25px;font-size:10px;">获取歌曲</button>'+
  // '<button id="getLofterSong" style="width:80px;height:25px;font-size:10px;">lofter歌曲</button>'+
  '</div>'
  $('body').append(fixedStr)
  // 分析请求必须的js
  // 点击下载歌单
  $('#getListInfo').click(function () {
    let id = $('#playListId').val()
    eve.emit('encryptStart', id)
  })
  // 获取单曲歌曲信息
  $('#getSongInfo').click(function () {
    let id = $('#playListId').val()
    eve.emit('getSingleSongStart', id)
  })
  // lofter获取歌曲信息
  // 获取单曲歌曲信息
  $('#getLofterSong').click(function () {
    let id = $('#playListId').val()
    getMusicDetail(id)
  })
  // 接口请求分析
  // detail接口: {"id":"5101959860","offset":"0","total":"true","limit":"1000","n":"1000","csrf_token":"abbd0ab5e81a88e5a04c331e54817710"}
  // 下载歌曲
  function downMusic (arr) {
    if (arr.length > 0) {
      arr.forEach(item => {
        let defaultUrl = 'http://music.163.com/song/media/outer/url?id='
        // let idAndExtension = calCurrentBestQuality(item)
        let href = defaultUrl + item.id
        // 歌单详情:https://music.163.com/api/playlist/detail?id=2557908184 才20项
        let name = item.name + '.mp3'
        // 由于同源策略，浏览器默认会预览文件，而不是下载，改用blob
        axios({
          method:'get',
          url: href,
          responseType: 'blob'
        }).then(function(res) {
          let aa = document.createElement('a')
          let aHref = URL.createObjectURL(new Blob([res.data]))
          aa.setAttribute('href', aHref)
          aa.setAttribute('download', name)
          aa.click()
        })
      })
    }
  }
  // 批量下载歌曲
  function downMany (arr) {
    if (arr.length > 0) {
      arr.forEach(item => {
        let href = item.url
        let name = item.name + '.mp3'
        // 由于同源策略，浏览器默认会预览文件，而不是下载，改用blob
        axios({
          method:'get',
          url: href,
          responseType: 'blob'
        }).then(function(res) {
          let aa = document.createElement('a')
          let aHref = URL.createObjectURL(new Blob([res.data]))
          aa.setAttribute('href', aHref)
          aa.setAttribute('download', name)
          aa.click()
        })
      })
    }
  }
  // 计算出当前的最佳音质
  function calCurrentBestQuality (obj) {
    if (obj.hasOwnProperty('hMusic')) {
      return [obj.hMusic.id, obj.hMusic.extension]
    } else if (obj.hasOwnProperty('mMusic')) {
      return [obj.mMusic.id, obj.mMusic.extension]
    } else {
      return [obj.lMusic.id, obj.lMusic.extension]
    }
  }
  // 给页面创建一个脚本,用于获取全局的window对象
  function getGlobalWindow () {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.text = 'function deepCopy (obj) {const target = {};if ((!obj && typeof obj != "undefined" && obj != 0) || typeof obj !== "object") {return obj};for (const key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {if (typeof obj[key] === "object") {target[key] = this.deepCopy(obj[key])} else {target[key] = obj[key]}}};return target};function getWindow() { console.log(window) };getWindow();'
    document.body.appendChild(script)
  }
  // 初始化，获取全局的window对象
  // getGlobalWindow()
  // 全局监听加密完成事件
  eve.on('encryptFinished', readyToQuest)
  eve.on('getSingleSongFinished', singleSongReadyToQuest)
  eve.on('get163MailSongFinished', mail163SongReadyToQuest)
  // 获取歌曲列表
  function readyToQuest (data) {
    let url = 'https://music.163.com/weapi/v6/playlist/detail?csrf_token='
    url += window.crsfToken
    let query = {
      params: data.encText,
      encSecKey: data.encSecKey
    }
    let newQuery = Qs.stringify(query)
    axios.post(url, newQuery)
    .then(function (res) {
      let tracks = res.data.playlist.tracks
      // 遍历，拿到mp3的真实地址
      let audioArr = getRealAddress(tracks)
      // downMusic(tracks)
    })
    .catch(function (err) {
      console.log(err)
    })
  }
  function getRealAddress (arr) {
    let promiseArr = []
    let nameArr = []
    if (arr.length > 0) {
      arr.forEach(item => {
        let id = item.id
        nameArr.push(item)
        // eve.emit('getSingleSongStart', id)
        let data = singleCsrfToken(id)
        let p1 = new Promise(function (resolve, reject) {
          let url = 'https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token='
          url += window.crsfToken
          let query = {
            params: data.encText,
            encSecKey: data.encSecKey
          }
          let newQuery = Qs.stringify(query)
          axios.post(url, newQuery)
          .then(function (res) {
            resolve(res)
          })
          .catch(function (err) {
            reject(err)
          })
        })
        promiseArr.push(p1)
      })
    }
    Promise.all(promiseArr).then(function (res) {
      // 处理res成downMany需要的数组形式
      let arr = []
      if (res.length > 0) {
        res.forEach(item => {
          arr.push(item.data.data[0])
        })
      }
      // 匹配歌曲名字
      if (arr.length > 0) {
        arr.forEach(item => {
          nameArr.forEach(li => {
            if (item.id == li.id) {
              item.name = li.name
            }
          })
        })
      }
      // 批量下载歌曲
      downMany(arr)
    })
  }
  // 获取歌曲详情
  function singleSongReadyToQuest (data) {
    let url = 'https://music.163.com/weapi/song/enhance/player/url/v1?csrf_token='
    url += window.crsfToken
    let query = {
      params: data.encText,
      encSecKey: data.encSecKey
    }
    let newQuery = Qs.stringify(query)
    axios.post(url, newQuery)
    .then(function (res) {
      console.log(res)
      downloadAudioFromDetail(res.data.data)
    })
    .catch(function (err) {
      console.log(err)
    })
  }
  // 下载歌曲
  function downloadAudioFromDetail (arr) {
    if (arr.length > 0) {
      arr.forEach(item => {
        let href = item.url
        let id = item.id
        let name
        window.audioList.forEach(li => {
          if (id === li.id) {
            name = li.name
          }
        })
        // 由于同源策略，浏览器默认会预览文件，而不是下载，改用blob
        axios({
          method:'get',
          url: href,
          responseType: 'blob'
        }).then(function(res) {
          let aa = document.createElement('a')
          let aHref = URL.createObjectURL(new Blob([res.data]))
          aa.setAttribute('href', aHref)
          aa.setAttribute('download', name + '.mp3')
          aa.click()
        })
      })
    }
  }
  // 来自linux的破解
  // function singleSongReadyToQuest (data) {
  //   let url = 'https://music.163.com/api/linux/forward'
  //   let query = {
  //     eparams: '3134729CC09796CB31F2FFF45684A58FCFA972FA5EA3D6247CD6247C8198CB8748CD759EE9B12828BD745AC17A3E8E1422C3DEB43E0839C64C47C3B14364EAAAD0A222DF9CE9B1BE260F0A819B3EC93C2B9459ADCD79CC54CBDCA58519B2F637778034A856CB5852E39F71C9A52D2DB6BB06948ED0EA54B20A23110445000682'
  //   }
  //   let newQuery = Qs.stringify(query)
  //   axios.post(url, newQuery)
  //   .then(function (res) {
  //     console.log(res)
  //   })
  //   .catch(function (err) {
  //     console.log(err)
  //   })
  // }
  // 163邮箱
  function mail163SongReadyToQuest (data) {
    let url = 'https://music.163.com/weapi/song/enhance/player/url?ref=mail&csrf_token='
    url += window.crsfToken
    let query = {
      params: data.encText,
      encSecKey: data.encSecKey
    }
    let newQuery = Qs.stringify(query)
    axios.post(url, newQuery)
    .then(function (res) {
      console.log(res)
    })
    .catch(function (err) {
      console.log(err)
    })
  }
  // 查询音乐详情接口
  function getMusicDetail (id) {
    let url = 'http://music.163.com/api/song/detail/?ids='
    let ids = '[' + id + ']'
    let href = url + ids
    axios({
      method:'get',
      url: href,
    }).then(function(res) {
      console.log(res)
    })
  }
})