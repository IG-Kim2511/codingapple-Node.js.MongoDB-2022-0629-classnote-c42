
/* 🍀 Server.js 상단 코드 */

// c18
const express = require('express')
const app = express()

// c24-5)
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

// c30)
const MongoClient = require('mongodb').MongoClient;

// c32) 
app.set('view engine', 'ejs');

 
// 🦄🦄 terminal 명령어 정리 👉 codingapple-Node.js.MongoDB-2022-0629-classnote폴더...server.js



// app.listen(3000, function(){
//     console.log('c30 listening on 3000')
//   });

app.get('/', function(req요청, res응답) {               //2)
    res응답.sendFile(__dirname + '/index.html')       //4)
})   

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
});

app.get('/write',(req요청,res응답)=>{       //2, 2-1)
    res응답.sendFile(__dirname + '/write.html')       //2-2)
  });



// 🦄🦄c30 Database에 자료 저장하기, client.db('작명').collection('작명').insertOne(자료오브젝트, 콜백함수)
console.log('🦄🦄c30')

// uri
var uri = "mongodb+srv://iikim2522:mEX2TiWxbqKLQaFM@cluster0.qqllo.mongodb.net/?retryWrites=true&w=majority";

// var db
var db;   //c30-4)

MongoClient.connect(uri, function(에러, p_client){ 
  
    if (에러) {
      return console.log(에러);
    }

    console.log('c30 데이터베이스 연결 success');

  // database설정 :  db() : .... 'ig_database' 에 연결
  db = p_client.db('ig_database');

  // collecton설정 : ....'c30_ig_collection' 에 연결
  // .insertOne함수 : .insertOne(저장할 데이터, 그 이후 실행할 콜백함수)  👉 mongoDB에 가면 저장된 데이터 확인됨

  db.collection('c30_ig_collection').insertOne({제목: "first", 날짜:1, 이름:'John2', _id:10}, function (에러, 결과) {
    console.log('c30 insertOne success')    
  });

  // 🦄🦄c32 HTML에 DB데이터 넣는 법 1, EJS 파일 만들기 
     console.log('🦄🦄c32')
     console.log('🦄🦄c38')
    

    //  post()를 통한 insetOne()실행, send(), 요청.body.ig_title
    app.post('/add', function(req요청, res응답){   

      res응답.send('c32. post() 전송완료');

      console.log('req요청.body.ig_title:'+req요청.body.ig_title);
      console.log('req요청.body.ig_data:'+req요청.body.ig_data);

      // 38) 
      // .collection('ig_counter'), findOne
      db.collection('ig_counter').findOne({name: '게시물갯수'}, function(p_err,p_db결과) {

        if (p_err) { return console.log('error')    }

        console.log(`p_db결과.totalPost:`+p_db결과.totalPost)
        console.log(`p_db결과.name:`+p_db결과.name)
        
        
        //  _id:총게시물갯수 +1 
        db.collection('ig_collection').insertOne({ _id:  p_db결과.totalPost ,제목 : req요청.body.ig_title, 날짜 : req요청.body.ig_data}, function(){
          console.log('저장완료 c38-2')          
          
          // 🦄🦄 선생님 40 게시물마다 id넣기2 - id에 +1하기, updateOne(.), mongodb operator: inc
          console.log('🦄🦄c40')  
   

          // updateOne, $inc
          db.collection('ig_counter').updateOne({name:'게시물갯수'},{$inc :{totalPost:+1}},function(p_err,p_db) { 
            if (p_err) { return console.log('err')  }                  

          })
        })
      })
    });   


    // c30-4) 서버띄우는 코드 여기로 옮기기      
    app.listen(3000, function(){
    console.log('c30 listening on 3000')
    });


    // 🦄32-2. ejs문법  (list탭 확인)
    // 👉views/list.ejs 생성
    
    app.get('/list',function(res,req){      //34-4)

        // // .find().toArray() 
        db.collection('ig_collection').find().toArray(function(p_err, p_db결과){   //34-2)
    
        console.log(p_db결과)
    
        // render() , list.ejs , ig_posts : p_db결과
        req.render('list.ejs', { ig_posts : p_db결과 })     //34-4)  36-4)
        })
    });
})

// // 🌊 실습코드 끝------



// 🦄🦄42 AJAX로 DELETE 요청하기 1, $.ajax(.), app.delete('delete',(.)={})
console.log('🦄🦄c42')

// ./view/list.jes


// 🦄🦄44 AJAX로 DELETE 요청하기2, deleteOne(.), parseInt(.), data-id, .dataset.id
console.log('🦄🦄c44')

// 🦄🦄46 AJAX로 DELETE 요청하기3, jQuery기능 .send .status .sendFile .render .json(~)
console.log('🦄🦄c46')