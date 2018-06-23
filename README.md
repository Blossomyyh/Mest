# MEST 

### Memo-list 基于node.js的创意todo-list

------

1552620 殷宇涵 



### 项目概述

------

> #### 项目目的

- 完成一个充分考虑与用户交互的todo-list

> #### 功能亮点

- ##### 通过触屏交互新增list

  由于移动端更加注重对手势的识别，更提倡尽量少的在制定的地点点击一个特定的button，而通过滑动touchstar, touchmove, touchend 去完成，而不是仅仅对click的操作。

  所以在新增list时候，我采取了**随意点击背景**的方式进行增添一个todo，使得操作更加方便。

  ```html
  <div id="back_ground">
  #back_ground{
      height: inherit;
      width: inherit;
      background-color: black ;
      position: absolute;
      z-index: 0;
  }
  ```

  - 我将一个为黑色的background固定在底部，只有当list没有覆盖到back_ground时候，才可以点击

    - 为back_ground添加一个`touchHandler`
    - touchHandler包含start 与 end函数 分别控制touchstart和touchend

  - 随意点击黑色背景，就会出现一个list，并可以自动focus到可填充/修改的文本上

    - 为每一个list item添加touch事件
    - 添加change事件，当完成文本编辑的时候将value自动保存到LocateStorage中的model.data中
    - 标题中的计数会随之变动

    ![Screen Shot 2018-06-23 at 9.37.40 AM](/Users/yuhanyin/xcode/Mest/Screen Shot 2018-06-23 at 9.37.40 AM.png)


- ##### 滑动删除/完成/取消、删除已完成

  这里没有设置专门的button完成delete和complete，而是用一种与用户互动的滑动手势：

  - 右滑 uncompleted (无cross line)
  - 左滑20% completed（有cross line）
  - 左滑50% delete ( alarm 提示delete)

  ```javascript
       newTodo.addEventListener("touchmove", function (event) {
              moveX = startX - event.touches[0].clientX;
              console.log("moveX"+ moveX);
              if (moveX > 0){
                  if (moveX > 100){
                      newItem.classList.add("over");
                      newItem.classList.remove("no-over");
  ```

  通过控制touchmove并对moveX作分析，判断接下来的操作

  ![Screen Shot 2018-06-23 at 9.39.35 AM](/Users/yuhanyin/xcode/Mest/Screen Shot 2018-06-23 at 9.39.35 AM.png)


- ##### 通过拖动等交互更改界面风格

另外一个创新点就是上下拖动title， 会有界面风格的转换

仍然通过touchstart touchmove touchend

与滑动不同的是，这里监控的是clienY，通过记录Y轴坐标的变化从而得出选择的主题是哪一种

```javascript
    title.addEventListener("touchmove", function () {
        moveY = event.touches[0].clientY - startY ;
        console.log("moveY" + moveY);
        if (moveY > 200) {
            var items = document.getElementsByClassName("item");
            for (var i = 0; i< items.length; i++) {
                items[i].style.background = "#E6A0C4";
                if (moveY > 400){
                    items[i].style.background = "#7294D4";
                }
                if (moveY > 600){
                    items[i].style.background = "#85D4E3";
                }
            }
        }
    });
```

##### ![Screen Shot 2018-06-23 at 10.07.14 AM](/Users/yuhanyin/xcode/Mest/Screen Shot 2018-06-23 at 10.07.14 AM.png)

- ##### 过滤、点击编辑单条 todo

  - 对每一个item可以直接点击进行编辑，并实时存储到localStorage数据库中
  - item将被赋予`no-over `/`over`类，用来标识是否完成。
  - 过滤条被固定在底部，方便用户操作，通过寻找所有带有`no-over `/`over` 标签的item，对其他item进行`visibility=“hidden”`

  ![Screen Shot 2018-06-23 at 9.41.03 AM](/Users/yuhanyin/xcode/Mest/Screen Shot 2018-06-23 at 9.41.03 AM.png)

- ##### 保存页面状态，刷新页面后可恢复

  - 按照老师教的localStorage， 先建立一个model存放data等数据，接着将每一个item的实时value嵌入到data中去，每次update都需要对data重新读取操作
  - model中包含两个操作：init 和flush

```javascript
    Object.assign(model, {
        init: function (callback) {
            var data = storage.getItem(model.TOKEN);
            try {
                if (data){
                    model.data = JSON.parse(data);
                }
            } catch (e) {
                storage.setItem(model.TOKEN, '');
                console.log(e)
            }
            if (callback) callback();
        },
        flush: function (callback) {
            try {
                storage.setItem(model.TOKEN, JSON.stringify(model.data));
            } catch (e) {
                console.log(e)
            }
        }
    });

```



### 

------

> #### 项目目录

- mest.html
- mest.css
- Mest.js
- App.js 网关
- Memory.js 数据存储

