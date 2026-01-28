<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-7">
        <div class="text-h5 text-weight-bold">Items CRUD</div>
        <div class="text-grey-7">Create / Read / Update / Delete VA pagination + LocalStorage.</div>
      </div>

      <div class="col-12 col-md-5">
        <div class="row q-col-gutter-sm justify-end">
          <div class="col-12 col-sm">
            <q-input
              v-model="query"
              dense
              outlined
              placeholder="Search name/category/price..."
              clearable
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="col-auto">
            <q-btn unelevated color="primary" icon="add" label="New" @click="openCreate()" />
          </div>

          <div class="col-auto">
            <q-btn outline icon="restart_alt" label="Reset" @click="confirmReset = true" />
          </div>
        </div>
      </div>
    </div>

    <q-card class="rounded-borders shadow-2">
      <q-card-section class="row items-center">
        <div class="text-subtitle1 text-weight-medium">Inventory</div>
        <q-space />
        <q-chip square color="grey-2" text-color="dark">
          Total: <span class="text-weight-bold q-ml-xs">{{ rowsNumber }}</span>
        </q-chip>
      </q-card-section>

      <q-separator />

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :rows-per-page-options="[5, 8, 12, 20]"
        binary-state-sort
        flat
      >
        <template #body-cell-price="props">
          <q-td :props="props">
            <q-badge color="grey-3" text-color="dark">
              ${{ Number(props.row.price).toFixed(2) }}
            </q-badge>
          </q-td>
        </template>

        <template #body-cell-createdAt="props">
          <q-td :props="props">
            <span class="text-grey-7">{{ formatDate(props.row.createdAt) }}</span>
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              round
              dense
              unelevated
              icon="edit"
              color="grey-2"
              text-color="dark"
              @click="openEdit(props.row)"
            >
            </q-btn>
            <q-btn flat round dense icon="delete" color="negative" @click="askDelete(props.row)" />
          </q-td>
        </template>

        <template #no-data>
          <div class="full-width row flex-center q-pa-lg text-grey-7">
            <q-icon name="inbox" size="32px" class="q-mr-sm" />
            No items found.
          </div>
        </template>
      </q-table>

      <q-separator />
    </q-card>

    <q-dialog v-model="dialogOpen" persistent>
      <q-card style="max-width: 680px; width: 95vw" class="rounded-borders">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ editingId ? 'Edit item' : 'Create item' }}</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="closeDialog()" />
        </q-card-section>

        <q-separator />

        <q-card-section class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.name"
                outlined
                label="Name"
                :error="!!errors.name"
                :error-message="errors.name"
                autofocus
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.category"
                outlined
                label="Category"
                :error="!!errors.category"
                :error-message="errors.category"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model.number="form.price"
                outlined
                label="Price"
                type="number"
                step="0.01"
                :error="!!errors.price"
                :error-message="errors.price"
              >
                <template #prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-md-6">
              <q-banner rounded class="bg-grey-1">
                <div class="text-weight-medium">Tip</div>
                <div class="text-caption text-grey-7">Save data manually!</div>
              </q-banner>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" @click="closeDialog()" />
          <q-btn
            unelevated
            color="primary"
            :label="editingId ? 'Save changes' : 'Create'"
            @click="submit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteConfirm">
      <q-card class="rounded-borders" style="max-width: 520px; width: 95vw">
        <q-card-section class="row items-center">
          <q-icon name="warning" class="q-mr-sm" />
          <div class="text-h6">Delete?</div>
        </q-card-section>

        <q-card-section class="text-grey-7">
          This will permanently delete:
          <div class="text-weight-bold q-mt-sm">{{ pendingDelete?.name }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn unelevated color="negative" label="Delete" @click="doDelete()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmReset">
      <q-card class="rounded-borders" style="max-width: 520px; width: 95vw">
        <q-card-section class="row items-center">
          <q-icon name="restart_alt" class="q-mr-sm" />
          <div class="text-h6">Reset?</div>
        </q-card-section>

        <q-card-section class="text-grey-7">
          Birinchi kelganingizdagi stale json localStorage ga qaytarib qo'yiladi...
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn unelevated color="primary" label="Reset" @click="doReset()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { Notify } from 'quasar'
import { useItemsStore } from 'src/composables/useItemsStore'

const { query, pagination, rows, rowsNumber, createItem, updateItem, deleteItem, resetAll } =
  useItemsStore()

const maxPages = computed(() => {
  const total = rows.value.length
  const per = pagination.value.rowsPerPage
  return Math.max(1, Math.ceil(total / per))
})

const columns = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
  { name: 'price', label: 'Price', field: 'price', align: 'left', sortable: true },
  { name: 'createdAt', label: 'Created', field: 'createdAt', align: 'left', sortable: true },
  { name: 'actions', label: '', field: 'actions', align: 'right' },
]

const dialogOpen = ref(false)
const editingId = ref(null)

const form = reactive({
  name: '',
  category: '',
  price: 0,
})

const errors = reactive({
  name: '',
  category: '',
  price: '',
})

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString()
  } catch {
    return ''
  }
}

function clearErrors() {
  errors.name = ''
  errors.category = ''
  errors.price = ''
}

function validate() {
  clearErrors()

  if (!String(form.name).trim()) errors.name = 'Name is required'
  if (!String(form.category).trim()) errors.category = 'Category is required'

  const p = Number(form.price)
  if (!Number.isFinite(p) || p < 0) errors.price = 'Price must be 0 or more'

  return !errors.name && !errors.category && !errors.price
}

function openCreate() {
  editingId.value = null
  form.name = ''
  form.category = ''
  form.price = 0
  clearErrors()
  dialogOpen.value = true
}

function openEdit(row) {
  editingId.value = row.id
  form.name = row.name
  form.category = row.category
  form.price = Number(row.price)
  clearErrors()
  dialogOpen.value = true
}

function closeDialog() {
  dialogOpen.value = false
}

function submit() {
  if (!validate()) return

  try {
    if (editingId.value) {
      updateItem(editingId.value, {
        name: form.name,
        category: form.category,
        price: form.price,
      })
      Notify.create({ type: 'positive', message: 'Updated!' })
    } else {
      createItem({
        name: form.name,
        category: form.category,
        price: form.price,
      })
      Notify.create({ type: 'positive', message: 'Created!' })
    }

    dialogOpen.value = false

    editingId.value = null

    pagination.value.page = 1
  } catch (err) {
    console.error(err)
    Notify.create({ type: 'negative', message: 'Save failed. Check console.' })
  }
}

const deleteConfirm = ref(false)
const pendingDelete = ref(null)

function askDelete(row) {
  pendingDelete.value = row
  deleteConfirm.value = true
}

function doDelete() {
  if (!pendingDelete.value) return
  deleteItem(pendingDelete.value.id)
  deleteConfirm.value = false
  pendingDelete.value = null

  if (pagination.value.page > maxPages.value) {
    pagination.value.page = maxPages.value
  }

  Notify.create({ type: 'warning', message: 'Deleted.' })
}

const confirmReset = ref(false)

function doReset() {
  resetAll()
  confirmReset.value = false
  Notify.create({ type: 'info', message: 'Reset done.' })
}
</script>
<style scoped></style>
