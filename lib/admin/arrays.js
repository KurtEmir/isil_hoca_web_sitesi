export const updateAt = (list, index, patch) =>
  (list ?? []).map((item, i) => (i === index ? { ...item, ...patch } : item))

export const replaceAt = (list, index, value) =>
  (list ?? []).map((item, i) => (i === index ? value : item))

export const removeAt = (list, index) =>
  (list ?? []).filter((_, i) => i !== index)
