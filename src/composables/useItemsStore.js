import { computed, ref, watch } from 'vue'
import { LocalStorage, uid } from 'quasar'

const LS_KEY = 'quasar_crud_items_v1'

function seed() {
  const now = Date.now()
  return Array.from({ length: 57 }).map((_, i) => ({
    id: uid(),
    name: `Item #${i + 1}`,
    category: ['Phones', 'Laptops', 'Accessories', 'Audio'][i % 4],
    price: Number((Math.random() * 900 + 50).toFixed(2)),
    createdAt: now - i * 3600_000,
  }))
}

const saved = LocalStorage.getItem(LS_KEY)
const items = ref(Array.isArray(saved) ? saved : seed())

watch(items, (val) => LocalStorage.set(LS_KEY, val), { deep: true })

export function useItemsStore() {
  const query = ref('')

  const pagination = ref({
    page: 1,
    rowsPerPage: 8,
    sortBy: 'createdAt',
    descending: true,
  })

  const rows = computed(() => {
    const q = query.value.trim().toLowerCase()

    let arr = items.value
    if (q) {
      arr = arr.filter(
        (x) =>
          String(x.name).toLowerCase().includes(q) ||
          String(x.category).toLowerCase().includes(q) ||
          String(x.price).toLowerCase().includes(q),
      )
    }

    const { sortBy, descending } = pagination.value
    return [...arr].sort((a, b) => {
      const av = a[sortBy]
      const bv = b[sortBy]
      if (av === bv) return 0
      return (av > bv ? 1 : -1) * (descending ? -1 : 1)
    })
  })

  function createItem(payload) {
    items.value.unshift({
      id: uid(),
      name: String(payload.name || '').trim(),
      category: String(payload.category || '').trim(),
      price: Number(payload.price),
      createdAt: Date.now(),
    })
    pagination.value.page = 1
  }

  function updateItem(id, payload) {
    const idx = items.value.findIndex((x) => x.id === id)
    if (idx === -1) return

    items.value[idx] = {
      ...items.value[idx],
      name: String(payload.name || '').trim(),
      category: String(payload.category || '').trim(),
      price: Number(payload.price),
    }
  }

  function deleteItem(id) {
    items.value = items.value.filter((x) => x.id !== id)
  }

  function resetAll() {
    items.value = seed()
    query.value = ''
    pagination.value.page = 1
  }

  const rowsNumber = computed(() => rows.value.length)

  return { query, pagination, rows, rowsNumber, createItem, updateItem, deleteItem, resetAll }
}
