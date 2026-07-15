import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, schema }) {
  return (
    <Helmet>
      <title>{title ? `${title} | Bella Vista Italian Kitchen` : 'Bella Vista Italian Kitchen'}</title>
      <meta name="description" content={description || "Experience authentic Italian cuisine at Bella Vista Italian Kitchen."} />
      <meta property="og:title" content={title || 'Bella Vista Italian Kitchen'} />
      <meta property="og:description" content={description || "Experience authentic Italian cuisine at Bella Vista Italian Kitchen."} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
