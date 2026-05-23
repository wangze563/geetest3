var {RSAKey} = require('node-jsencrypt')
var CryptoJS = require('crypto-js')


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

var X = function() {
        var rsa = new RSAKey();
        rsa.setPublic('00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81', '10001');
        return rsa
}

var $_CCGr = function(e) {
    var t = new X()["encrypt"]($_CCHP(e));
    while (!t || 256 !== t['length'])
        t = new X()['encrypt']($_CCHP(!0));
    return t;
};


var encrypt1 = function(e, t, n) {
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

var $_HEJ = function(e) {

    var t = $_HCB(e);
    return t['res'] + t['end'];
}

var first_w = function(gt_args, challenge_args) {

    var t = {
        '$_EIc': {
            "$_CAAa": 1778037843941,
            "protocol": "https://",
            "gt": gt_args,
            "challenge": challenge_args,
            "offline": false,
            "new_captcha": true,
            "product": "float",
            "width": "300px",
            "https": true,
            "api_server": "apiv6.geetest.com",
            "type": "fullpage",
            "static_servers": [
                "static.geetest.com/",
                "static.geevisit.com/"
            ],
            "voice": "/static/js/voice.1.2.6.js",
            "click": "/static/js/click.3.1.2.js",
            "beeline": "/static/js/beeline.1.0.1.js",
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
            }
        },
        '$_EJN':{
            "gt": gt_args,
            "challenge": challenge_args,
            "offline": false,
            "new_captcha": true,
            "product": "float",
            "width": "300px",
            "https": true,
            "api_server": "apiv6.geetest.com",
            "protocol": "https://",
            "type": "fullpage",
            "static_servers": [
                "static.geetest.com/",
                "static.geevisit.com/"
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
            }
        }
    }
        , n = t['$_EIc'];
    var e = '-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1!!-1';
    t['$_CCFV'] = e,
    t['$_EJN']['cc'] = n['cc'],
    t['$_EJN']['ww'] = n['supportWorker'],
    t['$_EJN']['i'] = e;
    var r = $_CCGr()
        , o = encrypt1(JSON['stringify'](t['$_EJN']), $_CCHP())
        // console.log(o)
        , i = $_HEJ(o)
        , s = {
        'gt': gt_args,
        'challenge': challenge_args,
        'lang': 'zh-cn',
        'pt': 0,
        'client_type': 'web',
        'w': i + r,
        'aeskey': aeskey_value.aeskey
    };
    return s
}


gt = "019924a82c70bb123aae90d483087f94"
challenge = "a4bd3b65ac5ff17b9bc9b8d8c9a8a9de"
// first_w(gt, challenge)

console.log(first_w(gt, challenge))