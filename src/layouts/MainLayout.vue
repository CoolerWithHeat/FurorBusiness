<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title class="text-weight-bold"> Quasar CRUD Demo </q-toolbar-title>

        <q-space />

        <q-btn href="/../Furor" flat dense icon="bolt" label="CRUD" class="q-ml-sm" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list padding>
        <q-item-label header class="text-grey-7">Navigation</q-item-label>

        <q-item clickable v-ripple to="/demo" exact>
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>CRUD</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/crud">
          <q-item-section avatar><q-icon name="inventory_2" /></q-item-section>
          <q-item-section>Items CRUD</q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item>
          <q-item-section>
            <q-banner rounded class="bg-white">
              <div class="text-weight-bold">Persist ga</div>
              <div class="text-grey-7 text-caption">Malumotlar LocalStorage da saqlanadi.</div>
            </q-banner>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(true)
</script>
