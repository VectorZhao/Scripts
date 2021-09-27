/*自行配置以下需要的数据，会v2p冲写的自行添加*/
//邀请码:J6744 有奖励的
const $ = new Env('最美阅读');
const notify = $.isNode() ? require('./sendNotify') : '';

//===================请自行抓包配置以下信息

//签到请求体(在https://open.zuimeiread.com/welfare/sign-center/里面)
const sign_center_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"751BBCBF126A4A86282ECE9778F43B28","sysVer":"11","token":"6d5ae0f37268e27740a12d27dba2c3db","appId":"1","osType":"2","p_type":"OnePlus","time":"1632708430","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`

//打开淘宝、支付宝、京东、步步赞链接(在https://open.zuimeiread.com/welfare/finish-welfare/里面)
//淘宝请求体
const finish_tb_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"5339148CBB685D72451ADD2BBCA6C1F0","sysVer":"11","token":"6d5ae0f37268e27740a12d27dba2c3db","appId":"1","welfare_id":"64","osType":"2","p_type":"OnePlus","time":"1632708141","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`
//支付宝请求体
const finish_zfb_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"E7B207B95CB8C0442CEFBA3CC88A5B9B","sysVer":"11","token":"6d5ae0f37268e27740a12d27dba2c3db","appId":"1","welfare_id":"53","osType":"2","p_type":"OnePlus","time":"1632623909","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`
//京东请求体
const finish_jd_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"BE4FFE3805A169B8F59102885218DA46","sysVer":"11","token":"6d5ae0f37268e27740a12d27dba2c3db","appId":"1","welfare_id":"54","osType":"2","p_type":"OnePlus","time":"1632623850","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`
//步步攒
const finish_bbz_body=``

//分享app请求体(在https://open.zuimeiread.com/user/share-reward/里面)
const share_app_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"A9C389256CE5DE1A9F68EB6A6BCBD849","sysVer":"11","token":"6d5ae0f37268e27740a12d27dba2c3db","appId":"1","osType":"2","p_type":"OnePlus","time":"1632624622","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`

//观看广告请求体(在https://open.zuimeiread.com/advert/video-callback/链接里面)
const advert_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"8079D74872A9AA7A89175E1CC11A591F","sysVer":"11","type":"welfare-task","token":"6d5ae0f37268e27740a12d27dba2c3db","appId":"1","osType":"2","p_type":"OnePlus","time":"1632625392","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`

//刷阅读金币请求体(在https://open.zuimeiread.com/welfare/timing-reward/里面)
const timing_reward_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"D4BB8B43AB2764A9A708CA6EE0DE25F8","sysVer":"11","cycles":"0","token":"6d5ae0f37268e27740a12d27dba2c3db","appId":"1","osType":"2","p_type":"OnePlus","time":"1632625481","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`

//刷阅读时长请求体(在https://open.zuimeiread.com/welfare/up-read-time/里面)
const up_read_body=`{"product":"1","ver":"1.0.6","marketChannel":"oppo","sign":"A851BBE9E226CE397EB1E20A9F4BDCD7","sysVer":"11","token":"6d5ae0f37268e27740a12d27dba2c3db","read_time":"40","appId":"1","osType":"2","p_type":"OnePlus","time":"1632625522","invite_code":"","packageName":"com.zuimei.wxy","udid":"1e5c6de7-0950-39bc-8070-853514a97b59"}`

//幸运转盘链接(链接中有wheel-result)
const result=`https://page.zuimeiread.com/welfare/wheel-result?token=6d5ae0f37268e27740a12d27dba2c3db`
//幸运转盘cookie
const cookie=`_csrf-frontend=637f3aa8eed095bc277f47b3a26118c2aa04fa529c76ca8dc7fab4803d4241fba%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%222nQ1vTe5RE-WZKc183iSr0BTnWXNJVpi%22%3B%7D`
//幸运转盘请求头x-csrf-token
const csrf_token=`DWgrh16qAkvDC3HPmXROZGgRqnfcYfnHx5w1y619Kjs_Bnq2KP5nfpFOXJjDPy1VUCLDJK5Ru5Opy22F5ytaUg==`


