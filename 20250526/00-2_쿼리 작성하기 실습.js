// === 기본 페이지네이션 ===
product = db.products.findOne({'slug': 'laptop-1'})
console.log(product)


// 첫 번째 페이지 (0-11번째 리뷰)
db.reviews.find({'product_id': product['_id']})
db.reviews.countDocuments({'product_id': product['_id']})


db.reviews.find({'product_id': product['_id']})
    .skip(0)
    .limit(12)
    .sort({'helpful_votes': -1})


// === 완전한 페이지네이션 시스템 ===
page_number = 1  // 현재 페이지 번호
page_size = 12   // 페이지당 항목 수

product = db.products.findOne({'slug': 'laptop-1'})
category = db.categories.findOne({'_id': product['main_cat_id']})

// 전체 리뷰 개수 (구 버전)
reviews_count = db.reviews.count({'product_id': product['_id']})

// 전체 리뷰 개수 (신 버전 - MongoDB 4.0+)
reviews_count = db.reviews.countDocuments({'product_id': product['_id']})


// 페이지네이션된 리뷰 조회
reviews = db.reviews.find({'product_id': product['_id']})
    .skip((page_number - 1) * page_size)
    .limit(page_size)
    .sort({'helpful_votes': -1})


// === 카테고리별 상품 리스트 ===

db.categories.find()

category = db.categories.findOne({'slug': 'electronics'})
console.log(category)

// 해당 카테고리 상품 목록 + 페이지네이션(5개당 1페이지)
db.products.find({'category_id': category['_id']})
page_number = 1
page_size = 5
products = db.products.find({'category_id': category['_id']})
    .skip((page_number - 1) * page_size)
    .limit(page_size)
    .sort({'helpful_votes': -1})
console.log(products)



// === 전체 사용자 조회 ===
db.users.find({})

// === 단일 조건 ===
db.users.find({'last_name': "White"})

// === 복수 조건 (묵시적 AND) ===
db.users.find({'first_name': "Kelly", 'birth_year': 1979})

// === 명시적 AND (복잡한 조건 시) ===
db.users.find({
    $and: [
        {'first_name': "Kelly"},
        {'birth_year': 1979}
    ]
})


// === 잘못된 범위 쿼리 (두 번째 조건이 첫 번째를 덮어씀) ===
db.users.find({
    'birth_year': {'$gte': 1975},
    'birth_year': {'$lte': 1985}  // 이 조건만 적용됨!
})

// === 올바른 범위 쿼리 ===
db.users.find({
    'birth_year': {'$gte': 1975, '$lte': 1985}
})


db.items.insertMany([
    { "_id" : ObjectId("4caf82011b0978483ea29ada"), "value" : 97 },
    { "_id" : ObjectId("4caf82031b0978483ea29adb"), "value" : 98 },
    { "_id" : ObjectId("4caf82051b0978483ea29adc"), "value" : 99 },
    { "_id" : ObjectId("4caf820d1b0978483ea29ade"), "value" : "a" },
    { "_id" : ObjectId("4caf820f1b0978483ea29adf"), "value" : "b" },
    { "_id" : ObjectId("4caf82101b0978483ea29ae0"), "value" : "c" }
])

// === 타입별 범위 검색 ===
// 정수 범위 검색 (숫자 데이터만 반환)
db.items.find({'value': {'$gte': 97}})

// 문자열 범위 검색 (문자열 데이터만 반환)
db.items.find({'value': {'$gte': "a"}})



// === 다중 상품 검색 ===
db.products.find()
db.products.find({
    'slug': {
        '$in': [
            'laptop-1',
            'smartphone-2',
            'tablet-3'
        ]
    }
})



// === OR 조건 (색상 또는 제조사로 검색) ===
db.products.find({
    '$or': [
        {'details.color': 'blue'},
        {'details.manufacturer': 'ACME'}
    ]
})

// === 복합 태그 검색 (두 태그 그룹 모두 포함) ===
db.products.find({
    $and: [
        {tags: {$in: ['new', 'basic']}},
        {tags: {$in: ['tech', 'digital']}}
    ]
})

// === 필드 존재 여부 확인 ===
// 색상 정보가 없는 상품
db.products.find({'details.color': {$exists: false}})
db.products.countDocuments({'details.color': {$exists: false}})

// 색상 정보가 있는 상품
db.products.find({'details.color': {$exists: true}})
db.products.countDocuments({'details.color': {$exists: true}})



// === 배열 요소 검색 ===
// 배열에 "soil" 포함된 모든 문서
db.products.find({tags: "soil"})

// 첫 번째 태그가 "soil"인 문서만
db.products.find({'tags.0': "soil"})


// === 인덱스 기반 검색 ===
// 첫 번째 주소의 주(state) 검색
db.users.find({'addresses.0.state': "NY"})

// === 전체 배열 검색 ===
// 모든 주소 중 NY가 있는 사용자
db.users.find({'addresses.state': "NY"})

// === 다중 조건 검색 ($elemMatch 사용) ===
// 같은 배열 요소 내에서 모든 조건이 만족되어야 함
db.users.find({
    'addresses': {
        '$elemMatch': {
            'city': 'San Antonio',
            'state': 'NY'
        }
    }
})