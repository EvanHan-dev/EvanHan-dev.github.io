export function matchesSearch(entry,query='',type='',tag='') {
  const normalize = value => String(value).normalize('NFKC').toLowerCase();
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return (!type||entry.type===type)&&(!tag||entry.tag===tag)&&terms.every(term=>normalize(entry.keywords).includes(term));
}
