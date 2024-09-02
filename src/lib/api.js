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

// SINGLE ARTICLE + AUTHOR
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

// HOME PAGINATION
export const getArticles = async (page = 1, pageSize = 12) => {
  return fetchAPI(
    `/api/articles?sort[0]=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
    {
      cache: "no-store",
    }
  );
};

// CATEGORIES
export const getCategory = async (slug) => {
  const data = await fetchAPI(
    `/api/categories?filters[slug]=${slug}&populate=*`
  );
  return data.data.length > 0 ? data.data[0] : null;
};

// CATEGORY PAGINATION
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

// AUTHOR PAGINATION
export const getAuthorWithArticles = async (slug, page = 1, pageSize = 18) => {
  const authorData = await fetchAPI(
    `/api/redactions?filters[slug]=${slug}&populate=profile,articles`
  );

  if (authorData.data.length === 0) {
    throw new Error("Author not found");
  }

  const author = authorData.data[0];

  const articlesData = await fetchAPI(
    `/api/articles?filters[redactions][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=cover,redactions,categories&sort[0]=date:desc`,
    {
      cache: "no-store",
    }
  );

  return {
    author: author,
    articles: articlesData.data,
    meta: articlesData.meta,
  };
};

// LAYERED COMIC
export const getComics = async () => {
  const data = await fetchAPI(`/api/comics?sort[0]=id:desc&populate=panel`, {
    cache: "no-store",
  });

  return data.data.map((comic) => {
    const { id, attributes } = comic;
    const { slug, panel } = attributes;

    return {
      id,
      slug,
      imageUrl: panel?.data?.attributes?.url || null,
    };
  });
};

// PODCAST TESTIMONIALS
export const getTestimonials = async () => {
  const data = await fetchAPI("/api/testimonials?populate=*");

  const sortedTestimonials = data.data.sort((a, b) => b.id - a.id);

  return data.data.map((item) => ({
    id: item.id,
    quote: item.attributes.quote,
    name: item.attributes.name,
    episode: item.attributes.episode,
    profileImage: item.attributes.image?.data?.attributes?.url || null,
  }));
};
