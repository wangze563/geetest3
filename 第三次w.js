// node标准库
let crypto = require('crypto');
var CryptoJS = require('crypto-js')
var {RSAKey} = require('node-jsencrypt')

var ct = function(t) {
    this["$_BCAm"] = t || [];
}

ct.prototype.$_CAZ = function(t) {

    var e = this["$_BCAm"];
    if (e["map"])
        return new ct(e['map'](t));
    for (var n = [], r = 0, i = e['length']; r < i; r += 1)
        n[r] = t(e[r], r, this);
    return new ct(n);
}



var $_FDd = function(guiji) {

    function n(t) {

        var e = '()*,-./0123456789:?@ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqr'
                    , n = e['length']
                    , r = ''
                    , i = Math['abs'](t)
                    , o = parseInt(i / n);
                n <= o && (o = n - 1),
                o && (r = e['charAt'](o));
            
                var s = '';
                return t < 0 && (s += '!'),
                r && (s += '$'),
                s + r + e['charAt'](i %= n);
    }
    var t = function(t) {

        for (var e, n, r, i = [], o = 0, s = 0, a = t['length'] - 1; s < a; s++)
            e = Math['round'](t[s + 1][0] - t[s][0]),
            n = Math['round'](t[s + 1][1] - t[s][1]),
            r = Math['round'](t[s + 1][2] - t[s][2]),
            0 == e && 0 == n && 0 == r || (0 == e && 0 == n ? o += r : (i['push']([e, n, r + o]),
            o = 0));
        return 0 !== o && i['push']([e, n, o]),
        i;
    }(guiji)  //轨迹： this["$_HCP"]== guiji 【轨迹列表】
    
        , r = []
        , i = []
        , o = [];
    return new ct(t)['$_CAZ'](function(t) {

        var e = function(t) {
   
            for (var e = [[1, 0], [2, 0], [1, -1], [1, 1], [0, 1], [0, -1], [3, 0], [2, -1], [2, 1]], n = 0, r = e['length']; n < r; n++)
                if (t[0] == e[n][0] && t[1] == e[n][1])
                    return 'stuvwxyz~'[n];
            return 0;
        }(t);
        e ? i['push'](e) : (r['push'](n(t[0])),
        i['push'](n(t[1]))),
        o['push'](n(t[2]));
    }),
    r['join']('') + '!!' + i['join']('') + '!!' + o['join']('');
    }



guiji = [
    [
        -31,
        -24,
        0
    ],
    [
        0,
        0,
        0
    ],
    [
        0,
        0,
        250
    ],
    [
        3,
        0,
        266
    ],
    [
        8,
        0,
        283
    ],
    [
        14,
        0,
        300
    ],
    [
        20,
        0,
        316
    ],
    [
        25,
        -2,
        333
    ],
    [
        30,
        -3,
        350
    ],
    [
        32,
        -4,
        367
    ],
    [
        34,
        -5,
        383
    ],
    [
        36,
        -5,
        400
    ],
    [
        36,
        -6,
        417
    ],
    [
        37,
        -6,
        433
    ],
    [
        37,
        -6,
        450
    ],
    [
        38,
        -6,
        467
    ],
    [
        38,
        -6,
        483
    ],
    [
        39,
        -6,
        500
    ],
    [
        40,
        -6,
        517
    ],
    [
        40,
        -6,
        533
    ],
    [
        41,
        -6,
        550
    ],
    [
        41,
        -6,
        567
    ],
    [
        42,
        -6,
        583
    ],
    [
        42,
        -6,
        600
    ],
    [
        44,
        -6,
        616
    ],
    [
        45,
        -6,
        633
    ],
    [
        47,
        -6,
        650
    ],
    [
        50,
        -7,
        667
    ],
    [
        52,
        -7,
        683
    ],
    [
        54,
        -7,
        700
    ],
    [
        55,
        -7,
        717
    ],
    [
        56,
        -8,
        733
    ],
    [
        57,
        -8,
        750
    ],
    [
        58,
        -8,
        767
    ],
    [
        58,
        -8,
        783
    ],
    [
        58,
        -8,
        866
    ],
    [
        58,
        -8,
        883
    ],
    [
        59,
        -8,
        900
    ],
    [
        60,
        -8,
        917
    ],
    [
        61,
        -8,
        933
    ],
    [
        63,
        -8,
        950
    ],
    [
        64,
        -8,
        967
    ],
    [
        65,
        -8,
        983
    ],
    [
        66,
        -8,
        1000
    ],
    [
        67,
        -9,
        1016
    ],
    [
        67,
        -9,
        1033
    ],
    [
        67,
        -8,
        1100
    ],
    [
        67,
        -8,
        1117
    ]
]

