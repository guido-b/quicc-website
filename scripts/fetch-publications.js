import fs from "fs/promises";

const ORCIDS = JSON.parse(
  await fs.readFile("./src/data/orcids.json", "utf-8")
);

async function fetchWorks(orcid) {
  const res = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, {
    headers: { Accept: "application/json" }
  });

  const data = await res.json();
  return data.group.map((item) => item["work-summary"][0]);
}

async function fetchWorkDetails(orcid, putCode) {
  const res = await fetch(
    `https://pub.orcid.org/v3.0/${orcid}/work/${putCode}`,
    { headers: { Accept: "application/json" } }
  );

  return res.json();
}

function extractAuthors(contributors) {
  if (!contributors) return [];

  return contributors
    .map((c) => c["credit-name"]?.value)
    .filter(Boolean);
}

function extractDOI(externalIds) {
  if (!externalIds) return null;

  const doi = externalIds["external-id"]?.find(
    (id) => id["external-id-type"] === "doi"
  );

  return doi ? doi["external-id-value"].toLowerCase() : null;
}

function extractVenue(work) {
  return (
    work["journal-title"]?.value ||
    work["book-title"]?.value ||
    work["publisher"]?.value ||
    "Preprint"
  );
}

// 🔥 clave de deduplicación
function getKey(pub) {
  if (pub.doi) return `doi:${pub.doi}`;
  return `title:${pub.title.toLowerCase()}-${pub.year}`;
}

// 🔥 merge inteligente
function mergePubs(existing, incoming) {
  return {
    ...existing,

    // preferir datos más ricos
    venue:
      existing.venue !== "Preprint"
        ? existing.venue
        : incoming.venue,

    url: existing.url || incoming.url,

    // unir autores sin duplicados
    authors: Array.from(
      new Set([...(existing.authors || []), ...(incoming.authors || [])])
    )
  };
}

let publicationsMap = {};

for (const researcher of ORCIDS) {
  console.log(`Fetching ${researcher.name}...`);

  const works = await fetchWorks(researcher.orcid);

  for (const work of works) {
    const details = await fetchWorkDetails(
      researcher.orcid,
      work["put-code"]
    );

    const title = details.title?.title?.value || "No title";

    const year =
      parseInt(details["publication-date"]?.year?.value) || 0;

    const authors = extractAuthors(
      details.contributors?.contributor || []
    );

    const doi = extractDOI(details["external-ids"]);

    const venue = extractVenue(details);

    const pub = {
      title,
      year,
      authors,
      venue,
      doi,
      url: doi ? `https://doi.org/${doi}` : null
    };

    const key = getKey(pub);

    if (publicationsMap[key]) {
      publicationsMap[key] = mergePubs(publicationsMap[key], pub);
    } else {
      publicationsMap[key] = pub;
    }
  }
}

// pasar a array
let publications = Object.values(publicationsMap);

// ordenar
publications.sort((a, b) => b.year - a.year);

// guardar
await fs.writeFile(
  "./src/data/publications.json",
  JSON.stringify(publications, null, 2)
);

console.log("Publications updated.");