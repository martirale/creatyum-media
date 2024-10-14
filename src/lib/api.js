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

// HOME PAGINATION
export const getArticles = async (page = 1, pageSize = 12) => {
  return fetchAPI(
    `/api/articles?sort[0]=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
    {
      cache: "no-store",
    }
  );
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

  return article;
};

// AUTHOR POST
export const getAuthorById = async (authorId) => {
  const data = await fetchAPI(`/api/redactions?populate=profile`, {
    cache: "no-store",
  });

  if (!data || !data.data) {
    throw new Error("Authors not found");
  }

  const author = data.data.find((author) => author.id === authorId);

  if (!author) {
    throw new Error("Author not found");
  }

  return author;
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

// CATEGORIES
export const getCategoryWithArticles = async (
  slug,
  page = 1,
  pageSize = 18
) => {
  const categoryData = await fetchAPI(
    `/api/categories?filters[slug][$eq]=${slug}&populate=*`
  );

  if (categoryData.data.length === 0) {
    throw new Error("Category not found");
  }

  const category = categoryData.data[0];

  const articlesData = await fetchAPI(
    `/api/articles?filters[categories][slug][$eq]=${slug}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[cover]=*&populate[categories]=*&sort[0]=date:desc`,
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

// ABOUT PAGE DESCRIPTION
export const getDescriptionContent = async () => {
  const dataAbout = await fetchAPI("/api/about");
  return dataAbout.data.description;
};

// ABOUT PAGE CONTENT
export const getAboutContent = async () => {
  const dataAbout = await fetchAPI("/api/about");
  return dataAbout.data.content;
};

// MISSION
export const getMissionContent = async () => {
  const dataMission = await fetchAPI("/api/mission");
  return dataMission.data.content;
};

// PRIVACY POLICY
export const getPrivacyPolicy = async () => {
  const dataPrivacy = await fetchAPI("/api/privacy");
  return dataPrivacy.data;
};

// TERMS AND CONDITIONS
export const getTermsContent = async () => {
  const dataTerms = await fetchAPI("/api/terms-of-use");
  return dataTerms.data;
};

// SPONSORED CONTENT
export const getSponsoredContent = async () => {
  const dataSponsored = await fetchAPI("/api/sponsored");
  return dataSponsored.data;
};

// TRANSPARENCY CONTENT
export const getTransparencyContent = async () => {
  const dataTransparency = await fetchAPI("/api/transparency");
  return dataTransparency.data;
};

// LAYERED COMIC
export const getLatestComicImage = async () => {
  const response = await fetchAPI(
    `/api/comics?sort[0]=id:desc&populate=panel`,
    {
      cache: "no-store",
    }
  );

  const data = response.data;

  if (data && data.length > 0) {
    const latestComic = data[0];
    const imageUrl = latestComic?.panel?.url || null;

    return imageUrl;
  }

  return null;
};

// PODCAST TESTIMONIALS
export const getTestimonials = async () => {
  const dataTestimonial = await fetchAPI("/api/testimonials?populate=image");

  const sortedTestimonials = dataTestimonial.data.sort((a, b) => b.id - a.id);

  return dataTestimonial.data.map((item) => ({
    id: item.id,
    quote: item.quote,
    name: item.name,
    episode: item.episode,
    profileImage: item.image.url || null,
  }));
};