c_args = [
    12,
    58,
    98,
    36,
    43,
    95,
    62,
    15,
    12
]

s_args = "72502c31"


var $_BBEl= function(t, e, n) {

    if (!e || !n)
        return t;
    var r, i = 0, o = t, s = e[0], a = e[2], _ = e[4];
    while (r = n["substr"](i, 2)) {
        i += 2;
        var c = parseInt(r, 16)
            , u = String['fromCharCode'](c)
            , l = (s * c * c + a * c + _) % t['length'];
        o = o['substr'](0, l) + u + o['substr'](l);
    }
    return o;
}


l = $_BBEl($_FDd(guiji), c_args, s_args);


console.log(l)


juli = 228

// "gt": "019924a82c70bb123aae90d483087f94",
// "challenge": "81766bf53a5bc4b4d02f2acd7e2423e3dc",
// "c": [
// 12,
// 58,
// 98,
// 36,
// 43,
// 95,
// 62,
// 15,
// 12
// ],
// "s": "3a44686d",


function H(t, e) {

    for (var n = e["slice"](-2), r = [], i = 0; i < n['length']; i++) {
                var o = n['charCodeAt'](i);
                r[i] = 57 < o ? o - 87 : o - 48;
            }
            n = 36 * r[0] + r[1];
            var s, a = Math['round'](t) + n, _ = [[], [], [], [], []], c = {}, u = 0;
            i = 0;
    
    for (var l = (e = e["slice"](0, -2))['length']; i < l; i++)
                c[s = e['charAt'](i)] || (c[s] = 1,
                _[u]['push'](s),
                u = 5 == ++u ? 0 : u);
            var h, f = a, d = 4, p = '', g = [1, 2, 5, 10, 50];
            while (0 < f)
                0 <= f - g[d] ? (h = parseInt(Math['random']() * _[d]['length'], 10),
                p += _[d][h],
                f -= g[d]) : (_['splice'](d, 1),
                g['splice'](d, 1),
                d -= 1);
            return p;

}


var $_CCC_ = function() {

    return {
        "v": "7.9.3",
        "$_BIT": false,
        "me": true,
        "tm": {
            "a": 1779006742865,
            "b": 1779006743041,
            "c": 1779006743041,
            "d": 0,
            "e": 0,
            "f": 1779006742865,
            "g": 1779006742868,
            "h": 1779006742918,
            "i": 1779006742918,
            "j": 1779006742998,
            "k": 1779006742955,
            "l": 1779006742998,
            "m": 1779006743037,
            "n": 1779006743037,
            "o": 1779006743043,
            "p": 1779006743096,
            "q": 1779006743096,
            "r": 1779006743097,
            "s": 1779006743097,
            "t": 1779006743097,
            "u": 1779006743097
        },
        "td": undefined || -1
        
    };
}

