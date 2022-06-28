export class CreateChatDto {
  admin_id?: number;
  is_individual: boolean;
  title?: string;
  logo?: string;
}

export class UpdateChatDto {
  admin_id?: number;
  title?: string;
  logo?: string;
}
