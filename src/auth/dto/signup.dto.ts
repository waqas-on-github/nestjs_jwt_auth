import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

// Define the schema for validation and transformation
const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

// class is required for using DTO as a type
export class SignupDto extends createZodDto(CredentialsSchema) {}
