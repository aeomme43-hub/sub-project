// ============================================
// 데이터 저장소 (실제로는 서버에서 관리해야 함)
// ============================================

// 어플 데이터 저장소
let appsData = [
    {
        id: 1,
        name: "카카오톡",
        icon: "images/app1.png",
        googlePlay: "https://play.google.com/store/apps/details?id=com.kakao.talk",
        appleStore: "https://apps.apple.com/kr/app/kakaotalk/id362057947",
        reviews: [
            { rating: 5, text: "정말 편리한 메신저 앱입니다.", date: "2024-01-15" },
            { rating: 4, text: "기능이 다양하지만 가끔 버그가 있어요.", date: "2024-01-10" }
        ]
    },
    {
        id: 2,
        name: "네이버",
        icon: "images/app2.png",
        googlePlay: "https://play.google.com/store/apps/details?id=com.nhn.android.search",
        appleStore: "https://apps.apple.com/kr/app/naver-search/id393499958",
        reviews: [
            { rating: 4, text: "검색 기능이 좋고 정보가丰富합니다.", date: "2024-01-12" }
        ]
    },
    {
        id: 3,
        name: "배달의민족",
        icon: "images/app3.png",
        googlePlay: "https://play.google.com/store/apps/details?id=com.sample.delivery",
        appleStore: "https://apps.apple.com/kr/app/sample-delivery/id123456789",
        reviews: []
    }
];

// 장소 데이터 저장소
let locationsData = [
    {
        id: 1,
        name: "서울 타워",
        city: "서울",
        country: "한국",
        continent: "asia",
        reviews: [
            { rating: 5, text: "서울의 야경이 정말 아름답습니다.", date: "2024-01-20" }
        ]
    },
    {
        id: 2,
        name: "경복궁",
        city: "서울",
        country: "한국",
        continent: "asia",
        reviews: [
            { rating: 4, text: "역사적인 장소로 교육적이에요.", date: "2024-01-18" }
        ]
    },
    {
        id: 3,
        name: "에펠탑",
        city: "파리",
        country: "프랑스",
        continent: "europe",
        reviews: []
    }
];

// 지역 데이터 (대륙 > 나라 > 도시)
const regionData = {
    asia: {
        name: "아시아",
        countries: {
            korea: { name: "한국", cities: ["서울", "부산", "대구"] },
            japan: { name: "일본", cities: ["도쿄", "오사카", "교토"] },
            china: { name: "중국", cities: ["베이징", "상하이", "홍콩"] }
        }
    },
    europe: {
        name: "유럽",
        countries: {
            france: { name: "프랑스", cities: ["파리", "리옹", "마르세유"] },
            germany: { name: "독일", cities: ["베를린", "뮌헨", "함부르크"] },
            italy: { name: "이탈리아", cities: ["로마", "밀라노", "베니스"] }
        }
    },
    "north-america": {
        name: "북아메리카",
        countries: {
            usa: { name: "미국", cities: ["뉴욕", "로스앤젤레스", "시카고"] },
            canada: { name: "캐나다", cities: ["토론토", "밴쿠버", "몬트리올"] }
        }
    },
    "south-america": {
        name: "남아메리카",
        countries: {
            brazil: { name: "브라질", cities: ["상파울루", "리우데자네이루", "브라질리아"] },
            argentina: { name: "아르헨티나", cities: ["부에노스아이레스", "코르도바", "멘도사"] }
        }
    },
    africa: {
        name: "아프리카",
        countries: {
            egypt: { name: "이집트", cities: ["카이로", "알렉산드리아", "룩소르"] },
            south_africa: { name: "남아프리카", cities: ["케이프타운", "요하네스버그", "더반"] }
        }
    },
    oceania: {
        name: "오세아니아",
        countries: {
            australia: { name: "호주", cities: ["시드니", "멜버른", "브리즈번"] },
            new_zealand: { name: "뉴질랜드", cities: ["오클랜드", "웰링턴", "크라이스트처치"] }
        }
    }
};

