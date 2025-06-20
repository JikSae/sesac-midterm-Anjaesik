// TMDB 이미지 주소 기본 경로
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// 검색 기능
document.querySelector(".searchBtn").addEventListener("click", function () {
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  const movieResult = document.getElementById("movieResult");

  // 이전 결과 초기화
  movieResult.innerHTML = ""; 

  // 검색창
  const filtered = movieList.results.filter(movie =>
    movie.title.toLowerCase().includes(keyword)
  );

  if (filtered.length === 0) {
    movieResult.innerHTML = "<p class='text-center text-danger'> ❌ 해당 영화 정보를 찾을 수 없습니다.</p>";
    return;
  }


  if (keyword.length === 0) {
    movieResult.innerHTML = "<p class='text-center text-danger'> ❌ 영화 제목을 제대로 입력해주세요.</p>";
    return;
  }


  // 결과 보여주기
  filtered.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.className = "col-md-3 mb-4";
    movieCard.innerHTML = `
      <div class="card h-100 shadow-sm">
      <img src="${IMAGE_BASE_URL + movie.poster_path}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <div class="card-body text-center">
            <h5 class="card-title"><span>${movie.title}</span></h5>
          </div>
        </div>
      </div>
    `;
    movieResult.appendChild(movieCard);
   movieCard.querySelector('.card').addEventListener('click', () => {
  window.location.href = `movie-detail.html?id=${movie.id}`;
});
  });
});