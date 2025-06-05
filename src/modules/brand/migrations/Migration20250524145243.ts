import { Migration } from '@mikro-orm/migrations';

export class Migration20250524145243 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "brand" add column if not exists "status" text check ("status" in ('draft', 'proposed', 'published', 'rejected')) not null default 'draft', add column if not exists "handle" text not null, add column if not exists "description" text not null, add column if not exists "meta_title" text not null, add column if not exists "meta_description" text not null;`);
    this.addSql(`alter table if exists "brand" rename column "image" to "icon";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "brand" drop column if exists "status", drop column if exists "handle", drop column if exists "description", drop column if exists "meta_title", drop column if exists "meta_description";`);

    this.addSql(`alter table if exists "brand" rename column "icon" to "image";`);
  }

}
