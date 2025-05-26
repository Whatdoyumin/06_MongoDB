//use tutorial

// 1. users 컬렉션에 {username: "smith"} 문서를 추가하세요.
db.users.insertOne({username: "smith"})

// 2. 위의 문서를 다음과 같이 되도록 수정하세요.
db.users.updateOne( {username: "smith"},
    {
        $set: {
            favorites: {
                cities: ["Chicago", "Cheyenne"],
                movies: ["Casablanca", "For a Few Dollars More", "The Sting"]
            }
        }
    })

// 3. users 컬렉션에 {username: "jones"} 문서를 추가하세요.
db.users.insertOne({username: "jones"})

// 4. 위의 문서를 다음과 같이 되도록 수정하세요.
db.users.update( {username: "jones"},
    {
        $set: {
            favorites: {
                movies: ["Casablanca", "Rocky"]
            }
        }
    })

// 5. users 컬렉션의 "Casablanca" 영화를 좋아하는 사용자들을 출력하세요.
db.users.find({"favorites.movies": "Casablanca"}).pretty()

// 6. users 컬렉션의 "Casablanca" 영화를 좋아하는 사용자들에 대해서 좋아하는 영화 목록에 "TheMaltese Falcon"을 중복 없이 추가하세요.
//      단, 해당 항목이 없는 경우는 무시하고, 여러 사람이 일치한다면 모두 업데이트 하세요.
db.users.updateMany( {"favorites.movies": "Casablanca"},
    {$addToSet: {"favorites.movies": "The Maltese Falcon"} },
    {upsert: false})

// 7. numbers 컬렉션에 20,000개의 문서를 생성하세요. (문서 형태: {num: i}
for(let i = 0; i < 200000; i++) {
    db.numbers.insertOne({num: i});
}

// 8. numbers 컬렉션의 문서 개수를 출력하세요.
db.numbers.countDocuments()

// 9. numbers 컬렉션에서 num의 값이 20이상 25이하인 문서를 출력하세요.
db.numbers.find({
    num: {$gte: 20, $lte: 25}
})

// 10. 위 쿼리의 실행 통계를 출력하세요.
db.numbers.find({
    num: { $gte: 20, $lte: 25 }
}).explain("executionStats")

// 11. numbers 컬렉션의 num 키에 대해서 인덱스를 생성하세요.
db.numbers.createIndex({ num: 1 })

// 12. 위에서 생성한 인덱스 정보를 출력하세요.
db.numbers.getIndexes()

// 13. 앞에서 작성한 범위 연산 쿼리의 실행 통계를 출력하고, 인덱스가 없을 때와 비교해보세요.
db.numbers.find({
    num: { $gte: 20, $lte: 25 }
}).explain("executionStats")