// ============================================
// DOM 요소 가져오기
// ============================================

// 네비게이션 버튼들
const navButtons = document.querySelectorAll('.nav-btn[data-section]');
const registerBtn = document.querySelector('.register-btn');

// 섹션들
const onlineSection = document.getElementById('online-section');
const offlineSection = document.getElementById('offline-section');

// 어플 관련 요소
const appSearchInput = document.getElementById('app-search');
const appSlider = document.querySelector('.slider-container');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

// 지도 관련 요소
const mapSearchInput = document.getElementById('map-search');
const locationsContainer = document.getElementById('locations-container');

// 인터랙티브 맵 요소
const continentView = document.getElementById('continent-view');
const countryView = document.getElementById('country-view');
const cityView = document.getElementById('city-view');
const countryGrid = document.getElementById('country-grid');
const cityGrid = document.getElementById('city-grid');
const selectedContinentName = document.getElementById('selected-continent-name');
const selectedCountryName = document.getElementById('selected-country-name');
const backToContinent = document.getElementById('back-to-continent');
const backToCountry = document.getElementById('back-to-country');

// 현재 선택된 지역 정보
let currentContinent = null;
let currentCountry = null;

// 모달 요소들
const appReviewModal = document.getElementById('app-review-modal');
const locationReviewModal = document.getElementById('location-review-modal');
const registerModal = document.getElementById('register-modal');
const closeButtons = document.querySelectorAll('.close');

// 등록 폼 요소들
const tabButtons = document.querySelectorAll('.tab-btn');
const appReviewForm = document.getElementById('app-review-form');
const locationReviewForm = document.getElementById('location-review-form');

// ============================================
// 네비게이션 기능
// ============================================

// 섹션 전환 함수
function switchSection(sectionName) {
    // 모든 섹션 숨기기
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 선택한 섹션 보이기
    if (sectionName === 'online') {
        onlineSection.classList.add('active');
    } else if (sectionName === 'offline') {
        offlineSection.classList.add('active');
    }
}

// 네비게이션 버튼 클릭 이벤트
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        switchSection(section);
    });
});

// ============================================
// 어플 슬라이드 기능
// ============================================

