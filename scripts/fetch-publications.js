import fs from "fs/promises";

// =========================
// LOAD EXISTING
// =========================
let existing = [];

try {
  existing = JSON.parse(
    await fs.readFile("./src/data/publications.json", "utf-8")
  );
} catch {
  existing = [];
}

// =========================
// LOAD ORCIDS
// =========================
const ORCIDS = JSON.parse(
  await fs.readFile("./src/data/orcids.json", "utf-8")
);

// =========================
// FETCH FUNCTIONS
// =========================
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

// =========================
// EXTRACTORS
// =========================
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

function extractArxiv(externalIds) {
  if (!externalIds) return null;

  const arxiv = externalIds["external-id"]?.find(
    (id) =>
      id["external-id-type"] === "arxiv" ||
      id["external-id-type"] === "arXiv"
  );

  return arxiv
    ? `https://arxiv.org/abs/${arxiv["external-id-value"]}`
    : null;
}

function extractVenue(work) {
  return (
    work["journal-title"]?.value ||
    work["book-title"]?.value ||
    work["publisher"]?.value ||
    "Preprint"
  );
}

// =========================
// DEDUPLICATION
// =========================
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

function getKey(pub) {
  if (pub.doi) return `doi:${pub.doi}`;
  return `title:${normalizeTitle(pub.title)}-${pub.year}`;
}

// =========================
// MERGE LOGIC
// =========================
function mergePubs(existing, incoming) {
  return {
    ...existing,

    venue:
      existing.venue !== "Preprint"
        ? existing.venue
        : incoming.venue,

    url: existing.url || incoming.url,

    arxiv: existing.arxiv || incoming.arxiv,

    authors: Array.from(
      new Set([...(existing.authors || []), ...(incoming.authors || [])])
    )
  };
}

// =========================
// INITIAL MAP (WITH EXISTING)
// =========================
let publicationsMap = {};

for (const pub of existing) {
  publicationsMap[getKey(pub)] = pub;
}

// =========================
// FETCH LOOP
// =========================
for (const researcher of ORCIDS) {
  console.log(`Fetching ${researcher.name}...`);

  const works = await fetchWorks(researcher.orcid);

  for (const work of works) {
    try {
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
      const arxiv = extractArxiv(details["external-ids"]);
      const venue = extractVenue(details);

      const pub = {
        title,
        year,
        authors,
        venue,
        doi,
        arxiv,
        url: doi ? `https://doi.org/${doi}` : null
      };

      const key = getKey(pub);

      if (publicationsMap[key]) {
        publicationsMap[key] = mergePubs(publicationsMap[key], pub);
      } else {
        publicationsMap[key] = pub;
      }
    } catch (err) {
      console.warn("Error fetching work:", err);
    }
  }
}

// =========================
// FINAL ARRAY
// =========================
let publications = Object.values(publicationsMap);

// ordenar por año (desc)
publications.sort((a, b) => b.year - a.year);

// =========================
// SAVE
// =========================
await fs.writeFile(
  "./src/data/publications.json",
  JSON.stringify(publications, null, 2)
);

console.log("Publications updated.");