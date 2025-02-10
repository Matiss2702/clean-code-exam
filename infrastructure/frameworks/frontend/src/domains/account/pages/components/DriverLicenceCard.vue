<template>
  <div>
    <!-- Indicateur de chargement -->
    <div
      v-if="loading"
      class="loading"
    >
      Chargement...
    </div>

    <!-- Affichage de la carte si le permis a été récupéré -->
    <div
      v-else-if="licence"
      class="licence-card"
    >
      <!-- En-tête avec titre et logo -->
      <div class="header">
        <img
          src="/images/logo-france.png"
          alt="Drapeau EU"
          class="eu-logo"
        />
        <div class="title">
          <h1>PERMIS DE CONDUIRE</h1>
          <span>RÉPUBLIQUE FRANÇAISE</span>
        </div>
      </div>

      <!-- Contenu principal : photo à gauche et détails à droite -->
      <div class="content">
        <div class="left-section">
          <div class="photo">
            <img
              v-if="licence.photo"
              :src="licence.photo"
              alt="Photo"
            />
            <span v-else>Photo</span>
          </div>
          <!-- Les catégories sont maintenant sous la photo -->
          <div class="categories">
            <p>
              <strong>9.</strong>
              {{
                licence.categories && licence.categories.length
                  ? licence.categories.map((cat) => cat.name).join(" / ")
                  : "Aucune"
              }}
            </p>
          </div>
        </div>

        <div class="details">
          <p class="lastname">
            <strong>1.</strong>
            {{ licence.lastName.toUpperCase() }}
          </p>
          <p class="firstname">
            <strong>2.</strong>
            {{ licence.firstName }}
          </p>
          <p class="issue-date">
            <strong>3.</strong>
            {{ formatDate(licence.issueDate) }}
          </p>
          <p class="expiration-date">
            <strong>4b.</strong>
            {{ formatDate(licence.expirationDate) }}
          </p>
          <p class="licence-number">
            <strong>5.</strong>
            {{ licence.licenceNumber }}
          </p>
        </div>
      </div>

      <!-- Numéro OCR en bas -->
      <div class="ocr-number">
        {{ generateOCRNumber(licence) }}
      </div>
    </div>

    <!-- Message si aucune donnée n'est disponible -->
    <div
      v-else
      class="no-data"
    >
      Aucune donnée de permis
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import { getDriverLicencesByUserId } from "@/services/driverLicenceService";
  import { DriverLicence } from "@domain/entities/DriverLicence.ts";
  import { useAuthStore } from "@/stores/authStore";

  const authStore = useAuthStore();

  // Récupération de l'UUID utilisateur depuis le store d'authentification
  const userId = computed(() => {
    if (authStore.user && authStore.user.id) {
      return authStore.user.id;
    } else if (authStore.token) {
      try {
        const parts = authStore.token.split(".");
        const payloadBase64 = parts[1];
        const padded = payloadBase64.padEnd(
          payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
          "="
        );
        const payload = JSON.parse(atob(padded));
        return payload?.userId || "";
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
        return "";
      }
    }
    return "";
  });

  const licence = ref<DriverLicence | null>(null);
  const loading = ref(true);

  // Fonction utilitaire pour formater la date au format français
  const formatDate = (date: string): string =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "--/--/----";

  // Génération du numéro OCR en bas
  const generateOCRNumber = (licence: DriverLicence | null): string => {
    if (!licence) return "";
    return `A1FRA${licence.licenceNumber}<<<<${licence.lastName.toUpperCase()}<${licence.firstName.toUpperCase()}`;
  };

  // Récupération du permis de conduire correspondant à l'utilisateur connecté
  const fetchLicence = async () => {
    try {
      if (!userId.value) {
        console.error("ID utilisateur introuvable");
        return;
      }
      const licences = await getDriverLicencesByUserId(userId.value);
      if (Array.isArray(licences) && licences.length > 0) {
        licence.value = licences[0];
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du permis :", error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchLicence();
  });
</script>

<style scoped>
  .licence-card {
    width: 450px;
    height: 270px;
    background: linear-gradient(135deg, #ffc0cb, #ffb6c1);
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px;
    font-family: Arial, sans-serif;
    color: #000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
  }

  /* En-tête */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .eu-logo {
    width: 50px;
  }
  .title {
    text-align: center;
    flex-grow: 1;
  }
  .title h1 {
    font-size: 14px;
    font-weight: bold;
    margin: 0;
  }
  .title span {
    font-size: 10px;
    color: #333;
  }

  /* Contenu principal */
  .content {
    display: flex;
    margin-top: 10px;
  }
  .left-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
  }
  .photo {
    width: 90px;
    height: 120px;
    background: white;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .categories {
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
    font-weight: bold;
  }

  /* Informations */
  .details {
    flex: 1;
    margin-left: 10px;
    font-size: 12px;
  }
  .lastname {
    font-size: 16px;
    font-weight: bold;
  }
  .firstname {
    font-size: 14px;
  }
  .issue-date,
  .expiration-date,
  .licence-number {
    margin: 2px 0;
  }

  /* Numéro OCR */
  .ocr-number {
    font-family: "Courier New", monospace;
    font-size: 14px;
    text-align: center;
    background: #eee;
    padding: 5px;
    margin-top: 10px;
    border-radius: 4px;
    letter-spacing: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-transform: uppercase;
  }

  /* Indicateurs de chargement et absence de données */
  .loading,
  .no-data {
    text-align: center;
    padding: 20px;
    font-size: 14px;
    color: #666;
  }
</style>
