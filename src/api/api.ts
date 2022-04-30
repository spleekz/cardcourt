/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Message {
  message: string;
}

export interface Id {
  _id: string;
}

export interface Token {
  token: string;
}

export interface RegisterUserData {
  name: string;
  password: string;
}

export type RegisterUserResponse = Token;

export interface LoginUserData {
  name: string;
  password: string;
}

export type LoginUserResponse = Token;

export interface PublicUserInfo {
  name: string;
}

export interface PublicUserFeatures {
  publicCards: Cards;
}

export interface PublicUser {
  publicUserInfo: PublicUserInfo;
  publicUserFeatures: PublicUserFeatures;
}

export type FullUser = RegisterUserData & PublicUser;

export type GetUserInfoResponse = PublicUserInfo;

export interface Me {
  name: string;
}

export type MeResponse = Me;

export interface CardUI {
  bodyColor: string;
  wordsColor: string;
}

export interface CardAuthor {
  name: string;
  _id: string;
}

export interface CardAuthorField {
  author: CardAuthor;
}

export interface EditedCardFields {
  ui: CardUI;
  words: (CardWord | SendedCardWord)[];
  name: string;
}

export interface SendedCardWord {
  en: string;
  ru: string;
}

export type CardWord = SendedCardWord & Id;

export type SendedCardWords = SendedCardWord[];

export type CardWords = CardWord[];

export interface SendedCard {
  name: string;
  words: SendedCardWords;
  ui: CardUI;
}

export type Card = { author: CardAuthor; words: CardWords } & SendedCard & Id;

export type GetCardResponse = Card;

export type CreateCardData = SendedCard;

export type CreateCardResponse = Id;

export type DeleteCardData = Id;

export type DeleteCardResponse = Message;

export type UpdatedCard = Id & EditedCardFields & CardAuthorField;

export type UpdateCardData = UpdatedCard;

export interface UpdateCardResponse {
  updatedCard: Card;
}

export type Cards = Card[];

export interface GetCardsResponse {
  cards: Cards;
  maxLoadedPage: number;
  pageCount: number;
}

export interface GetCardCountResponse {
  pageCount: number;
  cardCount: number;
}

export interface GetCardCountParams {
  /** Размер одной страницы (по умолчанию - 5) */
  pageSize?: number;

  /** Поисковый запрос */
  search?: string;

  /** Имя автора карточек */
  by?: string;
}

export interface GetCardsParams {
  /** Номер страницы, размером pageSize (по умолчанию - 1) */
  page?: number;

  /** Количество страниц, которое нужно загрузить, начиная с page включительно */
  pagesToLoad?: number;

  /** Размер одной страницы (по умолчанию - 5) */
  pageSize?: number;

  /** Поисковый запрос */
  search?: string;

  /** Имя автора карточек */
  by?: string;
}

export namespace Register {
  /**
   * No description
   * @tags users
   * @name RegisterUser
   * @summary Регистрация пользователя на сервере
   * @request POST:/register
   * @response `200` `RegisterUserResponse` Возвращает токен пользователя
   * @response `default` `Message` Ошибка
   */
  export namespace RegisterUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RegisterUserData;
    export type RequestHeaders = {};
    export type ResponseBody = RegisterUserResponse;
  }
}

export namespace Login {
  /**
   * No description
   * @tags users
   * @name LoginUser
   * @summary Войти в свой аккаунт
   * @request POST:/login
   * @response `200` `LoginUserResponse` Возвращает токен пользователя
   * @response `default` `Message` Ошибка
   */
  export namespace LoginUser {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginUserData;
    export type RequestHeaders = {};
    export type ResponseBody = LoginUserResponse;
  }
}

export namespace Me {
  /**
   * No description
   * @tags users
   * @name GetMe
   * @summary Получить данные о себе с помощью токена
   * @request GET:/me
   * @secure
   * @response `200` `MeResponse` Ваши данные
   */
  export namespace GetMe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = MeResponse;
  }
}

export namespace CardCount {
  /**
   * No description
   * @tags cards
   * @name GetCardCount
   * @summary Получить количество страниц карточек, существующих по этому запросу
   * @request GET:/cardCount
   * @response `200` `GetCardCountResponse` Количество страниц
   */
  export namespace GetCardCount {
    export type RequestParams = {};
    export type RequestQuery = { pageSize?: number; search?: string; by?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCardCountResponse;
  }
}

export namespace Cards {
  /**
   * No description
   * @tags cards
   * @name GetCards
   * @summary Начиная со страницы page включительно, загрузить pagesToLoad страниц, имеющих размер pageSize и удовлетворяющих поисковому запросу search и автору by
   * @request GET:/cards
   * @response `200` `GetCardsResponse` Список карточек
   * @response `default` `Message` Ошибка
   */
  export namespace GetCards {
    export type RequestParams = {};
    export type RequestQuery = { page?: number; pagesToLoad?: number; pageSize?: number; search?: string; by?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCardsResponse;
  }
}

export namespace Card {
  /**
   * No description
   * @tags cards
   * @name CreateCard
   * @summary Создать карточку от своего имени
   * @request POST:/card
   * @secure
   * @response `200` `CreateCardResponse` Id новосозданной карточки
   * @response `default` `Message` Ошибка
   */
  export namespace CreateCard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateCardData;
    export type RequestHeaders = {};
    export type ResponseBody = CreateCardResponse;
  }
  /**
   * No description
   * @tags cards
   * @name DeleteCard
   * @summary Удалить карточку по id
   * @request DELETE:/card
   * @secure
   * @response `200` `DeleteCardResponse` Сообщение об удалении карточки
   * @response `default` `Message` Ошибка
   */
  export namespace DeleteCard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = DeleteCardData;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteCardResponse;
  }
  /**
   * No description
   * @tags cards
   * @name UpdateCard
   * @summary Обновить уже существующую карточку
   * @request PUT:/card
   * @secure
   * @response `200` `UpdateCardResponse` Обновленная карточка
   */
  export namespace UpdateCard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateCardData;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateCardResponse;
  }
  /**
   * No description
   * @tags cards
   * @name GetCard
   * @summary Получить информацию о карточке по id
   * @request GET:/card/{cardId}
   * @response `200` `GetCardResponse` Информация о карточке
   * @response `default` `Message` Ошибка
   */
  export namespace GetCard {
    export type RequestParams = { cardId: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCardResponse;
  }
}

