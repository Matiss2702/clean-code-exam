// application/user/dto/LicenceCategoryDTO.ts
export interface LicenceCategoryDTO {
  id: string;
  name: string;
  transmission_type: "manuelle" | "automatique";
}
