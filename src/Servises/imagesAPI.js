import axios from 'axios';

const KEY = '33150611-24a765514bc0673e581c5440a';

function getImagesPixabay(page = 1, query, per_page) {
  const res = axios(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return res;
}

export default getImagesPixabay;