export namespace UserInfo {
  /**
   * No description
   * @tags users
   * @name GetUserInfo
   * @summary Получить публичную информацию о пользователе
   * @request GET:/userInfo/{userName}
   * @response `200` `GetUserInfoResponse` Информация о пользователе
   * @response `default` `Message` Ошибка
   */
  export namespace GetUserInfo {
    export type RequestParams = { userName: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserInfoResponse;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:4400";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title cardcourt API
 * @version 1.0
 * @baseUrl http://localhost:4400
 *
 * Карточки!
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  register = {
    /**
     * No description
     *
     * @tags users
     * @name RegisterUser
     * @summary Регистрация пользователя на сервере
     * @request POST:/register
     * @response `200` `RegisterUserResponse` Возвращает токен пользователя
     * @response `default` `Message` Ошибка
     */
    registerUser: (data: RegisterUserData, params: RequestParams = {}) =>
      this.request<RegisterUserResponse, Message>({
        path: `/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags users
     * @name LoginUser
     * @summary Войти в свой аккаунт
     * @request POST:/login
     * @response `200` `LoginUserResponse` Возвращает токен пользователя
     * @response `default` `Message` Ошибка
     */
    loginUser: (data: LoginUserData, params: RequestParams = {}) =>
      this.request<LoginUserResponse, Message>({
        path: `/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  me = {
    /**
     * No description
     *
     * @tags users
     * @name GetMe
     * @summary Получить данные о себе с помощью токена
     * @request GET:/me
     * @secure
     * @response `200` `MeResponse` Ваши данные
     */
    getMe: (params: RequestParams = {}) =>
      this.request<MeResponse, any>({
        path: `/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  cardCount = {
    /**
     * No description
     *
     * @tags cards
     * @name GetCardCount
     * @summary Получить количество страниц карточек, существующих по этому запросу
     * @request GET:/cardCount
     * @response `200` `GetCardCountResponse` Количество страниц
     */
    getCardCount: (query: GetCardCountParams, params: RequestParams = {}) =>
      this.request<GetCardCountResponse, any>({
        path: `/cardCount`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  cards = {
    /**
     * No description
     *
     * @tags cards
     * @name GetCards
     * @summary Начиная со страницы page включительно, загрузить pagesToLoad страниц, имеющих размер pageSize и удовлетворяющих поисковому запросу search и автору by
     * @request GET:/cards
     * @response `200` `GetCardsResponse` Список карточек
     * @response `default` `Message` Ошибка
     */
    getCards: (query: GetCardsParams, params: RequestParams = {}) =>
      this.request<GetCardsResponse, Message>({
        path: `/cards`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  card = {
    /**
     * No description
     *
     * @tags cards
     * @name CreateCard
     * @summary Создать карточку от своего имени
     * @request POST:/card
     * @secure
     * @response `200` `CreateCardResponse` Id новосозданной карточки
     * @response `default` `Message` Ошибка
     */
    createCard: (data: CreateCardData, params: RequestParams = {}) =>
      this.request<CreateCardResponse, Message>({
        path: `/card`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name DeleteCard
     * @summary Удалить карточку по id
     * @request DELETE:/card
     * @secure
     * @response `200` `DeleteCardResponse` Сообщение об удалении карточки
     * @response `default` `Message` Ошибка
     */
    deleteCard: (data: DeleteCardData, params: RequestParams = {}) =>
      this.request<DeleteCardResponse, Message>({
        path: `/card`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name UpdateCard
     * @summary Обновить уже существующую карточку
     * @request PUT:/card
     * @secure
     * @response `200` `UpdateCardResponse` Обновленная карточка
     */
    updateCard: (data: UpdateCardData, params: RequestParams = {}) =>
      this.request<UpdateCardResponse, any>({
        path: `/card`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags cards
     * @name GetCard
     * @summary Получить информацию о карточке по id
     * @request GET:/card/{cardId}
     * @response `200` `GetCardResponse` Информация о карточке
     * @response `default` `Message` Ошибка
     */
    getCard: (cardId: string, params: RequestParams = {}) =>
      this.request<GetCardResponse, Message>({
        path: `/card/${cardId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  userInfo = {
    /**
     * No description
     *
     * @tags users
     * @name GetUserInfo
     * @summary Получить публичную информацию о пользователе
     * @request GET:/userInfo/{userName}
     * @response `200` `GetUserInfoResponse` Информация о пользователе
     * @response `default` `Message` Ошибка
     */
    getUserInfo: (userName: string, params: RequestParams = {}) =>
      this.request<GetUserInfoResponse, Message>({
        path: `/userInfo/${userName}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
