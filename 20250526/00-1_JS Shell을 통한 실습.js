// use my_database

db.users.find()

// === 삽입 (INSERT) ===
// 구 버전 (MongoDB 3.2 이전)
db.users.insert({username: "smith"})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.insertOne({username: "smith"})
db.users.insertMany([
    {username: "smith"},
    {username: "jones"}
])


// === 조회 (FIND) ===
db.users.find()
// { _id : ObjectId("4bf9bec50e32f82523389314"), username : "smith" }

// === 개수 확인 ===
// 구 버전 (MongoDB 4.0 이전)
db.users.count()

// 신 버전 (MongoDB 4.0+) - 권장
db.users.countDocuments()
db.users.estimatedDocumentCount() // 빠른 추정값 (추정치 계산)


//_id 필드
// === 여러 문서 삽입 ===
// 구 버전 (MongoDB 3.2 이전)
db.users.insert({username: "smith"})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.insertOne({username: "jones"})

// === 조회 결과 ===
db.users.find(
    { _id : ObjectId("6833ed574ef7cf4f3087cdbe"), username : "smith" })
db.users.find({ _id : ObjectId("6833eeec4ef7cf4f3087cdc3"), username : "jones" })


// 조건 검색
// 특정 사용자 검색
db.users.find({username: "jones"})
// { _id : ObjectId("6833eeec4ef7cf4f3087cdc3"), username : "jones" }

// 빈 조건 (모든 문서 리턴)
db.users.find()    // db.users.find({})와 동일


// 논리 연산자 활용
// 기본 AND (암시적)
db.users.find({
    _id : ObjectId("6833ed594ef7cf4f3087cdc0"),
    username: "smith"
})

// 명시적 AND
db.users.find({
    $and: [
        {_id : ObjectId("6833ed594ef7cf4f3087cdc0")},
        {username: "smith"}
    ]
})

// OR 연산자 사용
db.users.find({
    $or: [
        {username: "smith"},
        {username: "jones"}
    ]
})

// === 업데이트 메서드 비교 ===
// 구 버전 (MongoDB 3.2 이전)
// db.컬렉션.update(쿼리문서, 갱신문서, upsert여부, 다중적용여부)

// 신 버전 (MongoDB 3.2+) - 권장
// db.컬렉션.updateOne(쿼리문서, 갱신문서, 옵션)
// db.컬렉션.updateMany(쿼리문서, 갱신문서, 옵션)
// db.컬렉션.replaceOne(쿼리문서, 대체문서, 옵션)

// === 필드 추가 ===
// 구 버전 (MongoDB 3.2 이전)
db.users.update({username: "smith"}, {$set: {country: "Canada"}})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.updateOne({username: "smith"}, {$set: {country2: "Canada2"}})

db.users.find({username: "smith"})


// === 필드 삭제 ===
// 구 버전 (MongoDB 3.2 이전)
// country 필드 삭제
db.users.update({username: "smith"}, {$unset: {country: 1}})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.updateOne({username: "smith"}, {$unset: {country2: 1}})

// === 결과 확인 ===
db.users.find({username: "smith"})

// === 도큐먼트를 대체 ===
// 구 버전 (MongoDB 3.2 이전)
db.users.update({username: "smith"}, {country: "Canada"})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.replaceOne({username: "smith"}, {country2: "Canada"})

// === 복원 작업 ===
db.users.updateOne({country: "Canada"}, {$set: {username: "smith", country: "Canada"}})

db.users.find()


// === 복잡한 데이터 업데이트 ===
// 구 버전 (MongoDB 3.2 이전)
db.users.update({username: "tom"}, {
    $set: {
        favorites: {
            cities: ["Chicago", "Cheyenne"],
            movies: ["Casablanca", "For a Few Dollars More", "The Sting"]
        }
    }
})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.updateOne({username: "tom"}, {
    $set: {
        favorites: {
            cities: ["Chicago", "Cheyenne"],
            movies: ["Casablanca", "For a Few Dollars More", "The Sting"]
        }
    }
})

db.users.updateOne({username: "jones"},
    {
        $set: {
            favorites: {
                movies: ["Casablanca", "Rocky"]
            }
        }
    })

// 점 표기법으로 중첩 필드 검색
db.users.find({"favorites.movies": "Casablanca"}).pretty()

// 배열 요소로 검색 가능

// === 다중 업데이트 비교 ===
// 구 버전 (MongoDB 3.2 이전)
db.users.update(
    {"favorites.movies": "Casablanca"},
    {$addToSet: {"favorites.movies": "The Maltese Falcon"}},
    {upsert: false, multi: true} // multi 옵션 사용
)
// 1. favorites 객체 안의 movies 배열에 "Casablanca"가 포함된 도큐먼트 찾기
// 2. favorites.movies 배열에 "The Maltese Falcon" 추가 (이미 있으면 추가 안함)
// 3. upsert: false: 조건에 맞는 도큐먼트가 없어도 새로 생성하지 않음
// 4. multi: true: 조건에 맞는 모든 도큐먼트를 수정


