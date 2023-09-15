import axios from 'axios';

type TConfig = {
  url: string;
  data?: any;
  headers?: Record<string, string>;
};

export default class HttpService {
  constructor(
    public baseUrl = process.env.REACT_APP_SERVER_URL,
    public fetchingService = axios,
    public apiVersion = 'api'
  ) {}

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  private populateTokenToHeaderConfig(): Record<string, string> {
    const token = localStorage.getItem('token');
    if (token === null) return {};
    return {
      Authorization: `Bearer ${token}`
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: TConfig) {
    return configWithoutDataAndUrl;
  }

  private setAuthHeaders(withAuth: boolean, config: TConfig) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
  }

  protected get<T>(config: TConfig, withAuth = true) {
    this.setAuthHeaders(withAuth, config);
    return this.fetchingService.get<T>(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }

  protected post<T>(config: TConfig, withAuth = true) {
    this.setAuthHeaders(withAuth, config);
    return this.fetchingService.post<T>(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  protected put<T>(config: TConfig, withAuth = true) {
    this.setAuthHeaders(withAuth, config);
    return this.fetchingService.put<T>(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  protected delete<T>(config: TConfig, withAuth = true) {
    this.setAuthHeaders(withAuth, config);
    return this.fetchingService.delete<T>(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }
}
