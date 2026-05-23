# mac_demo — 极验三代滑块验证码逆向

## 目录文件说明

| 文件 | 用途 |
|------|------|
| `main01.py` | Python 主控程序，负责请求流程、图片处理、轨迹生成、调用 JS 生成 w 值 |
| `第一次w.js` | 生成第一个 w 值（环境校验 / 初始化），通过 Node.js execjs 调用 |
| `第二次w.js` | 生成第二个 w 值（环境校验 + 性能指纹），通过 Node.js execjs 调用 |
| `第三次w.js` | 生成第三个 w 值（滑块轨迹加密 + 滑动验证），通过 Node.js execjs 调用 |
| `package.json` | Node.js 依赖配置 (crypto-js, node-jsencrypt) |
| `*.jpg` | 验证码图片（bg/背景, fullbg/完整背景, slice/滑块, new_* 为还原后图片） |
| `node-jsencrypt-index.js` | node-jsencrypt 修复版入口文件（见下方安装说明） |

## 环境准备

### 1. 安装 JS 依赖

```bash
npm install
```

### 2. 修复 node-jsencrypt

`node-jsencrypt` 官方包在某些环境下 `RSAKey` 导出方式有兼容性问题（`var {RSAKey} = require('node-jsencrypt')` 解构后 `new RSAKey()` 可能报 `RSAKey is not a constructor`）。

需要用目录下的 `node-jsencrypt-index.js` 覆盖安装后的文件：

```bash
# Windows
copy /Y node-jsencrypt-index.js node_modules\node-jsencrypt\index.js

# macOS / Linux
cp node-jsencrypt-index.js node_modules/node-jsencrypt/index.js
```

### 3. 安装 Python 依赖

```bash
pip install execjs opencv-python pillow requests PyExecJS
```

## 极验三代验证流程（6 步）

```
第1次请求 → 注册滑块，获取 gt / challenge
第2次请求 → 获取 JS 资源配置（type=fullpage）
第3次请求 → 发送 w1（环境校验），获取 c / s 加密参数
第4次请求 → 发送 w2（性能指纹），确认进入滑动模式
第5次请求 → 获取验证码图片 + 新的 c / s / gt / challenge
    ↓
    （下载图片 → 乱序还原 → OpenCV 识别滑块距离 → 生成滑动轨迹）
    ↓
第6次请求 → 发送 w3（轨迹加密），获得 validate / score
```

## 第三次w.js 修复记录

### 修复对比

与 `../极验3代码/` 和 `../极验3纯算/` 两个可运行版本对比，
发现以下 5 处差异，均已修复：

---

### Bug 1（致命）：AES 密钥 与 RSA 加密密钥不一致

**现象**：服务器返回 `fail`，w 值永远无法通过验证。

**原因**：
- RSA 加密使用 `$_CCHP()` → 读取 `aeskey_value['aeskey']`（由 `te()` 随机生成）
- AES 加密使用 `$_CCEp()` → 返回 `Ot`（由 `rt()` 随机生成）
- `te()` 和 `rt()` 是两个**独立的**随机 key 生成器，每次产生不同值
- 服务器 RSA 解密拿到 key_A，尝试用 key_A 解 AES 密文，但数据是用 key_B 加密的 → 解密失败

**修复前（错误代码）**：
```javascript
// RSA 加密的 key — 来自 te()
var $_CCDh = function(t) {
    var e = new RSAX()["encrypt"](_$CCHP(t));  // $_CCHP → te()
    ...
}

// AES 加密的 key — 来自 rt()，跟上面不一样！
var $_CCEp = (Ot = rt(), function(t) {
    return !0 === t && (Ot = rt()), Ot;
})

// 调用点
var u = $_CCDh();                        // RSA: key_from_te
var l = encrypt(json, $_CCEp());        // AES: key_from_rt  ← 不同！
```

**修复后**：
```javascript
// 两个加密使用同一个 key 来源 $_CCHP()
var u = $_CCDh();                        // RSA: $_CCHP()
var l = encrypt(json, $_CCHP());        // AES: $_CCHP()  ← 一致
```

同时删除了无用的 `te()`、`$_CCEp` 及相关代码。

---

### Bug 2（致命）：自定义 Base64 编码多拼接了 padding 字符

**现象**：w 值末尾多出 `.` 或 `..`，服务端解码失败。

**原因**：极验的自定义 Base64 编码在数据长度不是 3 的倍数时，会拆分出 `res`（编码正文）和 `end`（padding：`.` 或 `..`）。Python 纯算版 `get_w3()` 只取 `['res']`，不拼接 `end`。