!(async () => {
    console.log(
        `=== 脚本执行 - 北京时间：${new Date(
        new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000
      ).toLocaleString()} ===\n`
    );
    //console.log(`===【共 ${app_soy_gk_authorization.length} 个账号】===\n`);
        console.log(`\n开始【做签到任务】`)
        await soy_zmyd_sign_center()
        console.log(`\n开始【做打开淘宝任务】`)
        await soy_zmyd_finish_tb()
        console.log(`\n开始【做打开支付宝任务】`)
        await soy_zmyd_finish_zfb()
        console.log(`\n开始【做打开京东任务】`)
        await soy_zmyd_finish_jd()
        console.log(`\n开始【做打开步步攒任务】`)
        await soy_zmyd_finish_bbz()
        console.log(`\n开始【做分享app任务】`)
        await soy_zmyd_share_app()
        
        console.log(`\n开始【做刷阅读金币任务】`)
        for(let cs=0;cs<10;cs++){
            await soy_zmyd_timing_reward()
            await $.wait(Math.floor(Math.random()*(5000-3000+1000)+3000))
        }
        
        console.log(`\n开始【做刷阅读时长任务】`)
        for(let cs=0;cs<10;cs++){
            await soy_zmyd_up_read()
            await $.wait(Math.floor(Math.random()*(40000-35000+1000)+35000))
        }
        
        console.log(`\n开始【做转盘任务】`)
        for(let cs=0;cs<4;cs++){
            await soy_zmyd_wheel_result()
            await $.wait(Math.floor(Math.random()*(40000-30000+1000)+30000))
        }

        console.log(`\n开始【做观看小视频任务】`)
        for(let cs=0;cs<20;cs++){
            await soy_zmyd_getad()
            await $.wait(Math.floor(Math.random()*(40000-30000+1000)+30000))
        }
        
})()
.catch((e) => $.logErr(e))
.finally(() => $.done());

function soy_zmyd_sign_center(){
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/welfare/sign-center/',
            //headers : soy_gk_headers,
            body : sign_center_body,
        }, async(error, response, data) => {
            console.log(data)
            
            resolve()
        })
    })

}
//分享app
function soy_zmyd_share_app(){
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/user/share-reward/',
            //headers : soy_gk_headers,
            body : share_app_body,
        }, async(error, response, data) => {
            console.log(data)
            
            
            resolve()
        })
    })

}

//观看视频
function soy_zmyd_getad() {
      return new Promise((resolve, reject) => {
        $.post({
            url : "https://open.zuimeiread.com/advert/video-callback/",
            //headers : soy_gk_headers,
            body : advert_body,
        }, async(error, response, data) => {
            console.log(data)
           
            resolve()
        })
    })  
}

//刷阅读金币
function soy_zmyd_timing_reward() {
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/welfare/timing-reward/',
            //headers : soy_gk_headers,
            body : timing_reward_body,
        }, async(error, response, data) => {
            console.log(data)
           
            resolve()
        })
    })
}

//刷阅读时长
function soy_zmyd_up_read() {
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/welfare/up-read-time/',
            //headers : soy_gk_headers,
            body : up_read_body,
        }, async(error, response, data) => {
            console.log(data)
           
            resolve()
        })
    })
}
//转盘
function soy_zmyd_wheel_result() {
    for(let cs=0;cs<4;cs++){
       return new Promise((resolve, reject) => {
        $.get({
            url : result,
            headers : {"x-csrf-token":`"${csrf_token}"`,"cookie":`"${cookie}"`},
            //body : '',
        }, async(error, response, data) => {
            console.log(data)
           
            resolve()
        })
    }) 
    }
    
}
//打开淘宝
function soy_zmyd_finish_tb(){
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/welfare/finish-welfare/',
            //headers : soy_gk_headers,
            body : finish_tb_body,
        }, async(error, response, data) => {
            console.log(data)
            
            resolve()
        })
    })

}
//打开支付宝
function soy_zmyd_finish_zfb(){
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/welfare/finish-welfare/',
            //headers : soy_gk_headers,
            body : finish_zfb_body,
        }, async(error, response, data) => {
            console.log(data)
            
            resolve()
        })
    })

}
//打开京东
function soy_zmyd_finish_jd(){
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/welfare/finish-welfare/',
            //headers : soy_gk_headers,
            body : finish_jd_body,
        }, async(error, response, data) => {
            console.log(data)
            
            resolve()
        })
    })

}
//打开京东
function soy_zmyd_finish_bbz(){
    return new Promise((resolve, reject) => {
        $.post({
            url : 'https://open.zuimeiread.com/welfare/finish-welfare/',
            //headers : soy_gk_headers,
            body : finish_bbz_body,
        }, async(error, response, data) => {
            console.log(data)
            
            resolve()
        })
    })

}

function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports
    }
    isQuanX() {
      return "undefined" != typeof $task
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon
    }
    isLoon() {
      return "undefined" != typeof $loon
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), a = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          }
        };
        this.post(a, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i)
        if (r = Object(r)[t], void 0 === r) return s;
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e
        } catch (t) {
          e = ""
        }
      }
      return e
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = (() => {})) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
          }
        } catch (t) {
          this.logErr(t)
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body)
      }))
    }
    post(t, e = (() => {})) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      });
      else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t));
      else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o)
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body)
        })
      }
    }
    time(t) {
      let e = {
        "M+": (new Date).getMonth() + 1,
        "d+": (new Date).getDate(),
        "H+": (new Date).getHours(),
        "m+": (new Date).getMinutes(),
        "s+": (new Date).getSeconds(),
        "q+": Math.floor(((new Date).getMonth() + 3) / 3),
        S: (new Date).getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
      return t
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            }
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            }
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
      let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
      h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}
