/*
店铺签到 各类店铺签到，有新的店铺直接添加token即可
活动地址:
活动时间：长期
更新时间：2021-07-13 12:00
脚本兼容: QuantumultX, Surge,Loon, JSBox, Node.js
搬运cui521大佬脚本
//方式一
//export MyShopToken1='30DE3F2E8B4278A120007C8CD0D4F835'
//export MyShopToken2='3C0B9CE1F01623C77ADE9F90AFA0FD5F'
//export MyShopToken3='4A02128626C3691B6A98341C3F8CD27E'
//export MyShopToken4='81F530105DFF92EF55FF36F1E2097066'
//export MyShopToken5='9B45653CFEFE49045C2748E8AA9E37B4'
//export MyShopToken6='B8157420EE77DDA819C2B3BAF991797B'
//export MyShopToken7='BB80E573A5329D6AD511900955F6E12C'
//export MyShopToken8='DCD2E2F3BECE2344E21ABB33D071BFAE'
//export MyShopToken9='F9C7E6B7E724B7DB0CE232508C97490D'
//
//export SHOP_TOKENS="${MyShopToken1}&${MyShopToken2}&${MyShopToken3}&${MyShopToken4}&${MyShopToken5}&${MyShopToken6}&${MyShopToken7}&${MyShopToken8}&${MyShopToken9}"
//方式二
//export SHOP_TOKENS="30DE3F2E8B4278A120007C8CD0D4F835&3C0B9CE1F01623C77ADE9F90AFA0FD5F&4A02128626C3691B6A98341C3F8CD27E&81F530105DFF92EF55FF36F1E2097066&9B45653CFEFE49045C2748E8AA9E37B4&B8157420EE77DDA819C2B3BAF991797B&BB80E573A5329D6AD511900955F6E12C&DCD2E2F3BECE2344E21ABB33D071BFAE&F9C7E6B7E724B7DB0CE232508C97490D"

=================================Quantumultx=========================
[task_local]
#店铺签到
10 11 * * * https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_shop_sign.js, tag=店铺签到, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
=================================Loon===================================
[Script]
cron "10 1,9 * * *" script-path=https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_shop_sign.js,tag=京东零食街
===================================Surge================================
店铺签到 = type=cron,cronexp="10 1,9 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_shop_sign.js
====================================小火箭=============================
店铺签到 = type=cron,script-path=https://raw.githubusercontent.com/jiulan/platypus/main/scripts/jd_shop_sign.js, cronexpr="10 1,9 * * *", timeout=3600, enable=true
 */
