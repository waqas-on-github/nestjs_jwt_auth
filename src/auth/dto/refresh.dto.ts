import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
// Define the schema for validation and transformation
const CredentialsSchema = z.object({
  refreshToken: z.string(),
});

// class is required for using DTO as a type
export class RefreshTokenDto extends createZodDto(CredentialsSchema) {}
