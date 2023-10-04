export const photoQueries = {
  getPhotosWithMetadata: (query = '') => `
    SELECT photos.id, photos.caption, photos.url,
    ARRAY_AGG (slug || '|' || display_name) photo_categories
    FROM photos
    LEFT JOIN photos_to_categories ON photos.id = photos_to_categories.photo_id
    LEFT JOIN photo_categories ON photos_to_categories.category_slug = photo_categories.slug
    ${query}
    GROUP BY
        photos.id
    `,

  getPhotosByCategory: `
    SELECT photos.id, photos.caption, photos.url, photo_categories.slug AS category_slug
    FROM photos
    LEFT JOIN photos_to_categories ON photos.id = photos_to_categories.photo_id
    LEFT JOIN photo_categories ON photos_to_categories.category_slug = photo_categories.slug
    WHERE category_slug=$1
  `,
};