// 이전 버튼 클릭
prevBtn.addEventListener('click', () => {
    appSlider.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

// 다음 버튼 클릭
nextBtn.addEventListener('click', () => {
    appSlider.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

// ============================================
// 어플 검색 기능
// ============================================

appSearchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        const appName = card.querySelector('h3').textContent.toLowerCase();
        if (appName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// ============================================
// 어플 후기 모달 기능
// ============================================

// 어플 카드 클릭 이벤트 위임
appSlider.addEventListener('click', (e) => {
    const appCard = e.target.closest('.app-card');
    if (appCard) {
        const appName = appCard.querySelector('h3').textContent;
        showAppReviews(appName);
    }
});

// 어플 후기 모달 표시 함수
function showAppReviews(appName) {
    const app = appsData.find(a => a.name === appName);
    if (!app) return;
    
    document.getElementById('modal-app-name').textContent = app.name;
    const reviewsContainer = document.getElementById('app-reviews');
    
    if (app.reviews.length === 0) {
        reviewsContainer.innerHTML = '<p>후기가 없습니다.</p>';
    } else {
        reviewsContainer.innerHTML = app.reviews.map(review => `
            <div class="review-item">
                <div class="rating">${'⭐'.repeat(review.rating)}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-date">${review.date}</div>
            </div>
        `).join('');
    }
    
    appReviewModal.style.display = 'block';
}

// ============================================
// 인터랙티브 맵 기능
// ============================================

// 대륙 클릭 시 나라 목록 표시
document.querySelectorAll('.continent-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const continent = btn.getAttribute('data-continent');
        currentContinent = continent;
        showCountriesForContinent(continent);
    });
});

// 나라 목록 표시 함수
function showCountriesForContinent(continent) {
    if (!regionData[continent]) return;
    
    continentView.style.display = 'none';
    countryView.style.display = 'block';
    cityView.style.display = 'none';
    
    selectedContinentName.textContent = `${regionData[continent].name} - 나라 선택`;
    countryGrid.innerHTML = '';
    
    Object.keys(regionData[continent].countries).forEach(countryKey => {
        const country = regionData[continent].countries[countryKey];
        const countryItem = document.createElement('div');
        countryItem.className = 'country-item';
        countryItem.setAttribute('data-country', countryKey);
        countryItem.innerHTML = `<span>${country.name}</span>`;
        countryItem.addEventListener('click', () => {
            currentCountry = countryKey;
            showCitiesForCountry(continent, countryKey);
        });
        countryGrid.appendChild(countryItem);
    });
}

// 도시 목록 표시 함수
function showCitiesForCountry(continent, countryKey) {
    if (!regionData[continent].countries[countryKey]) return;
    
    continentView.style.display = 'none';
    countryView.style.display = 'none';
    cityView.style.display = 'block';
    
    const countryName = regionData[continent].countries[countryKey].name;
    selectedCountryName.textContent = `${countryName} - 도시 선택`;
    cityGrid.innerHTML = '';
    
    regionData[continent].countries[countryKey].cities.forEach(city => {
        const cityItem = document.createElement('div');
        cityItem.className = 'city-item';
        cityItem.setAttribute('data-city', city);
        cityItem.innerHTML = `<span>${city}</span>`;
        cityItem.addEventListener('click', () => {
            showLocationsForCity(city);
        });
        cityGrid.appendChild(cityItem);
    });
}

// 대륙으로 돌아가기
backToContinent.addEventListener('click', () => {
    continentView.style.display = 'block';
    countryView.style.display = 'none';
    cityView.style.display = 'none';
    currentContinent = null;
    currentCountry = null;
});

// 나라로 돌아가기
backToCountry.addEventListener('click', () => {
    continentView.style.display = 'none';
    countryView.style.display = 'block';
    cityView.style.display = 'none';
    currentCountry = null;
});

// 도시별 장소 표시 함수
function showLocationsForCity(city) {
    const cityLocations = locationsData.filter(loc => loc.city === city);
    
    if (cityLocations.length === 0) {
        locationsContainer.innerHTML = '<p>이 도시에는 등록된 장소가 없습니다.</p>';
    } else {
        locationsContainer.innerHTML = cityLocations.map(location => `
            <div class="location-item" data-location-id="${location.id}">
                <h4>${location.name}</h4>
                <p>${location.reviews.length}개의 후기</p>
            </div>
        `).join('');
        
        // 장소 클릭 이벤트 추가
        document.querySelectorAll('.location-item').forEach(item => {
            item.addEventListener('click', () => {
                const locationId = parseInt(item.getAttribute('data-location-id'));
                showLocationReviews(locationId);
            });
        });
    }
}

// 검색어와 일치하는 장소만 표시하는 함수
function showFilteredLocations(searchTerm) {
    const filteredLocations = locationsData.filter(loc => 
        loc.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredLocations.length === 0) {
        locationsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
    } else {
        locationsContainer.innerHTML = filteredLocations.map(location => `
            <div class="location-item" data-location-id="${location.id}">
                <h4>${location.name}</h4>
                <p>${location.city}, ${location.country} - ${location.reviews.length}개의 후기</p>
            </div>
        `).join('');
        
        // 장소 클릭 이벤트 추가
        document.querySelectorAll('.location-item').forEach(item => {
            item.addEventListener('click', () => {
                const locationId = parseInt(item.getAttribute('data-location-id'));
                showLocationReviews(locationId);
            });
        });
    }
}

// ============================================
// 지도 검색 기능
// ============================================

mapSearchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (!searchTerm) {
        continentView.style.display = 'block';
        countryView.style.display = 'none';
        cityView.style.display = 'none';
        locationsContainer.innerHTML = '<p>도시를 선택하면 장소들이 표시됩니다.</p>';
        return;
    }
    
    try {
        // 장소 검색 - 해당 장소가 속한 나라로 이동
        const locationMatches = locationsData.filter(loc => 
            loc.name.toLowerCase().includes(searchTerm)
        );
        
        if (locationMatches.length > 0) {
            const location = locationMatches[0];
            // 장소가 속한 대륙과 나라 찾기
            Object.keys(regionData).forEach(continentKey => {
                if (regionData[continentKey] && regionData[continentKey].countries) {
                    Object.keys(regionData[continentKey].countries).forEach(countryKey => {
                        const country = regionData[continentKey].countries[countryKey];
                        if (country.name === location.country) {
                            currentContinent = continentKey;
                            currentCountry = countryKey;
                            showCitiesForCountry(continentKey, countryKey);
                        }
                    });
                }
            });
            return;
        }
        
        // 대륙 검색
        let continentFound = false;
        Object.keys(regionData).forEach(continentKey => {
            if (regionData[continentKey] && regionData[continentKey].name.toLowerCase().includes(searchTerm)) {
                currentContinent = continentKey;
                currentCountry = null;
                showCountriesForContinent(continentKey);
                continentFound = true;
            }
        });
        
        if (continentFound) return;
        
        // 나라 검색
        let countryFound = false;
        Object.keys(regionData).forEach(continentKey => {
            if (regionData[continentKey] && regionData[continentKey].countries) {
                Object.keys(regionData[continentKey].countries).forEach(countryKey => {
                    if (regionData[continentKey].countries[countryKey] && 
                        regionData[continentKey].countries[countryKey].name.toLowerCase().includes(searchTerm)) {
                        currentContinent = continentKey;
                        currentCountry = countryKey;
                        showCitiesForCountry(continentKey, countryKey);
                        countryFound = true;
                    }
                });
            }
        });
        
        if (countryFound) return;
        
        // 도시 검색 - 해당 도시가 속한 나라로 이동
        let cityFound = false;
        Object.keys(regionData).forEach(continentKey => {
            if (regionData[continentKey] && regionData[continentKey].countries) {
                Object.keys(regionData[continentKey].countries).forEach(countryKey => {
                    if (regionData[continentKey].countries[countryKey] && 
                        regionData[continentKey].countries[countryKey].cities) {
                        regionData[continentKey].countries[countryKey].cities.forEach(city => {
                            if (city.toLowerCase().includes(searchTerm)) {
                                currentContinent = continentKey;
                                currentCountry = countryKey;
                                showCitiesForCountry(continentKey, countryKey);
                                cityFound = true;
                            }
                        });
                    }
                });
            }
        });
        
        // 검색 결과가 없으면 세계지도로 복귀
        if (!cityFound && !continentFound && !countryFound && locationMatches.length === 0) {
            continentView.style.display = 'block';
            countryView.style.display = 'none';
            cityView.style.display = 'none';
            locationsContainer.innerHTML = '<p>검색 결과가 없습니다. 세계지도에서 대륙을 선택하세요.</p>';
        }
    } catch (error) {
        console.error('검색 오류:', error);
        // 오류 발생 시 세계지도로 복귀
        continentView.style.display = 'block';
        countryView.style.display = 'none';
        cityView.style.display = 'none';
        locationsContainer.innerHTML = '<p>검색 중 오류가 발생했습니다. 세계지도에서 대륙을 선택하세요.</p>';
    }
});

