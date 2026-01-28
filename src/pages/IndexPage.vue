<template>
  <q-page class="q-pa-xl">
    <div class="text-h3 text-weight-bold">Dashboard</div>
    <div class="text-subtitle1 text-grey-7 q-mt-sm">CRUD Demonstrations</div>

    <q-separator class="q-my-lg" />

    <q-card class="q-pa-lg" style="max-width: 560px">
      <div class="text-h6">For Furor Business</div>
      <q-list bordered class="q-mt-md">
        <q-item><q-item-section>✅ Vue 3 + Quasar</q-item-section></q-item>
        <q-item><q-item-section>✅ Router (/ and /CRUD)</q-item-section></q-item>
        <q-item><q-item-section>✅ CRUD + Pagination</q-item-section></q-item>
        <q-item><q-item-section>✅ LocalStorage persistence</q-item-section></q-item>
      </q-list>

      <q-btn class="q-mt-lg" color="primary" label="Open CRUD" to="/CRUD" />
    </q-card>
  </q-page>
</template>
