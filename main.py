import subprocess
import requests
from functools import partial

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
import re
import json
import time
import requests
import time
import cv2
from urllib.parse import urljoin
session = requests.Session()
session.trust_env = False


def get_time():
    return int(time.time() * 1000)


with open('第一次w.js', 'r', encoding='UTF-8') as f:
    first_json_data = f.read()

with open('第二次w.js', 'r', encoding='UTF-8') as f:
    second_json_data = f.read()

with open('第三次w.js', 'r', encoding='UTF-8') as f:
    three_json_data = f.read()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": "https://www.geetest.com/demo/slide-float.html",
}

print("===============第一次请求===================")
first_url = f"https://www.geetest.com/demo/gt/register-slide?t={get_time()}"
first_res = session.get(first_url, headers=headers, timeout=20)
first_data = first_res.json()
gt = first_data["gt"]
challenge = first_data["challenge"]

print("===============第二次请求===================")
second_url = "https://apiv6.geetest.com/gettype.php"
params = {"gt": gt, "callback": f"geetest_{get_time()}"}
headers["Referer"] = "https://www.geetest.com/"
session.get(second_url, headers=headers, params=params, timeout=20)

print('===============第三次请求===================')
three_url = 'https://apiv6.geetest.com/get.php'
context = execjs.compile(first_json_data)
first_res = context.call('first_w', gt, challenge)
params = {
    'gt': gt,
    'challenge': challenge,
    'lang': 'zh-cn',
    'pt': '0',
    'client_type': 'web',
    'w': first_res['w'],
    'callback': f'geetest_{get_time()}'
}

aeskey = first_res['aeskey']
print('aeskey', aeskey)
three_res = session.get(three_url, headers=headers, params=params, timeout=20)
three_data = three_res.text
three_data = json.loads(re.match(r'geetest_\d+\((.*?)\)', three_data).groups()[0])['data']
print(three_data)
c = three_data['c']
s = three_data['s']
time.sleep(1)

print('===============第四次请求===================')
four_url = 'https://api.geetest.com/ajax.php'
context = execjs.compile(second_json_data)
second_res = context.call('second_w', gt, challenge, c, s, aeskey)
w_value = second_res.get('$_CEEg') or second_res.get('$_CEAp')
print(w_value)
print(c)
print(s)
params['w'] = w_value
four_res = session.get(four_url, headers=headers, params=params, timeout=20)
# print(four_res.text)
# print(four_res.content.decode())


# 第五次请求  获取新的challenge和验证码图片
print('===============第五次请求===================')
five_params = {
        "is_next": "true",
        "type": "slide3",
        "gt": gt,
        "challenge": challenge,
        "lang": "zh-cn",
        "https": "true",
        "protocol": "https://",
        "offline": "false",
        "product": "embed",
        "api_server": "api.geetest.com",
        "isPC": "true",
        "autoReset": "true",
        "width": "100%",
        "callback": f'geetest_{get_time()}'
}
time.sleep(1)
five_url= 'https://api.geetest.com/get.php'
five_res = session.get(five_url, headers=headers, params=five_params)
five_res = five_res.content.decode()
five_data = json.loads(re.match('geetest_\d+\((.*?)\)', five_res).groups()[0])
# 获取新的gt  和 challenge
gt = five_data['gt']
challenge = five_data['challenge']

time.sleep(1)
# 拼接完整的url
new_bg_url = urljoin('https://static.geetest.com', five_data['bg'])
new_fullbg_url = urljoin('https://static.geetest.com', five_data['fullbg'])
new_slice = urljoin('https://static.geetest.com', five_data['slice'])
print('验证码图片下载')


# 验证码图片下载
def download_img(name, url, session):
    resp = session.get(url)
    with open(name, mode="wb") as f:
        f.write(resp.content)


# 下载验证码图片
download_img('bg.jpg', new_bg_url, session)
download_img('fullbg.jpg', new_fullbg_url, session)
download_img('slice.jpg', new_slice, session)



