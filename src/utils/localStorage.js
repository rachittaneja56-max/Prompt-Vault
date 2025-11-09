const Storage_Key = "promptvault_prompts"

export function generateKey(email) {
    return email?.toLowerCase()
}
export function getAllData() {
    try {
        return JSON.parse(localStorage.getItem(Storage_Key)) || {};
    } catch {
        return {};
    }
}

export function saveAllData(obj) {
    localStorage.setItem(Storage_Key, JSON.stringify(obj))
}

export function getPrompts(email) {
    if (!email) return []
    const key = generateKey(email)
    const all = getAllData()
    return all[key] || []
}

export function savePrompts(email, prompts) {
    if (!email) return
    const key = generateKey(email)
    const all = getAllData()
    all[key] = prompts
    saveAllData(all)
}

export function clearPrompts(email) {
  if (!email) return
  const key = generateKey(email)
  const all = getAllData()
  delete all[key]
  saveAllData(all)
}
export function deletePrompt(email,promptid) {
  if (!email) return;
  const key = generateKey(email)
  const all = getAllData()
  const promptlist = all[key] || []
  const newpromptlist = promptlist.filter((prev)=> prev.id !== promptid)
  all[key] = newpromptlist
  saveAllData(all);
}
export const toggleFavourite = (email, promptId) => {
  const allPrompts = getPrompts(email)
  const updated = allPrompts.map((p) => p.id === promptId ? { ...p, isFavourite: !p.isFavourite } : p)
  savePrompts(email, updated)
  return updated;
}