var orm = require("orm");
//1.连接数据库
orm.connect("mysql://root:root@localhost/mysqldata", function (err, db) {
    //2.定义模型
    var jdbc = db.define("jdbc", {
        id      : String,
        name   : String,
        emall       : String, // FLOAT
        birth      : String//,
        //continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antartica" ], // 枚举类型
        //photo     : Buffer, // BLOB/BINARY
        //data      : Object // JSON encoded
    }, {
        methods: {//
            fullName: function () {
                //return this.id + ' ' + this.name;
                return this.id + '----' + this.name+'----'+this.emall+'----'+this.birth;
            }
        },
        validations: {
            //age: orm.enforce.ranges.number(4, undefined, "id")
        }
    });

    jdbc.get(4, function(err, person) {
        console.log( person.fullName() );
    });
    /*
    //3.查询
    jdbc.find({ id: "1" }, function (err, people) {
        // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
        console.log("People found: %d", people.length);
        console.log(people[0].id+"---"+people[0].name+"---"+people[0].emall+"---"+people[0].birth);
        //console.log("First person: %s, age %d", people[0].fullName(), people[0].age);
        // people[0].age = 16;
        // people[0].save(function (err) {
            // err.msg = "under-age";
        //});
    });
    */
    /*
    //4.删除和同步表
    db.drop(function () {
        // 删除所有表
        Person.sync(function () {
            // 创建Person表
        });
    });
    //5.创建表
    var newRecord = {};
    newRecord.id = 1;
    newRecord.name = "John"
    Person.create(newRecord, function(err, results) {

    });

    //更新
    Person.find({ surname: "Doe" }, function (err, people) {
        // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
        console.log("People found: %d", people.length);
        console.log("First person: %s, age %d", people[0].fullName(), people[0].age);
        people[0].age = 16;
        people[0].save(function (err) {
            // err.msg = "under-age";
        });
    });*/
    //更多特性参考官方Wiki: https://github.com/dresende/node-orm2/wiki
});
