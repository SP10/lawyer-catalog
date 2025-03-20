import { gql } from "@apollo/client";

export const getGlobalData = gql`
query Global {
  global {
    gaId
    siteName
    siteDescription
    defaultSeo {
      id
      metaTitle
      metaDescription
      shareImage {
        url
        previewUrl
        name
      }
      priority
      changefreq
    }
  }
}
`;

export const getService = gql`
  query Service($documentId: ID!, $status: PublicationStatus) {
    service(documentId: $documentId, status: $status) {
      documentId
      name
      slug
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const getServices = gql`
query Services($filters: ServiceFiltersInput, $pagination: PaginationArg, $sort: [String]) {
  services(filters: $filters, pagination: $pagination, sort: $sort) {
    documentId
    name
    slug
    createdAt
    updatedAt
    publishedAt
    lawyers {
      documentId
      slug
      surname
      photo {
        url
        previewUrl
        name
        documentId
        caption
        alternativeText
      }
      order
      first_name
      last_name
    }
  }
}
`;

export const getLawyers = gql`
query Lawyers($filters: LawyerFiltersInput, $pagination: PaginationArg) {
  lawyers(filters: $filters, pagination: $pagination) {
    documentId
    first_name
    last_name
    surname
    slug
    phone_number
    email
    address
    photo {
      url
      previewUrl
      name
      caption
    }
    telegram
    viber
    whatsapp
    facebook
    order
    seo {
      id
      metaTitle
      metaDescription
      shareImage {
        url
        previewUrl
      }
      priority
      changefreq
    }
    city {
      name
      slug
    }
    instagram
    regions {
      documentId
      name
      slug
      createdAt
      updatedAt
      publishedAt
    }
    services {
      documentId
      name
      slug
      createdAt
      updatedAt
      publishedAt
    }
    createdAt
    updatedAt
    publishedAt
  }
}
`;

export const getRegions = gql`
query Regions($filters: RegionFiltersInput, $pagination: PaginationArg) {
  regions(filters: $filters, pagination: $pagination) {
    documentId
    name
    slug
    lawyers {
      first_name
      last_name
      slug
      surname
      documentId
      city {
        name
        slug
        documentId
      }
      instagram
      email
      facebook
      order
      phone_number
      photo {
        url
        previewUrl
        name
      }
      telegram
      viber
      whatsapp
      seo {
        changefreq
        metaDescription
        metaTitle
        priority
        shareImage {
          url
          previewUrl
          name
          alternativeText
          caption
        }
      }
    }
    regions {
      name
      slug
      is_parent
      documentId
      lawyers {
        documentId
        first_name
        last_name
        surname
        slug
        phone_number
        email
        address
        photo {
          url
          previewUrl
          name
          caption
          alternativeText
        }
        telegram
        viber
        whatsapp
        facebook
        order
        seo {
           changefreq
        metaDescription
        metaTitle
        priority
        shareImage {
          url
          previewUrl
          name
          alternativeText
          caption
        }
        }
        instagram
        regions {
          name
          slug
        }
        services {
          name
          slug
        }
        city {
          name
          slug
        }
        createdAt
        updatedAt
        publishedAt
      }
    }
  }
}
`;

export const getPages = gql`
query Pages($pagination: PaginationArg) {
  pages(pagination: $pagination) {
    documentId
    title
    seo {
      id
      metaTitle
      metaDescription
      shareImage {
        url
        previewUrl
        name
        documentId
        caption
        alternativeText
      }
      priority
      changefreq
    }
    slug
    content
    createdAt
    updatedAt
    publishedAt
  }
}`;

export const getPolicy = gql`
query Policy {
  policy {
    documentId
    title
    slug
    seo {
      id
      metaTitle
      metaDescription
      shareImage {
        url
        previewUrl
        name
        alternativeText
        caption
        documentId
      }
      priority
      changefreq
    }
    content
    createdAt
    updatedAt
    publishedAt
  }
}
`;