const $ = new Env('店铺签到');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
const JD_API_HOST = 'https://api.m.jd.com/api?appid=interCenter_shopSign';
let activityId=''
let vender=''
let num=0
let shopname=''
let token=[
  "C7E1C1ADAD11D958C1946516FDB03719", //10天40京豆 50份
  "C96DBF1E591E31728F5BC2E8F007AA19", //8-13天160京豆 300+300份
  "CB4691AB1A4EA7AE039AD4F2C207A85A", //14天20元E卡 100份
  "E093E46F683EE54498EE58147C8971C7", //15天50京豆 50份
  "95a036d4a5d64af8aa25bce946ae8aec",
"5409c2b9f6db4591964b712a5ecde939",
"6169e46916784333b31872a001549ce3",
"3a541178cda644849987889842892ddf",
"297013954f484ade829ad833d1129f06",
"8acb8c49fab94c9b8b43c69a0544403c",
"60d5d203147e47f1b7e6e31bf3d4f64e",
"6f96aa1ce3a74bd1bff3068aaf295b59",
"e169d5f957694a5198b2609d93d0cd21",
"70bc3956f6ec4dc9b93c66f2cd375e0a",
"7f86e23f253741cd9140349644d6dec0",
"8e0c9ae62f214d4e893c1edefdd39831",
"ceb2d3be323b476aaa77787cdeb93640",
"b66f7c534159493cbed54b8a059f1ac7",
"0bf802edba204ff88fa941a92494237b",
"1900f76d7d37467ca2eaf17992e67e57",
"021167e2993d4785adf3d3a8cbcd92a9",
"6a9f3d3fe1734665993ca7be444013ae",
"7b093c347b894731abda124b1bba690e",
"6a78d3f244ad45a483289849ca760184",
"dd977c155d3942caad4dcddf74f7cd26",
"8edf9c234674436e80238244af539bc4",
"c76142e32e8b46c7b42062be52ef2523",
"376de5fab03542e0a002d13c1aafdc31",
"365379d2daab4a26a62e69bddccc2688",
"6ddc3889cd0e4bc798e06cf86b8c4db9",
"b965e8b6a82a42e9b4f205da4269b6e8",
"683495ffe50e4bf783f590058dd57d58",
"5c6dbbdede5e4beeb527e65f407d7148",
"c16602512f8c4c70a4ab5728df52e7d5",
"d899d3214ee2407bb8839599d8b03cbf",
"186a059e6ba74a11a1421ccb06a89d95",
"56953039ac8d4956809f4ae9ed2e0e3d",
"7371d90caf964a46a3de05ce692a828c",
"187bad0fa5124ed6a2ce6e08a43e4f03",
"83756dd037514790926694bcc731a8f9",
"c22f4dd40946446d96fb8a935c40a2ae",
"a6db8c4763114329b46a34ecf67402d5",
"a79dc5e0acb043f7bef5f7ed59ecdd99",
"6efdd0d7f67c4bf48b3ba2d2711a661a",
"cf77b88dd69846dfa2bcb5f69132fcd7",
"9198140b216343d29f739c161ab98461",
"31cc34e9ef754623ab8f795eb57d2a0b",
"f50992e68ced4340a7b01875de7c64f3",
"dd4874fd23d74e5c86c1e8cf68f1c588",
"49fe2574f3884cdaae2251a4903fa0c8",
"2c6fd0cc08f24a968c939d8ec86bf6cd",
"0669df56cfd64da08822aa25279e4c65",
"38f5a8c392054817859f8d2266e7310b",
"e749549dfbc4472db56bbcf5f4570932",
"47edff69a42143afa2921be8e323a53c",
"32734386d2b04755925cf5e494533b76",
"38c38ef55c4e4dab9af30fb888e07a8f",
"fdbcb1c895c249ae9f4d0cb08d8b2bd5",
"79d4df50165c49d79526571dc68cd048",
"a9346fd228d7441199efbe12b8d1fc17",
"a3511ba427b34f4480bbfc56c8aae6e7",
"147a9e5762d24f79a5d2779db56b79dd",
"ab246490bc8d40b5b9dafa95fb6356c1",
"29993fba05d9481d8da8572202ba9b4c",
"97e13975d303414a9b206c09e0b126ac",
"fc34aeb0b1974b47b55c7972eaaaaff3",
"3a5d0d24cc1b4a2f8fa28b4ee84d88bf",
"80fceed7a970414482a8240025871c39",
"58b35633322046ab9751abfff8fcd477",
"d8680471215a4e85912796901234b464",
"913197e9ee4e479e9b71a851e2dbcb0b",
"7024ef78b7d74f579645d9f74ee54c40",
"ec4fc8c2315b4e9cb5ecd6baa66c5861",
"e721848900f44675bb0440f0941bceb6",
"09b47f9bd87d4f8097242c489dde3d01",
"678d692e1ea143b89dd042fbde199179",
"6c27e02adba24fee8198e08223abb43f",
"e0fe44e572eb41469ed5e867f140d89e",
"eaea8875e8e84749be1dbde3db60ed48",
"71dfe880f924463da62fca2f12a4404a",
"72a13ace86b1499b8bf17831cd151539",
"0994441bb5324f9999f1d76dd3c31f0d",
"544654285a7c4d599a625bdefc94d16f",
"7b3964a58dfc4232872103e87817a9ac",
"95f8ff19a6d64e4aaf790dbb2833e109",
"160f85770c9d4162a3d2915c0aa11bd0",
"5407fc0a3c9c4e8d8a0fdb6f8779098a",
"ba7fc8f6e7ba4580af67f16443d9e12b",
"0f47719f5d9349ccbfb5653aa5399582",
"bae96d95f6be418b927fea539513ea7b",
"d11163cf367c42cea5390ba7b0212cd4",
"eba9a226726e45e9b0443d172a6fe42d",
"854819c3fcf14d1c85241eca509b085f",
"d77c4a24865b4617be5b1d38f3297241",
"ce20935d56114b89baaee84ffb135e28",
"89f9ba28548a48b7bd339f3c20469bd1",
"d9e369bfd0b24ce1bdc8ac6e4d3c91b0",
"e47ef306493b49dd9a7cbac3e3b86ade",
"16fcef83e1cd4bccb47a93d8ed459e06",
"7439e98244e44a38a67e769d6e31913f",
"04a5d12e84ac4d9292b060c32afedca0",
"4de739cf07804af0be1c5420a5aea6e7",
"f4a5909258e64f3a8553d723395a48f3",
"c372abead98a4b71a5eee9ca971a9949",
"98e07527d4c148bd8306e5079d761cf3",
"b0211e93d7c548ad82f7c2d9d506816e",
"2f3c55901805489ab47b7cb657ce7a7f",
"f403d7ae443048f9bffa8d85e4a2ad0a",
"a7d94be098c0431ba2761a1a0a09487a",
"87f74ace4b2d42c5bb99fe0ce2be8c77",
"ecca494ea72c4ec99cec9b541ca43cee",
"7272b4b4ccf24c1caa91df30d2f0a400",
"2b7dc300b0424066a9f7c4ddfcb8dee8",
"6e72ed0702164af8b72e111cfc977962",
"a0ffbc5eaf2142f895906c85f071e60f",
"a8edf7a97b544fccad9c5376ef431b8f",
"cc38b884eed94b299b93c1250437b14a",
"b4a01e9066fd4b95bc0c60a526f61c75",
"98eae864ca514d9eae2a79a2948432ac",
"d5ca6b3c33024025ab2e523725686479",
"e738cfad8d2e4244b504fcd82fdc42c9",
"a3feedb53aa04e9ca3e151a1333f532b",
"6391f9261f884a12ab6bf320673165bc",
"2ba9f8db763842b990f220a0875c989d",
"4c13f49075e64b21944db306ad6e3658",
"18d93071150c49b7814f689e0c294f70",
"d2c7271d878b4f659628007ef852fce0",
"e9755c56094548dc95b69f86afae2cf4",
"2c9d2f8e390f4daf9ddfb7b334748d46",
"f1e322b121b740c0ab658cc584f135b0",
"bbaa3a5c5c8d4225a4127110e596313c",
"486b29c49dc34018b10b452348b7e929",
"c759c54519b14541bc314ca4136cd16d",
"33951aa85e374e3fbce656b767137b46",
"4709cd3b2f504658b11087c6823efb37",
"93d7cd84f8ed433994ee6e7adbd08983",
"19c8c557a42242939024f15c4e514498",
"1ea5ce9afdd645f29682824a52599e8d",
"7b9dfd1e0f5d4edabe1c5e8877667b7f",
"599823de50b64a7d822b4401e107b1b0",
"dd92842eec6b4f24b93f58fe0edaccb0",
"f3ad71df9c034f2ba7372a496f55fb42",
"c65c4305c74d4fb5933c55eee87edd97",
"9ce9116b61b5487199d61c922f991c00",
"428a2327b75b4133ae324ff4c33d38a0",
"7680c3a2b22b49a1852c7dbaa39572be",
"b18bec7121da406c9ce479ab17f5b51e",
"41b719e536674fad931c9293fc134b1b",
"80c648f06bec4969a3d7d64f40d23969",
"81714246bf394fcdb80b09ddd1d21a68",
"827094b9a0d64c26ba8953e4c4287cf5",
"3a5e7a05aba94b31a7eb497c4059c50b",
"b5219073dcea4d57932541e1d8561cb0",
"e041c37d7ae04f889a948bfe60456c98",
"2219c0b6253d4283ab61ff153988efbf",
"acbcae7ee2204e82b498fdfd0d01a409",
"f147e96d5e284470bc4928d2ee7b3d29",
"294db966312948a4a78c71438e53974f",
"55384dfcbe664cf7a7088d89d1afc464",
"66f87d0f04f04138a6e64425852e70cd",
"fadd7832312541d28ca2439566acda5e",
"35319a6abe894a55b1a07b7fbe3b8042",
"edcda7f2db0641449b0cc721d6a966a6",
"e12730cdc2e24b73a7de2d38fcd45590",
"823d62d5423a437a9800b6bea5c9c2ca",
"e40d66cd0ac94835a580f876a7d83fd1",
"cde3917be15449a9b15f5cd265fec400",
"a7704de1176346b9a253cc3fdb823c8d",
"5d6920e3c89e4569bf535ed3004c2085",
"420fe344948c4912affa5d4c94e84a95",
"09ae40074f9b4c378a1f8d2a51cef279",
"8d89c8d64d1d4ba884a3706b23938bca",
"939c11ba444d444891f6202e6fa2cfdd",
"5dc9fcc62c724599a9d76f8e33f753c1",
"9bcd0a5b09cb4040bbc15198142f1486",
"9d561aaf60f24115b3aa03f9e06dfca6",
"08bd34b0142048ffb6064480235c8319",
"0964ecf802fa4578a46b35ac9273e158",
"28c9a31635eb47fa81b9f9d2a4ba01f3",
"f6035e5788b2407c8cfe80a95de14bff",
"613875fed9d047ba8d3ac218f83a9697",
"6c060742c1904ff1af0053818f50af3d",
"ecf679fd851443a88763ea8aed7fc0b8",
"ad0cd9a80dfe49368eedc31b1d19cc67",
"93e2c18a052447208fe78645b0317dcd",
"f5508b66ef9c4d1987ff5eafe093821a",
"dc25d7664e124552be4b80d4002e6c18",
"cca7cc264a2b496d84414e4101f217a1",
"70165f1f993a4e72b5b00735e4bb7d04",
"04ce317c1f7647299c1499ebb1d0d70a",
"c8fb05044d6d497eb668c3060c49a2e4",
"4c7d52a8bc58407baf34e78dd562ff5f",
"1f55a47cf2a744fb9609ee147cb5c701",
"efd0bf182a2a4853a84a9f84daa01dd4",
"3182b10e7a554dba83e6eb62902625a9",
"41c110be1ec645768ec8800419c2df27",
"c91b3bd90ee5482f9ee540939c3c42bc",
"3029f9e9faf8440e825a1237a5c68172",
"c69b062803854751b8b208975b6405e7",
"844604f8a7f940ee80a12f7daa1f80ad",
"0fca8e882d254d129c1becc463d55ab8",
"937d78cec74f4e45ae18e023705fd851",
"f51b5e93f8914bb8922c98582143a431",
"dbbac02679fb4f90a9eb0f4c53ce26a5",
"32d50875787a4180bb75a7905518de87",
"531f465727e74b5292ab7e4b84c4b810",
"fb33e46e0c8543308c8248077c8560e9",
"223af331a66a4408a959a04145355cc6",
"ce4f4cea125b41468f71803e73063278",
"af10fbd3ec0c4a1088de23839b74efb0",
"495a3c2d219a4ea08e7aabdcf2ecb578",
"5b3a236b5c6e4d998adfdafa5ef5c897",
"9cf1a7bbdd6d4a67bce2b16166e05a48",
"a4cea15e12e74b7c8fc96adc17725772",
"6a52f75bb96c41f7ac979ef5cc41ced7",
"b75b394e3066452d9f1d57175567b173",
"e7667c23889249a987009202c48cfe23",
"1de347bdc3e445ceb20258d9646ee70f",
"88afce9eb671465ca050b431b004764f",
"0ebcf57920934a999db9fcea543c370b",
"b09c109bba114bbfa853c72179d34474",
  
]
//IOS等用户直接用NobyDa的jd cookie

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};

  let otherToken = [];
  if (process.env.SHOP_TOKENS) {
    console.log(process.env.SHOP_TOKENS)
    if (process.env.SHOP_TOKENS.indexOf('&') > -1) {
      console.log(`您的店铺 token 选择的是用&隔开\n`)
      otherToken = process.env.SHOP_TOKENS.split('&');
    } else if (process.env.SHOP_TOKENS.indexOf('\n') > -1) {
      console.log(`您的店铺 token 选择的是用换行隔开\n`)
      otherToken = process.env.SHOP_TOKENS.split('\n');
    } else {
      otherToken = process.env.SHOP_TOKENS.split();
    }
  }
  Object.keys(otherToken).forEach((item) => {
    if (otherToken[item]){
      token.push(otherToken[item]);
    }
  })


} else {
  let cookiesData = $.getdata('CookiesJD') || "[]";
  cookiesData = jsonParse(cookiesData);
  cookiesArr = cookiesData.map(item => item.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  if (token.length === 0 ){
    console.log(`未找到店铺token 溜了溜了`)
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      await shopSign()
      await showMsg()
    }
  }
})()
    .catch((e) => {
      $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })

//开始店铺签到
async function shopSign(){

  for (var j = 0; j < token.length; j++) {
    num=j+1
    if (token[j]==='') {continue}
    await getvenderId(token[j])
    if (vender=='') {continue}
    await getvenderName(vender)
    await getActivityInfo(token[j],vender)
    await signCollectGift(token[j],vender,activityId)
    await taskUrl(token[j],vender)
  }
}

//获取店铺ID
function getvenderId(token) {
  return new Promise(resolve => {
    const options = {
      url: `https://api.m.jd.com/api?appid=interCenter_shopSign&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22${token}%22,%22venderId%22:%22%22}&jsonp=jsonp1000`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "referer": 'https://h5.m.jd.com/',
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(/{(.*)}/g.exec(data)[0])
          if (data.code==402) {
            vender=''
            console.log(`第`+num+`个店铺签到活动已失效`)
            message +=`第`+num+`个店铺签到活动已失效\n`
          }else{
            vender=data.data.venderId
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

//获取店铺名称
function getvenderName(venderId) {
  return new Promise(resolve => {
    const options = {
      url: `https://wq.jd.com/mshop/QueryShopMemberInfoJson?venderId=${venderId}`,
      headers: {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(data)
          shopName = data.shopName
          console.log(`【`+shopName+`】`)
          message +=`【`+shopName+`】`
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}


//获取店铺活动信息
function getActivityInfo(token,venderId) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22${token}%22,%22venderId%22:${venderId}}&jsonp=jsonp1005`,
      headers: {
        "accept": "accept",
        "accept-encoding": "gzip, deflate",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
         "referer": `https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=${token}&sceneval=2&jxsid=16178634353215523301&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2009753434_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713`,
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          // console.log(data)
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(/{(.*)}/g.exec(data)[0])
          activityId=data.data.id
          //console.log(data)
          let mes='';
          for (let i = 0; i < data.data.continuePrizeRuleList.length; i++) {
            const level=data.data.continuePrizeRuleList[i].level
            const discount=data.data.continuePrizeRuleList[i].prizeList[0].discount
            mes += "签到"+level+"天,获得"+discount+'豆'
          }
          //console.log(message+mes+'\n')
          //message += mes+'\n'
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

//店铺签到
function signCollectGift(token,venderId,activitytemp) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_signCollectGift&body={%22token%22:%22${token}%22,%22venderId%22:688200,%22activityId%22:${activitytemp},%22type%22:56,%22actionType%22:7}&jsonp=jsonp1004`,
      headers: {
        "accept": "accept",
        "accept-encoding": "gzip, deflate",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "referer": `https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=${token}&sceneval=2&jxsid=16178634353215523301&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2009753434_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713`,
        "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
          //console.log(data)
          data = JSON.parse(/{(.*)}/g.exec(data)[0])
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

//店铺获取签到信息
function taskUrl(token,venderId) {
  return new Promise(resolve => {
    const options = {
      url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22${token}%22,%22venderId%22:${venderId},%22activityId%22:${activityId},%22type%22:56}&jsonp=jsonp1006`,
      headers: {
        "accept": "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
        "cookie": cookie,
        "referer": `https://h5.m.jd.com/`,
        "user-agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
          $.logErr(err);
        } else {
            //console.log(data)
            data = JSON.parse(/{(.*)}/g.exec(data)[0])
            console.log(`已签到：`+data.data.days+`天`)
            message +=`已签到：`+data.data.days+`天\n`
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data);
      }
    })
  })
}

async function showMsg() {
  if ($.isNode()) {
    $.msg($.name, '', `【京东账号${$.index}】${$.nickName}\n${message}`);
    //await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n${message}`);
  }
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === "1001") {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
            if (data['retcode'] === '0' && data.data && data.data['assetInfo']) {
              $.beanCount = data.data && data.data['assetInfo']['beanNum'];
            }
          } else {
            $.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })
  })
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
