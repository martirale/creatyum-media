const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const fetchAPI = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${strapiToken}`,
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const response = await fetch(`${strapiUrl}${endpoint}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};

// SINGLE ARTICLE
export const getArticleBySlug = async (slug) => {
  const data = await fetchAPI(
    `/api/articles?filters[slug]=${slug}&populate=*`,
    {
      cache: "no-store",
    }
  );

  if (data.data.length === 0) {
    throw new Error("Article not found");
  }

  const article = data.data[0];

  if (article.attributes.redactions?.data?.[0]?.id) {
    const authorId = article.attributes.redactions.data[0].id;
    const authorData = await fetchAPI(
      `/api/redactions/${authorId}?populate=profile`
    );
    article.attributes.redactions.data[0].attributes.profile =
      authorData.data.attributes.profile;
  }

  return article;
};

// HOME INDEX
export const getArticles = async (page = 1, pageSize = 18) => {
  return fetchAPI(
    `/api/articles?sort[0]=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
    {
      cache: "no-store",
    }
  );
};

// CATEGORY INDEX
export const getCategoryWithArticles = async (
  slug,
  page = 1,
  pageSize = 18
) => {
  const categoryData = await fetchAPI(
    `/api/categories?filters[slug]=${slug}&populate=*`
  );

  if (categoryData.data.length === 0) {
    throw new Error("Category not found");
  }

  const category = categoryData.data[0];

  const articlesData = await fetchAPI(
    `/api/articles?filters[categories][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=cover,categories&sort[0]=date:desc`,
    {
      cache: "no-store",
    }
  );

  return {
    category: category,
    articles: articlesData.data,
    meta: articlesData.meta,
  };
};

// SIDEBAR LATEST
export const getLatestArticles = async (limit = 5) => {
  const data = await fetchAPI(
    `/api/articles?sort[0]=date:desc&pagination[limit]=${limit}&populate=*`,
    {
      cache: "no-store",
    }
  );
  return data.data;
};

// CATEGORIES
export const getCategory = async (slug) => {
  const data = await fetchAPI(
    `/api/categories?filters[slug]=${slug}&populate=*`
  );
  return data.data.length > 0 ? data.data[0] : null;
};