// 신 버전 (MongoDB 3.2+) - 권장
db.users.updateMany(
    {"favorites.movies": "Casablanca"},
    {$addToSet: {"favorites.movies": "The Maltese Falcon"}},
    {upsert: false} // multi 옵션 불필요
)
// 1. favorites 객체 안의 movies 배열에 "Casablanca"가 포함된 도큐먼트 찾기
// 2. favorites.movies 배열에 "The Maltese Falcon" 추가 (이미 있으면 추가 안함)
// 3. upsert: false: 조건에 맞는 도큐먼트가 없어도 새로 생성하지 않음
// 4. multi: true: 조건에 맞는 모든 도큐먼트를 수정


// === 단일 업데이트 (신버전) ===
db.users.updateOne(
    {"favorites.movies": "Casablanca"},
    {$push: {"favorites.movies": "Citizen Kane"}}
)

// 1. favorites 객체 안의 movies 배열에 "Casablanca"가 포함된 도큐먼트 찾기
// -updateOne() 메서드이기 때문에 조건에 맞는 첫 번째 도큐먼트만 수정
// 2. favorites.movies 배열에 "Citizen Kane" 추가 (중복 허용)



// === 데이터 삭제 ===
// === 조건부 삭제 ===
// 구 버전 (MongoDB 3.2 이전)
db.users.remove({"favorites.cities": "Cheyenne"})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.deleteOne({"favorites.cities": "Cheyenne"})    // 첫 번째 문서만 삭제
db.users.deleteMany({"favorites.cities": "Cheyenne"})   // 조건에 맞는 모든 문서 삭제

// === 모든 문서 삭제 ===
// 구 버전 (MongoDB 3.2 이전)
db.users.remove({})

// 신 버전 (MongoDB 3.2+) - 권장
db.users.deleteMany({})  // 모든 문서 삭제 (컬렉션 유지)

// === 컬렉션 삭제 ===
db.users.drop()  // 버전 무관 - 컬렉션 자체 삭제


// === 인덱스 생성과 질의 ===
// === 대용량 데이터 생성/확인 (구 버전) ===
// 20만 개 도큐먼트 생성
for(let i = 0; i < 200000; i++) {
    db.numbers.insert({num: i});
}

// 도큐먼트 개수 확인
db.numbers.count()


// === 대용량 데이터 생성/확인 (신 버전) ===
// 20만 개 도큐먼트생성 (신 버전 - MongoDB 3.2+)
// 방법 1: insertMany로 배치 삽입 (더 효율적)
let docs = [];
for(let i = 0; i < 200000; i++) {
    docs.push({num: i});
    // 1000개씩 배치로 삽입 (메모리 효율성)
    if(docs.length === 1000) {
        db.numbers.insertMany(docs);
        docs = [];
    }
}
if(docs.length == 0) {
    db.numbers.insertMany(docs);
}

// 방법 2: 개별 삽입 (호환성 우선시)
for(let i = 0; i < 200000; i++) {
    db.numbers.insertOne({num: i});
}

// 도큐먼트 개수 확인
db.numbers.countDocuments()  // 정확한 개수
db.numbers.estimatedDocumentCount()  // 빠른 추정값

// === 범위 비교 연산자 ===
// 큰 값 검색 ($gt: greater than)
db.numbers.find({num: {"$gt": 199995}})

// 범위 검색 ($gt, $lt)
db.numbers.find({num: {"$gt": 20, "$lt": 25}})

// 쿼리 실행 계획 확인
db.numbers.find({num: {"$gt": 199995}}).explain("executionStats")




// === 인덱스 생성 ===
// 신 버전 (MongoDB 3.0+) - 권장
db.numbers.createIndex({num: 1})

// 구 버전 (MongoDB 3.0 이전) - 더 이상 권장하지 않음
db.numbers.ensureIndex({num: 1})

// === 인덱스 확인 ===
db.numbers.getIndexes()  // 버전 무관

// === 복합 인덱스 생성 (신버전 예시) ===
db.users.createIndex({username: 1, age: -1})  // username 오름차순, age 내림차순

// === 인덱스 옵션 활용 ===
db.users.createIndex(
    {email: 1},
    {unique: true, sparse: true}  // 유니크 인덱스, null 값 제외
)

// 인덱스 적용 후 explain() 결과
db.numbers.find({num: {"$gt": 199995}}).explain("executionStats")


// === 데이터베이스 및 컬렉션 정보 ===
// 데이터베이스 목록 보기
//show dbs

// 현재 데이터베이스의 컬렉션 목록 보기
//show collections

// === 상태 정보 확인 ===
// 구 버전 (MongoDB 4.4 이전)
db.stats()
db.numbers.stats()

// 신 버전 (MongoDB 4.4+) - 더 자세한 정보
db.runCommand({dbStats: 1})
db.runCommand({collStats: "numbers"})

// === 연결 상태 확인 ===
db.hello()  // MongoDB 5.0+
db.isMaster()  // 구 버전 (MongoDB 5.0 이전)