import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
//TODO create partial dto for this
// Define the schema for validation and transformation
const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// class is required for using DTO as a type
export class SignInDto extends createZodDto(CredentialsSchema) {}
