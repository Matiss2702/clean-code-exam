<template>
  <div
    id="top-header"
    class="border-b p-1 transition-all"
  >
    <div class="px-4 py-2">
      <div class="flex items-center justify-end">
        <ul>
          <li>
            <RouterLink
              to="/admin/dashboard"
              class="flex items-center gap-2"
            >
              Administration
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
