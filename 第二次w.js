var {RSAKey} = require('node-jsencrypt')
var CryptoJS = require('crypto-js')
// node标准库
let crypto = require('crypto');

function H(e) {
    return crypto.createHash('md5').update(e.toString()).digest('hex');
}


var $_GHU = function(e) {
    for (var t = [], n = 0, r = e['length']; n < r; n += 1)
            t['push'](e['charCodeAt'](n));
        return t;
}

var $_HBZ = function(e, t) {
    return e >> t & 1;
}

var $_GJ_= function(e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()";
    return e < 0 || e >= t['length'] ? '.' : t['charAt'](e);
}


var $_HCB = function(e, o) {

    var i = this;
    o || (o = i);
    for (var t = function(e, t) {
        
        for (var n = 0, r = 24 - 1; 0 <= r; r -= 1)
            1 === $_HBZ(t, r) && (n = (n << 1) + $_HBZ(e, r));
        return n;
    }, n = '', r = '', s = e['length'], a = 0; a < s; a += 3) {
        var _;
        if (a + 2 < s)
            _ = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2],
            n += $_GJ_(t(_, 7274496)) + $_GJ_(t(_, 9483264)) + $_GJ_(t(_, 19220)) + $_GJ_(t(_, 235));
        else {
            var c = s % 3;
            2 == c ? (_ = (e[a] << 16) + (e[a + 1] << 8),
            n += $_GJ_(t(_, 7274496)) + $_GJ_(t(_, 9483264)) + $_GJ_(t(_, 19220)),
            r = '.') : 1 == c && (_ = e[a] << 16,
            n += $_GJ_(t(_, 7274496)) + $_GJ_(t(_, 9483264)),
            r = '.' + '.');
        }
    }
    return {
        'res': n,
        'end': r
    };
}

var $_HDl =  function(e) {

    var t = $_HCB($_GHU(e));
    return t['res'] + t['end'];
}



var $_CEDb = function() {

    var e = {
        "\u0076": '9.2.0-guwyxh'
    };
    this['$_EIc'];
    e['te'] = false,
    e['$_BBn'] = true;
    var t = {
        "puppet": false,
        "phantom": false,
        "nightmare": false,
        "selenium": false,
        "vendor": "Google Inc. (Apple)",
        "renderer": "ANGLE (Apple, ANGLE Metal Renderer: Apple M1, Unspecified Version)"
    };
    return e['ven'] = t['vendor'] || -1,
    e['ren'] = t['renderer'] || -1,
    e['fp'] = [
        "move",
        893,
        116,
        1778121969706,
        "pointermove"
    ],
    e['lp'] = [
        "up",
        958,
        93,
        1778121970762,
        "pointerup"
    ],
    e['em'] = {},
    [],
    e['tm'] = {
        "a": 1778121968431,
        "b": 1778121968788,
        "c": 1778121968788,
        "d": 0,
        "e": 0,
        "f": 1778121968431,
        "g": 1778121968434,
        "h": 1778121968495,
        "i": 1778121968495,
        "j": 1778121968606,
        "k": 1778121968541,
        "l": 1778121968606,
        "m": 1778121968671,
        "n": 1778121968786,
        "o": 1778121968791,
        "p": 1778121969074,
        "q": 1778121969074,
        "r": 1778121969075,
        "s": 1778121969075,
        "t": 1778121969075,
        "u": 1778121969075
    },
    e['dnf'] = 'dnf',
    e['by'] = 0,
    e;
}

var aeskey_value = {
    'aeskey': undefined
};

var te = function() {
    function e() {
        return (65536 * (1 + Math['random']()) | 0)['toString'](16)['substring'](1);
    }
    return e() + e() + e() + e(); 
};

var $_CCHP =  function(e) {
    return aeskey_value['aeskey'] && !e || (aeskey_value['aeskey'] = te()),
    aeskey_value['aeskey'];
}

var $_HEJ = function(e) {

    var t = $_HCB(e);
    return t['res'] + t['end'];
}

var encrypt = function(e, t, n) {
    // AES加密
      l = {
        key: CryptoJS.enc.Utf8.parse(t),
        iv: CryptoJS.enc.Utf8.parse('0000000000000000'),
      }
      var r = CryptoJS.AES.encrypt(e, l.key, {
          iv: l.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        })
    var o = r['ciphertext']['words']
    var i = r['ciphertext']['sigBytes']
    var s = []
    for (a = 0; a < i; a++) {
        var _ = o[a >>> 2] >>> 24 - a % 4 * 8 & 255;
        s['push'](_);
    }
    return s;
}

