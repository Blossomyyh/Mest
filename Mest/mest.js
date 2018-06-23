var items = document.querySelectorAll("item");
var index = 0;

touchHandler = {
    start: function (event) {
        // var newLi = document.createElement("li");
        // newLi.classList.add("item");
        startX = event.touches[0].clientX;
        console.log("start touch");
        console.log(startX);


        var list = document.getElementById("allList");
        var newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.classList.add("no-over");

        newItem.innerHTML = [
            '<textarea class="memo" rows="1" autofocus="autofocus" placeholder="touch to change it ~"></textarea>',
            '<img class="comple" src="./src/no-alarm.png">'
        ].join('');


        var newTodo = newItem.querySelector(".memo");
        var data = model.data;
        // data.msg = newTodo.value;
        console.log("newTodo:" + data.msg);
        // if (data.msg == '') {
        //     console.warn('input msg is empty');
        //     return;
        // }
        newTodo.addEventListener("input", function () {
            console.log("input ")
        });
        newTodo.addEventListener("change", function () {
            console.log("propertychange item");
            var data = model.data;
            data.msg = newTodo.value;
            console.log("newtodo:" + data.msg);
            // if (data.msg === '') {
            //     console.warn('input msg is empty');
            //     return;
            // }
            data.items.push({msg: data.msg, completed: false});
            model.flush();
            // model.flush();
        });
        newTodo.addEventListener("touchstart", function () {
            startX = event.touches[0].clientX;

        });

        newTodo.addEventListener("touchmove", function (event) {
            moveX = startX - event.touches[0].clientX;
            console.log("moveX"+ moveX);
            if (moveX > 0){
                if (moveX > 100){
                    newItem.classList.add("over");
                    newItem.classList.remove("no-over");
                    newTodo.classList.add("over");
                    newTodo.classList.remove("no-over");
                    // index --;
                    getNumber();
                    // window.localStorage.setItem("number",index);

                }
                if (moveX > 500){
                    alert("delete it!");
                    // index --;
                    // window.localStorage.setItem("number",index);
                    data.items.splice(data.items.length,1);
                    model.flush()
                    getNumber();
                }

            }
            if (moveX < 0){
                if (moveX > -100){
                    newItem.classList.add("no-over");
                    newItem.classList.remove("over");
                    newTodo.classList.remove("over");
                    newTodo.classList.add("no-over");
                    getNumber();
                }
            }
        });
        data.items.push({msg: newTodo.value, completed: false});
        model.flush();
        list.appendChild(newItem);
        event.stopPropagation();
        data.msg = "";

    },
    end: function (event) {
        console.log("end touch");


        // update();
    }
};

itemHaddler = {
    start: function (event) {
        if (event.target.classList.contains("item")){
            event.stopPropagation();
            event.preventDefault();
        }
    }
};


function update() {
    model.flush();
    var data = model.data;
    if (data){
        data.items.forEach(function (t, number) {
            var list = document.getElementById("allList");
            var item = document.createElement("div");
            item.classList.add("item");
            item.classList.add("no-over");

            var id = "todo" + ++index;
            item.setAttribute("id",id);
            item.innerHTML = [
                '<textarea class="memo" rows="1"></textarea>',
                '<img class="comple" src="./src/no-alarm.png">'
            ].join('');

            var todo = item.querySelector(".memo");
            todo.value = data.items[number].msg;
            todo.addEventListener("input", function () {
                console.log("input ")
            });
            todo.addEventListener("change", function () {
               console.log("change item");
                var data = model.data;
                console.log("todo:" + data.msg);
                console.log("number " + number);
                data.items[number].msg = todo.value;
                model.flush();

            });
            todo.addEventListener("touchstart", function () {
                startX = event.touches[0].clientX;

            });
            todo.addEventListener("touchmove", function (event) {
                moveX = startX - event.touches[0].clientX;
               console.log("moveX"+ moveX);
               if (moveX > 0){
                    if (moveX > 100){
                        item.classList.add("over");
                        item.classList.remove("no-over");
                        todo.classList.add("over");
                        todo.classList.remove("no-over");
                        // index --;
                        getNumber();
                        // window.localStorage.setItem("number",index);

                    }
                    if (moveX > 500){
                        alert("delete it!");
                        // index --;
                        // window.localStorage.setItem("number",index);
                        data.items.splice(number,1);
                        getNumber();
                        model.flush();
                    }

               }
               if (moveX < 0){
                   if (moveX > -100){
                       item.classList.add("no-over");
                       item.classList.remove("over");
                       todo.classList.remove("over");
                       todo.classList.add("no-over");
                       getNumber();
                   }
               }
            });

            item.addEventListener("touchstart",itemHaddler.start, false);
            list.appendChild(item);

        });
    }



}


window.onload = function () {

    // window.localStorage.clear();
    model.init(function () {
        var data = model.data;
        update();

    });

    var background = document.getElementById("back_ground");

    background.addEventListener("touchstart",touchHandler.start, false);
    background.addEventListener("touchend", touchHandler.end,false);

    var title = document.getElementById("title");
    title.addEventListener("touchstart", function () {
        startY= event.touches[0].clientY;
    });
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

    var all = document.getElementById("all");
    all.addEventListener("touchstart", function () {
        var all = document.getElementsByClassName("item");
        for (var i = 0; i< all.length; i++){
            all[i].style.height = "100%";
            all[i].style.visibility = "visible";
        }
    });
    var active = document.getElementById("active");
    active.addEventListener("touchstart", function () {
        var over = document.getElementsByClassName("item over");
        for (var i = 0; i< over.length; i++){
            over[i].style.height = "0";
            over[i].style.visibility = "hidden";
        }

    });
    var complete = document.getElementById("completed");
    complete.addEventListener("touchstart",function () {
        var noOver = document.getElementsByClassName("item no-over");
        for (var i = 0; i< noOver.length; i++){
            noOver[i].style.height = "0";
            noOver[i].style.visibility = "hidden";
        }

    });
    getNumber();
};

function getNumber() {
    var number = document.getElementById("ele");
    number.innerHTML = model.data.items.length.toString();
}