**修复前（错误）**：
```javascript
var $_FEu = function(t) {
    var e = $_FCV(t);
    return e['res'] + e['end'];  // 多了 padding
}
```

**修复后**：
```javascript
var $_FEu = function(t) {
    var e = $_FCV(t);
    return e['res'];  // 不拼接 end
}
```

**参考**：`../极验3纯算/geetest/solver.py` 第 124 行 `h = geetest_base64_encode(AES_O(plaintext, str_16))['res']`

---

### Bug 3：明文 JSON 缺少 `h9s9` 字段

**现象**：服务端校验字段缺失，可能降低通过率。

**修复前**：
```javascript
var o = {
    "lang": 'zh-cn',
    'userresponse': H(t, i['challenge']),
    "passtime": n,
    "imgload": 81,
    "aa": e,
    "ep": $_CCC_()
};
```

**修复后**：
```javascript
var o = {
    "lang": 'zh-cn',
    'userresponse': H(t, i['challenge']),
    "passtime": n,
    "imgload": 50,
    "aa": e,
    "ep": $_CCC_(),
    "h9s9": "1816378497"    // 新增
};
```

**参考**：`../极验3纯算/geetest/solver.py` 第 122 行

---

### Bug 4：`imgload` 值不正确

**修复**：`81` → `50`

**参考**：`../极验3代码/第三次claude.js` 注释 `✅ 修正3&4: imgload 改为 50`

---

### Bug 5：`$_FDd` 中除数硬编码

**修复前**：`n = 65`（硬编码）
**修复后**：`n = e['length']`（动态取值，与字符集长度一致）

虽然当前字符集长度就是 65，但硬编码在字符集变化时会导致 bug。

---

### 新增：`three_w` 函数

原文件只有顶层测试代码，没有可被 Python 调用的函数。新增：

```javascript
function three_w(guiji, gt, challenge, juli, shijian, c, s, aeskey) {
    if (aeskey) {
        aeskey_value['aeskey'] = aeskey;
    }
    var l = $_BBEl($_FDd(guiji), c, s);
    return $_CCBb(gt, challenge, c, s, juli, l, shijian);
}
```

`aeskey` 参数确保与 w1/w2 使用同一密钥（由 Python 端 `main01.py` 传入）。

---

## `main01.py` 修复

原 `main01.py` 只写到第 5 步（识别滑块距离），缺少：

1. 读取 `第三次w.js`
2. 生成滑动轨迹 `get_slide_track()`
3. 调用 `three_w()` 生成 w 值
4. 发送第 6 次请求（最终验证）

以上均已补全。

---

## 运行

```bash
python main01.py
```

---

## aeskey 在三个 w 中的完整链路分析

### 核心概念

aeskey 是一个 **16 字符随机 hex 字符串**（如 `"a1b2c3d4e5f67890"`），它同时扮演两个角色：

```
aeskey ──→ AES 密钥（加密 w 值中的业务 JSON）
       ──→ RSA 加密的原文（加密后拼入 w 值末尾，即末尾 256 位 hex）
```

每条 w 值的结构都是：

```
w = Base64(AES(业务JSON, aeskey)) + RSA(aeskey)
      \                            \
       前半段：加密的业务数据         后半段：加密的密钥（256 hex chars）
```

服务器收到 w 后：先用 RSA 私钥解密后半段拿到 aeskey，再用 aeskey 解前半段拿到业务数据。

### 为什么三个 w 必须共享同一个 aeskey

极验的会话模型中，**w1 阶段客户端生成 aeskey 并告知服务器**。具体流程：

```
                    客户端                              服务器
w1:  生成 aeskey ──RSA(aeskey)──┐
     业务数据 ──AES(data1, aeskey)──→ w1 ──→   解密 RSA → 拿到 aeskey
     明文返回 aeskey（给 Python）                   存入会话（session）  ←──┐
                                                                          │
w2:  Python 传入 aeskey ──→                                            使用 w1 阶段的
     业务数据 ──AES(data2, aeskey)──→ w2 ──→    用会话中的 aeskey 解密 ──→ aeskey 解密
                                                                          │
w3:  Python 传入 aeskey ──→                                            仍然使用 w1 的
     业务数据 ──AES(data3, aeskey)──→ w3 ──→    用会话中的 aeskey 解密 ──┘
```

如果 w2 或 w3 用了不同的 aeskey，服务器用 w1 阶段的 aeskey 去解密，得到的是一堆乱码，验证失败。

### w1 — 生成 aeskey 并暴露