var second_w = function(gt_args, challenge_args, c_args, s_args, aeskey_args) {
    aeskey_value.aeskey = aeskey_args
    var i = {
        "$_EIc": {
            "$_CAAa": 1778058856524,
            "protocol": "https://",
            "gt": gt_args,
            "challenge": challenge_args,
            "offline": false,
            "new_captcha": true,
            "product": "float",
            "width": "300px",
            "https": true,
            "api_server": "api.geevisit.com",
            "type": "fullpage",
            "static_servers": [
                "static.geetest.com",
                "static.geevisit.com"
            ],
            "beeline": "/static/js/beeline.1.0.1.js",
            "voice": "/static/js/voice.1.2.6.js",
            "click": "/static/js/click.3.1.2.js",
            "fullpage": "/static/js/fullpage.9.2.0-guwyxh.js",
            "slide": "/static/js/slide.7.9.3.js",
            "geetest": "/static/js/geetest.6.0.9.js",
            "aspect_radio": {
                "slide": 103,
                "click": 128,
                "voice": 128,
                "beeline": 50
            },
            "cc": 8,
            "supportWorker": true,
            "$_FFL": {
                "pt": 0
            },
            "aeskey": aeskey_value.aeskey,
            "theme": "wind",
            "theme_version": "1.5.8",
            "logo": true,
            "feedback": "https://www.geetest.com/contact#report",
            "c": c_args,
            "s": s_args,
            "i18n_labels": {
                "copyright": "由极验提供技术支持",
                "error": "网络不给力",
                "error_content": "请点击此处重试",
                "error_title": "网络超时",
                "fullpage": "智能检测中",
                "goto_cancel": "取消",
                "goto_confirm": "前往",
                "goto_homepage": "是否前往验证服务Geetest官网",
                "loading_content": "智能验证检测中",
                "next": "正在加载验证",
                "next_ready": "请完成验证",
                "read_reversed": false,
                "ready": "点击按钮进行验证",
                "refresh_page": "页面出现错误啦！要继续操作，请刷新此页面",
                "reset": "请点击重试",
                "success": "验证成功",
                "success_title": "通过验证"
            }
        },
        '$_CCFV': '-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1'
    }
        , e = 'M(*((1((M(('
        , t = 'M(*((1((M(('
        , n = '-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1magic data-1'
        , r = 'DIV_0'
        , o = i['$_EIc']
        , s = 50901;
    i['$_CECm'] = '';
    for (var a = [['lang', 'zh-cn' || 'zh-cn'], ['type', 'fullpage'], ['tt', function(e, t, n) {
 
        if (!t || !n)
            return e;
        var r, o = 0, i = e, s = t[0], a = t[2], _ = t[4];
        while (r = n['substr'](o, 2)) {
            o += 2;
            var c = parseInt(r, 16)
                , l = String['fromCharCode'](c)
                , u = (s * c * c + a * c + _) % e['length'];
            i = i['substr'](0, u) + l + i['substr'](u);
        }
        return i;
    }(e, o['c'], o['s']) || -1], ['light', r || -1], ['s', H($_HDl(t))], ['h', H($_HDl(n))], ['hh', H(n)], ['hi', H(i['$_CCFV'])], ['vip_order', i['vip_order'] || -1], ['ct', i['ct'] || -1], ['ep', $_CEDb() || -1], ['passtime', s || -1], ['rp', H(o['gt'] + o['challenge'] + s)]], _ = 0; _ < a['length']; _++)
        i['$_CECm'] += '"' + a[_][0] + '":' + JSON['stringify'](a[_][1]) + ',';
    // process.exit(1)
    // var c = $_BFr();
    i['$_CEEQ'] = function l() {
 
        var t = ['bbOy'];
        return function(e) {
        
            t['push'](e['toString']());
            var r = '';
            !function o(e, t) {
                
                function n(e) {
                    
                    var t = 5381
                        , n = e["length"]
                        , r = 0;
                    while (n--)
                        t = (t << 5) + t + e["charCodeAt"](r++);

                    return t &= ~(1 << 31);

                
                }
                100 < new Date()['getTime']() - t['getTime']() && (e = 'qwe'),
                r = '{' + i['$_CECm'] + '"captcha_token":"' + n("function o(e,t){var $_CFGDn=Vwtrj.$_CV,$_CFGCS=['$_CFGGc'].concat($_CFGDn),$_CFGE_=$_CFGCS[1];$_CFGCS.shift();var $_CFGFg=$_CFGCS[0];function n(e){var $_DDHGX=Vwtrj.$_DD()[3][19];for(;$_DDHGX!==Vwtrj.$_DD()[6][16];){switch($_DDHGX){case Vwtrj.$_DD()[15][19]:var t=5381,n=e[$_CFGE_(71)],r=0;$_DDHGX=Vwtrj.$_DD()[9][18];break;case Vwtrj.$_DD()[12][18]:while(n--)t=(t<<5)+t+e[$_CFGE_(49)](r++);$_DDHGX=Vwtrj.$_DD()[12][17];break;case Vwtrj.$_DD()[9][17]:return t&=~(1<<31);break;}}}100<new Date()[$_CFGE_(209)]()-t[$_CFGDn(209)]()&&(e=$_CFGE_(1108)),r=$_CFGDn(732)+i[$_CFGDn(1150)]+$_CFGE_(1194)+n(o[$_CFGE_(47)]()+n(n[$_CFGDn(47)]())+n(e[$_CFGE_(47)]()))+$_CFGE_(1103);}" + n('function n(e){var $_DDHGX=Vwtrj.$_DD()[3][19];for(;$_DDHGX!==Vwtrj.$_DD()[6][16];){switch($_DDHGX){case Vwtrj.$_DD()[15][19]:var t=5381,n=e[$_CFGE_(71)],r=0;$_DDHGX=Vwtrj.$_DD()[9][18];break;case Vwtrj.$_DD()[12][18]:while(n--)t=(t<<5)+t+e[$_CFGE_(49)](r++);$_DDHGX=Vwtrj.$_DD()[12][17];break;case Vwtrj.$_DD()[9][17]:return t&=~(1<<31);break;}}}') + n('bbOy')) + '","tsfq":"xovrayel"}';
            }(t["shift"](), new Date()),
            // console.log(r)
            i['$_CEAp'] = $_HEJ(encrypt(r, $_CCHP()));
        }
        ;
    }(),
    i["$_CEEQ"]('');
    return i
}



var gt = "019924a82c70bb123aae90d483087f94"
var challenge = "981fe17f9095f9d5cc1aa2a9b1e53fe6"
var c = [
                12,
                58,
                98,
                36,
                43,
                95,
                62,
                15,
                12]
var s = "7a535473"

console.log(second_w(gt, challenge, c, s)['$_CEAp'])