// ============================================
// 장소 후기 모달 기능
// ============================================

// 장소 후기 모달 표시 함수
function showLocationReviews(locationId) {
    const location = locationsData.find(loc => loc.id === locationId);
    if (!location) return;
    
    document.getElementById('modal-location-name').textContent = location.name;
    const reviewsContainer = document.getElementById('location-reviews');
    
    if (location.reviews.length === 0) {
        reviewsContainer.innerHTML = '<p>후기가 없습니다.</p>';
    } else {
        reviewsContainer.innerHTML = location.reviews.map(review => `
            <div class="review-item">
                <div class="rating">${'⭐'.repeat(review.rating)}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-date">${review.date}</div>
            </div>
        `).join('');
    }
    
    locationReviewModal.style.display = 'block';
}

// ============================================
// 등록 팝업 기능
// ============================================

// 등록 버튼 클릭
registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'block';
});

// 탭 전환 기능
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 모든 탭 비활성화
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.register-form').forEach(form => form.classList.remove('active'));
        
        // 클릭한 탭 활성화
        button.classList.add('active');
        const tabName = button.getAttribute('data-tab');
        
        if (tabName === 'app') {
            appReviewForm.classList.add('active');
        } else if (tabName === 'location') {
            locationReviewForm.classList.add('active');
        }
    });
});

