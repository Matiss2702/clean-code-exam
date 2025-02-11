<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Pièces Motos</h1>
      <BikePieceAddDialog />
    </div>
    <BikePieceDataTable
      :columns="columns"
      :data="bikePieces"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BikePieceAddDialog from "@/domains/admin/components/BikePieceAddDialog.vue";
  import BikePieceDataTable from "@/domains/admin/components/BikePieceDataTable.vue";
  import { getAllBikePieces } from "../../../services/bikePieceService";
  import { getColumns } from "../utils/bikePieceColumns";
  import { BikePiece } from "@domain/entities/BikePiece.ts";

  const bikePieces = ref<BikePiece[]>([]);

  const fetchBikePieces = async () => {
    try {
      const data = await getAllBikePieces();
      bikePieces.value = data;
    } catch (error) {
      console.error("Erreur lors de la récupération des pieces motos :", error);
    }
  };

  const columns = ref(getColumns());
  onMounted(() => {
    fetchBikePieces();
  });
</script>
