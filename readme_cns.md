ibim/
├── include
├── js
├── model
├── readme_cns.md
├── bim_viewer.html
├── util

bim_viewer.html:主HTML文件。
    <aside>部分是写了网页的的功能控件。 其中的<script>用了jquery和javascript的addEventListener来处理控件中事件

    Threejs部分代码：开始是变量的声明。然后是通过init()和animate()两个函数分别进行初始设定和动画。
    
    主要function 介绍：
    init()函数中主要是对webgl进行一下初始化，加入相机，灯光， 控制方法(OrbitControls或者 RoamControls)， 建筑模型(LoadModel函数)
    
    onKeyDown() 这个函数是写入以下按键和功能之间切换的用法，是作为开始调试程序所加入的功能。与aside中的控件功能一样，到时可以删去或者成为网页的热键。

    initGUI() 初始dat.gui。也就是网页右上角的GUI。

    onDocumentMouseClick() 是鼠标点击事件的listener。然后通过判断在哪个一功能状态并做出不同的动作。
    功能：CLIP：切平面 CAMERA： 放置相机 INFROM：显示建筑信息。

    animate()每一帧的变化，类似于OpenGL等图形API。

    loadModel(filePath) 是读取模型的函数。 通过ObjectLoader类 或者 LargeObjLoader 来进行模型的读取。

util/
└── sliceLargeJson.py

sliceLargeJson.py 是一个Python的脚本，通过运行该脚本且加入需要分割的JSON模型。 脚本会将JSON模型分成小于指定大小(默认100MB)的小块并将其放入同名文件夹，且重命名以:"原文件命"+编号(0 - N).js

include/
├── helpers
│   ├── AxisHelper.js
│   ├── RaycastHelper.js
├── largeObjLoader.js
├── OrbitControls.js
├── RoamControls.js
├── three.js

largeObjLoader.js :读取超过一次读取文本SIZE大小的JSON文件。 largeObjLoader 和 Threejs中的ObjectLoader很相似。
    load() 通过遍历读取分成Slice的JSON文本，并最终合成为一个保存了模型信息的Object类型o。

    parse() 用load()中的模型信息建立几何，材质等图形信息并将最终的模型加入网页中。


两个控制的函数基本已经写好了，所以这里就先不详细写文档了。用法就是在网页的init中建立一个控制类的对象，再删除这个对象的时候记得要调用dispose()函数来移除已经加入的listener。
RoamControls.js :第一人称操作

OrbitControls: 鼠标操作

helpers/ 主要是一些辅助用的类

AxisHelper.js 画出坐标系
RaycastHelper.js 画出射线，主要用于碰撞检测。

model/
├── house/
│   ├── house0.js
│   ├── house1.js
│   ├── house2.js
│   └── house3.js
├── house.js
分别为使用sliceLargeJson.py分割过的模型和没有分割过的模型