# 还原验证码
def draw_code(path):
    # python画图的包pillow,  pip install pillow
    from PIL import Image  # Image 就是python的canvas
    old_img = Image.open(path)
    # 创建一张新图
    new_img = Image.new("RGB", (260, 160))
    Ut = [
        39,
        38,
        48,
        49,
        41,
        40,
        46,
        47,
        35,
        34,
        50,
        51,
        33,
        32,
        28,
        29,
        27,
        26,
        36,
        37,
        31,
        30,
        44,
        45,
        43,
        42,
        12,
        13,
        23,
        22,
        14,
        15,
        21,
        20,
        8,
        9,
        25,
        24,
        6,
        7,
        3,
        2,
        0,
        1,
        11,
        10,
        4,
        5,
        19,
        18,
        16,
        17
    ]
    r = 160
    a = r // 2  # 整数

    for _ in range(52):
        c = Ut[_] % 26 * 12 + 1
        if 25 < Ut[_]:
            u = a
        else:
            u = 0

        # 获取一个区域, (x1, y1, x2, y2)
        l = old_img.crop((c, u, c + 10, u + a))

        x1 = _ % 26 * 10
        if 25 < _:
            y1 = a
        else:
            y1 = 0
        new_img.paste(l, (x1, y1))

    new_img.save(f"new_{path}")

# 图片还原
draw_code('bg.jpg')
draw_code('fullbg.jpg')
time.sleep(1)
# 从当前响应中获取第三个w中所需要的数据
c = five_data['c']
s = five_data['s']
gt = five_data['gt']  # 获取新的值
challenge = five_data['challenge']  # 获取新的值

print(c)
print(s)
print(gt)
print(challenge)
time.sleep(1)

# 计算滑块滑动的距离
def get_x():
    # opencv来完成计算
    """
    pip install opencv-python
    :return:
    """
    # 读取两张图
    bg = cv2.imread("new_bg.jpg")
    slice = cv2.imread("slice.jpg")

    # 做灰度处理
    bg = cv2.cvtColor(bg, cv2.COLOR_BGR2GRAY)
    slice = cv2.cvtColor(slice, cv2.COLOR_BGR2GRAY)

    # 图片边缘处理
    bg_can = cv2.Canny(bg, 255, 255)
    slice = cv2.Canny(slice, 255, 255)

    # 匹配图像的相似度, TM_CCOEFF_NORMED参数固定即可
    r = cv2.matchTemplate(bg_can, slice, cv2.TM_CCOEFF_NORMED)

    # 获取匹配度最好的一个结果
    minVal, maxVal, minLoc, maxLoc = cv2.minMaxLoc(r)

    x = maxLoc[0]
    y = maxLoc[1]
    # 为了测试的
    # bg = cv2.rectangle(bg, (x, y), (x+50, y + 50), (255, 255, 255))
    # cv2.imshow("tu", bg)  # 弹窗
    # cv2.waitKey(0)  # 防止程序一闪就没了
    # cv2.destroyAllWindows()  # 关掉所有窗口
    return x


# 识别当前滑块的距离
juli = get_x()

print(juli)


# 轨迹生成
def __ease_out_expo(sep):
    if sep == 1:
        return 1
    else:
        return 1 - pow(2, -10 * sep)


def get_slide_track(distance):
    import random
    slide_track = [
        [random.randint(-50, -10), random.randint(-50, -10), 0],
        [0, 0, 0],
    ]
    count = 10 + int(distance / 2)
    t = random.randint(50, 100)
    _x = 0
    _y = 0
    for i in range(count):
        x = round(__ease_out_expo(i / count) * distance)
        t += random.randint(10, 20)
        if x == _x:
            continue
        slide_track.append([x, _y, t])
        _x = x
    slide_track.append([distance, 0, t])
    return slide_track, t


guiji, shijian = get_slide_track(juli)
print('轨迹:', guiji)
print('时间:', shijian)

# 第六次请求 - 第三个w
print('===============第六次请求===================')
context = execjs.compile(three_json_data)
three_res = context.call('three_w', guiji, gt, challenge, juli, shijian, c, s, aeskey)
three_res['callback'] = f'geetest_{get_time()}'
print('第三个w参数:', three_res)

six_url = 'https://api.geevisit.com/ajax.php'
params = {
    'gt': gt,
    'challenge': challenge,
    'lang': 'zh-cn',
    '$_BCm': 0,
    'client_type': 'web',
    'w': three_res['w'],
    'callback': three_res['callback']
}
six_res = session.get(six_url, headers=headers, params=params, timeout=20)
six_data = six_res.content.decode()
six_data = json.loads(re.match(r'geetest_\d+\((.*?)\)', six_data).groups()[0])
print('验证结果:', six_data)