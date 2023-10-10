import axios from 'axios';
import { container } from 'tsyringe';
import ApplicationConfiguration from '~/services/application-configuration';
import i18n from '~/services/i18n';

const applicationConfiguration = container.resolve(ApplicationConfiguration);

const API = axios.create();

API.interceptors.request.use((request) => {
  request.baseURL = applicationConfiguration.getItem('API_URL');

  request.headers = request.headers || {};
  request.headers['Accept-Language'] = i18n.language;

  return request;
});

export default API;
