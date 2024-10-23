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

// HOME PAGE + FEATURED ARTICLES
export const getArticles = async (page = 1, pageSize = 12) => {
  return fetchAPI(
    `/api/articles?fields[0]=title&fields[1]=slug&fields[2]=date&fields[3]=featured&populate[cover]=*&populate[categories]=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=date:desc`,
    {
      cache: "no-store",
    }
  );
};

// SINGLE ARTICLE
export const getArticleBySlug = async (slug) => {
  const data = await fetchAPI(
    `/api/articles?filters[slug]=${slug}&fields[0]=title&fields[1]=date&fields[2]=featured&fields[3]=sponsored&fields[4]=content&fields[5]=slug&populate[cover]=*&populate[categories]=*&populate[redactions]=*`,
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
  const data = await fetchAPI(
    `/api/redactions?fields[0]=name&fields[1]=description&fields[2]=slug&populate=profile`,
    {
      cache: "no-store",
    }
  );

  if (!data || !data.data) {
    throw new Error("Authors not found");
  }

  const author = data.data.find((author) => author.id === authorId);

  if (!author) {
    throw new Error("Author not found");
  }

  return author;
};

// AUTHOR PAGE
export const getAuthorWithArticles = async (slug, page = 1, pageSize = 18) => {
  const authorData = await fetchAPI(
    `/api/redactions?filters[slug][$eq]=${slug}&fields[0]=name&fields[1]=description&populate=profile`
  );

  if (authorData.data.length === 0) {
    throw new Error("Author not found");
  }

  const author = authorData.data[0];

  const articlesData = await fetchAPI(
    `/api/articles?filters[redactions][slug][$eq]=${slug}&fields[0]=title&fields[1]=slug&fields[2]=date&populate[cover]=*&populate[categories]=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=date:desc`,
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

// CATEGORY PAGE
export const getCategoryWithArticles = async (
  slug,
  page = 1,
  pageSize = 18
) => {
  const categoryData = await fetchAPI(
    `/api/categories?filters[slug][$eq]=${slug}&fields[0]=title`
  );

  if (categoryData.data.length === 0) {
    throw new Error("Category not found");
  }

  const category = categoryData.data[0];

  const articlesData = await fetchAPI(
    `/api/articles?filters[categories][slug][$eq]=${slug}&fields[0]=title&fields[1]=slug&fields[2]=date&populate[cover]=*&populate[categories]=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=date:desc`,
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
    `/api/articles?fields[0]=title&fields[1]=date&fields[2]=slug&populate[cover]=*&sort[0]=date:desc&pagination[limit]=${limit}`,
    {
      cache: "no-store",
    }
  );
  return data.data;
};

// ABOUT PAGE CONTENT
export const getAboutContent = async () => {
  const dataAbout = await fetchAPI(
    "/api/about?fields[0]=title&fields[1]=description&fields[2]=content"
  );
  return dataAbout.data;
};

// MISSION
export const getMissionContent = async () => {
  const dataMission = await fetchAPI("/api/mission?fields[0]=content");
  return dataMission.data.content;
};

// PRIVACY POLICY
export const getPrivacyPolicy = async () => {
  const dataPrivacy = await fetchAPI(
    "/api/privacy?fields[0]=date&fields[1]=content"
  );
  return dataPrivacy.data;
};

// TERMS AND CONDITIONS
export const getTermsContent = async () => {
  const dataTerms = await fetchAPI(
    "/api/terms-of-use?fields[0]=date&fields[1]=content"
  );
  return dataTerms.data;
};

// SPONSORED CONTENT
export const getSponsoredContent = async () => {
  const dataSponsored = await fetchAPI(
    "/api/sponsored?fields[0]=date&fields[1]=content"
  );
  return dataSponsored.data;
};

// TRANSPARENCY CONTENT
export const getTransparencyContent = async () => {
  const dataTransparency = await fetchAPI(
    "/api/transparency?fields[0]=date&fields[1]=content"
  );
  return dataTransparency.data;
};

// LAYERED COMIC
export const getLatestComicImage = async () => {
  const response = await fetchAPI(
    `/api/comics?fields[0]=id&sort[0]=id:desc&populate=panel`,
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
  const dataTestimonial = await fetchAPI(
    "/api/testimonials?fields[0]=quote&fields[1]=name&fields[2]=episode&populate=image"
  );

  const sortedTestimonials = dataTestimonial.data.sort((a, b) => b.id - a.id);

  return dataTestimonial.data.map((item) => ({
    id: item.id,
    quote: item.quote,
    name: item.name,
    episode: item.episode,
    profileImage: item.image.url || null,
  }));
};