// 어플 후기 등록
appReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const appName = document.getElementById('app-name').value;
    const rating = parseInt(document.getElementById('app-rating').value);
    const reviewText = document.getElementById('app-review-text').value;
    
    // 기존 어플 찾기 또는 새 어플 생성
    let app = appsData.find(a => a.name === appName);
    if (!app) {
        app = {
            id: appsData.length + 1,
            name: appName,
            icon: "images/default-app.png",
            googlePlay: "#",
            appleStore: "#",
            reviews: []
        };
        appsData.push(app);
    }
    
    // 후기 추가
    app.reviews.push({
        rating: rating,
        text: reviewText,
        date: new Date().toISOString().split('T')[0]
    });
    
    alert('어플 후기가 등록되었습니다!');
    appReviewForm.reset();
    registerModal.style.display = 'none';
    
    // 어플 카드 다시 렌더링
    renderAppCards();
});

// 장소 후기 등록
locationReviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const locationName = document.getElementById('location-name').value;
    const city = document.getElementById('location-city').value;
    const rating = parseInt(document.getElementById('location-rating').value);
    const reviewText = document.getElementById('location-review-text').value;
    
    // 기존 장소 찾기 또는 새 장소 생성
    let location = locationsData.find(l => l.name === locationName && l.city === city);
    if (!location) {
        location = {
            id: locationsData.length + 1,
            name: locationName,
            city: city,
            country: "미정",
            continent: "asia",
            reviews: []
        };
        locationsData.push(location);
    }
    
    // 후기 추가
    location.reviews.push({
        rating: rating,
        text: reviewText,
        date: new Date().toISOString().split('T')[0]
    });
    
    alert('장소 후기가 등록되었습니다!');
    locationReviewForm.reset();
    registerModal.style.display = 'none';
    
    // 장소 목록 다시 렌더링
    if (citySelect.value) {
        showLocationsForCity(citySelect.value);
    }
});

// ============================================
// 모달 닫기 기능
// ============================================

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// ============================================
// 어플 카드 렌더링 함수
// ============================================

function renderAppCards() {
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.innerHTML = appsData.map(app => `
        <div class="app-card">
            <img src="${app.icon}" alt="${app.name}" class="app-icon">
            <h3>${app.name}</h3>
            <div class="store-buttons">
                <a href="${app.googlePlay}" class="store-btn google-play" target="_blank">Google Play</a>
                <a href="${app.appleStore}" class="store-btn apple-store" target="_blank">App Store</a>
            </div>
        </div>
    `).join('');
}

// ============================================
// 초기화
// ============================================

// 페이지 로드 시 어플 카드 렌더링
document.addEventListener('DOMContentLoaded', () => {
    renderAppCards();
});