```javascript
// 第一次w.js

var aeskey_value = { 'aeskey': undefined };  // 初始为空

var $_CCHP = function(e) {
    // 首次调用：undefined 且 !e 为真 → 生成新 key
    // 后续调用：已有值 → 直接返回
    return aeskey_value['aeskey'] && !e || (aeskey_value['aeskey'] = te()),
    aeskey_value['aeskey'];
}

// RSA 加密 aeskey（拼入 w 末尾）
var r = $_CCGr();                              // $_CCHP() 此时生成新 key

// AES 加密业务数据（用同一个 key）
var o = encrypt1(json, $_CCHP());              // $_CCHP() 返回同一个 key

// ⚠️ 关键：aeskey 通过返回值明文传给 Python
return {
    'w': base64(o) + r,                        // w 值
    'aeskey': aeskey_value.aeskey              // ← 明文暴露给 Python！
};
```

Python 端接收：
```python
# main01.py
first_res = context.call('first_w', gt, challenge)
aeskey = first_res['aeskey']       # 保存下来，后续传给 w2、w3
```

### w2 — 接收并沿用 aeskey

```javascript
// 第二次w.js

function second_w(gt, challenge, c, s, aeskey_args) {
    aeskey_value.aeskey = aeskey_args;          // ← Python 传入，覆盖本地

    // ... 构造业务数据 ...

    var encrypted = encrypt(data, $_CCHP());    // AES: 沿用 w1 的 aeskey
    i['$_CEAp'] = base64(encrypted) + rsa_part;  // w 值（不单独暴露 aeskey）
}
```

Python 端调用：
```python
# main01.py
second_res = context.call('second_w', gt, challenge, c, s, aeskey)
#                                                              ^^^^^^ 传入
```

### w3 — 接收并沿用 aeskey（修复后的逻辑）

```javascript
// 第三次w.js （修复后）

function three_w(guiji, gt, challenge, juli, shijian, c, s, aeskey) {
    if (aeskey) {
        aeskey_value['aeskey'] = aeskey;        // ← Python 传入，覆盖本地
    }

    var l = $_BBEl($_FDd(guiji), c, s);         // 轨迹加密
    return $_CCBb(gt, challenge, c, s, juli, l, shijian);
    //     └→ 内部: encrypt(json, $_CCHP())   // AES 沿用 w1 的 aeskey
    //            + RSAX.encrypt($_CCHP())     // RSA 沿用 w1 的 aeskey
}
```

Python 端调用：
```python
# main01.py
three_res = context.call('three_w', guiji, gt, challenge, juli, shijian, c, s, aeskey)
#                                                                                    ^^^^^^ 传入
```

### 时序图总结

```
时间线 →

w1:  [js] te() → aeskey = "abcd1234..."
     [js] RSA("abcd1234...") ──┐
     [js] AES(data1, "abcd1234...") ──→ w = "..."
                                │
     [py] aeskey = "abcd1234..."  ← 从返回值取

w2:  [py] 传入 aeskey ──→ [js] aeskey_value.aeskey = "abcd1234..."
     [js] RSA("abcd1234...") ──┐
     [js] AES(data2, "abcd1234...") ──→ w = "..."

w3:  [py] 传入 aeskey ──→ [js] aeskey_value.aeskey = "abcd1234..."
     [js] RSA("abcd1234...") ──┐
     [js] AES(data3, "abcd1234...") ──→ w = "..."
```

### 修复前 Bug 1 的根因

修复前的 mac_demo 第三次w.js 中，AES 加密用的是 `$_CCEp()`（独立随机生成器 `rt()`），RSA 加密用的是 `$_CCHP()`（独立随机生成器 `te()`）。即使 Python 传了 aeskey，**AES 加密也完全忽略了传入的值**，导致 w3 的 AES key ≠ w1 的 AES key ≠ RSA 加密的 key，服务器必然解密失败。

### Python 纯算版的对应逻辑

`../极验3纯算/geetest/solver.py` 佐证了同一 key 的设计：

```python
def run_solver():
    str_16 = _generate_seed()      # 一个 key，贯穿始终

    w1 = get_w1(gt, challenge, str_16)               # 用 str_16
    c, s = get_c_s(gt, challenge, w1)
    w2 = get_w2(gt, challenge, c, s, str_16)          # 同一个 str_16
    w3 = get_w3(str_16, challenge, hkjl, c, s, gt)   # 还是同一个 str_16
```

## 参考文件

- `../极验3纯算/` — 纯 Python 版，可运行，逻辑参考
- `../极验3代码/` — Node.js + Python 混合版，结构与本目录一致
- `../极验3代码/第三次claude.js` — 带修正注释的第三次 w 参考版本
