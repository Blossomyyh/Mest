var model = {
    data: {
        items: [
            // {msg:'n', completed: false}
        ],
        msg: '',
        filter: 'All'
    },
    TOKEN: 'Mest'
};

(function() {

    var storage = window.localStorage;
    // storage.clear();

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


})();