function X(e) {
    return crypto.createHash('md5').update(e.toString()).digest('hex');
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

var RSAX = function() {
        var rsa = new RSAKey();
        rsa.setPublic('00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81', '10001');
        return rsa
}


var $_CCDh = function(t) {

    var e = new RSAX()["encrypt"]($_CCHP(t));
    while (!e || 256 !== e['length'])
        e = new RSAX()["encrypt"]($_CCHP(!0));
    return e;
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




var $_HBZ = function(e, t) {
    return e >> t & 1;
}

var $_EJc= function(e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()";
    return e < 0 || e >= t['length'] ? '.' : t['charAt'](e);
}


var $_FBo = function(t, e) {

    return t >> e & 1;
}


var $_FCV= function(t, i) {

    var o = this;
    i || (i = o);
    for (var e = function(t, e) {

        for (var n = 0, r = 24 - 1; 0 <= r; r -= 1)
            1 === $_FBo(e, r) && (n = (n << 1) + $_FBo(t, r));
        return n;
    }, n = '', r ='', s = t["length"], a = 0; a < s; a += 3) {
        var _;
        if (a + 2 < s)
            _ = (t[a] << 16) + (t[a + 1] << 8) + t[a + 2],
            n += $_EJc(e(_, 7274496)) + $_EJc(e(_, 9483264)) + $_EJc(e(_, 19220)) + $_EJc(e(_, 235));
        else {
            var c = s % 3;
            2 == c ? (_ = (t[a] << 16) + (t[a + 1] << 8),
            n += $_EJc(e(_, 7274496)) + $_EJc(e(_, 9483264)) + $_EJc(e(_, 19220)),
            r = '.') : 1 == c && (_ = t[a] << 16,
            n += $_EJc(e(_, 7274496)) + $_EJc(e(_, 9483264)),
            r = '.' + '.');
        }
    }
    return {
        "res": n,
        "end": r
    };
}


var $_FEu = function(t) {

    var e = $_FCV(t);
    return e['res'];
}

var $_CCBb= function(gt_args, challenge_args,c_args,s_args, t, e, n) {

    var r = {
       "$_CJQ" : {
            "$_GIv": 1778939530203,
            "protocol": "https://",
            "is_next": true,
            "type": "multilink",
            "gt": gt_args,
            "challenge": challenge_args,
            "lang": "zh-cn",
            "https": true,
            "offline": false,
            "product": "embed",
            "api_server": "https://api.geevisit.com/",
            "static_servers": [
            "static.geetest.com/",
            "static.geevisit.com/"
            ],
            "isPC": true,
            "autoReset": true,
            "width": "100%",
            "$_DHz": {
            "$_BCm": 0
            },
            "id": "a81766bf53a5bc4b4d02f2acd7e2423e3",
            "bg": "pictures/gt/09b7341fb/bg/1363d41d0.jpg",
            "fullbg": "pictures/gt/09b7341fb/09b7341fb.jpg",
            "link": "",
            "ypos": 84,
            "xpos": 0,
            "height": 160,
            "slice": "pictures/gt/09b7341fb/slice/1363d41d0.png",
            "mobile": true,
            "theme": "ant",
            "theme_version": "1.2.7",
            "template": "",
            "logo": true,
            "clean": false,
            "fullpage": false,
            "feedback": "https://www.geetest.com/contact#report",
            "show_delay": 250,
            "hide_delay": 800,
            "benchmark": false,
            "version": "6.0.9",
            "show_voice": true,
            "c": c_args,
            "s": s_args,
            "so": 0,
            "i18n_labels": {
            "cancel": "取消",
            "close": "关闭验证",
            "error": "请重试",
            "fail": "请正确拼合图像",
            "feedback": "帮助反馈",
            "forbidden": "怪物吃了拼图，请重试",
            "loading": "加载中...",
            "logo": "由极验提供技术支持",
            "read_reversed": false,
            "refresh": "刷新验证",
            "slide": "拖动滑块完成拼图",
            "success": "sec 秒的速度超过 score% 的用户",
            "tip": "请完成下方验证",
            "voice": "视觉障碍"
            },
            "gct_path": "/static/js/gct.b71a9027509bc6bcfef9fc6a196424f5.js"
            }
        }
        , i = r["$_CJQ"]
        , o = {
        "lang": 'zh-cn',
        'userresponse': H(t, i['challenge']),
        "passtime": n,
        "imgload": 50,
        "aa": e,
        "ep": $_CCC_(),
        "h9s9": "1816378497"
    };
  
    i['offline'] && (o["x"] = t),
    o["rp"] = X(i['gt'] + i['challenge']['slice'](0, 32) + o['passtime']);
    var u = $_CCDh()
        console.log(u)
        , l = encrypt(JSON['stringify'](o),  $_CCHP())
        , h =$_FEu(l)
        , f = {
        'gt': i['gt'],
        'challenge': i['challenge'],
        "lang": 'zh-cn',
        '$_BCm': 0,
        'client_type': 'web',
        "w": h + u
    };
    return f


}

function three_w(guiji, gt, challenge, juli, shijian, c, s, aeskey) {
    if (aeskey) {
        aeskey_value['aeskey'] = aeskey;
    }
    var l = $_BBEl($_FDd(guiji), c, s);
    return $_CCBb(gt, challenge, c, s, juli, l, shijian);
}

// 测试代码
juli = 228
shijian = 106

gt_args = "019924a82c70bb123aae90d483087f94"
challenge_args = "81766bf53a5bc4b4d02f2acd7e2423e3dc"
c = [
12,
58,
98,
36,
43,
95,
62,
15,
12
]
s = "3a44686d"


third_w = three_w(guiji, gt_args, challenge_args, juli, shijian, c_args, s_args)
console.log(third_w)