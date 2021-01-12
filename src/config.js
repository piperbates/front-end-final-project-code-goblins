const url = process.env.REACT_APP_BACKEND_URL;

const config = {
  BACKEND_URL_SEARCH: `${url}/search/?`,
  BACKEND_URL_SEARCH_BY_ID: `${url}/searchbyid/`,
  BACKEND_URL_ADD_CONTENT: `${url}/addcontent/`,
  BACKEND_URL_VIMEO_GET_ALL_DATA: `${url}/vimeo/allData/`,
  BACKEND_URL_TAGS_GET_ALL_DATA: `${url}/tags/`,
  BACKEND_URL_TAGS_DELETE: `${url}/tags/`,
  BACKEND_URL_TAGS_ADD: `${url}/tags/`,
  BACKEND_URL_TAGS_UPDATE: `${url}/tags/`,
  BACKEND_URL_FEEDBACK_UPDATE: `${url}/feedback/`,
};

export default config;
